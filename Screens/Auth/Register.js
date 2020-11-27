import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../Colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';

function Register({ route, navigation }) {


    const { phone } = route.params;


    const [fname, setfName] = useState('');
    const [lname, setlName] = useState('');
    const [picName, setPicName] = useState('');
    const [imgSource, setImgSource] = useState(null);
    const [uri, setUri] = useState(null);
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    const [dp, setDp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [dept, setDept] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [sem, setSem] = useState('');
    const options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
            quality: 0.1
        },
    };

    selectImage = () => {

        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            if (response.uri) {
                setPicName(response.fileName);
                setImgSource(response.path);
                setUri(response.uri);
            }
            else if (response.didCancel) {
                console.log('User cancelled image picker');
                setImgSource(null);
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                setImgSource(null);
            } else {
                console.log('User tapped custom button: ', response.customButton);
                setImgSource(null);
            }

        });

    }



    addUser = async () => {
        const dp = await firebase.storage().ref('/Profile/' + picName).getDownloadURL();
        const date = new Date();
        setDp(dp);
        firebase.firestore().
            collection('Users').
            doc(JSON.parse(JSON.stringify(phone))).
            set({
                name: fname + " " + lname,
                phone: phone,
                email: email,
                dpUrl: dp,
                dept: dept,
                sem: sem,
                gender: gender,
                year: year
            })

        // storeData('userData', { phone:phone,name:fname+" "+lname,blood:selectedValue });
    }


    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
                {/* <Image source={require('../../Images/photo.png')} style={{ height: 55, width: 55, alignSelf: 'center', marginBottom: 0 }} />
                <Text style={styles.mainText}>CET SPORTS</Text> */}
                <TouchableOpacity onPress={() => { selectImage() }}>
                    <View>
                        {
                            imgSource === null ?
                                <Image source={require('../../Images/avatar.png')} style={{ ...styles.avatar, position: 'relative', opacity: 0.6, borderRadius: 100 }} /> :
                                <Image source={{ uri: uri }} style={{ ...styles.avatar, position: 'relative', opacity: 0.6, borderRadius: 100 }} />
                        }

                        <View style={{ height: 31, width: 31, borderRadius: 100, alignSelf: 'center', top: -29, right: -36, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="camera" size={23} color='#000' />
                        </View>
                    </View>
                </TouchableOpacity>
                <TextInput
                    placeholder="First Name"
                    style={styles.TextInput}
                    onChangeText={(value) => setfName(value)}
                ></TextInput>
                <TextInput
                    placeholder="Last Name"
                    style={styles.TextInput}
                    onChangeText={(value) => setlName(value)}
                ></TextInput>
                <TextInput
                    placeholder="Email"
                    style={styles.TextInput}
                    onChangeText={(value) => setEmail(value)}
                ></TextInput>
                <TextInput
                    placeholder="Department"
                    style={styles.TextInput}
                    onChangeText={(value) => setDept(value)}
                ></TextInput>
                <TextInput
                    placeholder="Semester"
                    style={styles.TextInput}
                    onChangeText={(value) => setSem(value)}
                ></TextInput>
                <TextInput
                    placeholder="Year of completion"
                    style={styles.TextInput}
                    onChangeText={(value) => setYear(value)}
                ></TextInput>
                <TextInput
                    placeholder="Gender"
                    style={styles.TextInput}
                    onChangeText={(value) => setGender(value)}
                ></TextInput>



            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={async () => {
                    setIsLoading(true);
                    //   const date = new Date();
                    //   setDate(date);
                    const reference = firebase.storage().ref('/Profile/' + picName);
                    const task = reference.putFile(imgSource);
                    task.on('state_changed', taskSnapshot => {
                        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                    });
                    task.then(() => {
                        console.log('Image uploaded to the bucket!');
                        addUser();
                        setIsLoading(false);
                    });
                }}

                    style={{
                        backgroundColor: colors.primaryColor, height: 60,
                        width: 60, borderRadius: 100, margin: 15, alignItems: 'center', justifyContent: 'center'
                    }}>
                    {
                        isLoading ? <ActivityIndicator size='small' color='#fff' /> :
                            <Icon name="arrow-right" color={"#fff"} size={26} />
                    }
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Register;