import { StyleSheet, View } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { AuthContext } from '../../states/context/CredentialsContext'
import ProfileForm from './ProfileForm'
import { Profile } from '../../models/profile'
import { useGetProfile, useUpdateProfile } from '../../Hooks/ProfileReactQ'
import { useNavigation } from '@react-navigation/native'
import CancelButton from '../../components/ProfileForm/CancelButton'
import Colors from '../../constants/colors'
import { useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values' // polyfill for uuidv4
import { FireStore } from '../utils/Firebase/CloudStorage'

const EditProfile = () => {
  const {uploadImage}=new FireStore()
  const queryClient = useQueryClient()
  const {setOptions:navOptions,navigate}=useNavigation()
  const {userId}=useContext(AuthContext)
  useLayoutEffect(() => {
    navOptions({
        headerLeft:()=><CancelButton onPress={()=>navigate('Profile' as never)}/>,
    })
  }, [])

  const {data}=useGetProfile({userId})
  const {mutate,isSuccess}=useUpdateProfile({queryClient})
  const onSubmit= async ({profile}:{profile:Profile})=>{
    mutate({
      newProfile:profile,
      userId:userId,
    })
    isSuccess&&navigate('Profile' as never)
  }
  return (
    <View style={styles.overallContainer}>
      <ProfileForm onSubmit={onSubmit} defaultValue={data?.response as Profile}/>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  overallContainer:{
    backgroundColor:Colors.Slate_blue,
    padding:10,
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
  },
})