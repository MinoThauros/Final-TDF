import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../states/context/CredentialsContext'
import ProfileForm from './ProfileForm'
import { Profile } from '../../models/profile'
import { useGetProfile } from '../../Hooks/ProfileReactQ'

const EditProfile = () => {
    //get profile form context
    const {userId}=useContext(AuthContext)
    //-->profile API call here
    //send it as default value to the form]
    const {data,isFetched}=useGetProfile({userId})
    const onSubmit=({profile}:{profile:Profile})=>{
    }
  return (
    <View>
      <ProfileForm onSubmit={onSubmit} defaultValue={data?.response as Profile}/>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({})