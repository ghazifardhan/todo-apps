/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/ui/components/TodoItem.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Wednesday, November 13th 2019, 6:25:39 pm
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'
import CardView from 'react-native-cardview'
import { Color, styles } from '../'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { ListItem } from './index'

export default class TodoItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const {
            name,
            priority,
            dueDate,
            reminderDate
        } = this.props.todoItem

        var priorityColor = Color.priorityHigh
        if (priority == "High") {
            priorityColor = Color.priorityHigh
        } else if (priority == "Medium") {
            priorityColor = Color.priorityMed
        } else if (priority == "Low") {
            priorityColor = Color.priorityLow
        }

        return(
            <CardView
                style={styles.cardContainer}
                cardElevation={5}
                cardMaxElevation={10}
                cornerRadius={5}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'column'
                    }}
                    onPress={() => Actions.formTodoList({ todo: this.props.todoItem, action: 'edit' })}>
                    <Text
                        style={styles.cardTitleName}>
                        {name}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10
                        }}>
                        <Image 
                            source={require('../assets/profile.jpg')} 
                            style={styles.cardImageProfile}
                        />
                        <Text
                            style={{
                                fontFamily: "PTSansRegular",
                                marginLeft: 10
                            }}>
                            Jhon Doe
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: priorityColor,
                                padding: 5,
                                borderRadius: 5
                            }}>
                            <Text
                                style={{
                                    fontFamily: "PTSansRegular",
                                    marginRight: 10,
                                    fontSize: 12
                                }}>
                                {priority}
                            </Text>
                            {
                                priority == "High"
                                &&
                                <Icon
                                    name="ios-flame"
                                    size={16}
                                    color={"orange"}
                                />
                            }
                        </View>
                    </View> 
                    <ListItem
                        icon="ios-calendar"
                        value={moment(dueDate).format('LLLL')}
                    />
                    <ListItem
                        icon="ios-notifications"
                        value={moment(reminderDate).format('LLLL')}
                    />
                </TouchableOpacity>
            </CardView>
        )
    }
}