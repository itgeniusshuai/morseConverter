import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
const {width,height} = Dimensions.get('window')

class MorseConverter extends Component{
    constructor(props){
        super(props)
        this.state = {
            toMorse : true,
            morseStr : '',
            sourceStr : ''
        }
    }

    render(){
        return (
            <View style={styles.contaner}>
                <Text style={{fontSize:18}}>摩丝电码转换器</Text>
                <View style={styles.title}>
                    <Text style={{textAlign:'center',lineHeight:20}}>{this.state.toMorse?'英文转换成摩斯电码':'摩斯电码转换成英文'}</Text>
                    <Switch value={this.state.toMorse} onValueChange={(value)=>{
                        this.setState({
                            toMorse:value
                        })
                    }}></Switch>
                </View>
                <View style={styles.content}>
                    <TextInput 
                        autoCapitalize={'none'}
                        multiline={true} 
                        placeholder={this.state.toMorse?'请输入英文':'请输入摩斯电码'} 
                        onChangeText={this.inputTextChange.bind(this)}
                        style={styles.input}
                        value={this.state.sourceStr}></TextInput>
                    <Text>to</Text>
                    <TextInput selectTextOnFocus={true} multiline={true} editable={false} style={[styles.input]} value={this.state.morseStr}></TextInput>
                </View>
                <TouchableOpacity onPress={()=>{
                    this.setState({
                        sourceStr :'',
                        morseStr : ''
                    })
                }}>
                    <Text>清空</Text>
                </TouchableOpacity>
            </View>
        );
    }
    inputTextChange(words){
        let result;
        if(this.state.toMorse){
            result = this.wordsToMorse(words)
        }else{
            result = this.morseToWords(words)
        }
            
        this.setState({
            morseStr : result,
            sourceStr : words
        })
    }

    wordsToMorse(words){
        words = words.replace(/\s+/,'')
        let wordArr = words.split('')
        let result = []
        for(let word in wordArr){
            result.push(db[wordArr[word].toUpperCase()])
        }
        return result.join(' ')
    }
    morseToWords(morses){
        let morseArr = morses.split(/[\s\/]+/)
        let result = []
        for(let word in morseArr){
            result.push(this.morseToWord(morseArr[word]))
        }
        return result.join('')
    }

    oneWordToMorse(word){
        return db[word]
    }
    morseToWord(morse){
        for( let k in db){
            if(db[k] == morse){
                return k
            }
        }
    }
}

const styles = StyleSheet.create({
    contaner : {
        flexDirection : 'column',
        alignItems : 'center' ,
        justifyContent : 'flex-start',
        height : height,
        paddingTop : 50
    },
    title : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        height : 40,
        width : width,
        paddingLeft : 10,
        paddingRight : 10,
        // borderWidth : 1
    },
    content : {
        flex : 8
    },
    input : {
        height : 200,
        borderWidth : 1,
        width : width - 20,

    }
});
const db = {
    A:'.-',
    B:'-...',
    C:'-.-.',
    D:'-..',
    E:'.',
    F:'..-.',
    G:'--.',
    H:'....',
    I:'..',
    J:'.---',
    K:'-.-',
    L:'.-..',
    M:'--',
    N:'-.',
    O:'---',
    P:'.--.',
    Q:'--.-',
    R:'.-.',
    S:'...',
    T:'-',
    U:'..-',
    V:'...-',
    W:'.--',
    X:'-..-',
    Y:'-.--',
    Z:'--..',
    '0':'-----',
    '1':'.----',
    '2':'..---',
    '3':'...--',
    '4':'....-',
    '5':'.....',
    '6':'-....',
    '7':'--...',
    '8':'---..',
    '9':'----.',
}
export default MorseConverter;