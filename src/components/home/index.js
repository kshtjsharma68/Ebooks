import React, {Component} from 'react';
import { FlatList, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { Container,Content, Header,Segment, Body, Button, Text, Left, Icon, Right, Spinner } from 'native-base';
import withFooter from '../../hoc/withFooter';
import styles from './style';
import { pexelOps } from '../helpers/dataFetch';

const Head = _ => {
    return   (
        <Header style={{backgroundColor: 'white', borderColor: 'white'}}>
            {/* <Left style={{float: 'left'}}>
                <Button transparent>
                    <Icon name="arrow-back" style={{color: 'black'}}/>
                </Button>
            </Left>   */}
            <Right >
                <Button transparent >
                    <Icon name="search" style={{color: 'black'}}/>
                </Button>
            </Right>
        </Header>
    );
}

const deviceWidth = Dimensions.get('window').width;


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
                        abtn: 'photos',
                        photos: [],
                        loading: true
                    };
    }

    async UNSAFE_componentWillMount() {
        let res = await pexelOps.getPics('')
        //setting state accordingly
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

    _renderItem = ({item}) => {
        let {navigation} = this.props;
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Image',{ id: item.id })}
            >
                <View 
                    style={styles.image}
                >
                    <Image
                        style={styles.imageItem}
                        source={{uri:item.src.medium}}
                        resizeMode="cover"
                    /> 
                </View> 
            </TouchableOpacity>   
        );
    }

    render() {
        let {abtn, loading, photos} = this.state;

        if ( !loading && photos.length > 0 ) {
            return (
                <Content style={styles.container}>
                    <Head />
                    <Segment style={styles.segment}>
                        <Button 
                            style={{...styles.segment_btn, borderTopLeftRadius: 2, borderBottomLeftRadius: 2, backgroundColor: (abtn == 'photos' ? 'green': 'grey')}}
                            onPress={() => this.fetchBooks('photos')}
                        >
                            <Text>
                                Photos
                            </Text>
                        </Button>
                        <Button 
                            style={{...styles.segment_btn, borderTopRightRadius: 2, borderBottomRightRadius: 2, backgroundColor: (abtn == 'videos' ? 'green': 'grey')}}
                            onPress={() => this.fetchBooks('videos')}
                        >
                            <Text>
                                Videos
                            </Text>
                        </Button>
                    </Segment> 
                    <View style={styles.imageContainer}>
                        <FlatList 
                            numColumns={3}
                            data={photos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={this._renderItem}
                        />
                    </View>    
                </Content>
            );
        }
        return <Spinner style={styles.loader} color="blue"/>;
    }
}
const nHome = withFooter({active: 'home'})(Home);

export default nHome;