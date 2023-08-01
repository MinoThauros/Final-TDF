import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const SpendingForm = () => {
    const {params}=useRoute()
  return (
    <View>
      <Text>SpendingForm</Text>
    </View>
  )
}

export default SpendingForm

const styles = StyleSheet.create({})