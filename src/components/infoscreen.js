import React, {Component} from 'react';
import { Text, View } from 'react-native';
import TableAQI from './tableaqi';
class InfoScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex:1,
          flexDirection: 'column',
          paddingTop: 50,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <View style={{flex: 0.1}}>
          <Text style={{fontSize:30}}>Definition AQI</Text>
        </View>
        <View style={{flex: 0.25}}>
          <Text style={{fontSize:15}}>      An air quality index (AQI) is a number used by government agencies 
          to communicate to the public how polluted the air currently is or how polluted it is forecast to become. 
          As the AQI increases, an increasingly large percentage of the population is likely to experience increasingly 
          severe adverse health effects.</Text>
        </View>
        <View style={{flex: 0.6}}>
          <TableAQI/>
        </View>

      </View>
    );
  }
}
export default InfoScreen;