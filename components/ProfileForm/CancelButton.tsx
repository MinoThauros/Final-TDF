import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextButton from '../UI/TextButton'
import Colors from '../../constants/colors'

const CancelButton = ({onPress}:{onPress:()=>void}) => {
  return (
        <TextButton
            text="Cancel"
            onPress={onPress}
            extraStyling={{
                ButtonStyling:{
                    paddingLeft:10,
                },
                TextStyling:{
                    color:Colors.Electric_blue,
                    fontSize:15,
                }
            
            }}
        />
    )}

export default CancelButton