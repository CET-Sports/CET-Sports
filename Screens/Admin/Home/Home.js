import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Button, TextInput, ActivityIndicator } from 'react-native';
import { colors } from '../../../Colors/colors';
import { firebase } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';


function Home(props) {

    const [picName, setPicName] = useState('');
    const [imgSource, setImgSource] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [feedImg, setFeedImg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(new Date());

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

    uploadFeed = async () => {
        const feedImg = await firebase.storage().ref('/Feeds/' + picName).getDownloadURL();
        const date = new Date();
        setFeedImg(feedImg);
        firebase.firestore().
            collection('Feed').
            doc(title).
            set({
                Content: content,
                ImageUrl: feedImg,
                Title: title,
                CreatedAt: date
            })
    }


    return (
        <View>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryColor} />
            <TextInput
                placeholder="Enter title"
                onChangeText={(value) => setTitle(value)}

            />
            <TextInput
                placeholder="Enter title"
                onChangeText={(value) => setContent(value)}
                multiline={true}
            />
            <TouchableOpacity onPress={() => { selectImage() }}
                style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: 15, marginHorizontal: 15, paddingLeft: 15,
                    borderWidth: 1, borderColor: '#dcdee0', backgroundColor: '#ECEFF1', padding: 5, borderRadius: 5, height: 50
                }}>
                <Text style={{ flex: 1, marginLeft: 20, fontSize: 14, fontFamily: 'OpenSans-Regular', color: 'grey' }}>
                    {
                        imgSource === null ?
                            "Attach file here" :
                            picName
                    }

                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn}
            onPress={async () => {
                setIsLoading(true);
                const date = new Date();
                setDate(date);
                const reference = firebase.storage().ref('/Feeds/' + picName);
                const task = reference.putFile(imgSource);
                task.on('state_changed', taskSnapshot => {
                    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                });
                task.then(() => {
                    console.log('Image uploaded to the bucket!');
                    uploadFeed();
                    setIsLoading(false);
                });
                // await reference.putFile(imgSource).then(snapshot => {
                //     console.log('snapshot')
                //     console.log(snapshot)
                // });
            }}>
                {
                    isLoading ?
                    <ActivityIndicator size='small' color='#fff'/> :
                    <Text style={{color:'#fff'}}>Upload</Text>
                }
            </TouchableOpacity>

        </View>
    );
}

export default Home;