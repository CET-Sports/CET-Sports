import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, Modal } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function addCricket({route,navigation}) {

    const[level,setLevel] = useState('');
    const[name,setName] = useState('');
    const[teamOne,setTeamOne] = useState('');
    const[teamTwo,setTeamTwo] = useState('');
    const[overs,setOvers] = useState();
    const[msg,setMsg] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const date = new Date(); 

    const {Tname} = route.params

    const sendData = ()=>{
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
        .collection('Scores').doc(name+" "+level).set({
            Message:msg,
            Match_name:name,
            Match_level:level,
            Overs:overs,
            Team1:teamOne,
            Team2:teamTwo,
            createdAt:date,
            status:'Pending'
        })
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
        .collection('Scores').doc(name+" "+level).collection('Teams').doc('Team1').set({
            name:teamOne,
            Overs:0.0,
            runs:0,
            wickets:0,
            status:'',
            balls:0
        })
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
        .collection('Scores').doc(name+" "+level).collection('Teams').doc('Team2').set({
            name:teamTwo,
            Overs:0.0,
            runs:0,
            wickets:0,
            status:'',
            balls:0
        })

        setModalVisible(true);

        setTimeout(() => {
            setModalVisible(false);
            navigation.navigate('Cricket');
        }, 1000);
    }

    
    return (
        <View style={styles.container}>
            <TextInput placeholder='game level' onChangeText={(value)=>{setLevel(value)}} style={styles.TextInput}/>
            <TextInput placeholder='game name' onChangeText={(value)=>{setName(value)}} style={styles.TextInput}/>
            <TextInput placeholder='Team1' onChangeText={(value)=>{setTeamOne(value)}} style={styles.TextInput}/>
            <TextInput placeholder='Team2' onChangeText={(value)=>{setTeamTwo(value)}} style={styles.TextInput}/>
            <TextInput placeholder='Overs' onChangeText={(value)=>{setOvers(value)}} style={styles.TextInput}/>
            <TextInput placeholder='Message' onChangeText={(value)=>{setMsg(value)}} style={styles.TextInput}/>
            <TouchableOpacity onPress={()=>{sendData()}} style={styles.btn}>
                <Text style={styles.btnTxtf}>Add</Text>
            </TouchableOpacity>

            {
                modalVisible ?

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => { setModalVisible(false) }}
                    >

                        <View style={styles.modalContainer1}>
                            <View style={styles.modalView1}>
                                <View style={{ flexDirection: 'column', alignItems: 'center', width: 100, margin: 10 }}>
                                    <Icon name="check-circle" size={60} color='#2ed573' />
                                    <Text style={styles.modalText}>Done</Text>
                                </View>
                            </View>
                        </View>

                    </Modal>

                    :

                    null

            }
        </View>
    );
}

export default addCricket;