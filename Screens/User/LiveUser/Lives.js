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

function Lives() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
      firebase.firestore().
        collection('adminSdp').
        onSnapshot(querySnapShot => {
          createAnswer();
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
      collection('adminSdp').
      onSnapshot(querySnapShot => {
        if (querySnapShot != null) {
          querySnapShot.forEach(documentSnapShot => {
            console.log(documentSnapShot.data().sdp);
            const desc = JSON.parse(documentSnapShot.data().sdp);
            pc.setRemoteDescription(new RTCSessionDescription(desc))
          });
        }
      })
    firestore().
      collection('adminCandidate').
      onSnapshot(querySnapShot => {
        if (querySnapShot != null) {
          querySnapShot.forEach(documentSnapShot => {
            console.log(documentSnapShot.data().sdp);
            const cand = (documentSnapShot.data().candidate);
            pc.addIceCandidate(new RTCIceCandidate(cand))
          });
        }
      })
    return () => subscriber()
  }, []);


  const createAnswer = () => {
    setStart(true);
    console.log('Answer')
    pc.createAnswer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        console.log(JSON.stringify(sdp))
        firebase.firestore().
          collection('userSdp').
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
        objectFit='cover'
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