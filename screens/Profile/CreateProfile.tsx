import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { AuthContext } from '../../states/context/CredentialsContext'
import ProfileForm from './ProfileForm'
import { Profile } from '../../models/profile'
import { useNavigation } from '@react-navigation/native'
import CancelButton from '../../components/ProfileForm/CancelButton'
import Colors from '../../constants/colors'
import { useCreateProfile, useUpdateProfile } from '../../Hooks/ProfileReactQ'
import { useQueryClient } from '@tanstack/react-query'

const CreateProfile = () => {
  useLayoutEffect(() => {
    navOptions({
        headerLeft:()=><CancelButton onPress={()=>navigate('Profile' as never)}/>,
    })
  }, [])
  const queryClient = useQueryClient()
    //profile doesnt exist; create it
  const {setOptions:navOptions,navigate}=useNavigation()
  const {userId,token}=useContext(AuthContext)
  const {mutate,isSuccess}=useUpdateProfile({queryClient})
  
  const onSubmit=({profile}:{profile:Profile})=>{
    mutate({
      newProfile:profile,
      userId:userId,
      IdToken:token??''

    })
    navigate('Profile' as never)
  }
    
  return (
    <View style={styles.overallContainer}>
      <ProfileForm onSubmit={onSubmit}/>
    </View>
  )
}

export default CreateProfile

const styles = StyleSheet.create({
  overallContainer:{
    backgroundColor:Colors.Slate_blue,
    padding:10,
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
},
})