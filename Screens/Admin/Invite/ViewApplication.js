import React from 'react';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View ,FlatList} from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import { colors } from '../../../Colors/colors';


function ViewApplication({navigation}) {

  const [size,setSize] = useState(1);
  const [dataSource, setDatasource] = useState([]);
  useEffect(() => {

    firebase.firestore().collection('Apply').onSnapshot(querySnapShot => {
      const data = [];
      console.log("Hello")


      firebase.firestore().collection('Apply').where('status','==','pending').get().then(querySnapShot => {

        if (querySnapShot != null) {
          console.log(querySnapShot.size);


          querySnapShot.forEach(documentSnapShot => {
           
            data.push({
              ...documentSnapShot.data()    
            });
            setDatasource(data);
           
          })
        }


      })
    

    })

    
 
  }, [])


  function Approval(phone, sprt) {
    firebase.firestore().collection('Apply').where('phone', '==', phone).where('sprt', '==', sprt).get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.id)
            firebase.firestore().collection('Apply').doc(documentSnapshot.id).update({
                status: 'Approved'
            })
        })
    });


}

function Reject(phone, sprt) {
  firebase.firestore().collection('Apply').where('phone', '==', phone).where('sprt', '==', sprt).get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.id)
          firebase.firestore().collection('Apply').doc(documentSnapshot.id).update({
              status: 'Rejected'
          })
      })
  });


}
  
  function Item({ data }) {
    return (
      <View style={styles.gameBtn}>
        <Text style={styles.txt}>Game :{data.sprt}  </Text>
        <Text style={styles.txt}>Name :{data.name}  </Text>
        <Text style={styles.txt}>Dept : {data.dept} </Text>
        <Text style={styles.txt}>Sem : {data.sem} </Text>

        <Text style={styles.txt}>Student Phone : {data.phone} </Text>
        <TouchableOpacity onPress={() => { Approval(data.phone, data.sprt) }}>
          <Text style={{...styles.txt,color:colors.primaryColor}}>
            Approve
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Reject(data.phone, data.sprt) }}>
          <Text style={{...styles.txt,color:'red'}}>
            Reject
        </Text>
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

export default ViewApplication;