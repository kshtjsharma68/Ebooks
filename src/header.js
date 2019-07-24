import React from 'react';
import Home from './components/home';
import LargeImage from './components/Image';
import { createAppContainer, createStackNavigator } from 'react-navigation';

const Navigator = createStackNavigator({
    Home: {
        screen: Home
    },
    Image: {
        screen: LargeImage
    }
},
//For making header invisible
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false
    }
});

export default createAppContainer(Navigator);