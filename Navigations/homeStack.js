import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Main from '../Screens/Main';
import Chat from '../Screens/Chat';
import Profile from '../Screens/Profile';
import Channel_Profile from '../Screens/Channel_profile'

// navigation prop is passed down to all our screen components.
const Tab = createMaterialTopTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator
            tabBarOptions={{
            activeTintColor: 'purple',
            labelStyle: { fontSize: 12 },
            // style: { backgroundColor: 'powderblue' },
            }}
        >
            <Tab.Screen name='Home' component={Main} />
            <Tab.Screen name='Profile' component={Profile} />
        </Tab.Navigator>
    );
}

const HomeStack = createStackNavigator()

function MyNavigator(){
    return(
        <NavigationContainer>
            <HomeStack.Navigator>
                <HomeStack.Screen name='Login' component={Login} />
                <HomeStack.Screen name='Main' component={MyTabs} />
                <HomeStack.Screen name='Register' component={Register} />
                <HomeStack.Screen name='Chat' component={Chat} />
                <HomeStack.Screen name='Channel_Profile' component={Channel_Profile} />
            </HomeStack.Navigator>
        </NavigationContainer>
        
    );
    
}

export default MyNavigator;