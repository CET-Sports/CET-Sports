import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';


function ViewApplication(props) {

  function Item({ data }) {
    return (
      <>
        <Text>Name :  </Text>
        <Text>Dept :  </Text>
        <Text>Sem :  </Text>
        <Text>Student Phone :  </Text>
        <TouchableOpacity>
          <Text>
            Approve
        </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>
            Regect
        </Text>
        </TouchableOpacity>
      </>
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

export default ViewApplication;