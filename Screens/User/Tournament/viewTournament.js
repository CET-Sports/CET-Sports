import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList, ScrollView } from 'react-native';

import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
function ViewTournament({navigation}) {

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('Tournaments').onSnapshot(querySnapshot=>{
            setDataSource([]);
            const array = [];

                firebase.firestore().collection('Tournaments').where('status','==','Pending').get().then(querySnapShot => {
                    if (querySnapShot != null) {
                        querySnapShot.forEach(documentSnapshot => {
                            console.log('documentSnapshot.data()')
                            console.log(documentSnapshot.data())
                            array.push({
                                ...documentSnapshot.data()
                            });
                            setDataSource(array);
                        })
                    }
                })
        })

        

    }, [])

    function Item({ data }) {
        return (
            <TouchableOpacity  onPress={()=>{navigation.navigate('viewEvents',{
                Tname:data.name
            })}}>
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

export default ViewTournament;