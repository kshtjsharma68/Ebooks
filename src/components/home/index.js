import React, {Component} from 'react';
import { FlatList } from 'react-native';
import { Container,Content, Header,Segment, Body, Button, Text, Left, Icon, Right, Spinner } from 'native-base';
import withFooter from '../../hoc/withFooter';
import styles from './style';
import { pexelOps } from '../helpers/dataFetch';

const Head = _ => {
    return   (
        <Header style={{backgroundColor: 'white', borderColor: 'white'}}>
            <Left style={{float: 'left'}}>
                <Button transparent>
                    <Icon name="arrow-back" style={{color: 'black'}}/>
                </Button>
            </Left>  
            <Right >
                <Button transparent >
                    <Icon name="search" style={{color: 'black'}}/>
                </Button>
            </Right>
        </Header>
    );
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
                        abtn: 'photos',
                        photos: [],
                        loading: true
                    };
    }

    async componentWillMount() {
        let res = await pexelOps.getPics('')
        if ( res.length ) {
            this.setState(prevState => ({...prevState, photos: res, loading: false}));
        }
    }

    // static getDerivedStateFromProps(nextProps, nextState) {
    //     console.log(nextProps, nextState)
    // }

    fetchBooks = async(type) => {
        this.setState(prevState => ({...prevState, abtn: type}))
        
    }

    render() {
        let {abtn, loading, photos} = this.state;

        if ( !loading ) {
            return (
                <Content style={styles.container}>
                    <Head />
                    <Segment style={styles.segment}>
                        <Button 
                            style={{...styles.segment_btn, borderTopLeftRadius: 2, borderBottomLeftRadius: 2, backgroundColor: (abtn == 'photos' ? 'grey': 'blue')}}
                            onPress={() => this.fetchBooks('photos')}
                        >
                            <Text>
                                Photos
                            </Text>
                        </Button>
                        <Button 
                            style={{...styles.segment_btn, borderTopRightRadius: 2, borderBottomRightRadius: 2, backgroundColor: (abtn == 'videos' ? 'grey': 'blue')}}
                            onPress={() => this.fetchBooks('videos')}
                        >
                            <Text>
                                Videos
                            </Text>
                        </Button>
                    </Segment> 
                </Content>
            );
        }
        return <Spinner style={styles.loader} color="blue"/>;
    }
}
const nHome = withFooter({active: 'home'})(Home);

export default nHome;