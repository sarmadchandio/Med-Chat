
import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Button,
  ScrollView,
} from 'react-native';

function Main({ navigation }) {
  

  const [name,setName] =useState('')
  const [uniqueId ,setId]=useState('')
  const [userChannels , setUserChannels]= useState() // channels that the user has joined
  const [count,setCount]=useState(['1','1','91','1','1','100','1','1','1','190','1','1']) // count of each channel
  const [Channels ,setChannels]=useState(['Cancer', 'Asthma', 'Diabetes' ,'Cough', 'Bood Pressure' , 'Teeth Cavity','Heart' , 'Acane','Depression' ,'Lungs Infection','Vision','Ear_Pain'])

  async function GetUserChannels(id){
    let packet = {
      "id" : id
    }
    console.log("Packet: ", packet)
    try{
      const response = await fetch('https://medchatse.herokuapp.com/channels/getUserChannels', {
        method: 'POST',
        headers:{
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(packet)
      })
      const respJson = await response.json()
      console.log("response", respJson)
      let channelList = respJson.map(channel => {
        console.log(channel.channelName + "   " + channel.channelCount)
      })
      setUserChannels(channelList)
    }
    catch(error){
      alert(error)
    }
    
    // console.log(respJson)
  }

  useEffect(()=>{
    // handle all hooks here
    // name hook
    // unique id hook
    // each channel count how many members are there
    // list of channelse which user have joined 

    setId(navigation.state.params) //--> this is the unique user ID
    console.log('effect------------ caled')
    GetUserChannels(navigation.state.params)
    // setName(navigation.state.prams.name)
    
  }, [])
  
  return (
    <ScrollView >
      <View style={styles.initial}>
        <Text>Navigation Tabs</Text>
        {userChannels? 
          userChannels.map(channel=> {
            // U just needed to move this <VIEW> inside the map function. Warna everything will be considered a single button
            <View style={styles.buttonview}>
              <Button 
              title={channel}  
              onPress ={() => navigation.navigate('Chat', {name: name , id :uniqueId , channel_name : channel})}
              color="#8155BA"
              marginTop='10'
              />
            </View>      
          })
          :
          <Text>Loading</Text>
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
  
  separator: {
      marginVertical: 8,
    },
  buttonview: {
      flexDirection :'column',
      borderBottomLeftRadius:50,
      borderTopLeftRadius:50,
      borderBottomRightRadius:50,
      borderTopRightRadius:50,
      overflow:'hidden',
      width:'80%',
      marginLeft:40,
      marginBottom:10,
      marginTop:10,
      marginVertical: 8,
      borderColor:'black',
      
      // marginHorizontal:8
      // justifyContent :'space-between'

  }
})

export default Main;