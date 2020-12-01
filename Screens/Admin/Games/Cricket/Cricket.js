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
        console.log(Tname);
        firebase.firestore().collection('Tournaments').
            doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').orderBy('createdAt', 'desc')
            .onSnapshot(querySnapShot => {
                const array = [];
                if (querySnapShot != null) {
                    querySnapShot.forEach(documentSnapshot => {
                        array.push({
                            ...documentSnapshot.data()
                        });
                        setDataSource(array);
                    })
                }
            })
    }, [])

    function Item({ data }) {
        return (
            <TouchableOpacity style={styles.gameBtn} onPress={()=>{navigation.navigate('updateCricket',{
                mName:data.Match_name,
                lName:data.Match_level,
                tone:data.Team1,
                ttwo:data.Team2,
                Tname: Tname
            })}}>
                <Text style={styles.gameBtntext}>{data.Match_name}</Text>
                <Text style={styles.levelText}>{data.Match_level}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <>
            <View style={styles.addTournament}>
                <TouchableOpacity style={styles.addBtn} onPress={() => {
                    navigation.navigate('addCricket', {
                        Tname: Tname
                    })
                }}>
                    <AntDesign name="plus" size={36} color={colors.primaryColor} />
                    <Text style={styles.addFont}>Add New Match</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <FlatList
                    data={dataSource}
                    renderItem={({ item }) => <Item data={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />

            </ScrollView>
        </>
    );
}

export default _Cricket;