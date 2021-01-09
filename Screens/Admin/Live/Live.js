import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, View, Text, StatusBar, TouchableOpacity, Dimensions, TextInput } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);

  // const [pc, setPc] = useState([]);





  useEffect(() => {

    // pc.oniceconnectionstatechange = (e) => {
    //   // console.log(e)
    // }

    // pc.onaddstream = (e) => {
    //   debugger
    //   setRemoteStream(e.stream)
    // }

    // const success = (stream) => {
    //   // console.log('stream.toURL:' + stream.toURL())
    //   setLocalStream(stream)
    //   pc.addStream(stream)
    // }

    // const failure = (e) => {
    //   // console.log('getUserMedia Error: ', e)
    // }

    // let isFront = true;
    // mediaDevices.enumerateDevices().then(sourceInfos => {
    //   // console.log(sourceInfos);
    //   let videoSourceId;
    //   for (let i = 0; i < sourceInfos.length; i++) {
    //     const sourceInfo = sourceInfos[i];
    //     if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
    //       videoSourceId = sourceInfo.deviceId;
    //     }
    //   }

    //   const constraints = {
    //     audio: true,
    //     video: {
    //       mandatory: {
    //         minWidth: 500,
    //         minHeight: 300,
    //         minFrameRate: 30
    //       },
    //       facingMode: (isFront ? "user" : "environment"),
    //       optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
    //     }
    //   }

    //   mediaDevices.getUserMedia(constraints)
    //     .then(success)
    //     .catch(failure);
    // });



    const subscriber = firestore().
      collection('userSdp').
      onSnapshot(querySnapShot => {
        if (querySnapShot != null) {
          querySnapShot.forEach(documentSnapShot => {
            // console.log(documentSnapShot.data().sdp);
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
        // console.log(JSON.stringify(sdp))
        firebase.firestore().
          collection('adminSdp').
          doc('sdp').
          set({
            sdp: JSON.stringify(sdp)
          })
        pc.setLocalDescription(sdp)
      })

    setModalVisible(false)
  }

  const setModal = () => {
    // createOffer()
    setModalVisible(true)
  }

  const createConnection1 = () => {

    let pc1 = new RTCPeerConnection(pc_config)

    pc1.oniceconnectionstatechange = (e) => {
      // console.log(e)
    }

    pc1.onaddstream = (e) => {
      debugger
      setRemoteStream(e.stream)
    }

    const success = (stream) => {
      // console.log('stream.toURL:' + stream.toURL())
      setLocalStream(stream)
      pc1.addStream(stream)
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

    pc1.createOffer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        // console.log(JSON.stringify(sdp))
        firebase.firestore().
          collection('admin1').
          doc('sdp').
          set({
            sdp: JSON.stringify(sdp)
          })
        pc1.setLocalDescription(sdp)
      })
  }

  const createConnection2 = () => {

    let pc2 = new RTCPeerConnection(pc_config)

    pc2.oniceconnectionstatechange = (e) => {
      // console.log(e)
    }

    pc2.onaddstream = (e) => {
      debugger
      setRemoteStream(e.stream)
    }

    const success = (stream) => {
      // console.log('stream.toURL:' + stream.toURL())
      setLocalStream(stream)
      pc2.addStream(stream)
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
    pc2.createOffer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        // console.log(JSON.stringify(sdp))
        firebase.firestore().
          collection('admin2').
          doc('two').
          set({
            sdp: JSON.stringify(sdp)
          })
        pc2.setLocalDescription(sdp)
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
        <TouchableOpacity style={styles.liveBtn} onPress={() => { setModal() }}>
          <Text style={{ color: '#fff' }}>Go Live</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="sdp1"
          onChange={(value) => { setLocalDescription1(value) }}
        />
        <TextInput
          placeholder="sdp2"
          onChange={(value) => { setLocalDescription2(value) }}
        />

        {
          modalVisible ?
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => { setModalVisible(false) }}
            >

              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text>You are going live now...</Text>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => createConnection1()} style={styles.Button}>
                      <Text style={styles.btnText}>one</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => createConnection2()} style={styles.Button}>
                      <Text style={styles.btnText}>two</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.Button}>
                      <Text style={styles.btnText}>CANCEL</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </Modal> :

            null
        }
      </View>
    </ScrollView>
  );
}

export default Live;