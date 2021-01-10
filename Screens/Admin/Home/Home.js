import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, ActivityIndicator, Modal } from 'react-native';
import { colors } from '../../../Colors/colors';
import { firebase } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import { validateAll } from 'indicative/validator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function Home(props) {

    const [picName, setPicName] = useState('');
    const [imgSource, setImgSource] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [feedImg, setFeedImg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [img, setImg] = useState();
    const [uploaded, setUploaded] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [imgError, setImgError] = useState('');
    const [modalVisibleName, setModalVisibleName] = useState(false);
    const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
    const [modalVisibleLoading, setModalVisibleLoading] = useState(false);


    const data = {
        title: title,
        content: content,
        img: imgSource
    }

    const rules = {
        title: 'required',
        content: 'required',
        img: 'required'

    }

    const Validate = () => {

        validateAll(data, rules)
            .then(() => {
                setIsLoading(true);
                setModalVisibleLoading(true);
                console.log('success');
                titleError(false);
                contentError(false);
                imgError(false);
                
            })
            .catch((errorJson) => {
                // pushing error array to an object
                try {
                    const Errors = {}
                    errorJson.forEach(err => Errors[err.field] = err.message)
                    Errors.title ? setTitleError(true) : setTitleError(false)
                    Errors.content ? setContentError(true) : setContentError(false)
                    Errors.img ? setImgError(true) : setImgError(false)
                    setIsLoading(false)
                }
                catch {

                }

            })

    }

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
                setImg(response.uri);
                setImgError(false);
            }
            else if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                setImgSource(null);
            } else {
                console.log('User tapped custom button: ', response.customButton);
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

        firestore()
            .collection('Feed')
            .doc(title)
            .onSnapshot(documentSnapshot=>{
                if(documentSnapshot.data().Title !== null){
                    setTitle(null);
                    setContent(null);
                    setImg(null);
                    setImgSource(null);
                    txtInput.current.focus();
                    setIsLoading(false);
                    setTimeout(() => {
                        setModalVisibleLoading(false);
                    }, 1200)
                }
            })
    }

    const _setTitle = (val) => {
        setTitle(val)
        if (val != null) {
            setTitleError(false)
        }
    }
    const _setContent = (val) => {
        setContent(val)
        if (val != null) {
            setContentError(false)
        }
    }

    const txtInput = React.useRef()

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryColor} />
            <TextInput
                ref={txtInput}
                defaultValue={title}
                placeholder="Title"
                onChangeText={(value) => _setTitle(value)}
                style={styles.textinputS}
            />
            {
                titleError ? <Text style={styles.errorText}>*Title cannot be empty</Text> :
                    null
            }
            <TextInput
                defaultValue={content}
                placeholder="Content"
                onChangeText={(value) => _setContent(value)}
                multiline={true}
                style={styles.textinput}
            />
            {
                contentError ? <Text style={styles.errorText}>*Content cannot be empty</Text> :
                    null
            }
            <TouchableOpacity onPress={() => { selectImage() }}
                style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: 15, marginHorizontal: 15, paddingLeft: 15,
                    borderWidth: 1, borderColor: '#dcdee0', backgroundColor: '#f1f2f6', padding: 5, borderRadius: 5, height: 60
                }}>
                {
                    imgSource === null ?
                        <Image source={require('../../../Images/gal.jpg')} style={{ height: 40, width: 40 }} /> :
                        <Image source={{ uri: img }} style={{ height: 40, width: 40 }} resizeMode='cover' />
                }

                {
                    imgError === true ? <Text style={styles.errorText}>* An image has to be uploaded</Text> :
                        <Text style={{ flex: 1, marginLeft: 20, fontSize: 14, fontFamily: 'OpenSans-Regular', color: 'grey' }}>
                            {
                                imgSource === null ?
                                    "Attach file here" :
                                    picName
                            }

                        </Text>
                }

            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn}
                onPress={async () => {

                    Validate();

                    if(titleError != true && contentError != true && imgError != true){
                    const date = new Date();
                    setDate(date);
                    const reference = firebase.storage().ref('/Feeds/' + picName);
                    const task = reference.putFile(imgSource);
                    task.on('state_changed', taskSnapshot => {
                        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                    });
                    task.then(() => {
                        console.log('Image uploaded to the bucket!');
                        uploadFeed()
                    });

                }


                    // await reference.putFile(imgSource).then(snapshot => {
                    //     console.log('snapshot')
                    //     console.log(snapshot)
                    // });


                }}>
                <Text style={{ color: '#fff' }}>Upload</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleLoading}
                onRequestClose={() => { setModalVisibleLoading(false) }}
            >
                <View style={styles.modalContainer1}>
                    <View style={styles.modalView1}>

                        {
                            isLoading === true ?
                                <>
                                    <ActivityIndicator color={colors.primaryColor} size={'small'} style={{ margin: 10 }} />
                                    <Text style={styles.modalText1}>Uploading..</Text>
                                </>
                                :
                                <>

                                    <View style={{ flexDirection: 'column', alignItems: 'center', width: 100, margin: 10 }}>
                                        <Icon name="check-circle" size={60} color='#2ed573' />
                                        <Text style={styles.modalText}>Done...</Text>
                                    </View>

                                </>

                        }


                    </View>
                </View>
            </Modal>

        </View>
    );
}

export default Home;