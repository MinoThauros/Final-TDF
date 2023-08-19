import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from '@react-native-material/core'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const LargerCircleContainer = ({onPress,icon}:{onPress:()=>void,icon:any}) => {
  return (
    <View style={styles.CircleContainer2}>
        <IconButton icon={<Icon name={icon} size={30} color="black"/>} onPress={onPress}/>
    </View>
  )
}

export default LargerCircleContainer

const styles = StyleSheet.create({
    CircleContainer2:{
        backgroundColor:'red',
        borderRadius:55,
        height:55,
        width:55,
        alignItems:'center',
        justifyContent:'center',
        elevation:5,
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.26,
        marginLeft:4
    }
})