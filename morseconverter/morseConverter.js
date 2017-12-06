import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Clipboard,
  Image,
  ToastAndroid,
} from 'react-native';
const {width,height} = Dimensions.get('window')

class MorseConverter extends Component{
    static navigationOptions = {
        // tabBarLabel: 'UserScreen',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./pic/converter.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      };
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
                <Text style={{fontSize:18}}>摩斯电码转换器</Text>
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
                        numberOfLines ={12}
                        keyboardType = {this.state.toMorse?'email-address':'numeric'}
                        underlineColorAndroid = 'transparent'
                        value={this.state.sourceStr}></TextInput>
                    <Text>to</Text>


                    <TextInput 
                        underlineColorAndroid = 'transparent'
                        selectTextOnFocus={true} multiline={true} editable={false} style={styles.input} value={this.state.morseStr}></TextInput>
                </View>
                <View style={styles.bottomBtn}>
                    <TouchableOpacity style={styles.btn} onPress={()=>{
                        this.setState({
                            sourceStr :'',
                            morseStr : ''
                        })
                    }}>
                        <Text style={{fontSize:15}}>清空</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={()=>{
                        if(this.state.morseStr == ''){
                            try {
                                ToastAndroid.show('内容为空，不复制！',ToastAndroid.SHORT);
                              } catch (e) {
                                ToastAndroid.show(e.message,ToastAndroid.SHORT);
                            }
                            return
                        }
                        Clipboard.setString(this.state.morseStr);
                        try {
                          ToastAndroid.show('转换后的内容已复制到粘贴板！',ToastAndroid.SHORT);
                        } catch (e) {
                          ToastAndroid.show(e.message,ToastAndroid.SHORT);
                        }
                    }}>
                        <Text style={{fontSize:15}}>复制</Text>
                    </TouchableOpacity>
                </View>
               
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
        paddingTop : 30,
        width : width
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
        // flex : 8
    },
    input : {
        height : 150,
        borderWidth : 1,
        width : width - 20,
        paddingLeft : 5,
        paddingBottom : 0,
        textAlignVertical : 'top'

    },
    bottomBtn:{
        marginTop:5,
        flexDirection : 'row',
        justifyContent : 'flex-end',
        alignItems : 'flex-start',
        width:width,
        paddingRight:5
        // backgroundColor:'blue'
    },
    btn:{
        marginLeft:15,
        marginRight:5,
        borderWidth:1,
        borderRadius:2
    },
    icon: {
        width: 26,
        height: 26,
    },
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