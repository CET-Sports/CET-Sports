import React,{useState,useEffect} from 'react';
import styles from './styles';
import {
    View,
    Text,
    TouchableOpacity,

} from 'react-native';
import { firebase } from '@react-native-firebase/auth';

function joinClub(props) {

    //const [clubName,setClubName]=useState('');
    const [dataSource,setDataSource]=useState([]);

    useEffect(() => {

        const array = [];

        firebase.firestore().collection('Club').onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {

                array.push(...documentSnapshot.data().ClubName)

                console.log(documentSnapshot.data())
            });

            setDataSource(array)

        })



    })

    return (
        <>
        <View style={styles.joinHeader}>
            <Text style={styles.joinHeaderText}>
            JoinAClub
            </Text>

        </View>
        <View style={styles.containerJoin}>
            <TouchableOpacity style={styles.button}>
                <Text>Cycling Club</Text>
            </TouchableOpacity>
        </View>
        </>
        
    );
}

export default joinClub;