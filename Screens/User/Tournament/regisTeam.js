import React, { useState ,useEffect} from 'react';
import { Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { firebase } from '@react-native-firebase/auth';


function regisTeam({route}) {
    const { Tname } = route.params;
    const { Game } = route.params;

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
    const [phone, setPhone] = useState('');



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
                             setPhone(documentSnapshot.data().phone)
                         }
                     })
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
    function Register()
    {

        console.log("tour"+Tname)

       

              firebase.firestore().collection('Team').doc(Tname).collection('phone').doc(phone).set({
                teamName:teamName,
                player14:player14,
                player15:player15,
                player1:player1,
                player2:player2,
                player3:player3,
                player4:player4,
                player5:player5,
                player6:player6,
                player7:player7,
                player8:player8,
                player9:player9,
                player10:player10,
                player11:player11,
                player12:player12,
                player13:player13,
                Game:Game,
                phone:phone


                
              })
          

   
            }
    return (
        <ScrollView>

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

            <TouchableOpacity onPress={() => {Register()}}>
                <Text>
                    REGISTER
                </Text>
            </TouchableOpacity>


        </ScrollView>
    );
}

export default regisTeam;