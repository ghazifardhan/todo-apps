/*
 * Filename: /Users/ghazifadil/Documents/web_app/todo/app/ui/Color.js
 * Path: /Users/ghazifadil/Documents/web_app/todo
 * Created Date: Wednesday, November 13th 2019, 10:36:37 am
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */

class Color {
    
    constructor(){

        this.baseColor = '#1976D2'
        this.primaryColor = '#ee3820'
        this.overlayColor = '#c6c6c6'
        this.drawerColor = '#ffffff'
        this.loginBox = 'rgba(229, 229, 229, 0.3)'
        this.buttonFacebook = '#43619c'
        this.buttonTwiter = '#1cb1e6'
        this.primaryColorOverlay = 'rgba(238, 56, 32, 0.3)'
        this.regFontColor = '#bdbdbd'
        this.whiteTwo = '#f7f6f6'
        this.darkishGreenOverlay = 'rgba(57, 148, 42, 0.8)'
        this.darkishGreen = '#39942a'
        this.warmGrey = '#8e8b8b'
        this.red = 'red'
        this.white = 'white'

        this.priorityHigh = "#f8d7da"
        this.priorityMed = "#ffd700"
        this.priorityLow = "#20b2aa"

    } 

    getIconColor(fileType){
        var color;

        switch(fileType){
            case 'pdf':
                color = this.pdfColor
                break;
            case 'doc':
                color = this.docColor
                break;
            case 'docx':
                color = this.docColor
                break;
            case 'odt':
                color = this.docColor
                break;
            case 'ppt':
                color = this.pptColor
                break;
            case 'pptx':
                color = this.pptColor
                break;
            case 'xlsx':
                color = this.excelColor
                break;
            case 'xls':
                color = this.excelColor
                break;
            default:
        }

        return color;
    }

    getIcon(fileType){
        var icon;
        
        switch(fileType){
            case 'pdf':
            icon = "file-pdf-box"
                break;
            case 'doc':
            icon = "file-word-box"
                break;
            case 'docx':
            icon = "file-word-box"
                break;
            case 'odt':
            icon = "file-word-box"
                break;
            case 'ppt':
            icon = "file-powerpoint-box"
                break;
            case 'pptx':
            icon = "file-powerpoint-box"
                break;
            case 'xlsx':
            icon = "file-excel-box"
                break;
            case 'xls':
            icon = "file-excel-box"
                break;
            default:
        }

        return icon;
    }

}

export default new Color()