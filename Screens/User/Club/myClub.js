import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';


function myClub(props) {

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {

    getData('userData')

      .then(response => {

        firebase.firestore().collection('clubMembers').where('phone', '==', response.phone).onSnapshot(querySnapshot => {
          const data = [];
          querySnapshot.forEach(documentSnapshot => {
            console.log('documentSnapshot.data()')
            console.log(documentSnapshot.data())
            data.push({
              ...documentSnapshot.data()
            })
          })
          setDataSource(data)
        })

      })

  }, [])

  getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value

    }
  }

  function Item({ data }) {
    return (
      <View style={styles.gameBtn}>

        <Text>{data.ClubName} </Text>

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

export default myClub;