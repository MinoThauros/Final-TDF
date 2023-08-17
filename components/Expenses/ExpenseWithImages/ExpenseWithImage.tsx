import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { PlaceSearchBarResult } from '../../../screens/Expenses/PlaceForm'
import Colors from '../../../constants/colors'
import { HStack, Stack, TextInput } from '@react-native-material/core'
import { useNavigation, useRoute } from '@react-navigation/native'
import ExpenseWithImageCard from './ExpenseWithImageCard'
import { useStoreExpense } from '../../../Hooks/ReactQ'
import { useQueryClient } from '@tanstack/react-query'


/**
 * Shows an expense with an image as a form; fields can be pre-filled
 * if we are editing an expense
 * Should take an expense with the optional photoUrl
 * @returns 
 */
const ExpenseWithImage=()=>{
  const queryClient=useQueryClient()
  const {setOptions:navOptions,navigate}=useNavigation()
  useStoreExpense({
    onSuccess:()=>{},
    onError:()=>{},
    queryClient})
  const {params}=useRoute()
  //receive props with navigation instead
  const {name,photoUrl,type}=params as PlaceSearchBarResult//guaranteed to exist
  const [amount,setAmount]=useState(name);
  const [date, setDate]=useState(name);

  useLayoutEffect(() => {
    navOptions({
        title:'Edit Expense',
    })
    setAmount(name)
    setDate(name)
}, [navigate,params])

  return (
    <View style={{justifyContent:'center', flex:1, backgroundColor:Colors.Skobeloff}}>
      <ExpenseWithImageCard 
        //should only be displayed if we are getting a url photo
        //
        name={name} 
        photoUrl={photoUrl} 
        type={type}>
        <TextInput
              variant='standard'
              label="Amount"
              value={amount}
              onChangeText={setAmount}
              inputStyle={{color:Colors.Tangerine,}}
              color={Colors.Tangerine}
              style={{marginVertical:5, minWidth:'90%'}}
              />
          <TextInput
              variant='standard'
              label="Date"
              value={date}
              onChangeText={setDate}
              inputStyle={{color:Colors.Tangerine,}}
              color={Colors.Tangerine}
              style={{marginVertical:5, minWidth:'90%'}}
              />
          <View style={styles.buttonStack}>
            <Button //use a cross and a checkmark instead of these buttons
              onPress={()=>{}}
              title='Cancel'/>
            <Button
              onPress={()=>{}}
              title='Save'
              />
          </View>
        </ExpenseWithImageCard>
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

  },
  buttonStack:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
},
})

export default ExpenseWithImage