import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useLayoutEffect } from 'react'
import Colors from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

type TextButtonProps={
    text:string,
    onPress:()=>void,
    extraStyling?:{
        ButtonStyling?:any,
        TextStyling?:any
    }
}

const TextButton = ({text,onPress, extraStyling}:TextButtonProps) => {

  return (
    <View style={ extraStyling ? {...extraStyling.ButtonStyling??{},...styles.buttonContainer}: styles.buttonContainer}>
        <Pressable 
            onPress={onPress}
            style={({pressed})=>(pressed ? styles.pressed:null)}>
            <Text style={ extraStyling ? {...extraStyling.TextStyling??{},...styles.buttonText}: styles.buttonText}>
                {text}
            </Text>
        </Pressable>
    </View>)
}

export default TextButton

const styles = StyleSheet.create({
    buttonContainer:{
        alignItems:'flex-start'
    },
    pressed:{
        opacity:0.5
    },
    buttonText:{
        
    },
})
