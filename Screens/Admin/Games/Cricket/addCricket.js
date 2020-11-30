import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

function addCricket({route}) {

    const[level,setLevel] = useState('');
    const[name,setName] = useState('');
    const[teamOne,setTeamOne] = useState('');
    const[teamTwo,setTeamTwo] = useState('');
    const[overs,setOvers] = useState('');

    const {Tname} = route.params

    const sendData = ()=>{
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
        .collection('Scores').doc(name).set({
            Match_name:name,
            Match_level:level,
            Overs:overs,
            Team1:teamOne,
            Team2:teamTwo,
        })
    }

    const update = ()=>{
        // firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
        // .collection('Scores').where('Match_name', '==', 'Match1').get().then(querySnapshot =>{
        //     querySnapshot.forEach(doc=>{
        //         console.log(doc.data())
        //     })
        // })
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
        .collection('Scores').doc('A').update({
            Match_name:'Thatsit'
        })
    }

    
    return (
        <View style={styles.container}>
            <TextInput placeholder='game level' onChangeText={(value)=>{setLevel(value)}}/>
            <TextInput placeholder='game name' onChangeText={(value)=>{setName(value)}}/>
            <TextInput placeholder='Team1' onChangeText={(value)=>{setTeamOne(value)}}/>
            <TextInput placeholder='Team2' onChangeText={(value)=>{setTeamTwo(value)}}/>
            <TextInput placeholder='Overs' onChangeText={(value)=>{setOvers(value)}}/>
            <TouchableOpacity onPress={()=>{sendData()}}>
                <Text>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{update()}}>
                <Text>update</Text>
            </TouchableOpacity>
        </View>
    );
}

export default addCricket;