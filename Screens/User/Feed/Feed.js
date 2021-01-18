import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Dimensions, FlatList, Image, ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../../Colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AutoHeightImage from 'react-native-auto-height-image';
import { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';
import ContentLoader from "react-native-easy-content-loader";
import moment from 'moment';
import styles from './styles';

function Feed({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);


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
                <View style={styles.Container}>

                    <View style={{ backgroundColor: '#FFF' }}>

                        {
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
                                <Image onLoad={() => { setImgLoading(data.ImageUrl + false) }} source={{ uri: data.ImageUrl }} style={styles.feedImage} />
                        }

                    </View>
                    <Text style={styles.title}>{data.Title}</Text>
                    <Text style={styles.content} numberOfLines={6}>{data.Content}</Text>
                    <Text style={styles.content} numberOfLines={6}>{moment(data.CreatedAt.toDate()).format('DD-MM-YYYY')}
                    </Text>
                    <View style={styles.divider} />

                </View>
                <View style={styles.divider} />
            </>
        )
    }

    return (
        <View style={{ flex: 1 }}>
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
        </View>
    );
}

export default Feed;