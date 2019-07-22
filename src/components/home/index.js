import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import withFooter from '../../hoc/withFooter';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Content>
                <Text>Herera sdad as</Text>
                <Text>asd ada  dasd</Text>
            </Content>
        );
    }
}
const nHome = withFooter(Home);

export default nHome;