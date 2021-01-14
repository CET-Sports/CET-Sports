import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, FlatList, Text } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function clubView(props) {

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {

        firebase.firestore().collection('Club').onSnapshot(querySnapshot => {
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
            <>
                <TouchableOpacity onPress={() => { Approval(data.phone) }}>
                    <Text>{data.ClubName}</Text>
                </TouchableOpacity>

            </>
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

export default clubView;