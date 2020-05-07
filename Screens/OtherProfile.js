import React, { useState } from 'react';
import {Text ,ActivityIndicator,Image,ImageBackground,ScrollView,StyleSheet, View} from 'react-native'
import {  ListItem } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native'
import GetUserInfo from './Utils/APICalls';

function Profile({route, navigation}){
    const [user, setUser] = useState()
    const [userChannels, setUserChannels] = useState([])
    const [initializing, setInitializing] = useState(true)

    useFocusEffect( 
        React.useCallback(() => {
            let id = {"id" : route.params.user}
            console.log("Join with info: ",id)
            GetUserInfo('login/profile', id).then(resp => {
                setUser(resp) 
                if(resp){
                    setInitializing(false)
                }
            })
            GetUserInfo('channels/getUserChannels', id).then(resp => {setUserChannels(resp)})
        }, [])
    );

    if(initializing){
        return (
          <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <ActivityIndicator  size={100}/>
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