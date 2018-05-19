import React from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import {  StyleSheet, Text, View,YellowBox } from 'react-native';
import DeviceID from '../components/deviceid'
import AQIGauge from '../components/aqigauge'
import Suggestion from '../components/suggestion'

import firebase from "../components/configFirebase";

import stylesModal from "../components/app.style";
import Modal from "react-native-modal";

class MeasureScreen extends React.Component {
	constructor(props) {
      super(props)

      this.state = ({
        visibleModal: null,
        DeviceID:null,
        Username:null
      })
      let user =  firebase.auth().currentUser;
      this.DeviceRef = firebase.database().ref().child('User').child(user.displayName).child('DeviceID');
    }
  setDeviceID(value){
    let user =  firebase.auth().currentUser;
    if(value != null){
      this.DeviceRef.set({Name:value});
      this.setState({ visibleModal: null,Username:user.displayName })
    }
  }
  _renderModalContent = () => (
    <View style={stylesModal.modalContent}>
            <Label>DeviceID</Label>
              <Item  floatingLabel>
                <Label>DeviceID</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  // value={(this.state.sign == null) ? "":this.state.sign[el.Label]}
                  onChangeText={(value) => this.setState({ DeviceID:value })}
                />
              </Item>
             <Button style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() => this.setDeviceID(this.state.DeviceID) }
            >
              <Text style={{ color: 'white' }}> Save</Text>
            </Button>
    </View>
  );

  componentDidMount =  () => {
    let user =  firebase.auth().currentUser;
    this.DeviceRef.on('value', (snap) => {
      // console.log(snap.val().Name)
      if(snap.val().Name == 'undefinde'){
        this.setState({
          visibleModal: 2,
        })
      }else{
        this.setState({Username:user.displayName,DeviceID:snap.val().Name })
      }
    });
  }

  render() {
    return (
      <Container>
      <Modal
              isVisible={this.state.visibleModal === 2}
              animationIn="slideInLeft"
              animationOut="slideOutRight"
            >
              {this._renderModalContent()}
      </Modal>
      <DeviceID Username={this.state.Username} DeviceID={this.state.DeviceID} />
      <AQIGauge/>
      <Suggestion/>
      </Container>
    );
  }
}

export default MeasureScreen;