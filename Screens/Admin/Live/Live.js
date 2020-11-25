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
// let socket = null
let candidates = []

let i;



const pc_config = {
  "iceServers": [
    // {
    //   urls: 'stun:[STUN_IP]:[PORT]',
    //   'credentials': '[YOR CREDENTIALS]',
    //   'username': '[USERNAME]'
    // },
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
}

// let pc = new RTCPeerConnection(pc_config)

function Live() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [test, setTest] = useState(0);
  const [limit, setLimit] = useState(0);




  useEffect(() => {

    // pc.onicecandidate = (e) => {
    //   // send the candidates to the remote peer
    //   // see addCandidate below to be triggered on the remote peer
    //   if (e.candidate) {
    //     console.log(JSON.stringify(e.candidate))
    //     // sendToPeer('candidate', e.candidate)
    //     firebase.firestore().
    //       collection('adminCandidate').
    //       doc('candidate').
    //       set({
    //         candidate: e.candidate
    //       })
    //   }
    // }

    // // triggered when there is a change in connection state
    // pc.oniceconnectionstatechange = (e) => {
    //   console.log(e)
    // }

    // pc.onaddstream = (e) => {
    //   debugger
    //   // this.remoteVideoref.current.srcObject = e.streams[0]
    //   setRemoteStream(e.stream)
    // }

    // const success = (stream) => {
    //   console.log('stream.toURL:' + stream.toURL())
    //   setLocalStream(stream)
    //   pc.addStream(stream)
    // }

    // const failure = (e) => {
    //   console.log('getUserMedia Error: ', e)
    // }

    // let isFront = true;
    // mediaDevices.enumerateDevices().then(sourceInfos => {
    //   console.log(sourceInfos);
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
    //         minWidth: 500, // Provide your own width, height and frame rate here
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

    //if firestore is empty this code returns error ->  undefined is not an object JSON parse error

    // const test = ()=>{
    //   // firebase.firestore().collection("userSdp").get().then(function (querySnapshot) {
    //   //   console.log(querySnapshot.size);
    //   // });
    //   console.log('Helloooooooooooooooooooooooooooooooo')
    // };
    // return () => test()

    const subscriber =
      // firestore().
      //   collection('userSdp').
      //   onSnapshot(querySnapShot => {
      //     const data = [];
      //     if (querySnapShot != null) {
      //       querySnapShot.forEach(documentSnapShot => {
      //         console.log(documentSnapShot.data().sdp);
      //         const desc = JSON.parse(documentSnapShot.data().sdp);
      //         pc.setRemoteDescription(new RTCSessionDescription(desc))
      //       });
      //     }
      //   })
      firestore().
        collection('userSdp').
        onSnapshot(querySnapShot => {
          querySnapShot.forEach(documentSnapShot => {
            // if (querySnapShot.size != test) {
            //   createNewConnection(querySnapShot.size, limit);
            //   setTest(querySnapShot.size);
            //   setLimit(querySnapShot.size);
            // }
            // createNewConnection(1, 5)
          });

          createOffer = (pc, i) => {
            console.log('Offer')
        
            // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
            // initiates the creation of SDP
        
            pc.createOffer({ offerToReceiveVideo: 1, offerToReceiveAudio: 1 })
              .then(sdp => {
                console.log(JSON.stringify(sdp))
                firebase.firestore().
                  collection('adminSdp').
                  doc(JSON.stringify(i)).
                  set({
                    sdp: JSON.stringify(sdp)
                  })
        
                // set offer sdp as local description
                pc.setLocalDescription(sdp)
        
                pc.onicecandidate = (e) => {
                  // send the candidates to the remote peer
                  // see addCandidate below to be triggered on the remote peer
                  if (e.candidate) {
                    console.log(JSON.stringify('e.candidate'))
                    console.log(JSON.stringify(e.candidate))
                    // // sendToPeer('candidate', e.candidate)
                    firebase.firestore().
                      collection('adminCandidate').
                      doc(JSON.stringify(i)).
                      set({
                        candidate: e.candidate
                      })
                  }
                }
        
        
        
                // sendToPeer('offerOrAnswer', sdp)
              })
          }

          createNewConnection = (limit, offset) => {

            for (i = limit; i <= offset; i++) {
        
              let pc = new RTCPeerConnection(pc_config);
        
              firestore()
                .collection('userSdp')
                .doc(JSON.stringify(1))
                .onSnapshot(documentSnapshot => {
                  // console.log('User data: ', documentSnapshot.data());
                  try {
                    
                      const desc = JSON.parse(documentSnapshot.data().sdp);
                      pc.setRemoteDescription(new RTCSessionDescription(desc))
                    
                  }
                  catch{(err)=>{
                    console.log(err);
                  }}
        
              });
        
              pc.oniceconnectionstatechange = (e) => {
                console.log(e)
              }
        
              pc.onaddstream = (e) => {
                debugger
                // this.remoteVideoref.current.srcObject = e.streams[0]
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
                      minWidth: 500, // Provide your own width, height and frame rate here
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
        
              createOffer(pc, i);
        
              pc.onicecandidate = (e) => {
                // send the candidates to the remote peer
                // see addCandidate below to be triggered on the remote peer
                if (e.candidate) {
                  console.log(JSON.stringify('e.candidate'))
                  console.log(JSON.stringify(e.candidate))
                  // // sendToPeer('candidate', e.candidate)
                  firebase.firestore().
                    collection('adminCandidate').
                    doc(JSON.stringify(i)).
                    set({
                      candidate: e.candidate
                    })
                }
              }
            }
          }

        })
    return () => subscriber()
  }, []);



  createAnswer = () => {
    console.log('Answer')
    pc.createAnswer({ offerToReceiveVideo: 1, offerToReceiveAudio: 1 })
      .then(sdp => {
        // console.log(JSON.stringify(sdp))

        // set answer sdp as local description
        pc.setLocalDescription(sdp)
      })
  }




  createNewConnection = (limit, offset) => {

    for (i = limit; i <= offset; i++) {

      let pc = new RTCPeerConnection(pc_config);

      firestore()
        .collection('userSdp')
        .doc(JSON.stringify(1))
        .onSnapshot(documentSnapshot => {
          // console.log('User data: ', documentSnapshot.data());
          try {
            if (documentSnapshot.data != null) {
              const desc = JSON.parse(documentSnapshot.data().sdp);
              pc.setRemoteDescription(new RTCSessionDescription(desc))
            }
          }
          catch{(err)=>{
            console.log(err);
          }}

      });

      pc.oniceconnectionstatechange = (e) => {
        console.log(e)
      }

      pc.onaddstream = (e) => {
        debugger
        // this.remoteVideoref.current.srcObject = e.streams[0]
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
              minWidth: 500, // Provide your own width, height and frame rate here
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

      createOffer(pc, i);

      pc.onicecandidate = (e) => {
        // send the candidates to the remote peer
        // see addCandidate below to be triggered on the remote peer
        if (e.candidate) {
          console.log(JSON.stringify('e.candidate'))
          console.log(JSON.stringify(e.candidate))
          // // sendToPeer('candidate', e.candidate)
          firebase.firestore().
            collection('adminCandidate').
            doc(JSON.stringify(i)).
            set({
              candidate: e.candidate
            })
        }
      }
    }
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
      <Text style={{ alignSelf: 'center' }}>{test}</Text>
      <Text style={{ alignSelf: 'center' }}>{limit}</Text>
      <StatusBar backgroundColor={colors.primaryColor} barStyle={'light-content'} />
      <View style={styles.videoContainer}>
        <RTCView
          key={1}
          zOrder={0}
          objectFit='cover'
          style={styles.RtcView}
          streamURL={localStream && localStream.toURL()}
        />
        <TouchableOpacity style={styles.liveBtn} onPress={() => { createNewConnection(1, 5) }}>
          <Text style={{ color: '#fff' }}>Go Live</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Live;
