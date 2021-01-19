import { useEffect, useState } from 'react';
import React from 'react'
import { View, Text, TouchableOpacity, FlatList ,Modal} from 'react-native'
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Apply() {
  const [sports, setSports] = useState(false);
  const [dataSource, setDatasource] = useState([]);
  const [name, setName] = useState('');
  const [sem, setSem] = useState('');
  const [dept, setDept] = useState();
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [event,setEvent]=useState();
  const [trp,setTrp]=useState(false);
  const [size,setSize] = useState(1);
  const [user,setUser]=useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
                            setSem(documentSnapshot.data().sem)
                            setDept( documentSnapshot.data().dept)
                            setGender(documentSnapshot.data().gender)
                            setPhone(documentSnapshot.data().phone)
                        }
                    })
            })
    const date = new Date();


console.log("gender:"+gender)
console.log("due"+date)
  

  const query = firebase.firestore().collection('Sports').where('due', '>=',date).where('gender','==' ,gender);

     query.onSnapshot(querySnapShot => {
        const array = [];
        if (querySnapShot != null) {
          console.log(querySnapShot.size);
          setSize(querySnapShot.size);
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


  function push(data1)
  {
   



  
    firebase.firestore().collection('Apply').where('sprt','==',data1).where('phone','==',phone).onSnapshot(querySnapshot => {

        if(!querySnapshot.empty)
        {
           console.log("Not Empty")
        }
        else
        {
          firebase.firestore().collection('Apply').doc().set({
            name:name,
            sem:sem,
            dept:dept,
            gender:gender,
            phone:phone,
            sprt:data1,
            status:'pending'
          })
        }
  

      });

   setModalVisible(true);

   setTimeout(() => {
       setModalVisible(false);
       
   }, 1000);

  }

  function Item({ data }) {
    
    
    return (
    <View>
        <View>
           </View>
      
        
        <Text>{data.item}</Text>       
        <TouchableOpacity onPress={()=>{push(data.item)}}><Text>Apply</Text></TouchableOpacity>

        

{
  modalVisible ?

      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { setModalVisible(false) }}
      >

          <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                  <View style={{ flexDirection: 'column', alignItems: 'center', width: 100, margin: 10 }}>
                      <Icon name="check-circle" size={60} color='#2ed573' />
                      <Text style={styles.modalText}>Applied</Text>
                  </View>
              </View>
          </View>

      </Modal>

      :

      null

}
</View>
    )
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
  )
}
