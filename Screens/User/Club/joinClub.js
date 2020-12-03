import React,{useState,useEffect} from 'react';

import styles from './styles';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList

} from 'react-native';
import { firebase } from '@react-native-firebase/auth';

function joinClub(props) {

    //const [clubName,setClubName]=useState('');
    const [dataSource,setDataSource]=useState([]);
    const [size,setSize]=useState(1);

    useEffect(() => {

        console.log(dataSource)

        firebase.firestore().collection('Club').onSnapshot(querySnapshot => {

            const array = [];

            querySnapshot.forEach(documentSnapshot => {


                console.log(documentSnapshot.data())

                //console.log("Tesasdsafsf");

                setSize(querySnapshot.size);

                 array.push({
                     ...documentSnapshot.data()
                 })

                setDataSource(array)

                
            });

            

            
            //console.log(size)

        })



    },[])


    function Item({ data }) {
        

    return (
        <>
        
        <View style={styles.containerJoin}>
            <TouchableOpacity style={styles.button}>
    <Text>{data.ClubName}</Text>
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