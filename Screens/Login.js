import React, { useState, useEffect, Component } from 'react';
import {View, Text, Button, ScrollView, Image, ImageBackground, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';


// navigation prop is passed down to all our screen components frfom the stack container
function Login({ navigation }){
    // If null, no SMS has been sent
    const [phoneNumber ,setPhoneNumber]=useState('+13313107546')  //Phone Number +1 650-555-1234
    const [confirm, setConfirm] = useState(null);   //onfirms the phone  for phone Number
    const [code, setCode] = useState('123456'); // confirmation code (phone) from the user
    const [userName, setUserName] = useState('Fgh')
    const [password, setPassword] = useState('12345')
    const [user, setUser] = useState(auth().currentUser)


    // Method to fetch our own apis
async function LoginMongoDB(method, username=null, password=null, phone=null){
    try{
        
        let packet = {
            'method' : method,
        }
        if(method=='phone')
            packet.phoneNumber = phone

        else{
            packet.username = username
            packet.password = password
        }
        console.log(packet)
        const response = await fetch('https://medchatse.herokuapp.com/login', {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(packet)
        })
        const respJson = await response.json()
        console.log("JSON Returned: ", respJson)
        if(!respJson.message)
            navigation.navigate('Main', respJson)
        else{
            alert(respJson.message)
        }
    }catch(error){
        alert(error)
        console.log("Error in MongoDblogin: ", error)
    }
}

    // Used for PhoneAuth
    async function signInWithPhoneNumber(phoneNumber){
        try{
            const verification = await auth().signInWithPhoneNumber(phoneNumber);
            console.log(verification)
            setConfirm(verification);
        }catch(err){
            alert(err)
            console.log('signInPhoneERR: ', err)
        }
    }


    async function confirmCode() {
        try {
            console.log("Code: ", code)
            console.log(confirm)
            const conf =  await confirm.confirm(code);
            console.log('confirmed', conf)
            //Phone Number Verified so a request can be sent to the server to fetch data
            if (conf){
                await LoginMongoDB('phone','user','pass', phoneNumber)
                // The user is signed in after verfying the confirm code.
                // So we need to sign out the user from fire_base.
                auth().signOut().then(console.log('sigend_out...?'))
            }
            else{
                alert('Invalid Verification Code')
            }             
        } catch (err) {
            alert(err)
            console.log('confirmCodeERR: ', err)
        }
    }



    // Assuming the user is signed out, if there is no display name...?
    if (!confirm){
        console.log(user)
        return(
            <View style={styles.initial}>
                
                <ImageBackground source={require('../imgs/login_background.jpeg')} style={styles.image}>
                    <ScrollView>
                        <Image 
                            style = {styles.imagestyle}
                            source={require('../imgs/logo.jpeg')}
                        />
                        <Text style={{marginLeft:155,color:"#8155BA"}}>MedChat</Text>
                        <Text style={styles.textformat}>Log In</Text>
                        <TextInput 
                            placeholder='Username'
                            onChangeText={(text) => setUserName(text)}
                            value={userName}
                            style={styles.inputBox}
                            />
                        <TextInput 
                            placeholder='Password' 
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            style={styles.inputBox}
                            />
                        {/* <View style={styles.separator} />  */}
                        <View style={styles.buttonview}>       
                            <Button 
                                title="LogIn" 
                                onPress={() => LoginMongoDB('server', userName, password)}
                                color="#8155BA"
                            />
                        </View>
                        {/* <View style={styles.separator} />
                        <View style={styles.separator} /> */}
                        <View style={styles.buttonview}>
                            <Button 
                                title="Register" 
                                onPress={() => navigation.navigate("Register")}
                                color="#8155BA"
                                />
                        </View>
                        <TextInput 
                            placeholder='phone("+16505551234")'
                            value= {phoneNumber} 
                            onChangeText = {Text=>setPhoneNumber(Text)} 
                            style={styles.inputBox}
                            />
                        <View style={styles.buttonview}>
                            <Button
                                title="Sign In With Phone Number"
                                onPress={() => signInWithPhoneNumber(phoneNumber)}
                                color="#8155BA"
                            />
                        </View>
                    
                    </ScrollView>
                </ImageBackground>
            </View>
            
           
           
        );
    }
    // Only phone is authentic 
    return(
        // If the user is already logged IN? re route to HomeScreen
        // CallHome Screen here and do all this in HomeScreen
        <View>
            <Text>Enter the code below!</Text>
            <TextInput placeholder = 'Enter the code' value={code} onChangeText={text=>setCode(text)}/>
            <Button title = 'Submit code' onPress={()=>confirmCode() }/>
            <Button title='Back' onPress={()=>{setConfirm(null)}} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center"
      },
    inputBox : {
        marginTop:10,
        // justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'#A49393',
    },
    initial : {
        flex:1
    },
    textformat : {
        textAlign:'left',
        fontSize: 20, 
        fontStyle:'normal',
        color:"#8155BA"
        // marginTop:100
    },
    imagestyle : {
        width:90,
        height:90,
        marginLeft:145,
        marginTop: 10
    },
    // separator: {
    //     marginVertical: 0,
    //   },
    buttonview: {
        borderRadius: 50,
        overflow:'hidden',
        width:'80%',
        marginLeft:40,
        marginBottom:10,
        marginTop: 20
    }
})

export default Login;
