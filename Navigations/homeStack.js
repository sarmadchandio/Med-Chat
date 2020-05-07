import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native'

import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Main from '../Screens/Main';
import Chat from '../Screens/Chat';
import Profile from '../Screens/Profile';
import OtherProfile from '../Screens/OtherProfile';
import ChannelProfile from '../Screens/ChannelProfile'
import Terms from '../Screens/Terms'
// import HomeScreen from '../Screens/HomeScreen'

// navigation prop is passed down to all our screen components.
const Tab = createMaterialTopTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator
            tabBarOptions={{
            activeTintColor: 'purple',
            inactiveTintColor: '#D9CED6',
            labelStyle: { fontSize: 12 },
            style: { backgroundColor: '#FCECDE' },
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
            <HomeStack.Navigator 
             screenOptions={{
                headerTintColor: '#D9CED6',
                headerStyle: { backgroundColor: '#8155BA'},
                headerTitleStyle: {
                    color:'#FCF4E4',
                    fontWeight:'bold',
                    fontSize:25,
                    fontFamily:'MuseoSansRounded-300'
                }
              }}
            >
                {/* <HomeStack.Screen name='Home' 
                    component={HomeScreen} 
                    options={{title:'Welcome To MedChat'}} 
                /> */}
                <HomeStack.Screen name='Login' component={Login} />
                <HomeStack.Screen name='Main' component={MyTabs} options={{title: 'Main'}}/>
                <HomeStack.Screen name='Register' component={Register} />
                <HomeStack.Screen 
                    name='Chat' 
                    component={Chat}
                    options={({ route }) => ({ 
                        title: route.params.channel_name,
                        headerRight: () => (
                            <Button 
                                onPress={() => alert('Naviagate here to channel profile')} 
                                title="Info"
                                color="#8155BA"
                            />
                        ) 
                   })}
                />
                <HomeStack.Screen name='Terms' component={Terms} />
                <HomeStack.Screen name='OtherProfile' component={OtherProfile} />
                <HomeStack.Screen name='ChannelProfile' component={ChannelProfile} />
            </HomeStack.Navigator>
        </NavigationContainer>
        
    );
    
}

export default MyNavigator;