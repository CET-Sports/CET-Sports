import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function selectTournament(props) {

    const [dataSource, setDataSource] = useState([]);


    useEffect(() => { }, [])


    function Item({ data }) {
        return (
            <View>
                <Text>
                    TEAM NAME :
                </Text>
                <TouchableOpacity>
                    <Text>VIEW MEMBERS</Text>
                </TouchableOpacity>
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

export default selectTournament;