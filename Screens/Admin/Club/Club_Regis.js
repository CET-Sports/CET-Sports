import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    TextInput,
    View,

} from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import styles from '../Club/styles';

function Club_Regis(props) {

    const [clubName, setClubName] = useState('');
    const [clubDescription, setClubDescription] = useState('');
    const [clubAdvisor, setClubAdvisor] = useState('');
    const [clubPresident, setClubPresident] = useState('');

    function Regis() {

        firebase.firestore().collection('Club').doc(clubName).set({
            ClubName: clubName,
            ClubDescription: clubDescription,
            ClubAdvisor: clubAdvisor,
            ClubPresident: clubPresident
        })

    }


    return (
        <View style={{ margin: 25 }}>
            <TextInput placeholder='CLUB NAME' onChangeText={(value) => setClubName(value)} style={styles.textinputS} />


            <TextInput placeholder='DESCRIPTION' onChangeText={(value) => setClubDescription(value)} style={styles.textinputS} />



            <TextInput placeholder='Faculty Name' onChangeText={(value) => setClubAdvisor(value)} style={styles.textinputS} />



            <TextInput placeholder='Student Name' onChangeText={(value) => setClubPresident(value)} style={styles.textinputS} />


            <TouchableOpacity style={styles.button} onPress={() => { Regis() }} style={{...styles.btn, alignSelf:'center'}}>
                <Text style={styles.btnTxt}>Register</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Club_Regis;