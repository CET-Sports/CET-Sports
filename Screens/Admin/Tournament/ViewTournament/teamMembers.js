import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function teamMembers(props) {

    const [dataSource, setDataSource] = useState([]);


    useEffect(() => { }, [])

    function Item({ data }) {
        return (
            <View>
                <Text>
                    {/* members name from firebae */}
                </Text>
            </View>
        )
    }


    return (
        <View>
            <Text>Team Members</Text>
            <FlatList
                data={dataSource}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default teamMembers;