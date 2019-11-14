/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/ui/components/DrawerList.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Thursday, November 14th 2019, 3:45:28 pm
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */
import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    TouchableNativeFeedback 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { Color, styles } from '../index'

export default class DrawerList extends Component{

    constructor(props){
        super(props)
    }

    render(){

        const {
            item,
            onPressMenu
        } = this.props

        return(
            <View
                style={{
                    flex: 1,
                    height: 50,
                }}>
                <TouchableNativeFeedback
                    onPress={onPressMenu}>
                    <Grid>
                        <Row
                            style={{
                                height: StyleSheet.hairlineWidth,
                                backgroundColor: '#DFDFDF'
                            }}>
                        </Row>
                        <Row
                            style={{
                                padding: 10
                            }}>
                            <Grid>
                                <Col
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 35,
                                    }}>
                                    <Icon 
                                        name={item.icon}
                                        style={{
                                            color: '#6B717B'
                                        }}
                                        size={24}
                                    />
                                </Col>
                                <Col
                                    style={{
                                        justifyContent: 'center'
                                    }}>
                                    <Text 
                                        style={{ 
                                            fontFamily: 'PTSansRegular',
                                            color: "#3F454B",
                                            marginLeft: 20
                                        }}>
                                        {item.title}
                                    </Text>   
                                </Col>
                            </Grid>
                        </Row>
                        <Row
                            style={{
                                height: StyleSheet.hairlineWidth,
                                backgroundColor: '#DFDFDF'
                            }}>
                        </Row>
                    </Grid>
                </TouchableNativeFeedback>
            </View>
        )
    }
}