import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

function Update({ route,navigation }) {
    const { Tname } = route.params;
    const { _status } = route.params;
    const [dataSource, setDataSource] = useState([]);
    const [pending, setPending] = useState(_status);

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

        firebase.firestore().collection('Tournaments').doc(Tname).onSnapshot(documentSnapShot => {
            // console.log(documentSnapShot.data().status)
            setPending(documentSnapShot.data().status)
        })
        
    }, []);

    const changeStatus = () => {
        firebase.firestore().collection('Tournaments').doc(Tname).update({
            status: 'Ongoing'
        })
    }

    function Item({ data }) {
        return (
            <TouchableOpacity style={styles.gameBtn} onPress={()=>{navigation.navigate(data.name,{
                Tname:Tname
            })}}>
                <Text style={styles.gameBtntext}>{data.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <>

            {
                pending == 'Pending' ?

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.Btn} onPress={() => { changeStatus() }}>
                            <Text style={styles.btnText}>Begin Tournament</Text>
                        </TouchableOpacity>
                    </View> :
                    <FlatList
                        data={dataSource}
                        renderItem={({ item }) => <Item data={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
            }
        </>
        // <Text>{Tname}</Text>

    );
}

export default Update;