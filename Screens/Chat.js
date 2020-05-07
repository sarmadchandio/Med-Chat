import React, { useState, useEffect, Component,setState } from 'react';
import {Text, Button ,ActivityIndicator} from 'react-native'
import { GiftedChat, Bubble, Send, InputToolbar, Composer } from 'react-native-gifted-chat';
import Fire from './Utils/Fire';
// import firebase from 'firebase';
// import PushNotification from 'react-native-push-notification';
import API from './Utils/APICalls'
import Modal from './Utils/modalScreen'

GiftedChat.renderLoading=true

import {  StyleSheet ,View, ImageBackground} from 'react-native';

export default class Chat extends Component{



  state = {
    messages: [],
    database:'',
    user:'',
    unique_id:'',
    loading:true
  };
  constructor(props){
    super(props)
    // PushNotification.configure({
    //   onRegister: function (token) {
    //     console.log("TOKEN:", token);
    //   },
    //   onNotification: function (notification) {
    //     console.log("NOTIFICATION:", notification);
    //   },
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });
    this.LeaveChannel = this.LeaveChannel.bind(this)
  }

  // testPush=()=>{
  //   PushNotification.localNotification({
  //     title: "My Notification Title", // (optional)
  //     message: "My Notification Message", // (required)
  //   });
  // }

  componentDidMount() {  /// this compent will fetch all prevoius messages from chat

    GiftedChat.renderLoading=true
    console.log("Class:" ,this.props.navigation)
    console.log("Class:" ,this.props.route.params)
    this.state.database=this.props.route.params.channel_name
    this.state.unique_id =this.props.route.params.id

    
    Fire.shared.select_data_base(this.state.database ,this.state.unique_id)
    // Fire.shared.select_data_base('messages_1_1',this.state.unique_id)
    
    Fire.shared.on(message =>this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
      loading : false
    })));
  
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
  LeaveChannel(){
    // console.log("ID LeaveChannel: ", this.props.route.params.id)
    // console.log(this.props.route.params.channel_name)
    let packet = {
      'userId' : this.props.route.params.id,
      'channelName' : this.props.route.params.channel_name
    }
    // console.log(packet)
    // this.props.navigation.goBack()
    API('channels/leaveChannel', packet).then(() => this.props.navigation.goBack())
  }


  render() {
    // console.log(this.state.loading)
    // if(this.state.loading){
    //   return (
    //     <View style={styles.loadingContainer}>
    //       <ActivityIndicator size='large' color='#8155BA' />
    //     </View>
    //   );
    // }
    return (
      <>
      <View style={styles.buttonView}>
        <Button title='Leave Channel' onPress={() => this.LeaveChannel()} />
      </View>
      <ImageBackground source={require('../imgs/login_background.jpeg')} style={styles.image}>
      <GiftedChat
        renderLoading={this.renderLoading}
        messages={this.state.messages}
        onSend={Fire.shared.send}
        onPressAvatar={user=>this.props.navigation.navigate('OtherProfile',{user:user._id})}
        isTyping
        renderTime
        showUserAvatar
        renderUsernameOnMessage
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        // renderInputToolbar={this.renderInputToolbar}
        renderInputToolbar={this.renderInputToolbar}
        user={ {name:this.props.route.params.name , _id:this.props.route.params.id, avatar: this.props.route.params.url} }  //change this line        
        // user={ {name:this.props.route.params.name , _id:'321', avatar: this.props.route.params.url} }  //change this line        
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
    borderRadius: 50,
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