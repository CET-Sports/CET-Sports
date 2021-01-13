import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function clubAdminMain(navigation) {
    return (
        <View>
            <TouchableOpacity onPress={() => { navigation.navigate('Club_Regis') }}>
                <Text>CLUB REGISTRATION</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('clubMemAppr') }}>
                <Text>MEMBER APPROVAL</Text>
            </TouchableOpacity>
        </View>
    );
}

export default clubAdminMain;