import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class MapScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Map!</Text>
        <Button
          title="Go to Home"
        />
      </View>
    );
  }
}
export default MapScreen;