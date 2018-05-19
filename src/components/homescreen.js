import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class HomeScreen extends React.Component {
  render() {
  	console.log(this.props.navigation)
  	const {navigate} =this.props.navigation
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top:50 }}>
      <Text style={{fontSize:30}}>Personal AQI</Text>
      <Button title='PM2.5' onPress={() => navigate('Measure',{test:"asdsd"})} />
      <Button title='PM10' />
      </View>
    );
  }
}
export default HomeScreen;