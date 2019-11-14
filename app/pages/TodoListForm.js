/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/pages/TodoListForm.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Wednesday, November 13th 2019, 2:14:42 pm
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    Picker,
    TouchableOpacity,
    AppState,
    ToastAndroid
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import firebase from 'react-native-firebase'
import { Color } from '../ui'
import uuidv1 from 'uuid/v1'
import { insertNewTodoList, updateTodoList, deleteTodoList } from '../db/Schema'
import { ScrollView } from 'react-native-gesture-handler'

export default class TodoListForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedStatus: props.action == "edit" ? props.todo.status : false,
            selectedPriority: props.action == "edit" ? props.todo.priority : "Low",
            title: props.action == "edit" ? props.todo.name : "",
            status: [],
            priorities: [],
            date: props.action == "edit" ? props.todo.dueDate : new Date(),
            time: props.action == "edit" ? props.todo.dueDate : new Date(),
            mode: 'datetime',
            showDate: false,
            showTime: false,
            dueDate: props.action == "edit" ? props.todo.dueDate : new Date(),
            reminderDate: props.action == "edit" ? props.todo.reminderDate : new Date(),
            appState: AppState.currentState,
        }
    }

    componentDidMount() {

        // Populate status value
        let status = [
            {
                value: false, 
                label: 'In Progress'
            },
            {
                value: true,
                label: 'Completed'
            }
        ];

        // Populate priority value
        let priorities = ['Low','Medium','High']

        this.setState({
            status: status,
            priorities: priorities
        })
    }
    

    setDate = (event, date) => {
        date = date || this.state.date;
        
        if (this.state.mode == 'date') {
            this.setState({
              showDate: Platform.OS === 'ios' ? true : false,
              date: date
            });
        } else {
            this.setState({
              showTime: Platform.OS === 'ios' ? true : false,
              time: date
            });
        }

        // Extract Date to Moment variable
        var d = moment(this.state.date).format('DD/MM/YYYY')
        
        // Extract Time to Moment Variable
        var t = moment(this.state.time).format('H:m')

        // Combine extracted date and time to moment variable (Due Date)
        var dt = moment(d +" "+ t, 'DD/MM/YYYY H:m', true).format()

        // Combine extracted date and time to moment variable (Reminder Date)
        var rt = moment(d +" "+ t, 'DD/MM/YYYY H:m', true).subtract(12, "hours").format()
        this.setState({
            dueDate: dt,
            reminderDate: rt
        })
    }
    
    show = mode => {
        this.setState({
          showDate: mode == "date" ? true : false,
          showTime: mode == "time" ? true : false,
          mode,
        });
    }
    
    datepicker = () => {
        this.show('date');
    }
    
    timepicker = () => {
        this.show('time');
    }

    onSubmit() {

        var forms = {
            id: this.props.action == "create" ? uuidv1() : this.props.todo.id,
            name: this.state.title,
            status: this.state.selectedStatus,
            priority: this.state.selectedPriority,
            dueDate: this.state.dueDate,
            reminderDate: moment(this.state.dueDate).subtract(12, "hours").format(),
            creationDate: new Date(),
            notificationId: uuidv1()
        }

        if (this.props.action == "create") {

            // Insert new todo list
            insertNewTodoList(forms).then((todoList) => {

                // Set the reminder
                this.setReminder(todoList)

                // Show Toast
                ToastAndroid.show("Success Create Todo", ToastAndroid.SHORT)

                // if success redirect to home
                Actions.pop({ refresh: { isSuccess: true }})
            }).catch((error) => {
                console.log(error)
            })
        } else if (this.props.action == "edit") {

            // Update current todo list
            updateTodoList(forms).then((todoList) => {

                // Set the reminder
                this.setReminder(todoList)

                // Show Toast
                ToastAndroid.show("Success Update Todo", ToastAndroid.SHORT)

                // if success redirect to home
                Actions.pop({ refresh: { isSuccess: true }})
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    async setReminder(todo) {
        firebase.notifications().scheduleNotification(this.buildNotification(todo), {
            fireDate: moment(todo.reminderDate).valueOf(),
            repeatInterval: 'day',
            exact: true,
        });
    };
    
    buildNotification(todo) {
        const notification = new firebase.notifications.Notification()
            .setNotificationId(todo.notificationId)
            .setTitle('Reminder')
            .setBody(todo.name)
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .android.setChannelId('reminder')
            .android.setAutoCancel(false);

        return notification;
    };

    render() {
        return(
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        backgroundColor: 'white'
                    }}>
                    <TextInput
                        ref={(ref) => { this.FirstInput = ref; }}
                        placeholder="Untitled"
                        selectionColor={"#000"}
                        multiline={true}
                        value={this.state.title}
                        autoFocus
                        style={{
                            fontSize: 32,
                            fontFamily: "PTSansRegular",
                            fontWeight: "bold",
                            paddingLeft: 0
                        }}
                        onChangeText={ value => this.setState({ title: value })}
                    />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column'
                        }}>
                        <View
                            style={{
                                flexDirection: 'column'
                            }}>
                            <Text>Status</Text>
                            <View
                                style={{
                                    width: "100%",
                                    height: 50,
                                    flexDirection: 'row',
                                    borderWidth: 2,
                                    borderRadius: 10,
                                    borderColor: '#E6E6E7',
                                    marginTop: 10
                                }}>
                                <Picker
                                    selectedValue={this.state.selectedStatus}
                                    style={{height: 50, width: "100%"}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ selectedStatus: itemValue})
                                    }>
                                    {
                                        this.state.status.map((item, index) => 
                                            <Picker.Item key={index} label={item.label} value={item.value} style={{ fontFamily: 'PTSansRegular' }} />
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                marginTop: 10
                            }}>
                            <Text>Priority</Text>
                            <View
                                style={{
                                    width: "100%",
                                    height: 50,
                                    flexDirection: 'row',
                                    borderWidth: 2,
                                    borderRadius: 10,
                                    borderColor: '#E6E6E7',
                                    marginTop: 10
                                }}>
                                <Picker
                                    selectedValue={this.state.selectedPriority}
                                    style={{height: 50, width: "100%"}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ selectedPriority: itemValue})
                                    }>
                                    {
                                        this.state.priorities.map((item, index) => 
                                            <Picker.Item key={index} label={item} value={item} style={{ fontFamily: 'PTSansRegular' }}/>
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 10
                            }}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginTop: 10,
                                    flex: 1,
                                    marginRight: 5
                                }}>
                                <Text>Due Date</Text>
                                <TouchableOpacity
                                    style={{
                                        width: "100%",
                                        height: 50,
                                        flexDirection: 'row',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        borderColor: '#E6E6E7',
                                        marginTop: 10,
                                        alignItems: 'center',
                                        paddingLeft: 10
                                    }}
                                    onPress={() => this.datepicker()}>
                                    <Text style={{ fontFamily: 'PTSansRegular' }}>{moment(this.state.date).format("MMMM D, YYYY")}</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginTop: 10,
                                    flex: 1,
                                    marginLeft: 5
                                }}>
                                <Text>Due Time</Text>
                                <TouchableOpacity
                                    style={{
                                        width: "100%",
                                        height: 50,
                                        flexDirection: 'row',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        borderColor: '#E6E6E7',
                                        marginTop: 10,
                                        alignItems: 'center',
                                        paddingLeft: 10
                                    }}
                                    onPress={() => this.timepicker()}>
                                    <Text style={{ fontFamily: 'PTSansRegular' }}>{moment(this.state.time).format("LT")}</Text>
                                </TouchableOpacity>
                                { 
                                    this.state.showDate
                                    && 
                                    <DateTimePicker 
                                        value={this.state.date}
                                        mode={this.state.mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={ (event, date) => this.setDate(event, date)}
                                        minimumDate={new Date()} />
                                }
                                { 
                                    this.state.showTime
                                    && 
                                    <DateTimePicker 
                                        value={this.state.time}
                                        mode={this.state.mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={ (event, date) => this.setDate(event, date)}
                                        minimumDate={new Date()} />
                                }
                            </View>
                        </View>


                        <View
                            style={{
                                flexDirection: 'column',
                                marginTop: 10
                            }}>
                            <Text>Reminder Will Be At: (12 Hours before task due date)</Text>
                            <View
                                style={{
                                    width: "100%",
                                    height: 50,
                                    flexDirection: 'row',
                                    borderWidth: 2,
                                    borderRadius: 10,
                                    borderColor: '#E6E6E7',
                                    marginTop: 10,
                                    alignItems: 'center',
                                    paddingLeft: 10
                                }}>
                                <Text style={{ fontFamily: 'PTSansRegular' }}>{moment(this.state.reminderDate).format("MMMM D, YYYY LT")}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                width: "100%",
                                height: 50,
                                flexDirection: 'row',
                                borderRadius: 10,
                                marginTop: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Color.baseColor
                            }}
                            onPress={() => this.onSubmit()}>
                            <Text
                                style={{
                                    fontFamily: 'PTSansRegular',
                                    color: 'white',
                                    fontSize: 22
                                }}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}