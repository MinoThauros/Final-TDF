import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../states/context/CredentialsContext'
import ProfileForm from './ProfileForm'
import { Profile } from '../../models/profile'

const CreateProfile = () => {
    //profile doesnt exist; create it
    const {userId}=useContext(AuthContext)
    const onSubmit=({profile}:{profile:Profile})=>{
        
    }
  return (
    <View>
      <ProfileForm onSubmit={onSubmit}/>
    </View>
  )
}

export default CreateProfile

const styles = StyleSheet.create({})