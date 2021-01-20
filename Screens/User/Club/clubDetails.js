import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal

} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../../Colors/colors';


// const { game } = route.params;

function clubDetails({ route }) {



    const [phone, setPhone] = useState('');

    const [num, setNum] = useState('');
    const { clb } = route.params;

    const [ds, setDs] = useState('hello')

    const [dataSource, setDataSource] = useState([]);
    const [size, setSize] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [applied, setApplied] = useState(false);
    const [flag, setFlag] = useState(false)
    const [name, setName] = useState('');
    const [dept, setDept] = useState();
    const [clubAdvisor, setClubAdvisor] = useState('');
    const [clubPresident, setClubPresident] = useState('');
    const [ClubName, setClubName] = useState('');
    const [sem, setSem] = useState('');
    const [desc, setDesc] = useState('')

    useEffect(() => {

        getData('userData')

            .then(response => {
                console.log('response');
                console.log(response);
                // setPhone('+911234567899')
                setNum(response.phone);


                checkClub(response.phone)



                firebase.firestore().
                    collection('Users').
                    doc(response.phone).
                    onSnapshot(documentSnapshot => {
                        if (documentSnapshot != null) {
                            console.log(documentSnapshot.data().name)
                            setName(documentSnapshot.data().name)
                            setDept(documentSnapshot.data().dept)
                            setSem(documentSnapshot.data().sem)

                        }
                    })
            })




        firebase.firestore().
            collection('Club').
            doc(clb).
            onSnapshot(documentSnapshot => {
                if (documentSnapshot != null) {
                    console.log(documentSnapshot.data().name)
                    setClubName(documentSnapshot.data().ClubName)
                    console.log(documentSnapshot.ClubName)
                    setClubAdvisor(documentSnapshot.data().ClubAdvisor)
                    setClubPresident(documentSnapshot.data().ClubPresident)
                    setDesc(documentSnapshot.data().ClubDescription)

                }
            })




    }, [])


    const checkClub = (val) => {
        firebase.firestore().collection('clubMembers').where('phone', '==', val).where('ClubName', '==', clb).get().then(querySnapshot => {

            querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot.data())
                if (documentSnapshot.data() != undefined) {
                    console.log("check" + documentSnapshot.data())
                    if ((documentSnapshot.data().phone) != null) {
                        setFlag(true)
                        console.log("testing")
                    }
                }
            })
        })
    }


    getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value

        }
    }

    const add = () => {

        //console.log("Entering...." + num)


        firebase.firestore().collection('clubMembers').doc().set({
            phone: num,
            status: "pending",
            ClubName: clb,
            name: name,
            dept: dept,
            sem: sem
        })
        checkClub(num)
        setFlag(false)
    }

    return (

        <View style={styles.gameBtn}>
            <Text style={styles.txt}>Club Name: {ClubName}</Text>
            <Text style={styles.txt}>Description: {desc}</Text>
            <Text style={styles.txt}>Advisor: {clubAdvisor}</Text>
            <Text style={styles.txt}>Prsident: {clubPresident}</Text>

            <View style={styles.containerJoin}>
                {
                    flag ?
                        <TouchableOpacity style={styles.button}
                        >
                            <Text style={styles.txt}>Applied</Text>
                        </TouchableOpacity>
                        :

                        <TouchableOpacity style={styles.button} onPress={() => add()}
                        >
                            <Text style={{...styles.txt,color:colors.primaryColor}}>Join</Text>
                        </TouchableOpacity>

                }

            </View>
        </View>

    )

}


export default clubDetails;