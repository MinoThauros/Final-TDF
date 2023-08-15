import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { PlaceSearchBarResult } from '../../screens/Expenses/SpendingForm'
import Colors from '../../constants/colors'
import { Stack, TextInput } from '@react-native-material/core'
import { useRoute } from '@react-navigation/native'

/**
 * Shows an expense with an image as a form
 * Should take an expense with the optional photoUrl
 * @returns 
 */
const ExpenseWithImage=()=>{
  const {params}=useRoute()
  //receive props with navigation instead
  const {name,photoUrl,type}=params as PlaceSearchBarResult
  const [amount,setAmount]=useState('');
  const [date, setDate]=useState('');

  return (
    <View style={{justifyContent:'center', flex:1, backgroundColor:Colors.Skobeloff}}>
      <View style={styles.overallContainer}>
        <View style={styles.imagePreview}>
            <Image 
            style={styles.image} 
            source={{uri:photoUrl}}/>
        </View>
        <Stack style={styles.textContainer}>
          <Text style={{color:Colors.Tangerine,fontSize:20,fontWeight:'bold'}}>{name}</Text>
          <Text style={{color:Colors.Tangerine,fontSize:16}}>{type}</Text>            
        </Stack>
        <Stack spacing={6} style={{marginBottom:'10%'}}>
          <TextInput
              variant='standard'
              label="Amount"
              value={amount}
              onChangeText={setAmount}
              defaultValue={name}
              inputStyle={{color:Colors.Tangerine,}}
              color={Colors.Tangerine}
              style={{marginVertical:5, minWidth:'90%'}}
              />
          <TextInput
              variant='standard'
              label="Date"
              value={date}
              onChangeText={setDate}
              defaultValue={name}
              inputStyle={{color:Colors.Tangerine,}}
              color={Colors.Tangerine}
              style={{marginVertical:5, minWidth:'90%'}}
              />
          </Stack>
    </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  imagePreview:{
    width:'100%',
    height:300,
    justifyContent:'center',
    alignItems:'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow:'hidden',
  },
  image:{
      width:'100%',
      height:'100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      
  },
  overallContainer:{
      backgroundColor:Colors.Dark_Purple,
      alignItems:'center',
      margin:10,
      borderRadius:10,
      justifyContent:'center',
  },
  textContainer:{
    width:'100%',
    alignItems:'flex-start',
    flexDirection:'column',
    backgroundColor:Colors.Dark_Purple,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding:10,

  }
})

export default ExpenseWithImage