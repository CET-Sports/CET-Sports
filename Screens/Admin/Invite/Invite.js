import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

function Invite({ navigation }) {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.box} onPress={() => {
                navigation.navigate('Cricket', {
                    game: 'Cricket'
                })
            }}>
                <View>
                    <Image source={require('../../../Images/photo.png')} style={{ height: 50, width: 50, margin: 10 }} />
                    <View>
                        <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center' }}> Cricket</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => {
                navigation.navigate('Cricket', {
                    game: 'Football'
                })
            }}>
                <View>
                    <Image source={require('../../../Images/photo.png')} style={{ height: 50, width: 50, margin: 10 }} />
                    <View>
                        <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center' }}> Football</Text>
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    );
}

export default Invite;