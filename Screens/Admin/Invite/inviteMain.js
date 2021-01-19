import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function inviteMain(navigation) {
    return (
        <View>
            <TouchableOpacity onPress={() => { navigation.navigate('Invite') }}>
                <Text>INVITE TO COLLEGE TEAM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ViewApplication') }}>
                <Text>VIEW COLLEGE TEAM REQUESTS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ViewApplication') }}>
                <Text>APPROVED APPLICATIONS</Text>
            </TouchableOpacity>
        </View>
    );
}

export default inviteMain;