import React from 'react';
import styles from './styles';
import { 
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity } from 'react-native';

function Club_Main({navigation}) {
    return (

        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('joinClub')}}>
                <Text style={styles.btnTxt}>
                    JOIN A CLUB
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}  onPress={()=>{navigation.navigate('myClub')}}>
                <Text style={styles.btnTxt}>
                    MY CLUBS
                </Text>
            </TouchableOpacity>


        </SafeAreaView>
        
    );
}

export default Club_Main;