import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PriceContainer = ({children}:{children:React.ReactNode}) => {
  return (
    <View style={styles.PriceContainer}>
        <Text style={{fontWeight:'bold'}}>
            {children}
        </Text>
    </View>
  )
}

export default PriceContainer

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
        maxWidth:'30%',
    
    },
})