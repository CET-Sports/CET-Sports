import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function groundBooking(props) {

    const time = ['6:00 - 7:00', '7:00 - 8:00', '8:00 - 9:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00']
    const keys = [1, 2, 3, 4, 5, 6, 7]
    // const list = time.map(time => <Text key={time}>{time}</Text>)

    // function Item({ data }) {
    //     return (

    //         <TouchableOpacity>
    //             <Text>{list}</Text>
    //         </TouchableOpacity>

    //     )
    // }
    function fun1(t) {

        console.log(t) //The time ==> This time is to be uploaded in the database


    }

    return (
        <View>
            { time.map(time => (
                <TouchableOpacity onPress={() => fun1(time)}>
                    <Text key={keys}>{time}</Text>
                </TouchableOpacity>
            ))}
            {/* <FlatList
                data={list}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={(item, index) => index.toString()}
            /> */}
        </View>
    );
    // const names = ['James', 'Paul', 'John', 'George', 'Ringo'];


    // return (
    //     <View>
    //         {names.map(name => (
    //             <TouchableOpacity>
    //                 <Text>
    //                     {name}
    //                 </Text>
    //             </TouchableOpacity>

    //         ))}
    //     </View>


    // );

}

export default groundBooking;