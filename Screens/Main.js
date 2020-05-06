
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, TextInput, View, Alert, Button, ScrollView } from 'react-native';

import GetInfo from './Utils/APICalls.js'

function Main({ navigation }) {
  

  const [user,setUser] =useState('')
  const [uniqueId ,setUniqueId]=useState('')
  const [userChannels , setUserChannels]= useState(null) // channels that the user has joined
  // const [count,setCount]=useState(['1','1','91','1','1','100','1','1','1','190','1','1']) // count of each channel
  const [channels ,setChannels]=useState(['Cancer', 'Asthma', 'Diabetes' ,'Cough', 'Bood Pressure' , 'Teeth Cavity','Heart' , 'Acane','Depression' ,'Lungs Infection','Vision','Ear_Pain'])
  // initializing profile
  const [initializing, setInitializing] = useState(true)

  

  useEffect(()=>{
    // handle all hooks here
    // name hook
    // unique id hook
    // each channel count how many members are there
    // list of channelse which user have joined 
    // console.log(navigation)
    console.log('effect------------ caled')
    // Goes to second screen in HomeStack and takes its params. Params passed from login screen going to main
    let id = navigation.dangerouslyGetParent().dangerouslyGetState().routes[1].params
    setUniqueId(id)
    GetInfo('channels/getUserChannels', id).then(resp => {
      if(resp.length>0)
        setUserChannels(resp) 
      setInitializing(false)
    })
    // setChannels(GetInfo('channels/getChannels', id))
    // setUser(GetInfo('login/profile', id))
    // setName(navigation.state.prams.name)
    
  }, [])
  
  if(initializing){
    return (
      <View style={[styles.initial, {alignItems:'center'}]}>
        <ActivityIndicator size={100}/>
        <Text>Please Wait while we are fetching the data...</Text>
      </View>
    );
  }


  return (
    <ScrollView >
      <View style={styles.initial}>
        <Text>Navigation Tabs</Text>
        {userChannels?
          userChannels.map(channel=> (
            // U just needed to move this <VIEW> inside the map function. Warna everything will be considered a single button
            <View style={styles.buttonview}>
              <Button 
              title={channel}  
              onPress ={() => navigation.navigate('Chat', {name: name , id :uniqueId , channel_name : channel})}
              color="#8155BA"
              marginTop='10'
              />
            </View>      
          )):
          <Text>You are not part of any Channel. Please Join a channel to start</Text>
        }
        
      </View>
  </ScrollView>
  );
}
const styles = StyleSheet.create({
  
  initial : {
      backgroundColor:'#EED6D3',
      flex:1,
      flexDirection:'column',
      justifyContent:'space-evenly'

  },
  buttonview: {
      flexDirection :'column',
      borderRadius: 50,
      overflow:'hidden',
      width:'80%',
      marginLeft:40,
      marginBottom:10,
      marginTop:10,
      marginVertical: 8,
      borderColor:'black',

  }
})

export default Main;