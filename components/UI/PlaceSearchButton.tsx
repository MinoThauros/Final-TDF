import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from '@react-native-material/core'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const PlaceSearchButton = ({onPress, disabled}:{onPress:()=>void, disabled:boolean}) => {
  return (
    <View style={styles.CircleContainer}>
      <IconButton 
        icon={
          <MaterialIcons 
            name="image-search" 
            size={30} color="black" 
          />}
        disabled={disabled}
        onPress={onPress}/>
    </View>
  )
}

export default PlaceSearchButton

const styles = StyleSheet.create({
    CircleContainer:{
        backgroundColor:'red',
        borderRadius:50,
        height:50,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        elevation:5,
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.26,
    },
})