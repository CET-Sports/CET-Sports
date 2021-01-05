import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles';
import { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStream, MediaStreamTrack, mediaDevices, registerGlobals }
  from 'react-native-webrtc';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../../Colors/colors';

const dimensions = Dimensions.get('window');

let sdp

const pc_config = {
  "iceServers": [
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
}

let pc = new RTCPeerConnection(pc_config)

function Lives() {

  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {


    pc.onaddstream = (e) => {
      debugger
      setRemoteStream(e.stream)
    }

  }, []);


  const createAnswer = () => {
    try {
      console.log('Answer')
      firestore().
        collection('adminSdp').
        onSnapshot(querySnapShot => {
          if (querySnapShot != null) {
            
            querySnapShot.forEach(documentSnapShot => {
              
              const desc = JSON.parse(documentSnapShot.data().sdp);
              pc.setRemoteDescription(new RTCSessionDescription(desc))
              pc.createAnswer({ offerToReceiveVideo: 1 })
                .then(sdp => {
                  try{
                  pc.setLocalDescription(sdp)
                  firebase.firestore().collection('userSdp').doc('sdp').set({
                    sdp: JSON.stringify(sdp)
                  })
                }
                catch{}
                })
              
              
            });
          
          
          }


        })
    }

    catch {
      (Err) => {
        console.log(Err)
      }
    }
    console.log('user ' + pc.signalingState)

  }


  return (

    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.primaryColor} barStyle={'light-content'} />
      <View style={styles.videoContainer}>
        <RTCView
          key={2}
          mirror={true}
          style={styles.RtcView}
          objectFit='contain'
          streamURL={remoteStream && remoteStream.toURL()}
        />
        <TouchableOpacity style={styles.liveBtn} onPress={() => { createAnswer() }}>
          <Text style={{ color: '#fff' }}>Watch Live</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Lives;