import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';

const style = StyleSheet.create({
    footer: {
        backgroundColor: 'white'
    }
});

const Foot = _ => {
    return (
        <FooterTab>
            <Button>
            <Icon name="home" />
            </Button>
            <Button>
            <Icon name="camera" />
            </Button>
            <Button>
            <Icon name="body" />
            </Button>
        </FooterTab>
    );
}

const withFooter = Component => {
   class Comp extends React.Component {
       render(){
        return (
            <Container>
                <Component />
                <Foot />
            </Container>
        );
       }
   }

   return Comp;
}

export default withFooter;