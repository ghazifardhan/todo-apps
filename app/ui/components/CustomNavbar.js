/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/ui/components/CustomNavbar.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Thursday, November 14th 2019, 4:10:02 pm
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */
import React, { Component } from 'react'
import {
    View, 
    Text,
    TouchableOpacity,
    Dimensions,
    AppState
} from 'react-native'
import { Color, styles } from '../index'
import { Grid, Col } from 'react-native-easy-grid'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons'

export default class CustomNavbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            index: 0,
            routes: [
                { key: 0, title: 'Todo' },
                { key: 1, title: 'Done' },
            ],
            headerBgColor: Color.baseColor,
            menuColor: Color.white,
            iconMenu: "md-menu",
            appState: AppState.currentState
        }
    }

    headerMenuButton(){
        Actions.drawerOpen()
    }

    render() {
        return(
            <View
                style={[styles.navbarContainer, {
                    width: Dimensions.get('screen').width,
                    backgroundColor: Color.baseColor
                }]}>
                <Grid>
                    <Col
                        style={styles.burgerMenuContainer}>
                        <TouchableOpacity
                        onPress={() => this.headerMenuButton()}>
                            <Icon name={this.state.iconMenu} size={26} style={{ color: this.state.menuColor}} />
                        </TouchableOpacity>
                    </Col>
                    <Col
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',                                   
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: Color.white,
                                fontWeight: 'bold',
                            }}>
                            Todo
                        </Text>
                    </Col>                  
                    <Col
                        style={styles.burgerMenuContainer}>
                    </Col>
                </Grid>
            </View>
        )
    }
}