import React, { useState, useEffect, Component } from 'react';
import {View, Text, Button, ScrollView, Image, ImageBackground, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

function launching_screen({navigation}){
    return(
            <View style={styles.initial}>
                <ImageBackground source={require('../imgs/login_background.jpeg')} style={styles.image}>
                    {/* <Text style={styles.textformat}>Welcome To </Text>
                    <Text style={styles.name}>MedChat</Text> */}
                    <Image 
                        style = {styles.imagestyle}
                        source={require('../imgs/launching_logo.jpeg')}
                    />
                    <Text style ={{fontSize:10,textAlign:'center'}}>Tap Agree and Continue to accept the <Text style={{color:"#8155BA"}}>Terms of Service.</Text></Text>
                    <View style={styles.buttonview}>
                        <Button 
                            title="Agree and Continue" 
                            onPress={() => navigation.goBack()}
                            color="#8155BA"
                        />
                    </View>
                
                </ImageBackground>
            </View>
    )
}


const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "stretch",
      },
    name : {
        textAlign:'center',
        fontSize: 45, 
        fontStyle: 'italic',
        color:"#8155BA",
    },
    initial : {
        flex:1
    },
    textformat : {
        textAlign:'center',
        fontSize: 20, 
        fontStyle:'normal',
        color:"#8155BA",
        marginTop:20,
    },
    imagestyle : {
        width:250,
        height:250,
        marginLeft:45,
        // marginTop: 0,
        marginBottom:190

    },
    buttonview: {
        
        borderTopLeftRadius:50,
        borderBottomLeftRadius:50,
        borderTopRightRadius:50,
        borderBottomRightRadius:50,
        overflow:'hidden',
        width:'80%',
        marginLeft:40,
        marginBottom:10,
        marginTop: 10,
        borderBottomColor:'black'
    }
})
export default launching_screen;
