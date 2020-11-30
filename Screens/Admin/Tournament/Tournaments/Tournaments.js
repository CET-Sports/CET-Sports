import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList, ScrollView } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../../../Colors/colors';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


function Tournaments({ navigation }) {

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        console.log(dataSource);
        firebase.firestore().collection('Tournaments').orderBy('createdAt', 'desc').onSnapshot(querySnapShot => {
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
            <TouchableOpacity style={styles.gameBtn} onPress={()=>{navigation.navigate('Update',{
                Tname:data.name,
                _status:data.status
            })}}>
                <Text style={styles.gameBtntext}>{data.name}</Text>
                {
                    data.status == 'Pending' ?
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <FontAwesome name="circle" color="#ff3838" style={{marginTop:10,fontSize:10,marginRight:3}}/>
                            <Text style={styles.pending}>{data.status}</Text>
                        </View>
                        :
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome name="circle" color="#32ff7e" style={{marginTop:10,fontSize:10,marginRight:3}}/>
                        <Text style={styles.ongoing}>{data.status}</Text>
                    </View>
                }

            </TouchableOpacity>
        )
    }


    return (
        <>
            <View style={styles.addTournament}>
                <TouchableOpacity style={styles.addBtn} onPress={() => { navigation.navigate('AddTournaments') }}>
                    <AntDesign name="plus" size={36} color={colors.primaryColor} />
                    <Text style={styles.addFont}>Add New Tournament</Text>
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

export default Tournaments;