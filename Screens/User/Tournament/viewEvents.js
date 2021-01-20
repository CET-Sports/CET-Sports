import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


function viewEvents({route,navigation}) {
    const { Tname } = route.params;
    const[Game,setGame]=useState('')
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {

       
        console.log(dataSource)
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').onSnapshot(querySnapShot => {
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

    }, []);

    function Item({ data }) {
       
        setGame(data.name)
        console.log("Tname"+data.name)

        return (
            <TouchableOpacity  onPress={() => {
                navigation.navigate('regisTeam',{
                    Tname: Tname,Game:Game
                })
            }}>
                <Text >{data.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={dataSource}
            renderItem={({ item }) => <Item data={item} />}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}

export default viewEvents;