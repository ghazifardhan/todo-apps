/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/App.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Wednesday, November 13th 2019, 10:18:46 am
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */

import React, { Component } from 'react'
import {
    StyleSheet,
    DrawerLayoutAndroid,
    StatusBar,
    View
} from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import { Color, styles } from './ui'
import Home from './pages/Home'
import Drawer from './pages/Drawer'
import TodoListForm from './pages/TodoListForm'

export default class App extends Component {

    render() {
        return(
            <View
                style={{
                    flex: 1
                }}>
                <StatusBar
                    backgroundColor={Color.baseColor}
                    barStyle="light-content"
                />
                <Router
                    navigationBarStyle={styles.navBar} 
                    titleStyle={styles.navTitle}>
                    <Scene key="root">
                        <Scene 
                            key='drawer' 
                            drawer 
                            contentComponent={Drawer} 
                            initial={true} 
                            hideNavBar={true} 
                            open={false}
                            drawerPosition={DrawerLayoutAndroid.positions.left}>

                            <Scene 
                                key="home"
                                component={Home}
                                hideNavBar={true}
                                title="Home"                
                                navBarButtonColor={'white'}
                            />
                        </Scene>

                        <Scene 
                            key="formTodoList"
                            component={TodoListForm}
                            hideNavBar={false}
                            title="Todo"                
                            navBarButtonColor={'white'}
                        />
                    </Scene>
                </Router>
            </View>
        )
    }
}