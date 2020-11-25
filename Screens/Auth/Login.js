import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, ActivityIndicator, Button } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { authContext } from '../../Context/context';
import { colors } from '../../Colors/colors';
import styles from './styles';

function Login({ navigation }) {

    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    // const [regStatus, setregStatus] = useState(null);
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    // const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        // setUser(user);
        if (initializing) setInitializing(false);
        if (user) {
            fetchData();
            // setLoading(false);
            console.log(user);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            // saving error
        }
    }

    // Handle the button press
    async function signInWithPhoneNumber() {
        console.log('signin called');
        setLoading(true);
        const confirmation = await auth().signInWithPhoneNumber(phone);
        console.log('confirmation');
        console.log(confirmation);
        setConfirm(confirmation);
        if (confirmation != null) {
            // if(confirmation.code != null){
            //     setCode(confirmation.code);
            //     confirmCode(confirmation.code);
            // }
            confirmCode(code);
            setLoading(false);
        }
    }



    async function confirmCode(Code) {
        setLoading(true);
        try {
            if (firebase.auth().currentUser === null) {
                console.log('confirm code called');
                await confirm.confirm(Code);
            }
            // fetchData();
        } catch (error) {
            console.log(error);
            console.log('Invalid code.');
        }
    }

    const { login } = React.useContext(authContext);

    fetchData = () => {
        console.log('im called')
        firebase.firestore().
            collection('Users').
            doc(phone).
            onSnapshot(documentSnapshot => {
                console.log(documentSnapshot.data())
                if (documentSnapshot.data() != null) {

                    if (documentSnapshot.data().authority == 'admin') {
                        storeData('IsAdmin', { status: true });
                    }
                    else {
                        storeData('IsAdmin', { status: false });
                    }
                    console.log('firebase called');
                    storeData('userData', { phone: phone });
                    storeData('Login', { status: 'LoggedIn' });
                    setLoading(false);
                    login();
                }
                else {
                    navigation.navigate('Register', { phone: phone });
                }
            })

    }

    return (
        <View style={styles.parent}>
            <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
            <Image source={require('../../Images/photo.png')} style={{ height: 55, width: 55, alignSelf: 'center', marginBottom: 0 }} />
            <Text style={styles.mainText}>CET SPORTS</Text>

            <>
                {
                    confirm === null ?
                        <>
                            <View style={styles.phonInputContainer}>
                                <View style={styles.phoneInput1}>
                                    <Text style={styles.phoneInput1Text}>
                                        +91
                                    </Text>
                                </View>
                                <TextInput
                                    keyboardType="decimal-pad"
                                    style={styles.phoneInput}
                                    onChangeText={(value) => { setPhone('+91' + value) }}
                                />
                            </View>
                            <TouchableOpacity style={styles.button} onPress={() => signInWithPhoneNumber()}>

                                {
                                    loading ? <ActivityIndicator color='#fff' size="small" /> :
                                        <Text style={styles.btnText}>GET OTP</Text>

                                }


                            </TouchableOpacity>
                            <Text style={styles.otpText}>We'll send you an OTP to verify</Text>
                        </>
                        :
                        <View>
                            <Text style={styles.otpText}>Enter 6 digit OTP sent to your mobile number</Text>
                            <TextInput
                                value={code}
                                onChangeText={text => setCode(text)}
                                keyboardType="decimal-pad"
                                style={styles.otpInput}
                            />
                            <TouchableOpacity style={styles.button} onPress={() => confirmCode(code)} >
                                {
                                    loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.btnText}>Verify</Text>
                                }
                            </TouchableOpacity>
                        </View>
                }
            </>


        </View>
    )
}

export default Login;