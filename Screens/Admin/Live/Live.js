import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles';
import { RTCPeerConnection, RTCSessionDescription, RTCView, mediaDevices }
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


function Live() {

  const [localStream, setLocalStream] = useState(null);
  const [pc, setPc] = useState(new RTCPeerConnection(pc_config));

  useEffect(() => {

    const success = (stream) => {
      // console.log('stream.toURL:' + stream.toURL())
      setLocalStream(stream)
      pc.addStream(stream)
    }

    
    const failure = (e) => {
      // console.log('getUserMedia Error: ', e)
    }

    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      // console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      const constraints = {
        audio: true,
        video: {
          mandatory: {
            minWidth: 500,
            minHeight: 300,
            minFrameRate: 30
          },
          facingMode: (isFront ? "user" : "environment"),
          optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
        }
      }

      mediaDevices.getUserMedia(constraints)
        .then(success)
        .catch(failure);
    });

    firestore().
      collection('userSdp').
      onSnapshot(querySnapShot => {
        if (querySnapShot != null) {
          try{
            querySnapShot.forEach(documentSnapShot => {
              const desc = JSON.parse(documentSnapShot.data().sdp);
              pc.setRemoteDescription(new RTCSessionDescription(desc))
              console.log('admin ' + pc.signalingState)
            });
          }

          catch{(Err)=>{
            console.log(Err)
          }}

        }
      })


  }, []);

  const createOffer = () => {
    console.log('Offer')
    pc.createOffer({ offerToReceiveVideo: 1, offerToReceiveAudio: 1 })
      .then(sdp => {
        pc.setLocalDescription(sdp)
        firebase.firestore().
          collection('adminSdp').
          doc('sdp').
          set({
            sdp: JSON.stringify(sdp)
          })

      })
  }

  const End = () => {
    console.log('End')
    setPc(new RTCPeerConnection(pc_config))
    firebase.firestore().
      collection('adminSdp').
      doc('sdp').
      set({
        sdp: null
      })
    firebase.firestore().
      collection('userSdp').
      doc('sdp').
      set({
        sdp: null
      })
  }

  return (

    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.primaryColor} barStyle={'light-content'} />
      <View style={styles.videoContainer}>
        <RTCView
          key={1}
          zOrder={0}
          objectFit='cover'
          style={styles.RtcView}
          streamURL={localStream && localStream.toURL()}
        />
        <TouchableOpacity style={styles.liveBtn} onPress={() => { createOffer() }}>
          <Text style={{ color: '#fff' }}>Go Live</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.liveBtn} onPress={() => { End() }}>
          <Text style={{ color: '#fff' }}>End Live</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Live;