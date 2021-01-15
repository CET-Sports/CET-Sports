import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button, View, TouchableOpacity, Image } from 'react-native';

import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
import { db } from '../../../utilities/firebase';

import styles from './styles';

// import InCallManager from 'react-native-incall-manager';

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function JoinScreen({ setScreen, screens, roomId }) {

  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(remoteStream);
      cachedLocalPC.close();
    }
    setRemoteStream();
    setCachedLocalPC();
    setStarted(false);
  }

  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();
  const [_id, setId] = useState();

  const [isMuted, setIsMuted] = useState(false);

  const [started, setStarted] = useState(false);

  useEffect(() => {

    db.collection('Id').doc('Id').onSnapshot(documentSnapshot =>{
      if(documentSnapshot.data().id === -1){
        onBackPress()
      }
    })

    db.collection('Id').doc('Id').onSnapshot(documentSnapshot =>{
      setId(documentSnapshot.data().id);
    })

  }, []);



  const joinCall = async () => {
    setStarted(true);
    const roomRef = await db.collection('rooms').doc('id'+_id);
    const roomSnapshot = await roomRef.get();
    
    if (!roomSnapshot.exists) return
    const localPC = new RTCPeerConnection(configuration);

    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    localPC.onicecandidate = e => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      calleeCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = e => {
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream join', e.stream);
        setRemoteStream(e.stream);
      }
    };

    const offer = roomSnapshot.data().offer;
    await localPC.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await localPC.createAnswer();
    await localPC.setLocalDescription(answer);

    const roomWithAnswer = { answer };
    await roomRef.update(roomWithAnswer);

    roomRef.collection('callerCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          await localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    // InCallManager.setSpeakerphoneOn(true);

    setCachedLocalPC(localPC);

    db.collection('Id').doc('Id').set({
      id:_id+1
    })
  };



  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
  };


  return (
    <View style={{ display: 'flex', flex: 1}}>
      {/* <Text style={styles.heading} >Join Screen</Text>

      <View style={styles.callButtons} >
        <View styles={styles.buttonContainer} >
          <Button title="Click to stop call" onPress={onBackPress} />
        </View>
        <View styles={styles.buttonContainer} >
          <Button title='Click to join call' onPress={() => joinCall()}/>
        </View>
      </View> */}

      {/* {(
        <View style={styles.toggleButtons}>
          <Button title={`${isMuted ? 'Unmute' : 'Mute'} stream`} onPress={toggleMute} disabled={!remoteStream} />
        </View>
      )} */}

      <View style={{ display: 'flex', flex: 1, padding: 10 }} >
        <View style={styles.rtcview}>
          {remoteStream && <RTCView style={styles.rtc} streamURL={remoteStream && remoteStream.toURL()} />}
        </View>
      </View>

      <View style={styles.liveBtnContainer}>
        {
          isMuted ?
            <TouchableOpacity style={styles.rounded} onPress={toggleMute}>
              <Image source={require('../../../Images/unmute.png')} style={{ height: 30, width: 30 }} />
            </TouchableOpacity> :
            <TouchableOpacity style={styles.rounded} onPress={toggleMute}>
              <Image source={require('../../../Images/mute.png')} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>

        }
        {
          started ?
            <TouchableOpacity style={styles.rounded} onPress={onBackPress}>
              <Image source={require('../../../Images/stop.png')} style={{ height: 40, width: 40 }} />
            </TouchableOpacity> :
            <TouchableOpacity style={styles.rounded} onPress={() => joinCall()}>
              <Image source={require('../../../Images/video.png')} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
        }


      </View>

    </View>
  )
}

