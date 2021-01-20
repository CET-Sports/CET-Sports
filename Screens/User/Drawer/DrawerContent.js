import React, { useState, useEffect } from 'react';
import styles from './styles';
import { View, TouchableOpacity, Text, Image, StatusBar, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { authContext } from '../../../Context/context';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


function DrawerContent({ navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [dp, setDp] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        if (!user) {
            storeData('Login', { status: null })
            logout();
        }
        // setUser(user);
        // if (initializing) setInitializing(false);
    }


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
                            console.log(documentSnapshot.data().name)
                            setName(documentSnapshot.data().name)
                            setDp(documentSnapshot.data().dpUrl)
                        }
                    })
            })

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount

    }, [])

    const [dataSource, setDataSource] = useState([]);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');


    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)

        } catch (e) {
            // saving error
        }
    }

    const { logout } = React.useContext(authContext);

    setStatus = () => {
        navigation.closeDrawer();
        auth().signOut().then(() => console.log('User signed out!'));
    }

    getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value

        }
    }

    return (
        <ScrollView contentContainerStyle={styles.parent}>
            <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                <View style={styles.dpContainer}>
                    <Image source={{ uri: dp }} style={styles.avatar} />
                    <Text style={styles.name}>{name}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.button, marginTop: 20 }} onPress={() => { navigation.navigate('Feed') }}>
                <AntDesign name='home' color='#000' size={23} style={styles.icon} />
                <Text style={styles.drawerText}>
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Profile') }}>
                <Icon name='account-outline' color='#000' size={25} style={{ ...styles.icon, opacity: 0.8 }} />
                <Text style={styles.drawerText}>
                    Profile
                </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Apply') }}>
                <Entypo name='new-message' color='#000' size={23} style={styles.icon} />
                <Text style={styles.drawerText}>
                    Apply
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Club_Main') }}>
                <Icon name='select-group' color='#000' size={23} style={styles.icon} />
                <Text style={styles.drawerText}>
                    Clubs
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('groundBooking') }}>
                <Icon name='select-group' color='#000' size={23} style={styles.icon} />
                <Text style={styles.drawerText}>
                    Ground Booking
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('TournamentUserStackScreen') }}>
                <Icon name='select-group' color='#000' size={23} style={styles.icon} />
                <Text style={styles.drawerText}>
                    Tournament
                </Text>
            </TouchableOpacity>



            <View style={{ flex: 1, alignItems: 'flex-end', marginBottom: 25, flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => { setStatus() }}>
                    <Icon name='location-exit' color='#000' size={25} style={{ ...styles.icon, opacity: 0.8 }} />
                    <Text style={{ ...styles.drawerText, marginBottom: 3 }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default DrawerContent;