import React, { Component } from 'react';
import { View, ToastAndroid, Image, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native';
import { Container, Spinner, Text } from 'native-base';
import { pexelOps } from '../helpers/dataFetch';
import style from './style';
import RNFetchBlob from 'rn-fetch-blob';

export default class LargeImage extends Component {
    lastTap = null;

    constructor(props) {
        super(props)
        this.state = {
                        loading: true,
                    };
        this.handlePress    = this.handlePress.bind(this);
        this.downloadImage  = this.downloadImage.bind(this);
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
    downloadImage = _ => {
        let {loading, image} = this.state; 
        return new Promise((resolve, reject) => {
            try {
                let date = new Date();
                var image_URL = image.src.large;
                var ext = this.getExtension(image_URL);
                ext = "." + ext[0];
                const { config, fs } = RNFetchBlob;
                let PictureDir = fs.dirs.PictureDir;console.log(PictureDir)
                let options = {
                    fileCache: true,
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: true,
                        path: PictureDir + "/image_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                        description: 'Image'
                    }
                }
                config(options).fetch('GET', image_URL).then((res) => {
                    
                })
                resolve(true)
            } catch(err) {
                console.error('error from catch', err)
                reject(err)
            }
            
        })
    }

    getExtension = filename => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

    handlePress = async() => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY  = 300;
        if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
            await request_storage_runtime_permission();
            let download = await this.downloadImage();
            if (download) {
                ToastAndroid.show("Image download successfully.", ToastAndroid.SHORT);
            }
        } else {
            this.lastTap = now;
        }
    }

    render() {
        let {loading, image} = this.state; 
        let { navigation: { state: { params } } } = this.props

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
                    <TouchableOpacity
                        onPress={() => this.handlePress()}
                    >
                    <Text>Double tap to download</Text>
                    </TouchableOpacity>
                </View>    
        );
    }
}

 export async function request_storage_runtime_permission() {
 
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'ReactNativeCode Storage Permission',
        'message': 'ReactNativeCode App needs access to your storage to download Photos.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
 
      Alert.alert("Storage Permission Granted.");
    }
    else {
 
      Alert.alert("Storage Permission Not Granted");
 
    }
  } catch (err) {
    console.warn(err)
  }
}