/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/pages/Drawer.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Wednesday, November 13th 2019, 10:39:30 am
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */
import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    FlatList,
    Image, 
    ScrollView,
    TouchableNativeFeedback 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { Color, styles } from '../ui'
import { DrawerList } from '../ui/components'

export default class Drawer extends Component{

    constructor(props){
        super(props)

        this.state ={
            list: []
        }
    }

    componentDidMount(){
        this.getTabs()
    }

    getTabs(){
        const list = [
            {
                title: 'Home',
                icon: 'ios-home',
                key: 'home'
            }
        ]

        this.setState({
            list: list
        })
    }

    menuItem(menu){
        switch(menu){
            case 'home':
                Actions.home()
                break;
            default:
                break;
        }
    }

    render(){
        return(
            <View style={{ flex: 1, backgroundColor: Color.drawerColor }}>
                {/* Profile */}
                <View
                    style={styles.drawerContainer}>
                    <View 
                        style={styles.drawerProfileImageContainer}>
                        <Image 
                            source={require('../ui/assets/profile.jpg')} 
                            style={styles.drawerImageProfile}
                        />
                    </View>
                    <Text 
                        style={styles.drawerProfileName}>
                        John Doe
                    </Text>
                    <Text 
                        style={styles.drawerEmail}>
                        johndoe@gmail.com
                    </Text>                   
                </View>

                {/* Actions */}
                <FlatList
                    data={this.state.list}
                    keyExtractor={(x,i) => i.toString()}
                    renderItem={({item}) => (
                        <DrawerList
                            item={item}
                            onPressMenu={() => this.menuItem(item.key)}
                        />
                    )}
                />
            </View>
        )
    }
}