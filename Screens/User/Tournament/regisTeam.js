import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

function regisTeam(props) {

    const [teamName, setTeamName] = useState('');
    const [playerNumber, setPlayerNumber] = useState();
    // const num;
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [player3, setPlayer3] = useState('');
    const [player4, setPlayer4] = useState('');
    const [player5, setPlayer5] = useState('');
    const [player6, setPlayer6] = useState('');
    const [player7, setPlayer7] = useState('');
    const [player8, setPlayer8] = useState('');
    const [player9, setPlayer9] = useState('');
    const [player10, setPlayer10] = useState('');
    const [player11, setPlayer11] = useState('');
    const [player12, setPlayer12] = useState('');
    const [player13, setPlayer13] = useState('');
    const [player14, setPlayer14] = useState('');
    const [player15, setPlayer15] = useState('');


    // function playerNames(num) {

    //     setPlayerNumber(num)

    //     return (
    //         <View>

    //             for (let index = 0; index < num; index++) {
    //                 const element = array[index];

    //             }


    //         </View>
    //     )

    // }

    function Register() {

    }

    return (
        <View>

            <Text>ENTER TEAM NAME : </Text>
            <TextInput placeholder='TEAM NAME' onChangeText={(value) => setTeamName(value)} />

            {/* <Text>ENTER TOTAL NUMBER OF PLAYERS : </Text>
            <TextInput placeholder='NO OF PLAYERS INCL. SUB' onChangeText={(value) => setPlayerNumber(value)} />

            for (let index = 0; index < playerNumber; index++) {
                const element = array[index];
                
            } */}

            <Text>ENTER CAPTIAN NAME : </Text>
            <TextInput placeholder='CAPTIAN NAME' onChangeText={(value) => setPlayer14(value)} />

            <Text>ENTER VICE CAPTIAN NAME : </Text>
            <TextInput placeholder='VICE CAPTIAN NAME' onChangeText={(value) => setPlayer15(value)} />

            <Text>ENTER NAME OF PLAYERS : </Text>
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer1(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer2(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer3(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer4(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer5(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer6(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer7(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer8(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer9(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer10(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer11(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer12(value)} />
            <TextInput placeholder='PLAYER NAME' onChangeText={(value) => setPlayer13(value)} />

            <TouchableOpacity onPress={() => { Register() }}>
                <Text>
                    REGISTER
                </Text>
            </TouchableOpacity>


        </View>
    );
}

export default regisTeam;