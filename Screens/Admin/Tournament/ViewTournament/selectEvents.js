import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function selectTournament({ route, navigation }) {

    const { Dname } = route.params;

    const [dataSource, setDataSource] = useState([]);
    const [game, setGame] = useState('');


    useEffect(() => {

        firebase.firestore().collection('Team').doc(Dname).collection('phone').onSnapshot(querySnapShot => {
            const array = [];
            if (querySnapShot != null) {
                querySnapShot.forEach(documentSnapShot => {
                    array.push({
                        ...documentSnapShot.data()
                    });
                    setDataSource(array);
                })
            }
        })
        setGame(data.Game)

    }, [])



    function Item({ data }) {
        return (
            <View>
                <Text>
                    EVENT NAME : {data.Game}
                </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('viewTeams', { game: game }) }}>
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