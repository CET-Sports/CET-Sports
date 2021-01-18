import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, Image } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { colors } from '../../../../Colors/colors';

function CricketScore({ route }) {

    const { mName } = route.params
    const { lName } = route.params
    const { Tname } = route.params
    const { tone } = route.params
    const { ttwo } = route.params
    const { Ovr } = route.params
    const { _status } = route.params

    const [run, setRun] = useState('');
    const [overs, setOvers] = useState('');
    const [selected, setSelected] = useState(tone);

    const [run1, setRun1] = useState(0);
    const [out1, setOut1] = useState(0);
    const [overs1, setOvers1] = useState(0);
    const [balls1, setBalls1] = useState(0);

    const [run2, setRun2] = useState(0);
    const [out2, setOut2] = useState(0);
    const [overs2, setOvers2] = useState(0);
    const [balls2, setBalls2] = useState(0);

    const [msg, setMsg] = useState('');
    const [pending, setPending] = useState(_status);

    useEffect(() => {
        const subscriber = firebase.firestore().collection('Tournaments').
            doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team1')
            .onSnapshot(documentSnapshot => {
                console.log(documentSnapshot.data())
                setOut1(documentSnapshot.data().wickets);
                setRun1(documentSnapshot.data().runs)
                setOvers1(documentSnapshot.data().Overs)
                setBalls1(documentSnapshot.data().balls)
            })
        firebase.firestore().collection('Tournaments').
            doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team2')
            .onSnapshot(documentSnapshot => {
                console.log(documentSnapshot.data())
                setOut2(documentSnapshot.data().wickets);
                setRun2(documentSnapshot.data().runs)
                setOvers2(documentSnapshot.data().Overs)
                setBalls2(documentSnapshot.data().balls)
            })
        firebase.firestore().collection('Tournaments').
            doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName)
            .onSnapshot(documentSnapshot => {
                console.log(documentSnapshot.data())
                setMsg(documentSnapshot.data().Message);
            })

        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName).onSnapshot(documentSnapShot => {
                // console.log(documentSnapShot.data().status)
                setPending(documentSnapShot.data().status)
            })

        return () => subscriber();
    }, [])



    return (

        <View style={{flexGrow:1,justifyContent:'center',backgroundColor:'#fff'}}> 
            <View style={styles.btnCntnr}>
                <TouchableOpacity onPress={() => { setSelected(tone) }} style={{ ...styles.nameBtn, marginLeft: 20, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                    <Text style={styles.btnTxt}>{tone}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelected(ttwo) }} style={{ ...styles.nameBtn, marginRight: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                    <Text style={styles.btnTxt}>{ttwo}</Text>
                </TouchableOpacity>
            </View>
            {
                selected === tone ?
                    <View>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{mName + "-" + lName}</Text>
                        </View>

                        <View style={styles.scoreBoard}>
                            <View style={styles.nameCntnr}>
                                <Text style={{ ...styles.teamName, color: '#a5b1c2' }}>{ttwo}</Text>
                                <Text style={{ color: '#fff' }}>vs</Text>
                                <Text style={styles.teamName}>{tone}</Text>
                            </View>

                            <Text style={styles.teamName}>{run1}-{out1}</Text>


                            <Text style={styles.teamName}>{overs1}.{balls1}</Text>

                        </View>
                        <Text style={styles.gmeMsg}>{msg}</Text>
                    </View>



                    :




                    <View >
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{mName + "-" + lName}</Text>
                        </View>

                        <View style={styles.scoreBoard}>
                            <View style={styles.nameCntnr}>
                                <Text style={{ ...styles.teamName, color: '#a5b1c2' }}>{tone}</Text>
                                <Text style={{ color: '#fff' }}>vs</Text>
                                <Text style={styles.teamName}>{ttwo}</Text>
                            </View>

                            <Text style={styles.teamName}>{run2}-{out2}</Text>


                            <Text style={styles.teamName}>{overs2}.{balls2}</Text>

                        </View>
                        <Text style={styles.gmeMsg}>{msg}</Text>
                    </View>
            }
        </View>
    );
}

export default CricketScore;