import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function updateCricket({ route }) {

    const { mName } = route.params
    const { Tname } = route.params
    const [run, setRun] = useState('');
    const [overs, setOvers] = useState('');

    useEffect(() => {

    }, [])

    const upadateGame = ()=>{
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
        .collection('Scores').doc(mName).update({
            runs:run,
            Overs:overs
        })
    }

    return (
        <View>
            <TextInput
                placeholder='runs'
                onChangeText={(value) => setRun(value)}
            />
            <TextInput
                placeholder='overs'
                onChangeText={(value) => setOvers(value)}
            />
            <TouchableOpacity onPress={()=>{upadateGame()}}>
                <Text>update</Text>
            </TouchableOpacity>
        </View>
    );
}

export default updateCricket;