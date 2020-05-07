import firebase from './firebase_auth'
import { Component } from 'react';
import PushNotification from 'react-native-push-notification';

class Fire{
  constructor(props) {
    this.observeAuth();
    this.DataBase= '';
    this.user=''

    PushNotification.configure({
      onRegister: function (token) {
        // console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        // console.log("NOTIFICATION:", notification);
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
  observeAuth = () =>{
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }
  testPush=()=>{
    PushNotification.localNotification({
      title: "Med Chat", // (optional)
      message: "New Message", // (required)
    });
  }

  onAuthStateChanged = user => {
    firebase.auth().signInAnonymously();
  };

  ref_database = ()=>{
    return firebase.database().ref(this.DataBase); 
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  select_data_base= (text,user)=>{
    this.DataBase=text;
    this.user=user;
  }

  on = callback =>{
    this.ref_database().on('child_added', snapshot => callback(this.parse(snapshot)));
  }
  

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };

      if(this.user ===user._id){
        this.append(message);
      }else{
        this.append(message);
        this.testPush();
      }
      // console.log(this.user)
      console.log(this.database)
      // console.log(user._id)
      // this.testPush();
    }
  };
  
  append = message => this.ref_database(this.DataBase).push(message);

  off() {
    this.ref_database(this.DataBase).off();
  }
}
Fire.shared = new Fire();
export default Fire;



