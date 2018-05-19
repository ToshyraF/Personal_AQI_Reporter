import React, {Component} from 'react';
import {View, Text, Body} from 'react-native';
import Icon from 'react-native-vector-icons';
import { Button } from 'react-native-elements';
class Choose extends Component {

	render() {
    	return (
        <View>
        <Text style={{fontSize:30}}>Personal AQI</Text>
            <Button
              style= {styles.buttonPM}
              title='PM2.5'
            />
            <Button
              style= {styles.buttonPM}
              title='PM10'
            />
        </View>
    	);
    }
}

export default Choose;

const styles ={
  buttonPM :{
    backgroundColor: '#4db8ff',
    borderRadius:10,
    margin:10,
    top:10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4
    }
}