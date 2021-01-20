import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { colors } from '../../../../Colors/colors';

function selectTournament({ route, navigation }) {

    //const { game } = route.params;
    const { Dname } = route.params;



    const { Tname } = route.params;


    const [dataSource, setDataSource] = useState([]);


    useEffect(() => {
        console.log(Dname + Tname + 'adata')
        firebase.firestore().collection('Team').doc(Dname).collection('phone').where('teamName', '==', Tname).get().then(querySnapShot => {
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
                <Text style={{...styles.txt,fontSize:18,color:colors.primaryColor}}>
                    {data.teamName}
                </Text>

                    <Text style={styles.txt}>{data.player1}</Text>
                    <Text style={styles.txt}>{data.player2}</Text>
                    <Text style={styles.txt}>{data.player3}</Text>
                    <Text style={styles.txt}>{data.player4}</Text>
                    <Text style={styles.txt}>{data.player5}</Text>
                    <Text style={styles.txt}>{data.player6}</Text>
                    <Text style={styles.txt}>{data.player7}</Text>
                    <Text style={styles.txt}>{data.player8}</Text>
                    <Text style={styles.txt}>{data.player9}</Text>
                    <Text style={styles.txt}>{data.player10}</Text>
                    <Text style={styles.txt}>{data.player11}</Text>
                    <Text style={styles.txt}>{data.player12}</Text>
                    <Text style={styles.txt}>{data.player13}</Text>
                    <Text style={styles.txt}>{data.player14}</Text>
                    <Text style={styles.txt}>{data.player15}</Text>
                    <Text style={{...styles.txt,color:colors.primaryColor}}>{data.phone}</Text>
           
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