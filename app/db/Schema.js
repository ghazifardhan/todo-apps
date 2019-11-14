/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/db/Schema.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Wednesday, November 13th 2019, 12:57:03 pm
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */

import Realm from 'realm'

export const TODO_SCHEMA = 'Todo'

export const TodoSchema = {
    name: TODO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: { type: 'string', indexed: true },
        priority: 'string',
        status: { type: 'bool', default: false },
        creationDate: 'date',
        dueDate: 'date',
        reminderDate: 'date',
        notificationId: 'string'
    }
}

const databaseOptions = {
    path: 'todoApps.realm',
    schema: [TodoSchema],
    schemaVersion: 0, //optional
}

export const insertNewTodoList = newTodoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODO_SCHEMA, newTodoList)
            resolve(newTodoList)
        })
    }).catch((error) => reject(error))
})

export const updateTodoList = todoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingTodoList = realm.create(TODO_SCHEMA, 
                {
                    id: todoList.id,
                    name: todoList.name,
                    priority: todoList.priority,
                    status: todoList.status,
                    dueDate: todoList.dueDate,
                    reminderDate: todoList.reminderDate,
                }, true)
            resolve(updatingTodoList)
        })
    }).catch((error) => reject(error))
})

export const deleteTodoList = todo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingTodoList = realm.objectForPrimaryKey(TODO_SCHEMA, todo.id)
            realm.delete(deletingTodoList)
            resolve()
        })
    }).catch((error) => reject(error))
})

export const getSingleTodo = (todoListId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let todo = realm.objectForPrimaryKey(TODO_SCHEMA, todoListId)
            resolve(todo)
        })
    }).catch((error) => reject(error))
})

export const queryAllTodoList = (status) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTodoList = realm.objects(TODO_SCHEMA)
            let query = null
            if (status) {
                query = allTodoList.filtered('status = true SORT(creationDate DESC)')    
            } else {
                query = allTodoList.filtered('status = false SORT(creationDate DESC)')
            }
            resolve(query)
        })
    }).catch((error) => reject(error))
})

export const searchTodo = (query) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTodoList = realm.objects(TODO_SCHEMA)
            query = allTodoList.filtered(`name CONTAINER ${query} SORT(creationDate DESC)`)
            resolve(query)
        })
    }).catch((error) => reject(error))
})


export default new Realm(databaseOptions)