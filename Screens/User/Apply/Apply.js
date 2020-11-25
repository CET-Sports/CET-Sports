import { useEffect, useState } from 'react';
import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

export default function Apply() {

  const [Sports, setSports] = useState('');

  const [dataSource, setDatasource] = useState([]);

  // const { game } = route.params;


  useEffect(() => {
    const date = new Date();

    firebase.firestore().
      collection('Sports').where('due', '>=', date).
      onSnapshot(querySnapShot => {
        const array = [];
        if (querySnapShot != null) {
          querySnapShot.forEach(documentSnapShot => {
            array.push({
              ...documentSnapShot.data()
            });
            setDatasource(array);
            // getChampImage(yr);

          });
        }
      })

  }, [])


  function Item({ data }) {
    return (


      <View>
        <Text>{data.item}</Text>
        <TouchableOpacity><Text>Apply</Text></TouchableOpacity>
      </View>


    )
  }

  return (
    <View style={{ flexDirection: "row" }}>

      <FlatList
        data={dataSource}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  )
}
