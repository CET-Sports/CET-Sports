import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList, ScrollView } from 'react-native';
import styles from './styles';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
function scores({navigation}) {

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('Tournaments').onSnapshot(querySnapshot=>{
            setDataSource([]);
            const array = [];

                firebase.firestore().collection('Tournaments').where('status','==','Ongoing').get().then(querySnapShot => {
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
            <TouchableOpacity style={styles.gameBtn} onPress={()=>{navigation.navigate('userGames',{
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

export default scores;