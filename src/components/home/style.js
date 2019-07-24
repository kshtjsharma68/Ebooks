import { StyleSheet,Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white'
    },
    segment: {
        backgroundColor: 'white',
        padding: 5
    },
    segment_btn: {
        justifyContent: 'center',
        borderColor: 'black',
        color: 'green',
        // flex: 1
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        width: deviceWidth,
        paddingRight: 1
    },
    image : {
        flex: 1,
        aspectRatio: 1,
        flexDirection: 'column', 
        margin: 1,
        justifyContent: 'center',
        height: deviceWidth / 3,
        width: deviceWidth / 3
    },
    imageItem : {
        height: deviceWidth / 3,
        width: deviceWidth / 3,
        borderRadius: 3,
    }
})

export default styles;