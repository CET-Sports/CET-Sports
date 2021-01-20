import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StatusBar, TextInput, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styles from './styles';
import { colors } from '../../../Colors/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react';

function Calender(props) {

    useEffect(() => {
        firebase.firestore().collection('Bookings').doc(selectDate).collection('slots').where('slot', '==', '18:00 - 19:00').get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapShot => {
                console.log('here')
                console.log(documentSnapShot.data());
            })
        })
    }, [])

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [desc, setDesc] = useState('');
    const [name, setName] = useState('');
    const [selectDate, setSelectDate] = useState(null);
    const [nameError, setNameError] = useState('');
    const [dateError, setDateError] = useState('');
    const [descError, setDescError] = useState('');
    const [cordName, setCordName] = useState('');
    const [dept, setDept] = useState('');
    const [slot, setSlot] = useState('');
    const [booked, setBooked] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let dates = moment(selectedDate).format('DD-MM-YYYY');
        setSelectDate(dates);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const Validate = () => {
        validateAll(data, rules)
            .then(() => {
                console.log('success');
                setDateError(false);
                setNameError(false);
                setDescError(false);
                postEvent();
            })
            .catch((errorJson) => {
                // pushing error array to an object
                const Errors = {}
                errorJson.forEach(err => Errors[err.field] = err.message)
                Errors.date ? setDateError(true) : setDateError(false)
                Errors.name ? setNameError(true) : setNameError(false)
                Errors.desc ? setDescError(true) : setDescError(false)

            })
    }


    const rows = [
        { slot: 1, time: '6:00 - 7:00' },
        { slot: 2, time: '7:00 - 8:00' },
        { slot: 3, time: '8:00 - 9:00' },
        { slot: 4, time: '16:00 - 17:00' },
        { slot: 5, time: '17:00 - 18:00' },
        { slot: 6, time: '18:00 - 19:00' },
        { slot: 7, time: '19:00 - 20:00' }
    ]

    const check = () => {
        setBooked(false);
        firebase.firestore().collection('Bookings').doc(selectDate).onSnapshot(documentSnapShot => {
            
            console.log(documentSnapShot.data())
            if (documentSnapShot.data() != undefined) {
                if (documentSnapShot.data().status === 'Booking started') {

                    firebase.firestore().collection('Bookings').doc(selectDate).collection('slots').where('slot', '==', slot).get().then(querySnapshot => {
                        querySnapshot.forEach(documentSnapShot => {
                            if (documentSnapShot.data().slot != null) {
                                setBooked(true);
                                alert('Alredy booked..!')
                            }
                            console.log(documentSnapShot.data().slot);
                        })
                    })
                }
                else {
                    setBooked(false);
                }
            }

        })
        // firebase.firestore().collection('Bookings').doc(selectDate).set({
        //     status:'Booking started'
        // })
        // firebase.firestore().collection('Bookings').doc(selectDate).collection('slots').doc('').set({
        //     slot:slot,
        //     event:name,
        //     cordName:cordName,
        //     dept:dept,
        //     desc:desc
        // })

    }

    const book = () => {


    }


    function Item({ data }) {
        const [selected, setSelected] = useState(false);
        return (
            <TouchableOpacity style={styles.flatItem} onPress={() => {
                {
                    selected === data.slot + true ?
                        setSelected(data.slot + false) :
                        setSelected(data.slot + true);
                    setSlot(data.time);
                }


            }}>
                {
                    selected === data.slot + true ?
                        <Text style={{ ...styles.flatTxt, color: '#4cd137' }}>{data.time}</Text> :
                        <Text style={styles.flatTxt}>{data.time}</Text>
                }

            </TouchableOpacity>

        )
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.parent}>
                <StatusBar backgroundColor={colors.primaryColor} barStyle="light-content" />
                <TextInput
                    placeholder="Name of the event"
                    placeholderTextColor="grey"
                    style={styles.textinputS}
                    onChangeText={(value) => setName(value)}
                />
                {
                    nameError === true ? <Text style={styles.errorText}>* Event name required</Text> : null
                }

                <TextInput
                    placeholder="Name of the Cordinator"
                    placeholderTextColor="grey"
                    style={styles.textinputS}
                    onChangeText={(value) => setCordName(value)}
                />
                <TextInput
                    placeholder="Dept"
                    placeholderTextColor="grey"
                    style={styles.textinputS}
                    onChangeText={(value) => setDept(value)}
                />
                <TouchableOpacity onPress={showDatepicker} style={{ ...styles.textinputS, justifyContent: 'center' }}>

                    <Text style={{ color: 'grey', fontFamily: 'OpenSans-Regular' }}>
                        {
                            selectDate === null
                                ? "Event Date"
                                : selectDate
                        }</Text>
                </TouchableOpacity>
                {
                    dateError === true ? <Text style={styles.errorText}>* Event date required</Text> : null
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



                <TextInput
                    multiline
                    placeholder="Description"
                    placeholderTextColor="grey"
                    style={styles.textinput}
                    onChangeText={(value) => { setDesc(value) }}
                />
                {
                    descError === true ? <Text style={styles.errorText}>* Event description required</Text> : null
                }

                <View style={{ marginTop: 15, marginHorizontal: 15, borderRadius: 5 }}>
                    <FlatList
                        horizontal={true}
                        data={rows}
                        renderItem={({ item }) => <Item data={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ backgroundColor: '#DDF2FD', alignItems: 'center' }}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => { check() }}>
                    <Text style={styles.txt}>Check</Text>
                </TouchableOpacity>







            </View>




        </ScrollView>

    );
}

export default Calender;