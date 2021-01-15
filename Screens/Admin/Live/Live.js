import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Button, View, Image } from 'react-native';

import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
import { db } from '../../../utilities/firebase';
import styles from './styles';

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function CallScreen({ setScreen, screens, roomId }) {

  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setCachedLocalPC();
    setStarted(false);
    db.collection('Id').doc('Id').set({
      id: -1
    })
    for (let i = 0; i < 10; i++) {
      db.collection('rooms').doc('id' + i).delete()
    }
    // cleanup
  }

  const [localStream, setLocalStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();
  const [started, setStarted] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    startLocalStream();
  }, []);

  const startLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const startCall = async () => {
    setStarted(true);
    db.collection('Id').doc('Id').set({
      id:0
    })
    for (let i = 0; i < 10; i++) {
      const localPC = new RTCPeerConnection(configuration);
      localPC.addStream(localStream);

      const roomRef = await db.collection('rooms').doc('id' + i);
      const callerCandidatesCollection = roomRef.collection('callerCandidates');
      localPC.onicecandidate = e => {
        if (!e.candidate) {
          console.log('Got final candidate!');
          return;
        }
        callerCandidatesCollection.add(e.candidate.toJSON());
      };

      // localPC.onaddstream = e => {
      //   if (e.stream && remoteStream !== e.stream) {
      //     console.log('RemotePC received the stream call', e.stream);
      //     setRemoteStream(e.stream);
      //   }
      // };

      const offer = await localPC.createOffer();
      await localPC.setLocalDescription(offer);

      const roomWithOffer = { offer };
      await roomRef.set(roomWithOffer);

      roomRef.onSnapshot(async snapshot => {
        const data = snapshot.data();
        if (!localPC.currentRemoteDescription && data.answer) {
          const rtcSessionDescription = new RTCSessionDescription(data.answer);
          await localPC.setRemoteDescription(rtcSessionDescription);
        }
      });

      roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(async change => {
          if (change.type === 'added') {
            let data = change.doc.data();
            await localPC.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });

      setCachedLocalPC(localPC);
    }

  };


  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    // if (!remoteStream) {
    //   return;
    // }
    localStream.getAudioTracks().forEach(track => {
      // console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };


  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>


      {/* {localStream && (
        <View style={styles.toggleButtons}>
          <Button title='Switch camera' onPress={switchCamera} />
          <Button title={`${isMuted ? 'Unmute' : 'Mute'} stream`} onPress={toggleMute} />
        </View>
      )} */}

      <View style={{ display: 'flex', flex: 1, padding: 10 }} >
        <View style={styles.rtcview}>
          {localStream && <RTCView style={styles.rtc} streamURL={localStream && localStream.toURL()} />}
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
            <TouchableOpacity style={styles.rounded} onPress={() => startCall()}>
              <Image source={require('../../../Images/video.png')} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
        }
        <TouchableOpacity style={styles.rounded} onPress={switchCamera}>
          <Image source={require('../../../Images/switch.png')} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>


      </View>

    </View>
  )
}

