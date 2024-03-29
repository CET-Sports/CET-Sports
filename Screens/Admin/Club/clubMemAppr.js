import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList, Image } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

function clubMemAppr(props) {

    const [dataSource, setDataSource] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        firebase.firestore().collection('clubMembers').onSnapshot(querySnapshot => {
            const data = [];
            querySnapshot.forEach(documentSnapshot => {
                console.log('documentSnapshot.data()')
                console.log(documentSnapshot.data())
                data.push({
                    ...documentSnapshot.data()
                })
            })
            setDataSource(data)
        })
    }, [])

    function Approval(phone, clb) {
        firebase.firestore().collection('clubMembers').where('phone', '==', phone).where('ClubName', '==', clb).get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot.id)
                firebase.firestore().collection('clubMembers').doc(documentSnapshot.id).update({
                    status: 'Approved'
                })
            })
        });


    }
    function Reject(phone, clb) {
        firebase.firestore().collection('clubMembers').where('phone', '==', phone).where('ClubName', '==', clb).get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot.id)
                firebase.firestore().collection('clubMembers').doc(documentSnapshot.id).update({
                    status: 'Rejected'
                })
            })
        });


    }



    function Item({ data }) {
        return (
            <>
                {
                    data.status === 'pending' ?
                        <View style={styles.clbView}>
                            <View>
                                <Text style={styles.txt}>Club Name : {data.ClubName} </Text>
                                <Text style={styles.txt}>Name : {data.name} </Text>
                                <Text style={styles.txt}>Dept : {data.dept} </Text>
                                <Text style={styles.txt}>Sem : {data.sem} </Text>
                                <Text style={styles.txt}>Student Phone : {data.phone} </Text>
                            </View>
                            <View style={{alignItems:'center',justifyContent:'flex-end',flex:1,flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => { Approval(data.phone, data.ClubName) }} style={styles.imgBtn}>
                                    <Image source={require('../../../Images/tic.png')} style={{height:40,width:40}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { Reject(data.phone, data.ClubName) }} style={styles.imgBtn}>
                                <Image source={require('../../../Images/cross.png')} style={{height:35,width:35}}/>
                                </TouchableOpacity>
                            </View>
                            


                        </View> :
                        null
                }
                <View style={styles.divider}/>
            </>
        )
    }

    return (


        <View>

            {/* <Text>Student Name : </Text>
            <Text>Club Name : </Text>
            <Text>Student Phone : </Text>
            <Text>Advisor : </Text>
            <Text>Prsident : </Text>
            <TouchableOpacity>
                <Text>Approve</Text>
            </TouchableOpacity> */}

            <FlatList
                data={dataSource}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={(item, index) => index.toString()}
            />


        </View>




    );
}

export default clubMemAppr;