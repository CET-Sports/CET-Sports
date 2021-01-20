import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { colors } from '../../../../Colors/colors';

function selectTournament({navigation}) {

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
            <View style={styles.gameBtn}>
                <Text style={styles.txt}>
                    {data.Tname}
                </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('selectEvents', { Dname: data.Tname }) }} >
                    <Text style={{...styles.txt,color:colors.primaryColor,marginTop:5}}>VIEW</Text>
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