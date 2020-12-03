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
            <TouchableOpacity style={styles.button1} onPress={()=>{navigation.navigate('joinClub')}}>
                <Text>
                    JOIN A CLUB
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2}>
                <Text>
                    ENTER TO YOUR CLUB
                </Text>
            </TouchableOpacity>


        </SafeAreaView>
        
    );
}

export default Club_Main;