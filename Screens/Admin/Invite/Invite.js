import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../../Colors/colors';
import { firebase } from '@react-native-firebase/app';

function Invite({ navigation }) {
  const [game, setGame] = useState("");
  const [gender, setGender] = useState("NULL")
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const _date = new Date();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  function add() {
    firebase.firestore().collection('Sports').doc(game).set({
      item: game,
      gender: gender,
      due: date,

    })
  }
  return (
    <View style={styles.container}>

      <Picker

        selectedValue={game}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setGame(itemValue)}
      >
        <Picker.Item label="Game" value="NULL" />
        <Picker.Item label="Cricket" value="Cricket" />
        <Picker.Item label="Football" value="Football" />
        <Picker.Item label="Hockey" value="Hockey" />
        <Picker.Item label="Volleyball" value="Volleyball" />
        <Picker.Item label="Basketball" value="Basketball" />
        <Picker.Item label="Badminton" value="Badminton" />
      </Picker>

      <Picker
        selectedValue={gender}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
      >
        <Picker.Item label="Gender" value="NULL" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />

      </Picker>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity style={styles.dateBtn} onPress={() => { showDatepicker() }}>
        <Text style={{ ...styles.txt, color: '#fff' }}>Dew date</Text>
      </TouchableOpacity>



      <TouchableOpacity style={styles.dateBtn} onPress={() => { add() }} >
        <Text style={{ ...styles.txt, color: '#fff' }}>Invite</Text>
      </TouchableOpacity>



    </View>
  );
}

export default Invite;