import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { colors } from '../../../../Colors/colors';

function selectTournament({ route, navigation }) {

    const { Dname } = route.params;

    const [dataSource, setDataSource] = useState([]);
    //const [game, setGame] = useState('Cricket');


    // useEffect(() => {

    //     firebase.firestore().collection('Team').doc(Dname).collection('phone').onSnapshot(querySnapShot => {
    //         const array = [];
    //         if (querySnapShot != null) {
    //             querySnapShot.forEach(documentSnapShot => {
    //                 array.push({
    //                     ...documentSnapShot.data()
    //                 });
    //                 setDataSource(array);
    //             })
    //         }
    //     })


    // }, [])



    // function Item({ data }) {

    //     setGame(data.Game)

    //     return (
    //         <View>
    //             <Text>
    //                 EVENT NAME : {data.Game}
    //             </Text>
    //             <TouchableOpacity onPress={() => { navigation.navigate('viewTeams', { game: game }) }}>
    //                 <Text>ENTER</Text>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }
    //setGame('Cricket')

    return (
        // <View>
        //     <FlatList
        //         data={dataSource}
        //         renderItem={({ item }) => <Item data={item} />}
        //         keyExtractor={(item, index) => index.toString()}
        //     />
        // </View>
        <>
            <View style={styles.gameBtn}>
                <Text style={styles.txt}>
                    EVENT NAME : CRICKET
                </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('viewTeams', { Dname: Dname }) }}>
                <Text style={{...styles.txt,color:colors.primaryColor}}>VIEW</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.gameBtn}>
                <Text style={styles.txt}>
                    EVENT NAME : FOOTBALL
                </Text>
                <TouchableOpacity >
                    <Text style={{...styles.txt,color:colors.primaryColor}}>VIEW</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default selectTournament;