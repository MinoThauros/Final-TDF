import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { PlaceSearchBarResult } from '../../../screens/Expenses/PlaceForm'
import { HStack, Stack } from '@react-native-material/core'
import Colors from '../../../constants/colors'
import PriceContainer from '../../UI/PriceContainer'

export type ExpenseWithImageCardProps= PlaceSearchBarResult &{
    children?:React.ReactNode,
    price?:number,
}

const ExpenseWithImageCard = ({name,photoUrl,type, children, price}:ExpenseWithImageCardProps) => {
  //send the photoUrl and type to a function which still would return an image
  //this would ensure that we always have an image/imageUrl for every expense

  return (
    <View style={styles.overallContainer}>
        <View style={styles.imagePreview}>
          <Image 
            style={styles.image} 
            source={{uri:photoUrl}}/>
        </View>
        <View style={styles.DetailsBox}>
          <View style={styles.info}>
            <Stack style={styles.textContainer}>
              <Text style={{color:Colors.Tangerine,fontSize:20,fontWeight:'bold'}}>{name}</Text>
              <Text style={{color:Colors.Tangerine,fontSize:16}}>{type}</Text>            
            </Stack>
            {price &&<PriceContainer>${price}</PriceContainer> }
          </View>
        </View>
        {children &&
        <Stack spacing={6} style={{marginBottom:'10%'}}>
            {children}  
        </Stack> }
        
    </View>

  )
}

export default ExpenseWithImageCard

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
          margin:15,
          borderRadius:10,
          justifyContent:'center',
      },
      textContainer:{
        alignItems:'flex-start',
        flexDirection:'column',
        backgroundColor:Colors.Dark_Purple,
        padding:10,
        maxWidth:'60%',
      },

      DetailsBox:{
        //backgroundColor:'yellow',
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:5,
        alignItems:'center',
    },

    info:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      width:'100%',
      paddingHorizontal:10,
  },
})