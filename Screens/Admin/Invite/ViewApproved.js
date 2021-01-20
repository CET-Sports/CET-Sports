import React from 'react';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View ,FlatList} from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../Club/styles';


function ViewApproved({navigation}) {

  const [size,setSize] = useState(1);
  const [dataSource, setDatasource] = useState([]);
  useEffect(() => {

    firebase.firestore().collection('Apply').onSnapshot(querySnapShot => {
      const data = [];
      console.log("Hello")


      firebase.firestore().collection('Apply').where('status','==','Approved').get().then(querySnapShot => {

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





  
  function Item({ data }) {
    return (
      <View style={styles.gameBtn}>
        <Text style={styles.txt}>Game :{data.sprt}  </Text>
        <Text style={styles.txt}>Name :{data.name}  </Text>
        <Text style={styles.txt}>Dept : {data.dept} </Text>
        <Text style={styles.txt}>Sem : {data.sem} </Text>
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

export default ViewApproved;