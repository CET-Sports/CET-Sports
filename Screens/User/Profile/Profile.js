import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, TextInput, StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../../Context/context';
import { colors } from '../../../Colors/colors';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { validateAll } from 'indicative/validator';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';



function Profile({ navigation }) {

    const [modalVisibleName, setModalVisibleName] = useState(false);
    const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
    const [modalVisiblePhone, setModalVisiblePhone] = useState(false);
    const [modalVisibleLoading, setModalVisibleLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, _setStatus] = useState('');
    const [username, setUsername] = useState('');
    const [dp, setDp] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');

    const [newemail, setNewemail] = useState(email);
    const [newname, setNewname] = useState(username);
    const [newphone, setNewphone] = useState(phone);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const rules = {
        name: 'required|alpha|min:3',
        email: 'required|email',
        phone: 'required|number'
    }


    const data = {
        name: newname,
        email: newemail,
        phone: newphone

    }

    // LOGOUT

    getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value

        }
    }

    // logout function calling from Routes.js
    setStatus = () => {
        storeData("Login", { status: null });
        // logout();
    }
    //End of logout function calling from Routes.js



    // const { logout } = React.useContext(AuthContext);

    // LOGOUT END

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
                            console.log(documentSnapshot.data())
                            setUsername(documentSnapshot.data().name)
                            setDp(documentSnapshot.data().dpUrl)
                            setEmail(documentSnapshot.data().email)
                        }
                    })
            })

        // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // return subscriber; // unsubscribe on unmount

    }, [])


    editName = () => {
        setNameError(false);
        setModalVisibleName(true);
    }

    editEmail = () => {
        setEmailError(false);
        setModalVisibleEmail(true);
    }

    editPhone = () => {
        setPhoneError(false);
        setModalVisiblePhone(true);
    }

    Validate = () => {
        validateAll(data, rules)
            .then(() => {
                console.log('success');
                setNameError(false);
                setEmailError(false);
                setPhoneError(false);

                update();
            })
            .catch((errorJson) => {
                // pushing error array to an object
                const Errors = {}
                errorJson.forEach(err => Errors[err.field] = err.message)
                console.log(Errors)
                Errors.name ? setNameError(true) : setNameError(false)
                Errors.email ? setEmailError(true) : setEmailError(false)
                Errors.phone ? setPhoneError(true) : setPhoneError
                    (false)
            })
    }

    update = () => {
        _setStatus('');
        setLoading(true);
        setModalVisibleName(false);
        setModalVisibleEmail(false);
        setModalVisiblePhone(false);
        setModalVisibleLoading(true);
        let obj = {
            id: id,
            username: newname,
            email: newemail,
            phone: newphone
        }
    }



    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.parent} >
                <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleName}
                    onRequestClose={() => { setModalVisibleName(false) }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.nameText}>Enter your name</Text>
                            </View>

                            <TextInput
                                placeholder="Name"
                                defaultValue={username}
                                autoFocus={true}
                                placeholderTextColor='#8395a7'
                                onChangeText={(value) => setNewname(value)}
                                style={styles.textInput} />
                            {
                                nameError === true ? <Text style={styles.errorText}>* Enter a valid name</Text> : null
                            }

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => setModalVisibleName(false)} style={styles.Button}>
                                    <Text style={styles.btnText}>CANCEL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Validate()} style={styles.Button}>
                                    <Text style={styles.btnText}>SAVE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleEmail}
                    onRequestClose={() => { setModalVisibleEmail(false) }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.nameText}>Enter your Email</Text>
                            </View>

                            <TextInput
                                placeholder="Email"
                                defaultValue={email}
                                autoFocus={true}
                                placeholderTextColor='#8395a7'
                                onChangeText={(value) => setNewemail(value)}
                                style={styles.textInput} />
                            {
                                emailError === true ? <Text style={styles.errorText}>* Enter a valid email address</Text> : null
                            }

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => setModalVisibleEmail(false)} style={styles.Button}>
                                    <Text style={styles.btnText}>CANCEL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Validate()} style={styles.Button}>
                                    <Text style={styles.btnText}>SAVE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisiblePhone}
                    onRequestClose={() => { setModalVisiblePhone(false) }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.nameText}>Enter your Phone Number</Text>
                            </View>

                            <TextInput
                                keyboardType="decimal-pad"
                                placeholder="phone"
                                defaultValue={phone}
                                autoFocus={true}
                                placeholderTextColor='#8395a7'
                                onChangeText={(value) => setNewphone(value)}
                                style={styles.textInput} />
                            {
                                phoneError === true ? <Text style={styles.errorText}>* Enter a valid phone number</Text> : null
                            }

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => setModalVisiblePhone(false)} style={styles.Button}>
                                    <Text style={styles.btnText}>CANCEL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Validate()} style={styles.Button}>
                                    <Text style={styles.btnText}>SAVE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisibleLoading}
                    onRequestClose={() => { setModalVisibleLoading(false) }}
                >
                    <View style={styles.modalContainer1}>
                        <View style={styles.modalView1}>

                            {
                                loading === true ?
                                    <>
                                        <ActivityIndicator color={colors.primaryColor} size={'small'} style={{ margin: 10 }} />
                                        <Text style={styles.modalText1}>Updating..</Text>
                                    </>
                                    :
                                    <>
                                        {
                                            status === 'success' ?
                                                <View style={{ flexDirection: 'column', alignItems: 'center', width: 100, margin: 10 }}>
                                                    <Icon name="check-circle" size={60} color='#2ed573' />
                                                    <Text style={styles.modalText}>Done</Text>
                                                </View>
                                                :
                                                <View style={{ flexDirection: 'column', alignItems: 'center', width: 100, margin: 10 }}>
                                                    <AntDesign name="warning" size={60} color='red' />
                                                    <Text style={{ ...styles.modalText, color: 'red' }}>Error !!</Text>
                                                </View>
                                        }
                                    </>

                            }


                        </View>
                    </View>
                </Modal>


                <View style={styles.dpContainer}>
                    <Image source={{ uri: dp }} style={styles.dp} />
                </View>
                <View style={styles.divider} />
                <View style={styles.details}>
                    <View style={styles.nameContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name="account-outline" color="#000" size={27} />
                        </View>
                        <View style={styles.nameContent}>
                            <View style={styles.orgNameContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.text}>Name</Text>
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.mainText}>{username}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.editContainer}>
                            <TouchableOpacity onPress={() => editName()}>
                                <Icon name="pencil" size={20} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={styles.emailDetails}>
                    <View style={styles.nameContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name="email-outline" color="#000" size={27} />
                        </View>
                        <View style={styles.nameContent}>
                            <View style={styles.orgNameContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.text}>Email</Text>
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.mainText}>{email}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.editContainer}>
                            <TouchableOpacity onPress={() => { editEmail() }}>
                                <Icon name="pencil" size={20} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>



                <View style={styles.emailDetails}>
                    <View style={styles.nameContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name="phone-outline" color="#000" size={27} />
                        </View>
                        <View style={styles.nameContent}>
                            <View style={styles.orgNameContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.text}>Phone</Text>
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.mainText}>{phone}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.editContainer}>
                            <TouchableOpacity onPress={() => { editPhone() }}>
                                <Icon name="pencil" size={20} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                


               

            </View>
        </ScrollView>

    );
}

export default Profile;
