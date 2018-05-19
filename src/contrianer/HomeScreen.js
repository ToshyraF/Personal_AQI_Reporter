
import React from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import Login from './Login'
import DetailUser from './DetailUser'
import firebase from "../components/configFirebase";

class HomeScreen extends React.Component {
  constructor(props) {
      super(props)
      console.log("asdsadsa")
      console.log(this.props.navigation.state.params)
      this.state = ({
        page: null,
        user: (this.props.navigation.state.params == "undefined") ? null : this.props.navigation.state.params,
        login: false,
      })
    }
  componentWillReceiveProps = (nextprops) =>{
      // this.fetchData().done()
      console.log("coco")
      // console.log(this.props.navigation.state.params)
      console.log(nextprops.navigation.state.params)
      const  {navigate}  = this.props.navigation;
      let user = nextprops.navigation.state.params.user;
      if(this.props.navigation.state.params !== nextprops.navigation.state.params){
        if(user != null){
          this.setState({page:<DetailUser navigate={navigate} user={user} />})
        }
        else{
          this.setState({page:<Login navigate={navigate} />})
        } 
      }
      
      // console.log(nextprops)
      
  		 
  }

   componentDidMount = (props) =>{
   	  const  {navigate}  = this.props.navigation;
      let user =  this.state.user;
        if(user != null){
          this.setState({page:<DetailUser navigate={navigate} user={user.user} />})
        }
        else{
          this.setState({page:<Login navigate={navigate} />})
        }    
    }
  render() {
  	// console.log(this.props)
    return (
    	<Container >
    		{this.state.page}

      </Container >
    );
  }
}

export default HomeScreen;