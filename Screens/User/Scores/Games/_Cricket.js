import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList, ScrollView } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../../../Colors/colors';


function _Cricket({ route, navigation }) {

    const [dataSource, setDataSource] = useState([]);
    const { Tname } = route.params
    
    useEffect(() => {

        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
        .collection('Scores').onSnapshot(querySnapshot=>{
            setDataSource([]);
            const array = [];

            console.log(Tname);
            firebase.firestore().collection('Tournaments').
                doc(Tname).collection('Games').doc('Cricket')
                .collection('Scores').where('status','in', ['Ongoing', 'Finished']).get().then(querySnapShot => {
                    if (querySnapShot != null) {
                        querySnapShot.forEach(documentSnapshot => {
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
            <TouchableOpacity style={styles.gameBtn} onPress={()=>{navigation.navigate('CricketScore',{
                mName:data.Match_name,
                lName:data.Match_level,
                tone:data.Team1,
                ttwo:data.Team2,
                Tname: Tname,
                Ovr:data.Overs,
                _status:data.status
            })}}>
                <Text style={styles.gameBtntext}>{data.Match_name}</Text>
                <Text style={styles.levelText}>{data.Match_level}</Text>
                <Text style={styles.success}>{data.fmessage}</Text>

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

export default _Cricket;