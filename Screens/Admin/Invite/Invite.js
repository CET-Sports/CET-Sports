import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image,Picker } from 'react-native';
import styles from './styles';

function Invite({ navigation }) {
    const [game, setGame] = useState("Java");
    const [gender,setGender]=useState("Male")
    return (
        <View style={styles.container}>

 <Picker
        game={game}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setGame(itemValue)}
      >
        <Picker.Item label="Cricket" value="Cricket" />
        <Picker.Item label="Football" value="Football" />
        <Picker.Item label="Hockey" value="Hockey" />
        <Picker.Item label="Volleyball" value="Volleyball" />
        <Picker.Item label="Basketball" value="Basketball" />
        <Picker.Item label="Badminton" value="Badminton" />
      </Picker>

      <Picker
        gender={gender}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />

      </Picker>



        </View>
    );
}

export default Invite;