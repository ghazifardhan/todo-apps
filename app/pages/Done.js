/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/pages/Done.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Wednesday, November 13th 2019, 11:39:55 am
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native'
import CardView from 'react-native-cardview'
import { Color } from '../ui'
import Icon from 'react-native-vector-icons/Ionicons'
import realm from '../db/Schema'
import { queryAllTodoList } from '../db/Schema'
import { TodoItem } from '../ui/components'

export default class Done extends Component {

    constructor(props) {
        super(props)

        this.state = {
            todoLists: []
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData(){
        queryAllTodoList(true).then((todoLists) => {
            
            this.setState({
                todoLists: todoLists
            })
            console.log(todoLists)

        }).catch((error) => {
            this.setState({
                todoLists: []
            })
            console.log(error)
        })
        console.log("Load Data")
    }

    render() {
        return(
            <View>
                {/* Name & Price */}
                <FlatList
                    contentContainerStyle={{
                        paddingLeft: 15,
                        paddingRight: 15
                    }}
                    keyExtractor={(x, y) => y.toString()}
                    data={this.state.todoLists}
                    renderItem={({item, index}) => 
                        <TodoItem
                            todoItem={item}
                        />
                    }
                />
                {/* End of Name & Price */}
            </View>
        )
    }
}