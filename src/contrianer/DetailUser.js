
import React ,{ Component }from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
} from 'react-native';
import { Constants } from 'expo';
import firebase from "../components/configFirebase";
import { Container, Content, Header, Form, Input, Item, Label } from 'native-base';
import { Card, ListItem,Button,FormLabel, FormInput, FormValidationMessage  } from 'react-native-elements';
// import Example from '../components/modal'
class DetailUser extends Component {
  constructor(props) {
      super(props)
       this.state = ({
        user:this.props.user,
        navigate:this.props.navigate,
      })

    }
  componentWillUpdate(nextProps, nextState){
    console.log("vbn")
    console.log(nextState.user)
    console.log(this.state.user)
    if(this.state.user !== nextState.user){
      this.state.navigate('Login');
    }
  }
   signOutUser = async () => {
      try {
          await firebase.auth().signOut();
          let user =  firebase.auth().currentUser;
          this.setState({user})
      } catch (e) {
          console.log(e);
      }
  }
   render() {
   	let user = firebase.auth().currentUser;
   	console.log("user:" ,user);
    return (
      <View style={styles.container}>
        <Card
          title='PROFILE'
          overlayStyle={{opacity: 0}}
          containerStyle={{width: Dimensions.get('window').width-50 ,height:Dimensions.get('window').height-150}}
          >
          <View style={{alignItems:'center', paddingBottom:15}}>
          <Image
          style={{borderWidth:1,
       			borderColor:'#fff',
       			width:150,
       			height:150,
       			borderRadius:75}}
          source={{uri: 'https://scontent.fbkk12-1.fna.fbcdn.net/v/t1.0-9/16681584_1335811763160325_3607791486516859556_n.jpg?_nc_cat=0&oh=fa7f0249b3f9f9715be1fab4a6ad1aa1&oe=5B8D0C96'}}
        	/>
        </View>
        <Item style={{marginBottom: 10}}>
              <Label>Username: </Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                editable={false}
                value={(user == null) ? "":user.displayName}
              />
        </Item>
        <Item style={{marginBottom: 10}}>
              <Label>Email: </Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                editable={false}
                value={(user == null) ? "":user.email}
              />
        </Item>

          <Button
            // icon={{name: 'code'}}
            backgroundColor='#ff1a1a'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            onPress={() => {this.signOutUser(); }}
            title='Logout' />
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  imageTitle: { 
    color: '#000', 
    fontSize: 18
  },
  imageDescription: { 
    color: '#9197A3', 
    fontSize: 12
  }
});
export default DetailUser;
// 
//              

      // <Container style={styles.container}>
        //   <Form>
        //     <Item>
        //       <Label>Name:</Label>
        //       <Text>{(this.state.user == null) ? "undefinde" : this.state.user.displayName}</Text>
        //     </Item>
        //     <Item>
        //       <Label>Email:</Label>
        //       <Text>{(this.state.user == null) ? "undefinde" : this.state.user.email}</Text>
        //     </Item>
        //      <Item>
        //       <Label>UserID:</Label>
        //       <Text>{(this.state.user == null) ? "undefinde" : this.state.user.uid}</Text>
        //     </Item>        
        //   <Button style={{ marginTop: 10 }}
        //       full
        //       rounded
        //       danger
        //       onPress={() => {this.signOutUser(); }}
        //     >
        //        <Text style={{ color: 'white' }}> Logout</Text>
        //     </Button>
        //    </Form>
        // </Container >