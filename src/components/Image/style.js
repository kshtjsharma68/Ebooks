import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover'
    },
    touchable: {
    	alignItems: 'center',
    	justifyContent: 'center'
    },
    view: {
    	position: 'absolute',
    	backgroundColor: 'transparent'
    }
})

export default style;