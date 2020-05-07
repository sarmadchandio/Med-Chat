import React, { useState, useEffect, Component } from 'react';
import {View, Text, Button, ScrollView,Modal, Image, ImageBackground,TouchableHighlight, StyleSheet} from 'react-native';
import { List, ListItem,  Divider, Avatar } from 'react-native-elements';

function modalScreen( userId ){
    const [modalVisible, setModalVisible] = useState(false);
    return(
            <ImageBackground source={require('../../imgs/login_background.jpeg')} style={styles.image}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose
                    statusBarTranslucent ={true}
                    onRequestClose={() => {
                       console.log("Modal has been closed.");
                    }}

                >
                    <View style={{alignContent :'center'}}>
                        <Image
                            style={styles.displayprofile}
                            // source={user.profilePicture!='none'?{uri:user.profilePicture} :require('../imgs/empty_profile.png')}
                            source={require('../../imgs/empty_profile.png')}
                        />
                    </View>
                    <Text style={styles.name}>Name</Text>
                    <ListItem
                        title="Phone Number"
                        containerStyle={styles.ListRow}
                        roundAvatar
                        leftAvatar={{source : require('../../imgs/phone_logo.jpeg')}}
                    />
                    <ListItem
                        // title={user.email}
                        title= "email"
                        containerStyle={styles.ListRow}
                        // onPress={() => this.onPressOptions()}
                        roundAvatar
                        leftAvatar={{source : require('../../imgs/email.jpeg')}}
                    />
                    <Text style = {{marginTop:10,marginBottom:10}}>Joined as a patient / Doctor</Text>
                    <ListItem
                        title="Channels Joined"
                        containerStyle={styles.ListRow}
                        // onPress={() => this.onPressOptions()}
                    />
                    <View>
                        <Text>Channels</Text>
                        {/* {userChannels.map((l, i) => (
                            <ListItem
                                key={i}
                                containerStyle={styles.ListRow}
                                roundAvatar
                                leftAvatar={{source : require('../imgs/logo.jpeg')}}
                                title={l.channelName}
                                bottomDivider
                            />
                        ))} */}
                    </View>

                    <TouchableHighlight
                        style={{backgroundColor: "#2196F3" }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
            </Modal>

            <TouchableHighlight
        
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text>Show Modal</Text>
            </TouchableHighlight>
        </ImageBackground>
        
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
        height: 120,
        marginBottom: 15,
        width: 150,
        marginLeft:100,
        marginTop:90
        
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

export default modalScreen;