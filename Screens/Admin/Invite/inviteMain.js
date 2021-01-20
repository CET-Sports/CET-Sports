import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

function inviteMain({navigation}) {
    return (
        <View style={{justifyContent:'center',flex:1}}>
            <TouchableOpacity onPress={() => { navigation.navigate('Invite') }} style={styles.gameBtn}>
                <Text style={styles.txt}>INVITE TO COLLEGE TEAM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ViewApplication') }} style={styles.gameBtn}>
                <Text style={styles.txt}>VIEW COLLEGE TEAM REQUESTS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ViewApproved') }} style={styles.gameBtn}>
                <Text style={styles.txt}>APPROVED APPLICATIONS</Text>
            </TouchableOpacity>
        </View>
    );
}

export default inviteMain;