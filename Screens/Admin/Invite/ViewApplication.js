import { useEffect, useState } from 'react';
import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export default function ViewApplication() {

  useEffect(() => {
    
  }, [])


  getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value

    }
  }


  function Item({ data }) {
    return (
      
      <View>
        
        <Text>{data.item}</Text>
      {
        trp?
        <Text>Applied</Text>

         :
        <TouchableOpacity onPress={()=>{push(data.item)}}><Text>Apply</Text></TouchableOpacity>
      
      }
        </View>

    )
  }

  return (
    <View>
      {
        size > 0 ?
        <FlatList
        data={dataSource}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      :
      <Text>No Invitaions</Text>
      }
    </View>
  )
}
