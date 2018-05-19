import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import  Map  from './map';
import  MXHeader  from './header';
class FooterTabs extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      arr: [
                { name: "Home"},
                { name: "Mesurement"},
                { name: "Info"},
            ],
      header: "Home",
      index: 0 ,
      pages: null
      };
  }

  choosePage =(seq) =>{
    switch (seq) {
       case 0:
        return null
        break;
       case 1:
        return null
        break;
       case 2:
        return <Map />
        break;
       default:
        return null
    }
    
  }

  onPress = (seq) => {
    this.setState({ 
      header: this.state.arr[seq].name,
      index: seq ,
      pages:this.choosePage(seq)
    });
  }
  render() {
    return (
        <Container>
          
          {this.state.pages}
          
            <Footer style={{position: 'absolute' ,bottom:0 }}>
              <FooterTab>           
                 {this.state.arr.map((el, index) =>
                        <Button key={index} active={(this.state.index == index) ? true : false}  onPress={() => this.onPress(index)} >
                           <Text>{el.name}</Text>
                        </Button>
                    )}
              </FooterTab>
            </Footer>
        </Container>
    );
  }
}
// <MXHeader headerText={this.state.header}/>
export default FooterTabs;