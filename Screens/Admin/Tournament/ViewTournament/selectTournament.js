import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function selectTournament(props) {

    const [dataSource, setDataSource] = useState([]);


    useEffect(() => {

        
        firebase.firestore().collection('Team').onSnapshot(querySnapshot => {
            const data = [];
            querySnapshot.forEach(documentSnapshot => {
                //console.log(documentSnapshot.data())
                data.push({
                    ...documentSnapshot.data()
                })
                setDataSource(data)
            })

        })


 
     }, [])




    function Item({ data }) {
        return (
            <View>
                <Text>
                    TOURNAMENT NAME :{data.Tname}
                </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('selectEvents', { Dname: data.Tname }) }} >
                    <Text>ENTER</Text>
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

export default selectTournament;