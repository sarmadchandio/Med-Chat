import React, { useState, useEffect, useCallback } from 'react';
import {Text ,ActivityIndicator,Image,ImageBackground,ScrollView,StyleSheet, View} from 'react-native'
import {  ListItem } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native'
import GetUserInfo from './Utils/APICalls';

function Profile({route, navigation}){
    const [defaultUser, setDefaultUser] = useState()
    const [user, setUser] = useState()
    const [userChannels, setUserChannels] = useState([])
    const [initializing, setInitializing] = useState(true)

    useFocusEffect( 
        React.useCallback(() => {
            let id = navigation.dangerouslyGetParent().dangerouslyGetState().routes[1].params
            // console.log(navigation.dangerouslyGetParent().dangerouslyGetState().routes[1].params)
            // console.log(id)
            // This means the chat screen has sent an Id to check it's properties.
            
            // console.log("came from Chat Screen")
            // setInitializing(true)
            // console.log("UserChannells: ", userChannels)
            GetUserInfo('channels/getUserChannels', id).then(resp => {setUserChannels(resp)})
            // GetUserInfo('login/profile', id).then(resp => {console.log(resp);setUser(resp); setInitializing(false)})
            return () => {
                console.log(defaultUser)
                // setUser(defaultUser)
                console.log("leaving screen")
            }
        }, [])
    );

    useEffect(()=>{
        let id = navigation.dangerouslyGetParent().dangerouslyGetState().routes[1].params
        GetUserInfo('login/profile', id).then(resp => {setDefaultUser(resp);setUser(resp); setInitializing(false)})
        GetUserInfo('channels/getUserChannels', id).then(resp => {setUserChannels(resp)})
        console.log("Profile Called")
    }, [])


    if(initializing){
        return (
          <View style={[styles.initial, {alignItems:'center'}]}>
            <ActivityIndicator size={100}/>
            <Text>Setting Up Profile...</Text>
          </View>
        );
      }

    return(
        <ImageBackground source={require('../imgs/login_background.jpeg')} style={styles.image}>
            <ScrollView>
                <View style={{alignContent :'center'}}>
                    <Image
                        style={styles.displayprofile}
                        source={user?{uri:user.profilePicture} :require('../imgs/empty_profile.png')}
                    />
                </View>
                <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
                <ListItem
                    title={user.phoneNumber}
                    containerStyle={styles.ListRow}
                    roundAvatar
                    leftAvatar={{source : require('../imgs/phone_logo.jpeg')}}
                />
                <ListItem
                    title={user.email}
                    containerStyle={styles.ListRow}
                    // onPress={() => this.onPressOptions()}
                    roundAvatar
                    leftAvatar={{source : require('../imgs/email.jpeg')}}
                />
                <ListItem
                    title={user.diseaseHistory.isPatient? 'Communi Member': 'Doctor'}
                    containerStyle={styles.ListRow}
                    roundAvatar
                    leftAvatar={user.diseaseHistory.isPatient?{source : require('../imgs/patient.jpeg')}: {source : require('../imgs/doctor.jpg')}}
                />
                <ListItem
                    title="Channels Joined"
                    containerStyle={styles.ListRow}
                    // onPress={() => this.onPressOptions()}
                />
                <View>
                    {userChannels.map((l, i) => (
                        <ListItem
                            key={i}
                            containerStyle={styles.ListRow}
                            roundAvatar
                            leftAvatar={{source : require('../imgs/logo.jpeg')}}
                            title={l.channelName}
                            bottomDivider
                        />
                    ))}
                </View>
            </ScrollView>
        </ImageBackground>   
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        backgroundColor:'#EED6D3',
    },
    displayprofile: {
        // borderColor: mainColor,
        borderRadius: 85,
        borderWidth: 3,
        height: 150,
        marginBottom: 15,
        width: 150,
        marginLeft:100
        
      },
    name: {
        textAlign : 'center',
        fontSize : 20
    },
    ListRow: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#CCC',
        backgroundColor: '#FBF1E5'
      },  
})

export default Profile;