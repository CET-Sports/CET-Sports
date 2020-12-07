import React from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
 } from 'react-native'

function clubDetails() {
    return (
        <>
        <View>
            <Text>
                CLUB Name
            </Text>
        </View>
        <View>
            Club Description
        </View>
        <TouchableOpacity>
            <Text>
                Join
            </Text>
        </TouchableOpacity>
        </>
    )
}

export default clubDetails
