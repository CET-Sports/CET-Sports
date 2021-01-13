import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function clubMemAppr(props) {

    const [dataSource, setDataSource] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {

        firebase.firestore().collection('clubMembers').onSnapshot(querySnapshot => {
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

    function Approval(val) {
        return (
            firebase.firestore().collection('Referal').doc(val).set({
                status: 'Approved'
            })

        )
    }

    function Item({ data }) {
        return (
            <>
                {
                    data.status === 'pending' ?
                        <>
                            <Text>Club Name : {data.clubName} </Text>
                            <Text>Student Phone : {data.phone} </Text>
                            <TouchableOpacity onPress={() => { Approval(data.phone) }}>
                                <Text>Approve</Text>
                            </TouchableOpacity>
                        </> :
                        null
                }




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