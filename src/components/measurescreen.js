import React from 'react';
import { Text, View } from 'react-native';
import DisplayAQI from './displayaqi';
import AnimatedSemiCircularGauge from 'react-native-semi-circular-gauge';

class MeasureScreen extends React.Component {
  render() {
  	console.log(this.props.navigation)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>asdasdasdasd</Text>
        <AnimatedSemiCircularGauge
            chartWidth={100}
    		strokeWidth={10}
    		fill={20}
    		prefill={-50}/>
      </View>
    );
  }
}
export default MeasureScreen;