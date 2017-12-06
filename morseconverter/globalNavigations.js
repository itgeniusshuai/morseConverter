import React,{Component} from 'react';  
import {Image} from 'react-native';  
import {TabNavigator,TabBarBottom} from 'react-navigation';  
import MorseConverter from './morseConverter';
import Remember from './remember';


const Tab = TabNavigator(  
    {
      Converter:{  
        screen:MorseConverter,  
      },  
    
      Remember:{  
        screen:Remember,  
      },  
    },  
    
      {  
        tabBarComponent:TabBarBottom,  
        tabBarPosition:'bottom',  
        swipeEnabled:false,  
        animationEnabled:false,  
        lazy:true,  
        tabBarOptions:{  
          activeTintColor:'#06c1ae',  
          inactiveTintColor:'#979797',  
        //   showLabel:false,`
          style:{backgroundColor:'#ffffff',},  
        }  
          
      }  
    
    );  

class TabBarItem extends Component {  

    render() {  
        return(  
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }  
                style={ { tintColor:this.props.tintColor,width:25,height:25 } }  
            />  
        )  
    }  
    
}  

export default Tab;