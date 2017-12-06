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
  ToastAndroid,
  Image
} from 'react-native';
const {width,height} = Dimensions.get('window')


class  Remember extends Component{
  static navigationOptions = {
    // tabBarLabel: 'UserScreen',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./pic/remember.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render(){
    return (
      <View>
        <Image source={require('./pic/morse_remember.jpg')} style={styles.image} resizeMode={'contain'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  image:{
    width:width,
    height:height - 26,
  }
});

export default Remember;