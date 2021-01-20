import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function selectTournament({ route, navigation }) {

    //const { game } = route.params;
    const { Dname } = route.params;


    const { Dname } = route.params;
    const { Tname } = route.params;


    const [dataSource, setDataSource] = useState([]);


    useEffect(() => {
         firebase.firestore().collection('Team').doc(Dname).collection('phones').where('teamName','==',Tname).get().then(querySnapShot => {
        const array = [];
        if (querySnapShot != null) {
            querySnapShot.forEach(documentSnapShot => {
                array.push({
                    ...documentSnapShot.data()
                });
                setDataSource(array);
            })
        }
    }) }, [])


    function Item({ data }) {
        return (
            <View>
                <Text>
                    TEAM NAME :{data.teamName}
                </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('teamMembers', { Dname: Dname, Tname: data.teamName }) }}>
                    <Text>VIEW MEMBERS</Text>
                    <Text>{data.player1}</Text>
                    <Text>{data.player2}</Text>
                    <Text>{data.player3}</Text>
                    <Text>{data.player4}</Text>
                    <Text>{data.player5}</Text>
                    <Text>{data.player6}</Text>
                    <Text>{data.player7}</Text>
                    <Text>{data.player8}</Text>
                    <Text>{data.player9}</Text>
                    <Text>{data.player10}</Text>
                    <Text>{data.player11}</Text>
                    <Text>{data.player12}</Text>
                    <Text>{data.player13}</Text>
                    <Text>{data.player14}</Text>
                    <Text>{data.player15}</Text>
                    <Text>phone{data.phone}</Text>
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