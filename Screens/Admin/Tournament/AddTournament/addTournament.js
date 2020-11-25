import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function addTournament(props) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
    const [selectedValue, setSlectedValue] = useState('');
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');


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

      const sendData = ()=>{

        firebase.firestore().collection('Tournaments').doc(name).set({
            name:name,
            dew:date,
            type:selectedValue
        })
      }



    return (
        <View>

            <TextInput
                placeholder="Tournament Name"
                style={{ marginHorizontal: 20, marginTop: 20 }}
                onChangeText = {(value)=> setName(value)}
            />
            <Text style={{ marginLeft: 20, marginTop: 20 }}>Select games</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                    <Text>Football</Text>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                    <Text>Cricket</Text>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox1}
                        onValueChange={(newValue) => setToggleCheckBox1(newValue)}
                    />
                </View>
            </View>


            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150,marginLeft:20 }}
                onValueChange={(itemValue, itemIndex) => setSlectedValue(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Department" value="dept" />
                <Picker.Item label="Inter Department" value="Idept" />
                <Picker.Item label="College Sports" value="Csports" />

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
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>{showDatepicker()}}><Text>Dew date</Text></TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{sendData()}}><Text>Add</Text></TouchableOpacity>

        </View>
    );
}

export default addTournament;