
import React ,{ Component }from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import firebase from "../components/configFirebase";
import stylesModal from "../components/app.style";
import Modal from "react-native-modal";
import Logo from '../components/logo'

let signup =[{Label:"Username"},{Label:"Email"},{Label:"Password"}];
let login =[{Label:"Email"},{Label:"Password"}];

class Login extends Component {
    constructor(props) {
      super(props)

      this.state = ({
        navigate:this.props.navigate,
        visibleModal: null,
        sign:{}
      })
      this.UserRef = firebase.database().ref().child('User');
    }
  componentWillUpdate(nextProps, nextState){
    console.log(nextState)
    if(this.state.user !== nextState.user){
      this.state.navigate('Profile',{user:nextState.user});
    }
    
  }
    componentDidMount = (props) =>{
      this.setState({
        sign:{
          Email:"thanawat0688@gmail.com",
          Password:"20022539"
        }
      })
    }
   gennerateInputBox=(box)=>{
     return ( 
      box.map((el, index) => 
          <Item key={index} floatingLabel>
              <Label>{el.Label}</Label>
              <Input
                secureTextEntry={(el.Label == "Password") ? true:false}
                autoCorrect={false}
                autoCapitalize="none"
                value={(this.state.sign == null) ? "":this.state.sign[el.Label]}
                onChangeText={(value) => this.setState({ sign:{...this.state.sign,[el.Label]:value} })}
              />
            </Item>
        )
      )
  }
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={stylesModal.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={stylesModal.modalContent}>
            <Label>Sign Up</Label>
            {this.gennerateInputBox(signup)}
            <Button style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() =>  {this.signUpUser(this.state.sign.Username,this.state.sign.Email, this.state.sign.Password); this.setState({ visibleModal: null })}}
            >
              <Text style={{ color: 'white' }}> Sign Up</Text>
            </Button>
             <Button style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() =>  this.setState({ visibleModal: null })}
            >
              <Text style={{ color: 'white' }}> Back</Text>
            </Button>
    </View>
  );
   
  signUpUser = (Username,email, password) => {

     firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then( async () => { 
                      let user =  firebase.auth().currentUser;
                      await user.updateProfile({
                           displayName: Username,
                        }).then(function() {

                             // Update successful.
                        }).catch(function(error) {
                             // An error happened.
                        });
                      this.UserRef.child(Username).set({
                                     Email:email,
                                     ID:user.uid,
                                     DeviceID:{
                                       Name:"undefinde",
                                       AQI:"undefinde"
                                     },
                                     Marker:"undefinde"
                      });  
                      this.setState({user});
                     })
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.' });
                        alert("failed signup");
                    });
  }

  loginUser = (email, password) => {
        console.log(password)
        if(email != null && password != null){
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(() => { 
                      // alert("Login"); 
                       
                      let user =  firebase.auth().currentUser;
                      // console.log(user)
                      this.setState({ user});
                    })
                    .catch(() => {
                        //Login was not successful, let's create a new account
                       this.setState({ error: 'Authentication failed.' });
                        alert("Failed login. Please check your email and password");
                    });
        }
        else{
          alert("Enter your email and password");
        }
  }
   render() {
    return (
       <Container style={styles.container}>
        <Logo />
          <Form>
            {this.gennerateInputBox(login)}

            <Button style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() =>{
                
                this.loginUser(this.state.sign.Email, this.state.sign.Password); 
                 } 
         }
            >
              <Text style={{ color: 'white' }}> Login</Text>
            </Button>

            <Button style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() =>  this.setState({ visibleModal: 2 })}
            >
              <Text style={{ color: 'white' }}> Sign Up</Text>
            </Button>
            <Modal
              isVisible={this.state.visibleModal === 2}
              animationIn="slideInLeft"
              animationOut="slideOutRight"
            >
              {this._renderModalContent()}
            </Modal>
          </Form>
        </Container >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});
export default Login;
// this.signUpUser(this.state.email, this.state.password)