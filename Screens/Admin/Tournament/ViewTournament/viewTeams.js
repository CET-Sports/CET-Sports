import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { colors } from '../../../../Colors/colors';

function selectTournament({ route, navigation }) {

    //const { game } = route.params;
    const { Dname } = route.params;


    const [dataSource, setDataSource] = useState([]);


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


    }, [])




    function Item({ data }) {
        return (
            <View style={styles.gameBtn}>
                <Text style={styles.txt}>
                 {data.teamName}
                </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('teamMembers', { Dname: Dname, Tname: data.teamName }) }}>
                    <Text style={{...styles.txt,color:colors.primaryColor,marginTop:5}}>VIEW MEMBERS</Text>
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