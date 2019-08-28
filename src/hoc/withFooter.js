import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header,Footer, FooterTab, Button, Icon, Left } from 'native-base';

const style = StyleSheet.create({
    active: {
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        marginBottom: 10,
        backgroundColor: 'white'
    }
}); 


const Foot = props => {
  let { navigation } = props; 
    return (
            <Footer>
                <FooterTab>
                    <Button vertical style={props.active == 'home' ? style.active : {}} onPress={() => navigation.navigate('Home')}>
                    <Icon name='ios-home' />
                    </Button>
                    <Button 
                        vertical 
                        style={props.active == 'Chat' ? style.active : {}}
                        onPress={() => navigation.navigate('Chat')}
                    >
                    <Icon name="camera" />
                    </Button>
                    <Button vertical style={props.active == 'navigate' ? style.active : {}}>
                    <Icon active name="navigate" />
                    </Button>
                    <Button vertical style={props.active == 'profile' ? style.active : {}}>
                    <Icon name="person" />
                    </Button>
                </FooterTab>
            </Footer>
    );
}

const withFooter = (props) => (Component) => {
   class Comp extends React.Component {
       constructor(props) {
           super(props)
       }

       render(){
        return (
                <Container>
                    <Component {...this.props} />
                    <Foot {...props} {...this.props}/>
                </Container>
        );
       }
   }

   return Comp;
}

export default withFooter;