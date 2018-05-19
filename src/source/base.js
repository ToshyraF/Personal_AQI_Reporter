import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
class Base extends React.Component {
   constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      aqi:this.props.value
    };

  }
  render(){
    return (
      <View style={styles.base}>
        <View style={styles.baseBottom}>
          <Text >AQI: {this.state.aqi}</Text>
        </View> 
      </View>   
    )
  }
}
const styles = StyleSheet.create({
  base: {
    position:'absolute',
    top:'5%',
    left:'2%',
  },
  baseBottom: {
    backgroundColor: '#FFFFFF',
    opacity:0.7,
    height: 25,
    width: 100,
    alignItems: 'center',
  }

});
export default Base;