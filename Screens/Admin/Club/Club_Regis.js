import React,{ useState } from 'react';
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

    function Regis(){

        firebase.firestore().collection('Club').doc(clubName).set({
            ClubName:clubName,
            ClubDescription:clubDescription,
            ClubAdvisor:clubAdvisor,
            ClubPresident:clubPresident
        })

    }


    return (
        <>

        <View style={styles.container}>
            <Text>Club Name</Text>
            <TextInput placeholder='CLUB NAME' onChangeText={(value)=>setClubName(value)}/>
        </View>

        <View style={styles.container}>
            <Text>Club Description</Text>
            <TextInput placeholder='DESCRIPTION' onChangeText={(value)=>setClubDescription(value)}/>
        </View>

        <View style={styles.container}>
            <Text>Staff Advisor</Text>
            <TextInput placeholder='Faculty Name' onChangeText={(value)=>setClubAdvisor(value)}></TextInput>
        </View>

        <View style={styles.container}>
            <Text>Club President</Text>
            <TextInput placeholder='Student Name' onChangeText={(value)=>setClubPresident(value)}></TextInput>
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>{Regis()}}> 
            <Text>Register</Text>
        </TouchableOpacity>
        
        </>
    );
}

export default Club_Regis;