import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, TextInput, StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../../../Colors/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { validateAll } from 'indicative/validator';
import { validations } from 'indicative/validator'
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';



function Profile({ navigation }) {

    const [modalVisibleName, setModalVisibleName] = useState(false);
    const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
    const [modalVisibleLoading, setModalVisibleLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [dp, setDp] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [newemail, setNewemail] = useState();
    const [newname, setNewname] = useState();

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const rules = {
        name: [
            validations.regex([new RegExp('^[a-zA-Z_ ]*$')]),
            validations.required(),
            validations.min([3])
        ],
        email: [
            validations.regex([new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]),
            validations.required(),
            validations.min([5])
        ],
    }


    const data = {
        name: newname,
        email: newemail
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
        console.log('here');
        console.log(phone)
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
                            setEmail(documentSnapshot.data().email)
                            setNewname(documentSnapshot.data().name)
                            setNewemail(documentSnapshot.data().email)
                            setDp(documentSnapshot.data().dpUrl)
                        }
                    })
            })

        // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // return subscriber; // unsubscribe on unmount

    }, [])


    const editName = () => {
        setNameError(false);
        setModalVisibleName(true);
    }

    const editEmail = () => {
        setEmailError(false);
        setModalVisibleEmail(true);
    }

    // const editPhone = () => {
    //     setPhoneError(false);
    //     setModalVisiblePhone(true);
    // }

    const Validate = () => {



        validateAll(data, rules)
            .then(() => {
                console.log('success');
                setNameError(false);
                setEmailError(false);
                // setPhoneError(false);
                update();
            })
            .catch((errorJson) => {
                // pushing error array to an object
                const Errors = {}
                errorJson.forEach(err => Errors[err.field] = err.message)
                console.log(Errors)
                Errors.name ? setNameError(true) : setNameError(false)
                Errors.email ? setEmailError(true) : setEmailError(false)
                // Errors.phone ? setPhoneError(true) : setPhoneError(false)
            })
    }

    const update = () => {
        setLoading(true);
        setModalVisibleName(false);
        setModalVisibleEmail(false);
        setModalVisibleLoading(true);

        firebase.firestore().collection('Users').doc(phone).update({
            name: newname,
            email: newemail
        })

        setTimeout(() => {
            setLoading(false);
        }, 1000);
        setTimeout(() => {
            setModalVisibleLoading(false);
        }, 2000);
    }



    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor='#fff' />
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

                                        <View style={{ flexDirection: 'column', alignItems: 'center', width: 100, margin: 10 }}>
                                            <Icon name="check-circle" size={60} color='#2ed573' />
                                            <Text style={styles.modalText}>Done</Text>
                                        </View>

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
                    </View>
                </View>






            </View>
        </ScrollView>

    );
}

export default Profile;
