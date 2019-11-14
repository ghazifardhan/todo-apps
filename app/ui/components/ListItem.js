/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/ui/components/ListItem.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Thursday, November 14th 2019, 3:28:47 pm
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */
import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'
import { Color, styles } from '../'
import Icon from 'react-native-vector-icons/Ionicons'


export default class ListItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const {
            icon,
            value
        } = this.props

        return(
            <View
                style={{
                    flexDirection: 'row',
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 5
                    }}>
                    <Icon
                        name={icon}
                        size={16}
                        color={"orange"}
                    />
                    <Text
                        style={styles.cardDateFont}>
                        {value}
                    </Text>
                </View>
            </View>
        )
    }
}