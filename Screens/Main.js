
import React, { useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, Text, View, Alert, ScrollView, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'

import GetInfo from './Utils/APICalls.js'

function Main({ navigation }) {

  const [user,setUser] =useState('')
  const [uniqueId ,setUniqueId]=useState('')
  const [userChannels , setUserChannels]= useState(null) // channels that the user has joined
  // const [count,setCount]=useState(['1','1','91','1','1','100','1','1','1','190','1','1']) // count of each channel
  // const [channels ,setChannels]=useState(['Cancer', 'Asthma', 'Diabetes' ,'Cough', 'Bood Pressure' , 'Teeth Cavity','Heart' , 'Acane','Depression' ,'Lungs Infection','Vision','Ear_Pain'])
  const [channels ,setChannels]=useState()
  // initializing UserChannels and ChannelsList and Profile
  const [initializing, setInitializing] = useState({channelList:1, userChannels:1, profile:1})


  useFocusEffect( 
    React.useCallback(() => {
        let id = navigation.dangerouslyGetParent().dangerouslyGetState().routes[1].params
        GetInfo('channels/getUserChannels', id).then(resp => {setUserChannels(resp)})
    }, [])
  );

  useEffect(()=>{
    // console.log(navigation)
    // Goes to second screen in HomeStack and takes its params. Params passed from login screen going to main
    let id = navigation.dangerouslyGetParent().dangerouslyGetState().routes[1].params
    setUniqueId(id)
    GetInfo('channels/getUserChannels', id).then(resp => {
      if(resp.length>0)
        setUserChannels(resp)
      else
        setUserChannels([])
      setInitializing(prevState => {
        return {...prevState, userChannels:0}
      })
    })
    if(!channels){
      GetInfo('channels/getChannels', id).then(resp => {
        setChannels(resp)
        setInitializing(prevState => {
          return {...prevState, channelList:0}
        })
      })
    }
    
    if(!user){
      GetInfo('login/profile', id).then(resp => {
        setUser(resp)
        setInitializing(prevState => {
          return {...prevState, profile:0}
        })
      })
    }
    
  }, [])
  
  if(initializing.channelList || initializing.profile || initializing.userChannels){
    return (
      <ImageBackground
        source={require('../imgs/login_background.jpeg')}
        style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={90}/>
        <Text>Please Wait while we are fetching the data...</Text>
      </ImageBackground>
    );
  }

  function JoinChannel(item){
    let isValiditem = false
    for(let i=0; i<userChannels.length; i++){
      if(userChannels[i].channelName == item){
        //Join Channel
        navigation.navigate('Chat', {name: user.username, id :uniqueId.id , channel_name : item, url:user.profilePicture});
        isValiditem = true
      }
    }
    if(!isValiditem){
      //pop up and ask to the user to join channel
      Alert.alert(
        'Oops!', 
        'You are not a part of this channel', 
        [
          {text:'Cancel!', onPress:()=>console.log('Canceled')},
          {text:'Join Now!', onPress:()=> {
            console.log("ID: ", uniqueId.id)
            console.log("Channel: ", item)
            GetInfo('channels/addUserToChannel', {'userId': uniqueId.id, 'channelName': item}).then(resp=>{
              GetInfo('channels/getUserChannels', uniqueId).then(response => {
                  setUserChannels(response)
              })
            })
          }},
        ],
        {cancelable:true}
      );
    }
  }

  // can render only Even Length Channels
  return (
    <ScrollView >
      <View style={styles.initial}>
        {channels.map(item=>(
          // U just needed to move this <VIEW> inside the map function. Warna everything will be considered a single button
          <View style={styles.buttonview}>
            <TouchableOpacity onPress={()=>JoinChannel(item.channelName)} style={styles.channel}>
              <Text style={styles.channelname}>{item.channelName}</Text>
              <View style={styles.iconparticipants}>
                <View>
                  <Icon
                    reverse
                    name='ios-people'
                    type='ionicon'
                    color='#ffffff00'
                    size= {18}
                  />
                </View>
                <Text style={styles.participants}>{item.channelCount+'     |     '}</Text>
                <View>
                  <Icon
                    reverse
                    name='ios-heart'
                    type='ionicon'
                    color='#ffffff00'
                    size= {18}
                  />
                </View>
                
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  initial : {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      backgroundColor:'#EED6D3',
      height:'100%'
      // flex:1,
      // flexDirection:'column',
      //justifyContent:'space-evenly'

  },

  channel : {
    overflow:'hidden',
    width:'100%',
    marginLeft:5,
    // marginRight:5,
    borderColor:'black',
  },
  buttonview:{
    display:'flex',
    flexDirection:'column',
    borderRadius: 15,
    flexBasis:"45%",
    flex:1,
    overflow:'hidden',
    //width:'45%',
    //float:'left',
    margin:5,
    //marginTop: 5,
    backgroundColor:'#8155BA'
  },
  participants : {
    marginTop:15,
    marginEnd:1,
    fontSize:12,
    fontWeight:'bold'
  },
  iconparticipants : {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    marginTop:-15
  },
  channelname : {
    marginTop: 2,
    fontSize:14,
    textAlign:'center',
    color: 'white'
  }

})

export default Main;