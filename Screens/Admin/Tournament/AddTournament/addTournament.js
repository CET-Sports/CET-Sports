import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../../../Colors/colors';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

function addTournament(props) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
    const [selectedValue, setSlectedValue] = useState('');
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    // const [Cricket, setCricket] = useState('');
    // const [Football, setFootball] = useState('');

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

    const sendData = () => {
        firebase.firestore().collection('Tournaments').doc(name).set({
            name: name,
            dew: date,
            type: selectedValue,
            status: 'Pending',
            dept: dept
        })

        if (toggleCheckBox == true) {
            firebase.firestore().collection('Tournaments').doc(name).collection('Games').doc().set({
                name: 'Cricket'
            })
        }
        if (toggleCheckBox1 == true) {
            firebase.firestore().collection('Tournaments').doc(name).collection('Games').doc().set({
                name: 'Football'
            })
        }

        setModalVisible(true);

        setTimeout(() => {
            setModalVisible(false);
        }, 1000);
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>

            <TextInput
                placeholder="Tournament Name"
                style={styles.TextInput}
                onChangeText={(value) => setName(value)}
            />

            <View style={{ backgroundColor: '#fff' }}>
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
            </View>

            <View style={styles.pickerBox}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50 }}
                    onValueChange={(itemValue, itemIndex) => setSlectedValue(itemValue)}
                    itemStyle={{ height: 70, color: colors.primaryColor, fontSize: 40 }}
                >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Department" value="dept" />
                    <Picker.Item label="Inter Department" value="Idept" />
                    <Picker.Item label="College Sports" value="Csports" />

                </Picker>
            </View>


            {
                selectedValue == 'dept' ?
                    <View>
                        <TextInput placeholder="Department" style={{ marginLeft: 20 }}
                            onChangeText={(value) => setDept(value)}
                        />
                    </View>
                    :
                    null
            }

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
                <Text style={{ color: '#fff', fontSize: 16 }}>Dew date</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ margin: 20 }} onPress={() => { sendData() }}>
                <View style={{ padding: 15, backgroundColor: colors.primaryColor, borderRadius: 12, marginTop: 20 }}>
                    <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 16 }}>Add Tournament</Text>
                </View>
            </TouchableOpacity>


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
                                    <Text style={styles.modalText}>Done</Text>
                                </View>
                            </View>
                        </View>

                    </Modal>

                    :

                    null

            }




        </ScrollView>
    );
}

export default addTournament;