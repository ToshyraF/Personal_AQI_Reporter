import React from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import {  StyleSheet, Text, View,YellowBox } from 'react-native';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import firebase from './configFirebase';
class AQIGauge extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      AQI: {
        value:0
      },
     
    };
     this.user =  firebase.auth().currentUser;
    //this.deviceRef = firebase.database().ref().child('Device');
    this.aqiRef = firebase.database().ref().child('User').child(this.user.displayName).child('DeviceID').child('AQI').orderByKey().limitToLast(1);
  }
   changeGauge = async (aqi) => {
        this._getAQI(this.aqiRef);
        //console.log(this.state.AQI.value);
  }
  componentDidMount() {
    this.changeGauge();
}
 _getAQI = (aqiRef) => {
    aqiRef.on('value', (snap) => {
      var AQI = [];
      snap.forEach((child) => {
        AQI.push({
          value: child.val().value,
          timestamp: child.val().timestamp,
          _key: child.key
        });
      });
      // console.log(AQI[0]);
      this.setState({
         AQI:AQI[0]
      });
      //console.log(this.state.AQI);
    });
  }
   gaugeColor = (aqi) => {
    if(aqi > 300){
      return "#990033"
    }
    else if(aqi > 200){
      return "#cc00cc"
    }
    else if(aqi > 150){
      return "#ff471a"
    }
    else if(aqi > 100){
      return "#ff9933"
    }
    else if(aqi > 50){
      return "#ffff1a"
    }
    else{
      return "#00ff00"
    }
 }  
  render() {
	const volumn = (((this.state.AQI.value)*100)/500);
	const size = 180;
	const width = 15;
	const cropDegree = 90;
	const textOffset = width;
	const textWidth = size - (textOffset*2);
	const textHeight = size*(1.25 - cropDegree/360) - (textOffset*2);
	const styles = {
		textView: {
	    position: 'absolute',
	    top: textOffset,
	    left: textOffset,
	    width: textWidth,
	    height: textHeight,
	    alignItems: 'center',
	    justifyContent: 'center',
	  },
	  text: {
	    fontSize: 20,
	  },
	}
    return (
      <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
        <AnimatedGaugeProgress
          size={size}
          width={width}
          fill={volumn}
          rotation={90}
          cropDegree={cropDegree}
          tintColor= {this.gaugeColor(this.state.AQI.value)}
          backgroundColor="#e6e6e6"
          stroke={[2, 2]} //For a equaly dashed line
          strokeCap="circle" >

          <View style={styles.textView}>
            <Text style={styles.text}>AQI</Text>
            <Text style={styles.text}>{this.state.AQI.value}</Text>
          </View>
        </AnimatedGaugeProgress>
      </View>
    );
  }

}

export default AQIGauge;