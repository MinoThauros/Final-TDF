import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { PlaceSearchBarResult } from '../../screens/Expenses/SpendingForm'
import Colors from '../../constants/colors'
import { Stack } from '@react-native-material/core'

/**
 * Shows an expense with an image as a form
 * Should take an expense with the optional photoUrl
 * @returns 
 */
export default function ExpenseWithImage({name,photoUrl,type}:PlaceSearchBarResult) {

  //image preview + name + type
  return (
    <View>
        <View style={styles.imagePreview}>
            <Image style={styles.image} source={{uri:photoUrl}}/>
        </View>
        <Stack>
          <Text style={{color:Colors.Tangerine,fontSize:20,fontWeight:'bold'}}>{name}</Text>
          <Text style={{color:Colors.Tangerine,fontSize:16}}>{type}</Text>
        </Stack>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview:{
    width:'100%',
    height:200,
    marginVertical:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.Skobeloff,
    borderRadius:4,
    overflow:'hidden',
    paddingHorizontal:10
},
image:{
    width:'100%',
    height:'100%'
}
})