import React from 'react';
import Home from './components/home';
import { createAppContainer, createStackNavigator } from 'react-navigation';

const Navigator = createStackNavigator({
    Home: {
        screen: Home
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