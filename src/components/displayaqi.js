import React, {Component} from 'react';
import { Text, View } from 'react-native';
class DisplayAQI extends Component {

	render() {
    	return (
        <View
        style={{
          flex:1,
          flexDirection: 'column',
          paddingTop: 50,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor:'gray',
        }}>
        <View style={{flex: 0.1, backgroundColor:'lightblue'}}>
          <Text style={{fontSize:30}}>Definition AQI</Text>
        </View>
        <View style={{flex: 0.25, backgroundColor:'yellow'}}>
          
        </View>
        <View style={{flex: 0.6, top:20, backgroundColor:'pink'}}>
        </View>

      </View>
    	);
    }
}

export default DisplayAQI;