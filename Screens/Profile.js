import React, { useState, useEffect, Component } from 'react';
import {Text, Button ,ActivityIndicator,Image,ImageBackground,ScrollView,StyleSheet, View} from 'react-native'
import { List, ListItem,  Divider, Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from './Utils/Fire';
import { cond, exp } from 'react-native-reanimated';
import GetUserInfo from './Utils/APICalls';

function Profile({navigation}){
    const [user, setUser] = useState()
    const [userChannels, setUserChannels] = useState([])
    const [initializing, setInitializing] = useState(true)
    const [image, setImage] = useState()
    useEffect(()=>{
        let id = navigation.dangerouslyGetParent().dangerouslyGetState().routes[1].params
        if(!user){
            GetUserInfo('login/profile', id).then(resp => {console.log(resp);setUser(resp); setInitializing(false)})
        }
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
                        source={user.profilePicture!='none'?{uri:user.profilePicture} :require('../imgs/empty_profile.png')}
                    />
                </View>
                <Text style={styles.name}>{user.firstName}</Text>
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
                <Text style = {{marginTop:10,marginBottom:10}}>Joined as a patient / Doctor</Text>
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