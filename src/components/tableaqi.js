import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class TableAQI extends React.Component {
  render() {
    return (
      <Grid>
    	<Col style={{justifyContent: 'center',  flex: 0.2}}>
        	<Row style={styles.good}>
            	<Text>0-50</Text>
        	</Row>
        	<Row style={styles.moderate}>
            	<Text>51-100</Text>
        	</Row>
        	<Row style={styles.unhealSensitive}>
            	<Text style={{color:'#fff'}}>101-150</Text>
        	</Row>
        	<Row style={styles.unHealthy}>
            	<Text style={{color:'#fff'}}>151-200</Text>
        	</Row>
        	<Row style={styles.veryUnhealthy}>
            	<Text style={{color:'#fff'}}>201-300</Text>
        	</Row>
        	<Row style={styles.Hazardous}>
            	<Text style={{color:'#fff'}}>301-500</Text>
        	</Row>
    	</Col>
    	<Col style={{justifyContent: 'center',  flex: 0.9}}>
        	
        	<Row style={styles.levelStyle}>
            	<Text>Good</Text>
        	</Row>
        	<Row style={{backgroundColor:'#99ccff'}}>
            	<Text style={styles.description} >Air quality is considered satisfactory, and air pollution poses little or no risk.</Text>
        	</Row>
        	
        	<Row style={styles.levelStyle}>
        	   	<Text>Moderate</Text>
        	</Row>
        	<Row style={{backgroundColor:'#99ccff'}}>
            	<Text style={styles.description} >Air quality is acceptable.</Text>
        	</Row>

        	<Row style={styles.levelStyle}>
            	<Text>Unhealthy for Sensitive Group</Text>
        	</Row>
        	<Row style={{backgroundColor:'#99ccff'}}>
            	<Text style={styles.description} >High-risk groups may experience health effects. The general public is not affected.</Text>
        	</Row>
        	
        	<Row style={styles.levelStyle}>
            	<Text>Unhealthy</Text>
        	</Row>
        	<Row style={{backgroundColor:'#99ccff'}}>
            	<Text style={styles.description} >Everyone has health effects; High-risk groups has more serious health effects.</Text>
        	</Row>
        	
        	<Row style={styles.levelStyle}>
            	<Text>Very Unhealthy</Text>
        	</Row>
        	<Row style={{backgroundColor:'#99ccff'}}>
            	<Text style={styles.description} >Health alert: everyone has more serious health effects.</Text>
        	</Row>
        	
        	<Row style={styles.levelStyle}>
        	   	<Text>Hazadous</Text>
        	</Row>
        	<Row style={{backgroundColor:'#99ccff'}}>
            	<Text style={styles.description} >Health warnings of emergency conditions. The entire population is more likely to be affected.</Text>
        	</Row>

    	</Col>
	</Grid>
    );
  }
}

const styles = {
	good : {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'#00ff00'
	},
	moderate : {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'#ffff1a'
	},
	unhealSensitive : {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'#ff9933'
	},
	unHealthy : {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'#ff471a'
	},
	veryUnhealthy : {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'#cc00cc'
	},
	Hazardous : {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'#990033'
	},
	levelStyle :{
		alignItems: 'center',
		paddingLeft:5,
		flex:0.5,
		backgroundColor:'#4da6ff'
	},
	description: {
		fontSize:12,
		paddingLeft:3
	}
}

export default TableAQI;
