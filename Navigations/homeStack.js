import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Login from '../Screens/Login';
import Register from '../Screens/Register';
<<<<<<< HEAD
=======
import Home from '../Screens/Home';
>>>>>>> 5599f33ad92bad056c57e359d5803ac4ffc69573
import Main from '../Screens/Main';
import Chat from '../Screens/Chat';
import Profile from '../Screens/Profile';
import Channel_Profile from '../Screens/Channel_profile'
// navigation prop is passed down to all our screen components.
const HomeStack = createStackNavigator({
    // Top Screen is showed by default
    
<<<<<<< HEAD
    Login: {
        screen: Login,
    },
    Main:{
        screen:Main
    },
    Register: {
        screen: Register
    },
=======
    Main:{
        screen:Main
    },
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register
    },
    Home: {
        screen: Home
    },
>>>>>>> 5599f33ad92bad056c57e359d5803ac4ffc69573
    Profile:{
        screen:Profile
    },
    Chat:{
        screen:Chat
    },
    Channel_Profile:{
        screen:Channel_Profile
    },

})
export default createAppContainer(HomeStack);