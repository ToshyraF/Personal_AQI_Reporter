import React from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import {  StyleSheet, Text, View,YellowBox, Image } from 'react-native';
class Logo extends React.Component { 
  render() {
    return (
      <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
         
         <Image
		          style={{width: 150, height: 150}}
				  source={require('./cells.png')}		        
				  />
		<Text style={{fontWeight: 'bold', fontSize:30, paddingTop:20}}>Personal AQI Reporter</Text>
      </View>
    );
  }

}

export default Logo;