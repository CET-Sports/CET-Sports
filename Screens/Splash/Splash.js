import React from 'react';
import styles from './styles';
import { ActivityIndicator,View,Image, StatusBar,Text } from 'react-native';
import {colors} from '../../Colors/colors';

function Splash(props) {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
            <Image source={require('../../Images/photo.png')} style={{ height: 80, width: 80 }} />
            <Text style={styles.mainText}>CET SPORTS</Text>
            <ActivityIndicator size="small" color={colors.primaryColor} style={{marginVertical:5}}/>
        </View>
    );
}

export default Splash;