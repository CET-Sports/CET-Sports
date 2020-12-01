import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, Image } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

function updateCricket({ route }) {

    const { mName } = route.params
    const { lName } = route.params
    const { Tname } = route.params
    const { tone } = route.params
    const { ttwo } = route.params

    const [run, setRun] = useState('');
    const [overs, setOvers] = useState('');

    useEffect(() => {

    }, [])

    const upadateGame = () => {
        firebase.firestore().collection('Tournaments').doc(Tname).collection('Games').doc('Cricket')
            .collection('Scores').doc(mName + " " + lName).update({
                runs: run,
                Overs: overs
            })
    }

    return (
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

                <Text style={styles.teamName}>120-4</Text>


                <Text style={styles.teamName}>3.5</Text>

            </View>
            <Text style={styles.gmeMsg}>CSK WON THE TOSS AND CHOSE TO FIELD</Text>
            <View style={styles.scoreCalc}>
                <TouchableOpacity>
                    <View>
                        <Image source={require('../../../../Icons/one.png')} style={styles.score}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Image source={require('../../../../Icons/two.png')} style={styles.score}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Image source={require('../../../../Icons/four.png')} style={styles.score}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Image source={require('../../../../Icons/six.png')} style={styles.score}/>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.teamTwo}>
                <Text>{ttwo}</Text>
            </View> */}
            {/* <TextInput
                placeholder='runs'
                onChangeText={(value) => setRun(value)}
            />
            <TextInput
                placeholder='overs'
                onChangeText={(value) => setOvers(value)}
            />
            <TouchableOpacity onPress={() => { upadateGame() }}>
                <Text>update</Text>
            </TouchableOpacity> */}
        </View>
    );
}

export default updateCricket;