import React from 'react';
import { View, TouchableOpacity } from 'react-native';

function Calender(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txt}>Calender</Text>
            </TouchableOpacity>
          </View>
    );
}

export default Calender;