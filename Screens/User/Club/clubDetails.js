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


// const { game } = route.params;

function clubDetails() { 



    const [phone, setPhone] = useState('+911234567899');

    const [num, setNum] = useState('');
    const [clubName, setClub] = useState('');

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

    useEffect(() => {

        getData('userData')

            .then(response => {
                console.log('response');
                console.log(response);
                // setPhone('+911234567899')
                setNum(response.phone);

                firebase.firestore()
                    .collection('clubMembers').doc(response.phone)
                    .onSnapshot(documentSnapshot => {
                         if ((documentSnapshot.data().phone != null)) {

                        //     setClubAdvisor(documentSnapshot.data().ClubAdvisor)
                        //     setClubPresident(documentSnapshot.data().ClubPresident)

                        //     setFlag(true)
                        //     console.log("testing")
                         }
                    })


                    firebase.firestore().
                    collection('Users').
                    doc(response.phone).
                    onSnapshot(documentSnapshot => {
                        if (documentSnapshot != null) {
                            console.log(documentSnapshot.data().name)
                            setName(documentSnapshot.data().name)
                    
                            setDept( documentSnapshot.data().dept)
                          
                        }
                    })
            })
        firebase.firestore().collection('Club').onSnapshot(querySnapshot => {

            const array = [];

            querySnapshot.forEach(documentSnapshot => {
                setSize(querySnapshot.size);

                array.push({
                    ...documentSnapshot.data()
                })

                setDataSource(array)
            });

        })



    }, [])

    getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value

        }
    }

    const add = () => {
        firebase.firestore().collection('clubMembers').doc(phone).set({
            phone: phone,
            clubName: clubName,
            status: 'pending',
            applied: true,
            name:name

        })
        setFlag(false)
    }
    function Item({ data }) {
        return (
            <>
                <View>
                    <View>
                        <Text>Club Name: {data.ClubName}</Text>
                        <Text>Description: {data.ClubDescription}</Text>
                        <Text>Advisor: {data.ClubAdvisor}</Text>
                        <Text>Prsident: {data.ClubPresident}</Text>

                        <View style={styles.containerJoin}>
                            {
                                flag ?
                                    <TouchableOpacity style={styles.button}
                                    >
                                        <Text>Applied</Text>
                                    </TouchableOpacity>
                                    :

                                    <TouchableOpacity style={styles.button} onPress={() => add()}
                                    >
                                        <Text>Join</Text>
                                    </TouchableOpacity>

                            }

                        </View>
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
                                            <View style={{ flexDirection: 'column', alignItems: 'center', width: 100, margin: 10 }}>
                                                <Icon name="check-circle" size={60} color='#2ed573' />
                                                <Text style={styles.modalText}>Applied</Text>
                                            </View>
                                        </View>
                                    </View>

                                </Modal>

                                :

                                null

                        }
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => alert(flag)}
                >
                    <Text>Test</Text>
                </TouchableOpacity>
            </>

        );
    }



    return (

        <View>
            <View style={styles.joinHeader}>
                <Text style={styles.joinHeaderText}>
                    Club Details
            </Text>

            </View>
            {

                size > 0 ?
                    <FlatList
                        data={dataSource}
                        renderItem={({ item }) => <Item data={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    :
                    <Text>No Invitaions</Text>
            }
        </View>
    );



}

export default clubDetails
