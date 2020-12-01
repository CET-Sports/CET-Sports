import { useEffect, useState } from 'react';
import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export default function ViewApplication() {
  const [dataSource, setDatasource] = useState([]);
  const [size,setSize] = useState(1);
  const [phone, setPhone] = useState('');


  useEffect(() => {

   



    getData('userData')
                .then(response => {
                console.log('response');
                console.log(response);
                setPhone(response.phone);
                })


                firebase.firestore().
      collection('Sports').
      onSnapshot(querySnapShot => {
        const array = [];
        if (querySnapShot != null) {
          console.log(querySnapShot.size);
          setSize(querySnapShot.size);
          querySnapShot.forEach(documentSnapShot => {
            array.push({
              ...documentSnapShot.data().item    
            });
            setDatasource(array);
            // getChampImage(yr);
            });
        }
      })

      console.log(dataSource[1])










    
  }, [])


  getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value

    }
  }


  function Item() {
    return (
      
      <View>
        <Text>Hello</Text>

      </View>

    )
  }

  return (
    <View>
      <Text>HELLO</Text>
    </View>
  )
}
