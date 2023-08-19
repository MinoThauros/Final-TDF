import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { spending } from '../../../models/spending'
import ExpenseWithImageCard from './ExpenseWithImageCard'
import PressableWrapper from './PressableWrapper'

type PressableExpenseWithImageProps={
    onPress:()=>void,
    spending:spending,
}

const PressableExpenseWithImage = ({onPress,spending}:PressableExpenseWithImageProps) => {
  return (
    <PressableWrapper onLongPress={onPress}>
        <ExpenseWithImageCard name={spending.title} type={spending.category} photoUrl={spending.imageUrl} price={spending.price}/>
    </PressableWrapper>
  )
}

export default PressableExpenseWithImage

const styles = StyleSheet.create({
    PriceContainer:{
        borderRadius:5,
        backgroundColor:'white',
        height:40,
        width:65,
        alignItems:'center',
        paddingTop:6,
        justifyContent:'center',
        shadowRadius:4,
    
    },
})
