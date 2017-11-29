import {Image,Text,StyleSheet,View} from 'react-native';
import { TabNavigator } from "react-navigation";
import MyScreen from './MyScreen'
import HighScoreScreen from './HighScoreScreen'
import RealTimeScreen from './RealTimeScreen'
import ZeroAnswerSceen from './ZeroAnswerSceen'


const QuestionScreenNavigator = TabNavigator({
    RealTime: { screen:RealTimeScreen },
    ZeroAnswer: { screen:ZeroAnswerSceen },
    HighScore:{screen:HighScoreScreen},
    My:{screen:MyScreen}
  },{
    animationEnabled: true,
    tabBarPosition: 'top',
    lazy: false,
    swipeEnabled:true,
    backBehavior: 'none',
    tabBarOptions:{ 
      indicatorStyle: {
        height: 0,
        backgroundColor: 'white'
     },
      activeTintColor: '#008AC9',
      inactiveTintColor: '#999',
      style: {
        backgroundColor: 'white',
        borderBottomColor:'black',
       },
      tabStyle:{
        backgroundColor: 'white',        
      },
      labelStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 0,
        paddingTop: 0,
        color:'#2c2c2c',
    }
  }
});

export default QuestionScreenNavigator;