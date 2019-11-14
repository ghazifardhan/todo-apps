/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/pages/Home.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Wednesday, November 13th 2019, 10:26:12 am
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */
import React, { Component } from 'react'
import {
    View, 
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    AppState
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase'
import { Color, styles } from '../ui'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons'
import { TabView, TabBar } from 'react-native-tab-view';
import Todo from './Todo'
import Done from './Done'
import { CustomNavbar } from '../ui/components'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            index: 0,
            routes: [
                { key: 0, title: 'Todo' },
                { key: 1, title: 'Done' },
            ],
            headerBgColor: Color.baseColor,
            iconSearchColor: Color.white,
            menuColor: Color.white,
            iconMenu: "md-menu",
            appState: AppState.currentState
        }
    }

    componentDidMount() {
        this.getTokenId()
        // Create notification channel required for Android devices
        this.createNotificationChannel();

        // Ask notification permission and add notification listener
        this.checkPermission();

        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }
        this.setState({appState: nextAppState}, () => { console.log( this.state.appState )});
      };

    async getTokenId() {
        let fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            await AsyncStorage.setItem('fcmToken', fcmToken);
            console.log(fcmToken)
        }
    }

    createNotificationChannel = () => {
        // Build a android notification channel
        const channel = new firebase.notifications.Android.Channel(
          'reminder',
          'Reminders Channel',
          firebase.notifications.Android.Importance.High
        ).setDescription('Used for getting reminder notification');

        console.log("channel", channel)
    
        // Create the android notification channel
        firebase.notifications().android.createChannel(channel);
    };
    
    checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
          this.notificationListener = firebase.notifications().onNotification(async notification => {
            // Display your notification
            await firebase.notifications().displayNotification(notification);
          });
        } else {
          // user doesn't have permission
          try {
            await firebase.messaging().requestPermission();
          } catch (error) {
            Alert.alert(
              'Unable to access the Notification permission. Please enable the Notification Permission from the settings'
            );
          }
        }
    };

    renderScene = ({ route }) => {
        switch (route.key) {
            case 0:
                return <Todo/>;
            case 1:
                return <Done/>;
            default:
                return <Todo/>;
        }
    };

    renderHeader = props => <TabBar 
                                {...props} 
                                style={{ backgroundColor: Color.baseColor, color: Color.primaryColor }} 
                                indicatorStyle={{ backgroundColor: Color.drawerColor }}
                                contentContainerStyle={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                activeColor={Color.drawerColor}
                                inactiveColor={Color.drawerColor}
                                scrollEnabled={false}/>

    headerMenuButton(){
        Actions.drawerOpen()
    }

    render() {
        return(
            <View style={styles.homeContainer}>
                {/* Custom Navbar */}
                <CustomNavbar/>
                {/* End Of Custom Navbar */}

                {/* Content */}
                <View
                    style={{
                        flex: 1
                    }}>
                    <TabView
                        navigationState={this.state}
                        renderScene={this.renderScene}
                        onIndexChange={index => this.setState({ index })}
                        renderTabBar={this.renderHeader}
                        initialLayout={{ width: Dimensions.get('window').width }}
                        swipeEnabled={true}
                        removeClippedSubviews={true}
                    />
                </View>
                {/* End Of Content */}

                {/* Floating Action Button */}
                {
                    this.state.index == 0
                    &&
                    <TouchableOpacity
                        style={styles.floatingActionButton}
                        onPress={() => {
                            Actions.formTodoList({ action: "create" })
                        }}>
                        <Icon
                            name="ios-add"
                            size={42}
                            color={"#FFFFFF"}
                        />
                    </TouchableOpacity>
                }
                {/* End Of Floating Action Button */}
            </View>
        )
    }

}