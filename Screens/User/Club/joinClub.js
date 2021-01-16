import React, { useState, useEffect } from 'react';

import styles from './styles';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList

} from 'react-native';
import { firebase } from '@react-native-firebase/auth';

function joinClub({ navigation }) {

    //const [clubName,setClubName]=useState('');
    const [dataSource, setDataSource] = useState([]);
    const [size, setSize] = useState(1);

    useEffect(() => {

        console.log(dataSource)

        firebase.firestore().collection('Club').onSnapshot(querySnapshot => {

            const array = [];

            querySnapshot.forEach(documentSnapshot => {


                console.log(documentSnapshot.data())

                console.log(documentSnapshot.data());

                setSize(querySnapshot.size);

                array.push({
                    ...documentSnapshot.data()
                })

                setDataSource(array)


            });




            //console.log(size)

        })



    }, [])


    function Item({ data }) {



        return (

            <TouchableOpacity style={styles.gameBtn} onPress={() => { navigation.navigate('clubDetails', { clb: data.ClubName }) }}
            >
                <Text style={styles.txt}>{data.ClubName}</Text>
            </TouchableOpacity>

        );
    }



    return (

        <View>
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