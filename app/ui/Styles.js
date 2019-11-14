/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/ui/Styles.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Thursday, November 14th 2019, 3:36:05 pm
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */
import {
    StyleSheet
} from 'react-native'
import Color from './Color'

export const styles = StyleSheet.create({

    navBar: {
        backgroundColor: Color.baseColor, // changing navbar color
    },

    navTitle: {
        color: Color.white, // changing navbar title color
    },

    navbarContainer: {
        height: 55,
        shadowColor: Color.drawerColor,
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
    },

    burgerMenuContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 55
    },

    cardContainer: {
        backgroundColor: Color.drawerColor,
        flexDirection: 'column',
        marginTop: 7.5,
        marginBottom: 15,
        padding: 10,
        width: "100%"
    },

    cardTitleName: {
        fontFamily: "PTSansRegular",
        fontWeight: "bold",
        fontSize: 18
    },

    cardImageProfile: {
        resizeMode: "cover",
        height: 20,
        width: 20,
        borderRadius: 100,
    },

    cardDateFont: {
        fontFamily: "PTSansRegular",
        marginLeft: 10,
        fontSize: 12
    },
    
    drawerProfileName: {
        fontFamily: 'PTSansRegular',
        color: "black",
        fontSize: 24
    },

    drawerEmail: {
        fontFamily: 'PTSansRegular',
        color: "#aaa9a9",
    },

    drawerProfileImageContainer: {
        height: 100,
        width: 100,
        borderRadius: 100,
        backgroundColor: 'ghostwhite'
    },

    drawerImageProfile: {
        resizeMode: "cover",
        height: 100,
        width: 100,
        borderRadius: 100,
    },

    drawerContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10
    },

    floatingActionButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        borderRadius: 100,
        backgroundColor: Color.baseColor,
        elevation: 3  
    },

    homeContainer: {
       flex: 1,
       backgroundColor: 'white' 
    }

})