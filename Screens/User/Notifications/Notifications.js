import React, { useEffect, useState } from 'react';
import { Image, View, Text, FlatList, ScrollView } from 'react-native';
import styles from './styles';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
function Notifications({ navigation }) {

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('Notifications').onSnapshot(querySnapshot => {
            setDataSource([]);
            const array = [];

            firebase.firestore().collection('Notifications').orderBy('createdAt', 'desc').get().then(querySnapShot => {
                if (querySnapShot != null) {
                    querySnapShot.forEach(documentSnapshot => {
                        console.log('documentSnapshot.data()')
                        console.log(documentSnapshot.data())
                        array.push({
                            ...documentSnapshot.data()
                        });
                        setDataSource(array);
                    })
                }
            })
        })



    }, [])

    function Item({ data }) {
        return (
            <View style={styles.flatlist}>
                <View style={styles.tView}>
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../../../Images/dot.png')} style={{ height: 10, width: 10, alignSelf: 'center',marginRight:5}} />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                        <Text numberOfLines={3} style={styles.title}>{data.title}</Text>
                    </View>
                </View>
                <Text numberOfLines={5} style={styles.date}>{moment(data.createdAt.toDate()).format('DD-MM-YYYY')}</Text>
                <Text numberOfLines={1} style={styles.content}>{data.notification}</Text>
                <View style={styles.divider} />
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={dataSource}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default Notifications;