import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function clubAdminMain(props) {
    return (
        <View>
            <TouchableOpacity>
                <Text>CLUB REGISTRATION</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>MEMBER APPROVAL</Text>
            </TouchableOpacity>
        </View>
    );
}

export default clubAdminMain;