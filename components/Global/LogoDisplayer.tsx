import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Text, Stack, HStack } from "@react-native-material/core";
import Colors from '../../constants/colors';

const LogoDisplayer = () => {
  return (
    <Stack style={styles.LogoBox}>
        <View style={styles.imageContainer}>
            <Image 
                source={require('../../assets/TDF.png')} 
                style={styles.image} 
                resizeMethod='scale'/>
        </View>
      <Text  variant="h3" style={styles.text}>TheDevFactory.</Text>
    </Stack>
  )
}

export default LogoDisplayer

const styles = StyleSheet.create({
    LogoBox:{
        //flexDirection:'rocw',
        alignItems:'center',
        justifyContent:'center',
        //margin:'5%'
        
    },
    image:{
      width:'100%',
      height:'100%',
      marginBottom:'10%',
      
  },
    text:{
        color:Colors.Grey,
        fontWeight:'bold',

    },
    imageContainer:{
      width:'90%',
      height:200,
      borderRadius:20,
      overflow:'hidden',
      elevation:20,
      shadowColor:'black',
      shadowOffset:{width:0,height:2},
      marginBottom:'10%'


    }

})