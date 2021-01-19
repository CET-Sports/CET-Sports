import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function viewTournament({ navigation }) {

    const [dataSource, setDataSource] = useState([]);
    const array = [];

    useEffect(() => {

        firebase.firestore().collection('Tournaments').onSnapshot(querySnapShot => {

            if (querySnapShot != null) {
                querySnapShot.forEach(documentSnapshot => {
                    array.push({
                        ...documentSnapshot.id
                    });
                    setDataSource(array);
                    console.log(documentSnapshot.id)
                })
            }
        })

    }, [])


    function Item({ data }) {
        return (
            <View>
                <Text>{data[0, 1]}</Text>
                {/* add tournament name from database above */}
                <TouchableOpacity onPress={() => { navigation.navigate('viewEvents') }}>
                    <Text>Enter This Tournament</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={dataSource}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={(item, index) => index.toString()}
            />

        </View>
    );
}

export default viewTournament;