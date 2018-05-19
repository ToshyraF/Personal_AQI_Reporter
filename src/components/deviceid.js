import React from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import {  StyleSheet, Text, View,YellowBox } from 'react-native';
class DeviceID extends React.Component {
  constructor(props) {
      super(props)
      // console.log(props)
      this.state = ({
        visibleModal: null,
        Username:props.Username,
        error:true
        // DeviceID:props.DeviceID,
      })

   }
   componentWillUpdate(nextProps, nextState){
    
    if(nextProps.Username != null && this.state.error == true){
      console.log(nextProps)
       this.setState({
        Username:nextProps.Username,
        DeviceID:nextProps.DeviceID,
        error:false
      })
    } 
  }
  render() {
  	var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hour = new Date().getHours();
    var min = new Date().getMinutes();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    user = this.state.Username
    device = this.state.DeviceID
    var datetime = date + ' ' + monthNames[month] + ' ' + year + '  ' + hour + ':' + min;
    return (
      <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', paddingTop:10}}>
        <Text style={{fontWeight: 'bold'}}>User: {user}  DeviceID: {device}</Text>
        <Text style={{color:'#737373'}}>{datetime}</Text>
      </View>
    );
  }
}
export default DeviceID;