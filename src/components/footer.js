import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import  Map  from './map';
import  MXHeader  from './header';
import Choose from './choose'
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
        return <Choose style={styles.button}/>
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

  componentDidMount(){
    this.setState({
      pages:this.choosePage(0)
    })
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
          <MXHeader headerText={this.state.header}/>
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
export default FooterTabs;

const styles = {
  button: {
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 2,
    position: 'relative'
  }
};