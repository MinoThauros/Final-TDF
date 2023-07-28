import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {  IconButton } from '@react-native-material/core'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const CircleContainer = ({onPress,icon}:{onPress:()=>void,icon:any}) => {
  return (
    <View style={styles.CircleContainer}>
        <IconButton icon={<Icon name={icon} size={20} color="black"/>} onPress={onPress}/>
    </View>
  )
}

export default CircleContainer

const styles = StyleSheet.create({
    CircleContainer:{
        backgroundColor:'red',
        borderRadius:30,
        height:30,
        width:30,
        alignItems:'center',
        justifyContent:'center',
        elevation:5,
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.26,
    },
})