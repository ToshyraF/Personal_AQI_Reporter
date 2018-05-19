import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ListView,
  Image
} from 'react-native';


import { Constants, MapView, Location, Permissions } from 'expo';
import firebase from './configFirebase';

// import Green from '../flag/fgood.png'
// import Yellow from '../flag/fmoderate.png'
// import Orange from '../flag/funforsens.png'
// import Red from '../flag/funhealt.png'
// import Purple from '../flag/fvery.png'
// import Piggy from '../flag/fhaz.png'
class Map extends React.Component {
  constructor(props) {
    super(props);

    // console.log(firebase.name);
    // console.log(firebase.database());
    
    this.state = {
    	mapRegion: { latitude: 13.8298856, longitude: 100.5984373, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
	    locationResult: null,
	    location: {coords: { latitude: 13.8298856, longitude:100.5984373},latitudeDelta: 0.003, longitudeDelta: 0.003 },
    	marker:[],
      AQI: {
        value:0
      },
     
    };
    this.user =  firebase.auth().currentUser;
    this.MarkerRef = firebase.database().ref().child('User').child(this.user.displayName).child('Marker');
    // this.MarkerRef = firebase.database().ref().child('User').;
    this.aqiRef = firebase.database().ref().child('User').child(this.user.displayName).child('DeviceID').child('AQI').orderByKey().limitToLast(1);
  }
componentWillMount() {
  this._getAQI(this.aqiRef);
  this._getLocationMarker(this.MarkerRef);
} 
componentDidMount() {
    
    this._getLocationAsync();
}
componentWillUpdate = async (nextProps, nextState) =>{
  // console.log("bank")
  if(nextState.AQI.value != this.state.AQI.value){
    let aqi =nextState.AQI.value
    if(aqi > 150){
          let location = await Location.getCurrentPositionAsync({});
          console.log(location.coords)
          Alert.alert(
            'Save AQI value for location ?',
            'This AQI value :' + aqi.toString(),
            [
              {text: 'Sure', onPress: () => { 
                const  checkPoint={
                  aqi,
                  coordinate:location.coords
                }
                this.MarkerRef.push(checkPoint);  
                this._getLocationMarker(this.MarkerRef);
              }
            },
              {text: 'no Thank', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ]
          )
    }
  }
  // this.alertWarning(prevState.AQI.value)
}
  _MapRegionChange = location => {
    console.log("test")
    this.setState({ location:{
      coords:{
        latitude:location.latitude,
        longitude:location.longitude
      },
      latitudeDelta:location.latitudeDelta,
      longitudeDelta:location.longitudeDelta
    } 
  });
    // console.log(mapRegion)
    // this._getLocationAsync();
  };

  // **** get location ****

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   location={...location,latitudeDelta: 0.003, longitudeDelta: 0.003}
   console.log(location);
   this.setState({ locationResult: JSON.stringify(location), location });
  
 };
 
 // **** warning  add marker ***
 _warning = async (aqi) => {
  
        this._getAQI(this.aqiRef);
        
        let location = await Location.getCurrentPositionAsync({});
        console.log(location.coords)
        Alert.alert(
          'Save AQI value for location ?',
          'This AQI value :' + aqi.toString(),
          [
            {text: 'Sure', onPress: () => { 
              const  checkPoint={
                aqi,
                coordinate:location.coords
              }
              this.MarkerRef.push(checkPoint);  
              this._getLocationMarker(this.MarkerRef);
            }
          },
            {text: 'no Thank', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ]
        )
      // }
  }
alertWarning(aqi){
  if(aqi> 150){
    // setInterval(function(){
    this._warning(aqi);
     // },5000)
  }
}
// **** check for color of marker from aqi value *****

 // _checkPoint_color = (aqi) => {
 //    if(aqi > 300){
 //      return Piggy  
 //    }
 //    else if(aqi > 200){
 //      return Purple
 //    }
 //    else if(aqi > 150){
 //      return Red
 //    }
 //    else if(aqi > 100){
 //      return Orange
 //    }
 //    else if(aqi > 50){
 //      return Yellow
 //    }
 //    else{
 //      return Green
 //    }
 // }
 _checkPoint_color = (aqi) => {
    if(aqi > 300){
      return "linen"  
    }
    else if(aqi > 200){
      return "purple" 
    }
    else if(aqi > 150){
      return "red" 
    }
    else if(aqi > 100){
      return "orange"
    }
    else if(aqi > 50){
      return "yellow"
    }
    else{
      return "green"
    }
 }
 // **** get data aqi from firebase *****
  _getAQI = (aqiRef) => {
 // setInterval(function(){
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
      // console.log(this.state.AQI);
    });
  // },5000)
  } 

 // **** get value of location from firebase 
 _getLocationMarker(MarkerRef) {
 
    MarkerRef.on('value', (snap) => {
      var marker = [];
      snap.forEach((child) => {
        marker.push({
          aqi: child.val().aqi,
          coordinate: child.val().coordinate,
          _key: child.key
        });
      });
      // console.log(marker)
      this.setState({
         marker
      });
    });

  } 

 // **** show maker *****

 checkPoint_show = () => {
  if(this.state.marker.length != 0){
     return ( 
      this.state.marker.map((el, index) => 
        <MapView.Marker key={index}   
        title={"AQI"} 
        description={"value => "+el.aqi.toString()} 
        // image={require('../flag/fgood.png')} 
        pinColor={this._checkPoint_color(el.aqi)} 
        coordinate={el.coordinate}
        >
       
        </MapView.Marker>
        )
      )
  }
 }

  render() {
    let location = this.state.location;
    let aqi = this.state.AQI;
    // console.log(aqi)
    return (
        <View style={styles.container}>
          <MapView
            provider={"google"}
            style={styles.map}
           	region={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: location.latitudeDelta, longitudeDelta: location.longitudeDelta }}
            onRegionChangeComplete={this._MapRegionChange}
            // onUserLocationChange={this._getAQI(this.aqiRef)}
            showsUserLocation={true}
            // followsUserLocation={true}
            showsMyLocationButton={true}
          >

          {this.checkPoint_show()}
          </MapView>
          <View style={styles.base}>
            <View style={styles.baseBottom}>
              <Text >AQI: {aqi.value}</Text>
            </View> 
          </View>  
          <View style={styles.buttonPosition} >
            <TouchableOpacity onPress = {() => this._warning(aqi.value)} style = {styles.button}>
              <Text>Save</Text>
            </TouchableOpacity> 
          </View>
        
        </View>

    );
  }
}
  
  // <Text>
  // Location: {this.state.locationResult}
  // </Text>  
  
Map.propTypes = {
  provider: MapView.ProviderPropType,
};
const styles = StyleSheet.create({
  container: {
  	flex: 1 ,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  map: {
     ...StyleSheet.absoluteFillObject,
  },
  buttonPosition:{
    position:'absolute',
    top:'10%',
    left:'2%'
  },
  button: {
      backgroundColor: '#A9A9A9',
      width: 100,
      height: 25,
      borderRadius: 50,
      alignItems: 'center',
   },
  base: {
    position:'absolute',
    top:'5%',
    left:'2%',
  },
  baseBottom: {
    backgroundColor: '#FFFFFF',
    opacity:0.7,
    height: 25,
    width: 100,
    alignItems: 'center',
  },

});
export default Map;
