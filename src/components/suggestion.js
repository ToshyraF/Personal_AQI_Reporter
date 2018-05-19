import React from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import {  StyleSheet, Text, View,YellowBox, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import firebase from './configFirebase';

class Suggestion extends React.Component {
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
   updatePreventive = async (aqi) => {
        this._getAQI(this.aqiRef);
        //console.log(this.state.AQI.value);
  }
  componentDidMount() {
    this.updatePreventive();
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
      this.setState({
         AQI:AQI[0]
      });
    });
  }
  PreventiveGeneral = (aqi) => {
    if(aqi > 300){
      return "The general public, should avoid exercising outside the building."
    }
    else if(aqi > 200){
      return "The general public, especially children and the elderly. Should limit exercise outside the building."
    }
    else if(aqi > 150){
      return "The general public, especially children and the elderly. Should not do outdoor activities for a long time."
    }
    else if(aqi > 100){
      return "No impact on health."
    }
    else if(aqi > 50){
      return "No impact on health."
    }
    else{
      return "No impact on health."
    }
 }
 PreventiveRiskGroup = (aqi) => {
    if(aqi > 300){
      return "People with respiratory or heart disease, the elderly, and children should remain indoors."
    }
    else if(aqi > 200){
      return "People with respiratory or heart disease, the elderly, and children should avoid any outdoor activity."
    }
    else if(aqi > 150){
      return "People with respiratory or heart disease, the elderly, and children should avoid prolonged exertion."
    }
    else if(aqi > 100){
      return "People with respiratory or heart disease, the elderly, and children should limit prolonged exertion."
    }
    else if(aqi > 50){
      return "No impact on health."
    }
    else{
      return "No impact on health."
    }
 }
  render() {
    return (
      <View style={{ flex: 0.45, justifyContent: 'center',
      				 alignItems: 'center',
      				 flexDirection: 'column',
      				 paddingLeft: 20,
          			 paddingRight: 20,}}>

        <View style={{paddingBottom:20}}>
        <Image source={require('./line.png')}  style={{width: 300, height: 5}}/>
        </View>

        <Text style={{fontWeight: 'bold'}} >Preventive Measures</Text>

        <Grid>
    	<Col style={{justifyContent: 'center',  flex: 0.3}}>
        	<Row style={styles.icon}>
            	<Image
		          style={{width: 50, height: 50}}
				  source={require('./man.png')}		        
				  />
        	</Row>
        	<Row style={styles.icon}>
            	<Image
		          style={{width: 50, height: 50}}
				  source={require('./lungs.png')}		        
				  />
        	</Row>
    	</Col>
    	<Col style={{justifyContent: 'center',  flex: 0.7}}>
        	
        	<Row style={styles.typePoppulation}>
            	<Text style={{fontWeight: 'bold'}}>General Population</Text>
        	</Row>
        	<Row>
            	<Text style={styles.description} >{this.PreventiveGeneral(this.state.AQI.value)}</Text>
        	</Row>
        	
        	<Row style={styles.typePoppulation}>
        	   	<Text style={{fontWeight: 'bold'}}>At-risk individuals</Text>
        	</Row>
        	<Row>
            	<Text style={styles.description} >{this.PreventiveRiskGroup(this.state.AQI.value)}</Text>
        	</Row>

    	</Col>
	</Grid>
      </View>
    );
  }
}
const styles = {
	icon : {
		alignItems: 'center',
		justifyContent: 'center',
		//backgroundColor:'#00ff00'
	},
	typePoppulation :{
		alignItems: 'flex-end',
		paddingLeft:5,
		paddingBottom:5,
		flex:0.8,
		//backgroundColor:'#4da6ff'
	},
	description: {
		fontSize:12,
		paddingLeft:3,
		color: '#737373',
	}
}
export default Suggestion;