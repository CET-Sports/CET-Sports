import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Dimensions, FlatList, Image, ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../../Colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AutoHeightImage from 'react-native-auto-height-image';
import styles from './styles';

function Feed({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setImgLoading(true);
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
        return (
            <>
                <View style={styles.Container}>
                    
                        <View style={{backgroundColor:'#FFF'}}>
                        {/* <AutoHeightImage source={{ uri: data.ImageUrl }} width={windowWidth} style={{marginBottom:5}}/> */}
                        <Image source={{ uri: data.ImageUrl }} style={styles.feedImage} />
                        </View>
                        <Text style={styles.title}>{data.Title}</Text>
                        <Text style={styles.content} numberOfLines={6}>{data.Content}</Text>
                        <View style={styles.divider} />
                    
                </View>
                <View style={styles.divider} />
            </>
        )
    }

    return (
        <View style={{flex:1}}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryColor} />
            {

                loading ? <ActivityIndicator size='large' color={colors.primaryColor} style={{flex:1}}/> :

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