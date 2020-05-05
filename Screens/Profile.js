import React, { useState, useEffect, Component } from 'react';
import {Text, Button ,ActivityIndicator,Image,ImageBackground,ScrollView,StyleSheet, View} from 'react-native'
import { List, ListItem,  Divider, Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from './Utils/Fire';
import { cond, exp } from 'react-native-reanimated';

function Profile({navigation}){
    const list = [
        {
          name: 'Asthama',
         
        },
        {
          name: 'Ear Pain',
        },
        {
          name: 'Cancer',
        },
        {
          name: 'Diabetes',
        },
        
      ];
    return(
        <ImageBackground source={require('../imgs/login_background.jpeg')} style={styles.image}>
            <ScrollView>
               
                <View style={{alignContent :'center'}}>
                    <Image
                        style={styles.displayprofile}
                        source={require('../imgs/empty_profile.png')}
                    />
                </View>
                <Text style={styles.name}>User</Text>
                <ListItem
                    title="Phone Number"
                    containerStyle={styles.ListRow}
                    roundAvatar
                    leftAvatar={{source : require('../imgs/phone_logo.jpeg')}}
                />
                <ListItem
                    title="email"
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
                    {
                    list.map((l, i) => (
                        <ListItem
                        key={i}
                        containerStyle={styles.ListRow}
                        roundAvatar
                        leftAvatar={{source : require('../imgs/logo.jpeg')}}
                        title={l.name}
                        bottomDivider
                        />
                    ))
                    }
                </View>
                    
                
            </ScrollView>
        </ImageBackground>
        
    // {/* // <Text> Profile screen{navigation.state.params.us._id}</Text> */}
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