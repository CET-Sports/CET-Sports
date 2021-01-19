import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


function viewEvents(props) {

    const [dataSource, setDataSource] = useState([]);

    function Item({ data }) {
        return (
            <View>
                <Text></Text>
                {/* add event name from database above */}
                <TouchableOpacity>
                    <Text>ENTER</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={dataSource}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={(item, index) => index.toString()}
            />

        </View>
    );
}

export default viewEvents;
