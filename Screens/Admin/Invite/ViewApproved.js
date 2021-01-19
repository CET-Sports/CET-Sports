import React from 'react';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View ,FlatList} from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';


function ViewApproved(props) {

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
      <>
        <Text>Game :{data.sprt}  </Text>
        <Text>Name :{data.name}  </Text>
        <Text>Dept : {data.dept} </Text>
        <Text>Sem : {data.sem} </Text>
        
      </>
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