import { useEffect, useState } from 'react';
import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export default function Apply() {

  const [Sports, setSports] = useState('');

  const [dataSource, setDatasource] = useState([]);

  const [name, setName] = useState('');
  const [dp, setDp] = useState();
  const [dept, setDept] = useState();
  const [gender, setGender] = useState();
  const [phone, setPhone] = useState('');
  const [event,setEvent]=useState('');
  const [trp,setTrp]=useState('false');





  // const { game } = route.params;


  useEffect(() => {
    
     getData('userData')
        
            .then(response => {
                console.log('response');
                console.log(response);
                setPhone(response.phone)

                firebase.firestore().
                    collection('Users').
                    doc(response.phone).
                    onSnapshot(documentSnapshot => {
                        if (documentSnapshot != null) {
                            console.log(documentSnapshot.data().name)
                            setName(documentSnapshot.data().name)
                            setDp(documentSnapshot.data().dpUrl)
                            setDept(documentSnapshot.data().dept)
                            setGender(documentSnapshot.data().gender)
                            setPhone(documentSnapshot.data().phone)


                        }
                    })
            })
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


  getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value

    }
  }


  function push(data)
  {
    setEvent(data);
    firebase.firestore().collection('Apply').doc(event).collection('Student').doc().set({
      name:name,
      dp:dp,
      dept:dept,
      gender:gender,
      phone:phone
    })

   setTrp('True');

  }

  function Item({ data }) {
    return (


      
      <View>
        
        <Text>{data.item}</Text>
      {
        trp?
        <Text>Applied</Text>

         :
        <TouchableOpacity onPress={()=>{push(data.item)}}><Text>Apply</Text></TouchableOpacity>
      
      }
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
