
import React, { useState, useEffect, Component } from 'react';
import {View, Text, Button, ScrollView, Image, ImageBackground, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import CodeInput from 'react-native-code-input';

function home_page({navigation}){
    return(
         <ImageBackground source={require('../imgs/login_background.jpeg')} style={styles.image}>
                <View style={{justifyContent:'center'}}>
                    <View style={styles.buttonview}>
                    <Button 
                        title = 'Login' 
                        onPress={()=>navigation.navigate("Login") } 
                        color="#8155BA"/>
                    </View>
                    
                    <View style={styles.parallelbutton}>
                    <Button title='Register' onPress={()=>navigation.navigate("Register")} color="#8155BA"/>
                    </View>
                </View> 
        </ImageBackground>
        )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "stretch",
      },
    
   
    parallelbutton: {
        borderRadius: 50,
        overflow:'hidden',
        width:'80%',
        marginLeft:40,
        marginBottom:4,
        marginTop:40
    },
    buttonview: {
        borderRadius: 50,
        overflow:'hidden',
        width:'80%',
        marginLeft:40,
        marginBottom:4,
        marginTop:190
    }
})



export default home_page;