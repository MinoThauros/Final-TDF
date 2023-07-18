import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../states/context/CredentialsContext'

const EditProfile = () => {
    //get profile form context
    const {userId}=useContext(AuthContext)
    //-->profile API call here
    //send it as default value to the form
  return (
    <View>
      <Text>EditProfile</Text>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({})