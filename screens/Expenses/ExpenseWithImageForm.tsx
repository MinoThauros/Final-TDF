import { StyleSheet, Text, View, Image, Button, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
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
import CustomTextInput from '../../components/UI/CustomTextInput'
import { Validator } from '../../API/validator'


/**
 * Shows an expense with an image as a form; fields can be pre-filled
 * if we are editing an expense
 * Should take an expense with the optional photoUrl
 * @returns 
 */
const ExpenseWithImageForm=()=>{
  const {userId,token}=useContext(AuthContext)
  const queryClient=useQueryClient()
  const {setOptions:navOptions,navigate}=useNavigation()
  const {wordValidator,numValidator, dateValidator}=new Validator()
  const {mutate}=useStoreExpense({
    onSuccess:()=>{
      navigate('AllExpensesReactQuery' as never)
      setAmount('' as unknown as number)
      setDate('')
      setWarnings({
        amountWarning:<></>,
        dateWarning:<></>,
      })
    },
    onError:()=>{},
    queryClient})
  const {params}=useRoute()

  useLayoutEffect(() => {
    navOptions({
        headerLeft:()=><CancelButton onPress={()=>navigate('PlaceForm' as never)}/>,
        title:'New expense',
    })
}, [])
  


  //receive props with navigation instead
  const {name,photoUrl,type}=params as PlaceSearchBarResult//guaranteed to exist
  const [amount,setAmount]=useState<number>('' as unknown as number);
  const [date, setDate]=useState('');

  const [warnings,setWarnings]=useState({
    amountWarning:<></>,
    dateWarning:<></>,
})

const messages={
    amountWarning: !numValidator(amount)? <Text style={styles.validationError}>Enter amount</Text>:<></>,
    dateWarning:!dateValidator(date)?<Text style={styles.validationError}>Invalid date</Text>:<></>
}

  const onSubmit=()=>{
    if (numValidator(amount) &&  dateValidator(date)){
      mutate({
      spending:{
        title:name,
        price:Number(amount),
        date,
        category:type,
        imageUrl:photoUrl,

      },
      userId,
      IdToken:token??''
    })
    }else{
      setWarnings(messages)
    }
    
  }


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={120}
    style={{flex:1}}>
      <ScrollView>
        <View style={{justifyContent:'center', minHeight:'100%', backgroundColor:Colors.Skobeloff}}>
      <ExpenseWithImageCard
        name={name} 
        photoUrl={photoUrl} 
        type={type}>
        <CustomTextInput
          title='Amount'
          placeHolder='Enter amount'
          defaultValue={amount.toString()}
          nextValue={setAmount}
          extraStyle={{marginVertical:5, minWidth:'90%'}}
          validationErr={warnings.amountWarning}
        />
        <CustomTextInput
          title='Date'
          placeHolder='yyyy-mm-dd'
          defaultValue={date}
          nextValue={setDate}
          extraStyle={{marginVertical:5, minWidth:'90%'}}
          validationErr={warnings.dateWarning}
          />
        
          <View style={styles.buttonStack}>
            <LargerCircleContainer onPress={onSubmit} icon={"check"}/>
          </View>
      </ExpenseWithImageCard>
    </View>
      </ScrollView>
      
    </KeyboardAvoidingView>
    
    
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
  validationError:{
    fontSize:12,
    color:'red'
}
})

export default ExpenseWithImageForm