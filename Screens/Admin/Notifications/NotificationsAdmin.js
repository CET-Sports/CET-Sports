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


function NotificationsAdmin(props) {


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [modalVisibleLoading, setModalVisibleLoading] = useState(false);


    const data = {
        title: title,
        content: content
    }

    const rules = {
        title: 'required',
        content: 'required'

    }

    const Validate = () => {

        validateAll(data, rules)
            .then(() => {
                setIsLoading(true);
                setModalVisibleLoading(true);
                console.log('success');
                titleError(false);
                contentError(false);

            })
            .catch((errorJson) => {
                // pushing error array to an object
                try {
                    const Errors = {}
                    errorJson.forEach(err => Errors[err.field] = err.message)
                    Errors.title ? setTitleError(true) : setTitleError(false)
                    Errors.content ? setContentError(true) : setContentError(false)
                    setIsLoading(false)
                }
                catch {

                }

            })

    }




    uploadFeed = async () => {
        const date = new Date();

        firebase.firestore().
            collection('Notifications').
            doc('').
            set({
                notification: content,
                title: title,
                createdAt: date
            })


        setTitle(null);
        setContent(null);
        txtInput.current.focus();
        setIsLoading(false);
        setTimeout(() => {
            setModalVisibleLoading(false);
        }, 1200)

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
            <TouchableOpacity style={styles.uploadBtn}
                onPress={async () => {

                    Validate();

                    if (titleError != true && contentError != true) {
                        const date = new Date();
                        setDate(date);
                        uploadFeed()

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

export default NotificationsAdmin;