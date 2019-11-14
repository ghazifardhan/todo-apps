/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/pages/Todo.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Wednesday, November 13th 2019, 11:38:40 am
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */
import React, { Component } from 'react'
import {
    View,
    FlatList
} from 'react-native'
import { queryAllTodoList, insertNewTodoList, updateTodoList, deleteTodoList, getSingleTodo } from '../db/Schema'
import { TodoItem } from '../ui/components'

export default class Todo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            todoLists: []
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        queryAllTodoList(false).then((todoLists) => {
            if (todoLists.isValid()) {
                this.setState({
                    todoLists: todoLists
                })
            } else {
                this.setState({
                    todoLists: []
                })
            }
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