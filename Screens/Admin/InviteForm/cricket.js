import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './styles';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function Cricket({ route }) {

    const [dept, setDept] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');
    const [Sports, setSports] = useState('');
    const [dataSource, setDatasource] = useState([]);

    const { game } = route.params;


    useEffect(() => {
        const date = new Date();

        firebase.firestore().
        collection('Sports').where('due', '>=', date).
        onSnapshot(querySnapShot => {
          const array = [];
          if (querySnapShot != null) {
            querySnapShot.forEach(documentSnapShot => {
              array.push({
                ...documentSnapShot.data()
              });
              setDatasource(array);
              // getChampImage(yr);
              
            });
          }
        })

    },[])

    // useEffect(() => {
    //     firestore()
    //         .collection('userSdp')
    //         .doc(JSON.stringify(1))
    //         .onSnapshot(documentSnapshot => {
    //             console.log('User data: ', JSON.parse(documentSnapshot.data().sdp));
    //         });
    // })

    const sendData = () => {
        console.log('Here')
        console.log(dept + year + gender)
        firebase.firestore().
            collection('Sports').
            doc(JSON.parse(JSON.stringify(game))).
            set({
                dept: dept,
                gender: gender,
                year: year
            })
    }


    function Item({ data }) {
        return (


            <View>
                <Text style={{alignSelf:'center'}}>{data.item}</Text>
                <TouchableOpacity style={{alignSelf:'center'}}><Text>Apply</Text></TouchableOpacity>
            </View>


        )
    }

    return (

        <View style={styles.container}>
            <Text>{JSON.parse(JSON.stringify(game))}</Text>
            <TextInput placeholder="Dept" onChangeText={(value) => { setDept(value) }} />
            <TextInput placeholder="Year" onChangeText={(value) => { setYear(value) }} />
            <TextInput placeholder="Gender" onChangeText={(value) => { setGender(value) }} />
            <TouchableOpacity style={{ backgroundColor: '#CCCCCC', padding: 20, margin: 10, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { sendData() }}
            >
                <Text style={{ color: '#000000', fontSize: 24 }}>Invite</Text>
            </TouchableOpacity>
            <FlatList
                data={dataSource}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default Cricket;