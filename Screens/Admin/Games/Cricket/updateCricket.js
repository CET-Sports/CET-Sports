import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, Image, Modal } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { colors } from '../../../../Colors/colors';

function updateCricket({ route,navigation }) {

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

    const [modalVisible, setModalVisible] = useState(false);
    const [fmessage, setFmessage] = useState('')

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

    const upOut1 = (val) => {
        if (val === 'plus' && out1 + 1 <= 10) {
            setOut1(out1 + 1)
            firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team1').update({
                    wickets: out1 + 1,
                })
        }
        else if (val === 'minus' && out1 - 1 >= 0) {
            setOut1(out1 - 1)
            firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team1').update({
                    wickets: out1 - 1,
                })
        }

    }
    const upBall1 = (val) => {
        if (val === 'plus') {
            if (balls1 < 5 && overs1 + 1 <= Ovr) {
                setBalls1(balls1 + 1);
                firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                    .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team1').update({
                        balls: balls1 + 1,
                    })
            }
            else if (overs1 + 1 <= Ovr) {
                setBalls1(0);
                setOvers1(overs1 + 1)
                firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                    .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team1').update({
                        Overs: overs1 + 1,
                        balls: 0
                    })
            }
        }
        else {
            if (balls1 > 0) {
                setBalls1(balls1 - 1);
                firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                    .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team1').update({
                        balls: balls1 - 1,
                    })
            }
            else if (overs1 - 1 >= 0) {
                setBalls1(5);
                setOvers1(overs1 - 1)
                firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                    .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team1').update({
                        Overs: overs1 - 1,
                        balls: 5
                    })
            }
        }

    }
    const upRun1 = (val) => {
        setRun1(run1 + val)
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team1').update({
                runs: run1 + val,
            })
    }



    const upOut2 = (val) => {
        if (val === 'plus' && out2 + 1 <= 10) {
            setOut2(out2 + 1)
            firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team2').update({
                    wickets: out2 + 1,
                })
        }
        else if (val === 'minus' && out2 - 1 >= 0) {
            setOut2(out2 - 1)
            firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team2').update({
                    wickets: out2 - 1,
                })
        }

    }

    const upRun2 = (val) => {
        setRun2(run2 + val)
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team2').update({
                runs: run2 + val,
            })
    }
    const upBall2 = (val) => {
        if (val === 'plus') {
            if (balls2 < 5 && overs2 + 1 <= Ovr) {
                setBalls2(balls2 + 1);
                firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                    .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team2').update({
                        balls: balls2 + 1,
                    })
            }
            else if (overs2 + 1 <= Ovr) {
                setBalls2(0);
                setOvers2(overs2 + 1)
                firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                    .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team2').update({
                        Overs: overs2 + 1,
                        balls: 0
                    })
            }
        }
        else {
            if (balls2 > 0) {
                setBalls2(balls2 - 1);
                firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                    .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team2').update({
                        balls: balls2 - 1,
                    })
            }
            else if (overs2 - 1 >= 0) {
                setBalls2(5);
                setOvers2(overs2 - 1)
                firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
                    .collection('Scores').doc(mName + " " + lName).collection('Teams').doc('Team2').update({
                        Overs: overs2 - 1,
                        balls: 5
                    })
            }
        }

    }

    const upadateGame = () => {
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName).update({
                runs: run,
                Overs: overs
            })
    }

    const changeStatus = () => {
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName).update({
                status: 'Ongoing'
            })
    }

    const endMatch = () => {
        setPending('Finished');
        navigation.navigate('Cricket');
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName).update({
                fmessage: fmessage
            })
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName).update({
                status: 'Finished'
            })

        setModalVisible(false);
    }

    return (
        <>
            {
                pending == 'Pending' ?

                    <View style={styles.ctnr}>
                        <TouchableOpacity style={styles.BtnBegin} onPress={() => { changeStatus() }}>
                            <Text style={styles.btnText}>Begin Tournament</Text>
                        </TouchableOpacity>
                    </View> :
                    <>
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
                                <View style={styles.container}>
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
                                    {
                                        pending === 'Ongoing' ?
                                            <View style={styles.scoreCalc}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                    <TouchableOpacity onPress={() => { upRun1(1) }}>
                                                        <View>
                                                            <Image source={require('../../../../Icons/one.png')} style={styles.score} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { upRun1(2) }}>
                                                        <View>
                                                            <Image source={require('../../../../Icons/two.png')} style={styles.score} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { upRun1(4) }}>
                                                        <View>
                                                            <Image source={require('../../../../Icons/four.png')} style={styles.score} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { upRun1(6) }}>
                                                        <View>
                                                            <Image source={require('../../../../Icons/six.png')} style={styles.score} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                                                    <View style={{ margin: 15 }}>
                                                        <Text style={styles.hdrTxt}>OUT</Text>
                                                        <View style={styles.updateBtnContainer}>
                                                            <TouchableOpacity onPress={() => { upOut1('minus') }} style={styles.minus}>
                                                                <Text style={styles.txt}>-</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { upOut1('plus') }} style={styles.plus}>
                                                                <Text style={styles.txt}>+</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ margin: 15 }}>
                                                        <Text style={styles.hdrTxt}>RUNS</Text>
                                                        <View style={styles.updateBtnContainer}>
                                                            <TouchableOpacity onPress={() => { upRun1(-1) }} style={styles.minus}>
                                                                <Text style={styles.txt}>-</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { upRun1(1) }} style={styles.plus}>
                                                                <Text style={styles.txt}>+</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>

                                                    <View style={{ margin: 15 }}>
                                                        <Text style={styles.hdrTxt}>BALLS</Text>
                                                        <View style={styles.updateBtnContainer}>
                                                            <TouchableOpacity onPress={() => { upBall1('minus') }} style={styles.minus}>
                                                                <Text style={styles.txt}>-</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { upBall1('plus') }} style={styles.plus}>
                                                                <Text style={styles.txt}>+</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                                {/* <TouchableOpacity style={styles.endBtn}>
                                                <Text style={{ fontFamily: 'OpenSans-SemiBold', color: '#fff' }}>End Match</Text>
                                                </TouchableOpacity> */}

                                            </View> :
                                            null

                                    }

                                </View>



                                :




                                <View style={styles.container}>
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
                                    {
                                        pending === 'Ongoing' ?
                                            <View style={styles.scoreCalc}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                    <TouchableOpacity onPress={() => { upRun2(1) }}>
                                                        <View>
                                                            <Image source={require('../../../../Icons/one.png')} style={styles.score} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { upRun2(2) }}>
                                                        <View>
                                                            <Image source={require('../../../../Icons/two.png')} style={styles.score} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { upRun2(4) }}>
                                                        <View>
                                                            <Image source={require('../../../../Icons/four.png')} style={styles.score} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { upRun2(6) }}>
                                                        <View>
                                                            <Image source={require('../../../../Icons/six.png')} style={styles.score} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>



                                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                                                    <View style={{ margin: 15 }}>
                                                        <Text style={styles.hdrTxt}>OUT</Text>
                                                        <View style={styles.updateBtnContainer}>
                                                            <TouchableOpacity onPress={() => { upOut2('minus') }} style={styles.minus}>
                                                                <Text style={styles.txt}>-</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { upOut2('plus') }} style={styles.plus}>
                                                                <Text style={styles.txt}>+</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ margin: 15 }}>
                                                        <Text style={styles.hdrTxt}>RUNS</Text>
                                                        <View style={styles.updateBtnContainer}>
                                                            <TouchableOpacity onPress={() => { upRun2(-1) }} style={styles.minus}>
                                                                <Text style={styles.txt}>-</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { upRun2(1) }} style={styles.plus}>
                                                                <Text style={styles.txt}>+</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>

                                                    <View style={{ margin: 15 }}>
                                                        <Text style={styles.hdrTxt}>BALLS</Text>
                                                        <View style={styles.updateBtnContainer}>
                                                            <TouchableOpacity onPress={() => { upBall2('minus') }} style={styles.minus}>
                                                                <Text style={styles.txt}>-</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { upBall2('plus') }} style={styles.plus}>
                                                                <Text style={styles.txt}>+</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                                {/* <TouchableOpacity style={styles.endBtn}>
                                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: '#fff' }}>End Match</Text>
                                                </TouchableOpacity> */}

                                            </View> :
                                            null
                                    }

                                </View>
                        }
                        {
                            pending === 'Ongoing' ?
                                <View style={{ padding: 30, backgroundColor: '#fff' }}>
                                    <TouchableOpacity style={styles.endBtn} onPress={() => { setModalVisible(true) }}>
                                        <Text style={styles.btnText}>
                                            End Match
                                        </Text>
                                    </TouchableOpacity>

                                </View> :
                                null
                        }


                    </>
            }



            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(false) }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.nameText}>Final Message</Text>
                        </View>

                        <TextInput
                            placeholder="Message"
                            autoFocus={true}
                            placeholderTextColor='#8395a7'
                            onChangeText={(value) => setFmessage(value)}
                            style={styles.textInput} />


                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.Button}>
                                <Text style={styles._btnText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => endMatch()} style={styles.Button}>
                                <Text style={styles._btnText}>SAVE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </>
    );
}

export default updateCricket;