import React,{useState,useEffect} from 'react';

import styles from './styles';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList

} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';

function joinClub(props) {

    //const [clubName,setClubName]=useState('');
    const [dataSource,setDataSource]=useState([]);
    const [size,setSize]=useState(1);

    useEffect(() => {

        const array = [];

        firebase.firestore().collection('Club').onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {

                setSize(querySnapshot.size);

                array.push(...documentSnapshot.data().ClubName)

                //console.log(documentSnapshot.data())
            });

            setDataSource(array)

            //console.log(dataSource)
            //console.log(size)

        })



    })


    function Item({ data }) {
        console.log(data);

    return (
        <>
        
        <View style={styles.containerJoin}>
            <TouchableOpacity style={styles.button}>
                <Text>{data.item}</Text>
            </TouchableOpacity>
        </View>
        </>
        
    );
    }

    

        return (

            <View>
                <View style={styles.joinHeader}>
            <Text style={styles.joinHeaderText}>
            JoinAClub
            </Text>

        </View>
            {
            
                size > 0 ?
                <FlatList
                data={dataSource}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
            :
            <Text>No Invitaions</Text>
             }
            </View>
        );
    
}

export default joinClub;