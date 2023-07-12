import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Button, Switch, Divider } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons';

type ActiveButtonMetadata={
  title:string,
  buttonTitle:any
}

type ActiveButtonProps={
  condition:boolean,
  IfTrue:ActiveButtonMetadata,
  ifFalse:ActiveButtonMetadata
  onPress:()=>void,
}

const ActiveButton = ({condition,IfTrue,ifFalse,onPress}:ActiveButtonProps) => {
  return (
    <Button
          title={condition?IfTrue.title:ifFalse.title}
          trailing={
          <AntDesign 
            name={condition? IfTrue.buttonTitle:ifFalse.buttonTitle }
            size={24} 
            color="black" />}
          //loadingIndicator="⏰"
          loadingIndicatorPosition="trailing"
          onPress={onPress}
      />
  )
}

export default ActiveButton

const styles = StyleSheet.create({})