import React from 'react';
import { Text, TouchableOpacity, Modal, View, Image, TextInput } from 'react-native';

function Refer(props) {

    //add to firebase

    firebase.firestore().collection('Tournaments').doc(name).collection('Games').doc('Cricket').set({
        name: 'Cricket',
        overs: 20,
        etc
    })

    //update

    firebase.firestore().collection('Tournaments').doc(name).collection('Games').doc('Cricket').update({
        name: 'Cricket'
    })

    //fetch multiple documents from firebase

    firebase.firestore().collection('Tournaments').onSnapshot(querySnapShot => {
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

    //fetch single documents from firebase

    firebase.firestore().collection('Tournaments').doc('docname').onSnapshot(documentSnapshot => {
        if (documentSnapshot != null) {
            console.log(documentSnapshot.data())
        }
    })

    //conditions

    firebase.firestore().collection('Tournaments').onSnapshot(querySnapshot=>{
        setDataSource([]);
        const array = [];

            firebase.firestore().collection('Tournaments').where('status','==','Ongoing').get().then(querySnapShot => {
                if (querySnapShot != null) {
                    querySnapShot.forEach(documentSnapshot => {
                        array.push({
                            ...documentSnapshot.data()
                        });
                        setDataSource(array);
                    })
                }
            })
    })

    //flatlist function

    function Item({ data }) {
        return (
            <View>
                <Text>{data.name}</Text>
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

export default Refer;