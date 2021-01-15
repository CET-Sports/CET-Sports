import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

function clubAdminMain({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('Club_Regis') }} style={styles.btn}>
                <Text style={styles.btnTxt}>CLUB REGISTRATION</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('clubMemAppr') }} style={styles.btn}>
                <Text style={styles.btnTxt}>MEMBER APPROVAL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('clubView') }} style={styles.btn}>
                <Text style={styles.btnTxt}>VIEW CLUBS</Text>
            </TouchableOpacity>
        </View>
    );
}

export default clubAdminMain;