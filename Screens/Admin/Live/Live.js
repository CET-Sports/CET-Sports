import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
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

function Live() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [start, setStart] = useState(false);




  useEffect(() => {

      firebase.firestore().
      collection('userSdp').
      onSnapshot(querySnapShot => {
          createOffer();
      })

    pc.oniceconnectionstatechange = (e) => {
      console.log(e)
    }

    pc.onaddstream = (e) => {
      debugger
      setRemoteStream(e.stream)
    }

    const success = (stream) => {
      console.log('stream.toURL:' + stream.toURL())
      setLocalStream(stream)
      pc.addStream(stream)
    }

    const failure = (e) => {
      console.log('getUserMedia Error: ', e)
    }

    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
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

    const subscriber = firestore().
      collection('userSdp').
      onSnapshot(querySnapShot => {
        const data = [];
        if (querySnapShot != null) {
          querySnapShot.forEach(documentSnapShot => {
            console.log(documentSnapShot.data().sdp);
            const desc = JSON.parse(documentSnapShot.data().sdp);
            pc.setRemoteDescription(new RTCSessionDescription(desc))
          });
        }
      })
    return () => subscriber()
  }, []);

  const createOffer = () => {
    console.log('Offer')
    pc.createOffer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        console.log(JSON.stringify(sdp))
        firebase.firestore().
          collection('adminSdp').
          doc('sdp').
          set({
            sdp: JSON.stringify(sdp)
          })
        pc.setLocalDescription(sdp)
      })
  }




  const remoteVideo = remoteStream ?
    (
      <RTCView
        key={2}
        mirror={true}
        style={{ ...styles.rtcViewRemote }}
        objectFit='contain'
        streamURL={remoteStream && remoteStream.toURL()}
      />
    ) :
    (
      <View style={{ padding: 15, }}>
        <Text style={{ fontSize: 22, textAlign: 'center', color: 'white' }}>Waiting for Peer connection ...</Text>
      </View>
    )

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
      </View>
    </ScrollView>
  );
}

export default Live;