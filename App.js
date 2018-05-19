// import React from 'react';
// import { StyleSheet, Text, View ,YellowBox } from 'react-native';
// import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
// import  MXHeader  from './src/components/header';
// import  FooterTabs  from './src/components/footer';
// import { Col, Row, Grid } from 'react-native-easy-grid';
// import Expo from "expo";
// import * as firebase from 'firebase';
// import ApiKey from './src/components/configFirebase'
// import _ from 'lodash';

// //fix warning set timer for andriod
// YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = message => {
//   if (message.indexOf('Setting a timer') <= -1) {
//     _console.warn(message);
//   }
// };

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { loading: true };
//     // firebase.initializeApp(ApiKey.config);
//   }

//   //fix load Roboto_medium for andriod
//   async componentWillMount() {
//     await Expo.Font.loadAsync({
//       Roboto: require("native-base/Fonts/Roboto.ttf"),
//       Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//       Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
//     });
//     this.setState({ loading: false });
//   }
  
//   render() {
//   	 if (this.state.loading) {
//       return <Expo.AppLoading />;
//     }
//     return (
//     <Container >
    
//         <FooterTabs  />

//     </Container>
//     );
//   }
// }

import React from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import {  StyleSheet, Text, View,YellowBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { TabNavigator, TabBarBottom,StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import _ from 'lodash';

import HomeScreen from './src/contrianer/HomeScreen'
import MeasureScreen from './src/contrianer/MeasureScreen'
import MapScreen from './src/contrianer/MapScreen'
import InfoScreen from './src/contrianer/InfoScreen'

const Profile = TabNavigator(
  {
    Home: { screen: HomeScreen },
    Measure: { screen: MeasureScreen },
    MyAir: { screen: MapScreen },
    Info: { screen: InfoScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Measure') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if (routeName === 'MyAir') {
          iconName = `ios-flag${focused ? '' : '-outline'}`;
        } else if (routeName === 'Info') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color="#3399ff"/>;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#3399ff',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

const stackNav = StackNavigator({
    Login: {
        screen: HomeScreen,
        navigationOptions:({navigation}) => ({
            header:null
        })
    },
    Profile: {
        screen: Profile,
        navigationOptions: (props) => ({
            header:null
        })
    }
})

export default stackNav;