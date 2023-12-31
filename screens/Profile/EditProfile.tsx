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

const EditProfile = () => {
  const queryClient = useQueryClient()
  const {setOptions:navOptions,navigate}=useNavigation()
  const {userId}=useContext(AuthContext)
  const {data}=useGetProfile({userId})
  const {mutate,isSuccess}=useUpdateProfile({queryClient})
  useLayoutEffect(() => {
    navOptions({
        headerLeft:()=><CancelButton onPress={()=>navigate('Profile' as never)}/>,
    })
  }, [])

  const onSubmit=({profile,hasChanged}:{profile:Profile,hasChanged:boolean})=>{
    if(!hasChanged){
      return navigate('Profile' as never)
    }
    mutate({
      newProfile:profile,
      userId:userId,
    })
    navigate('Profile' as never)
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