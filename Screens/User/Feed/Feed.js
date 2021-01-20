import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Dimensions, FlatList, Image, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../../Colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';
import AutoHeightImage from 'react-native-auto-height-image';
import ContentLoader from "react-native-easy-content-loader";
import moment from 'moment';
import styles from './styles';

function Feed({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectData, setSelectData] = useState([]);
    const [selectDate, setSelectDate] = useState();


    useEffect(() => {
        setLoading(true);
        const subscriber = firestore().
            collection('Feed').
            orderBy('CreatedAt', 'desc').
            onSnapshot(querySnapShot => {
                const data = [];
                if (querySnapShot != null) {
                    querySnapShot.forEach(documentSnapShot => {
                        data.push({
                            ...documentSnapShot.data()
                        });
                        setDataSource(data);
                        setLoading(false);
                        console.log(dataSource);
                    });
                }
            })
        return () => subscriber();
    }, [])

    function Item({ data }) {
        const [imgLoading, setImgLoading] = useState(data.ImageUrl + true);
        return (
            <>
                {/* <ContentLoader
                    active
                    title={false}
                    primaryColor={'#ffffff'}
                    secondaryColor={'#ced6e0'}
                    animationDuration={500}
                    pWidth={["100%"]}
                    pHeight={[300, 0, 0, 0, 300, 0, 0, 0]}
                    pRows={8}
                /> */}
                <TouchableOpacity style={styles.Container} onPress={() => { viewData(data,moment(data.CreatedAt.toDate()).format('DD-MM-YYYY')) }}>

                    <View style={{ backgroundColor: '#FFF' }}>
                    <AutoHeightImage onLoad={() => { setImgLoading(data.ImageUrl + false) }} source={{ uri: data.ImageUrl }} width={windowWidth} style={{ marginBottom: 5 }} />

                        {/* {
                            imgLoading === data.ImageUrl + true ?
                                <>
                                    <ContentLoader
                                        active
                                        primaryColor={'#ffffff'}
                                        secondaryColor={'#ced6e0'}
                                        title={false}
                                        pWidth={["100%"]}
                                        pHeight={[350]}
                                        pRows={1}
                                    />
                                    <Image onLoad={() => { setImgLoading(data.ImageUrl + false) }} source={{ uri: data.ImageUrl }} style={{ ...styles.feedImage, display: 'none' }} />
                                </>
                                :
                                <AutoHeightImage onLoad={() => { setImgLoading(data.ImageUrl + false) }} source={{ uri: data.ImageUrl }} width={windowWidth} style={{ marginBottom: 5 }} />
                        } */}

                    </View>
                    <Text style={styles.title}>{data.Title}</Text>
                    <Text style={styles.date} numberOfLines={1}>{moment(data.CreatedAt.toDate()).format('DD-MM-YYYY')}</Text>
                    <Text style={styles.content} numberOfLines={6}>{data.Content}</Text>

                    <View style={styles.divider} />

                </TouchableOpacity>
                <View style={styles.divider} />
            </>
        )
    }

    viewData = (data,date) => {
        setModalVisible(true);
        setSelectData(data);
        setSelectDate(date);

    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryColor} />
            {

                loading ? <ContentLoader
                    active
                    title={false}
                    pWidth={["100%"]}
                    pHeight={[300, 0, 0, 0, 300, 0, 0, 0]}
                    pRows={8}
                /> :

                    <FlatList
                        data={dataSource}
                        renderItem={({ item }) => <Item data={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
            }

            <Modal
                animationType="none"
                transparent={false}
                visible={modalVisible}
                statusBarTranslucent={true}
                onRequestClose={() => { setModalVisible(false) }}
            >
                <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                <View style={styles.modalContainer}>
                    
                    <TouchableOpacity style={{ width: 40, marginVertical: 10 }} onPress={() => { setModalVisible(false) }}>
                        <Icon name="arrow-left" size={30} color="#000" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={styles.modalView}>
                        <AutoHeightImage source={{ uri: selectData.ImageUrl }} width={windowWidth} style={{ marginBottom: 5 }}
                        />
                        <Text style={styles.title}>{selectData.Title}</Text>
                        <Text numberOfLines={1} style={styles.date}>{selectDate}</Text>
                        <Text style={styles.content}>{selectData.Content}</Text>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

export default Feed;