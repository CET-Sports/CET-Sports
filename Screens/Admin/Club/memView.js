import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function memView({ route }) {

    const { Cname } = route.params



    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {

        firebase.firestore().collection('clubMembers').where('ClubName', '==', Cname).where('status', '==', 'Approved').get().then(querySnapshot => {
            const data = [];
            querySnapshot.forEach(documentSnapshot => {
                //console.log(documentSnapshot.data())
                data.push({
                    ...documentSnapshot.data()
                })
                setDataSource(data)
            })

        })

        // firebase.firestore().collection('Users').doc(dataSource.phone).onSnapshot(documentSnapshot =>)

        //console.log(Cname);


    }, [])

    function Item({ data }) {
        console.log(data.ClubName);
        return (
            <>
                {

                    data.ClubName === Cname ?
                        <>
                            <Text>STUDENT NAME : {data.name}</Text>
                            <Text>DEPARTMENT : {data.dept} </Text>
                            <Text>SEMESTER : {data.sem}</Text>
                            <Text>PHONE NUMBER : {data.phone}</Text>
                        </>
                        :
                        null
                }




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

export default memView;