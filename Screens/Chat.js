import React, { useState, useEffect, Component,setState } from 'react';
import {Text, Button ,ActivityIndicator} from 'react-native'
import { GiftedChat, Bubble, Send, InputToolbar, Composer } from 'react-native-gifted-chat';
import Fire from './Utils/Fire';
import { cond } from 'react-native-reanimated';
// import firebase from 'firebase';
import PushNotification from 'react-native-push-notification';

GiftedChat.renderLoading=true

import {  StyleSheet ,View, ImageBackground} from 'react-native';

export default class Chat extends Component<props>{
  
  static navigationOptions = ({route,  navigation }) => {  
    return {
        title: rout.params.channel_name,  
        
        headerStyle: {  
                backgroundColor: '#FCF4E4',  
        },  
        headerTitleStyle: {  
              // fontWeight: 'bold',
              color: "#8155BA"  
        },
        // headerTintColor: '#fff',
        headerRight: () => (
          <View style={styles.buttonView}>
          <Button
            onPress={() => navigation.navigate('Channel_Profile',{channel_name:navigation.state.params.channel_name})}
            title="Info"
            color="#8155BA"
            
          />
          </View>
        )
    };  
  };  

  state = {
    messages: [],
    database:'',
    user:'',
    unique_id:'',
    loading:true
  };
  constructor(props){
    super(props)
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  
  }

  testPush=()=>{
    PushNotification.localNotification({
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
    });
  }

  componentDidMount() {  /// this compent will fetch all prevoius messages from chat

    GiftedChat.renderLoading=true
    console.log(this.props.navigation)
    console.log(this.props.route)
    this.database=this.props.route.params.channel_name
    this.user=this.props.route.params.name
    this.unique_id =this.props.route.params.id
    
    // Fire.shared.select_data_base(this.database)
    Fire.shared.select_data_base('messages_1_1')
    
    Fire.shared.on(message =>this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
      loading:  false
    })),this.testPush());
  
  }

  componentWillUnmount() {
    Fire.shared.off();
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#8155BA' />
      </View>
    );
  }
  renderBubble (props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#8155BA'
          },
          left: {
            backgroundColor: '#FCF4E4'
          }
        }}
      />
    )
  }

  renderSend(props) {
    return (
      <Send 
      {...props} 
      textStyle={{ color: '#8155BA' }} 
      label={'Send'}
      />
    );
  }

  renderInputToolbar(props){
    
    return ( 
    <InputToolbar 
      {...props} 
      containerStyle={{ backgroundColor: "#FCF4E4", }} 
      renderComposer={props1 => ( <Composer {...props1} 
        textInputStyle={{ color: "black"}} /> )}
         /> 
    );
}


  render() {
    return (
      <>
      <View style={styles.buttonView}>
      <Button title='press ma' onPress={()=>this.testPush() } color="#8155BA"/>
      </View>
      <ImageBackground source={require('../imgs/login_background.jpeg')} style={styles.image}>
      <GiftedChat
        renderLoading={this.renderLoading}x
        messages={this.state.messages}
        onSend={Fire.shared.send}
        onPressAvatar={(user)=>this.props.navigation.navigate('Profile',{us:user})}
        isTyping
        renderTime
        showUserAvatar
        renderUsernameOnMessage
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        // renderInputToolbar={this.renderInputToolbar}
        renderInputToolbar={this.renderInputToolbar}
        user={ {name:'dd1',_id:'testing_1',avatar: 'https://placeimg.com/140/140/any'} }  //change this line        
      />
      </ImageBackground>
      </>
    );
  }
}


const styles = StyleSheet.create({
  // rest remains same
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#CCC'

  },
  buttonView: {
    borderBottomLeftRadius:50,
    borderTopLeftRadius:50,
    borderBottomRightRadius:50,
    borderTopRightRadius:50,
    // overflow:'hidden',
    // width:'80%',
    // marginLeft:40,
    // marginBottom:5,
    // marginTop: 10
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});