import React, { Component } from 'react';
import { View, ToastAndroid, Image } from 'react-native';
import { Container, Spinner, Text } from 'native-base';
import { pexelOps } from '../helpers/dataFetch';
import style from './style';

export default class LargeImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
                        loading: true,
                    }
    }

    UNSAFE_componentWillMount = async() => {
        let { navigation: { state: { params } }, navigation } = this.props
        let { getPic } = pexelOps
        try {
            if ( params.id ) {
                let image = await getPic(params.id)
                if ( image.status && image.status === 404 ) {
                    throw new Error(image.error)
                } else {
                    this.setState(prevState => ({...prevState, loading: false, image}));
                }
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    'invalid data to display content.. Returning back',
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50,
                )
                return navigation.goBack()
                // return navigation.navigate('Home')
            }
        } catch (err) {
            ToastAndroid.showWithGravityAndOffset(
                `${err.message}`,
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                25,
                50,
            )
            return navigation.goBack()
        }        
    }

    render() {
        let {loading, image} = this.state; 
        let { navigation: { state: { params } } } = this.props
console.log(image)
        if (loading) {
            return (
                <Container style={{flex: 1}}>
                    <Spinner color="red" stye={{flex:1, justifyContent: 'center', alignItems: 'center'}}/>
                </Container>
            );
        }

        return (
            <View style={{flex: 1}}>
                <Image 
                    style={style.image}
                    source={{uri: image.src.large}}
                />
            </View>
        );
    }
}