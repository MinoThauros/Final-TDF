import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { PlaceSearchBarResult } from './PlaceForm'
import Colors from '../../constants/colors'
import { HStack, Stack, TextInput } from '@react-native-material/core'
import { useNavigation, useRoute } from '@react-navigation/native'
import ExpenseWithImageCard from '../../components/Expenses/ExpenseWithImages/ExpenseWithImageCard'
import { useStoreExpense } from '../../Hooks/ReactQ'
import { useQueryClient } from '@tanstack/react-query'
import CircleContainer from '../../components/UI/CircleContainer'
import LargerCircleContainer from '../../components/UI/LargerCircleContainer'
import CancelButton from '../../components/ProfileForm/CancelButton'
import { AuthContext } from '../../states/context/CredentialsContext'


/**
 * Shows an expense with an image as a form; fields can be pre-filled
 * if we are editing an expense
 * Should take an expense with the optional photoUrl
 * @returns 
 */
const ExpenseWithImageForm=()=>{
  const {userId}=useContext(AuthContext)
  const queryClient=useQueryClient()
  const {setOptions:navOptions,navigate}=useNavigation()
  const {mutate}=useStoreExpense({
    onSuccess:()=>{
      navigate('AllExpensesReactQuery' as never)
    },
    onError:()=>{},
    queryClient})
  const {params}=useRoute()

  useLayoutEffect(() => {
    navOptions({
        headerLeft:()=><CancelButton onPress={()=>navigate('PlaceForm' as never)}/>,
        title:'Edit Expense',
    })
}, [])
  //receive props with navigation instead
  const {name,photoUrl,type}=params as PlaceSearchBarResult//guaranteed to exist
  const [amount,setAmount]=useState<string>();
  const [date, setDate]=useState('');

  useEffect(() => {
    navOptions({
        
    })
    //setAmount(name)
    //setDate(name)
}, [navigate,params])

  const onSubmit=()=>{
    mutate({
      spending:{
        title:name,
        price:Number(amount),
        date,
        category:type,
        imageUrl:photoUrl,
      },
      userId,
    })
  }

  return (
    <View style={{justifyContent:'center', flex:1, backgroundColor:Colors.Skobeloff}}>
      <ExpenseWithImageCard
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
              keyboardType='numeric'
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
            <LargerCircleContainer onPress={onSubmit} icon={"check"}/>
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
    marginTop:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal:'15%',

},
})

export default ExpenseWithImageForm