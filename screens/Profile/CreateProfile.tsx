import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { AuthContext } from '../../states/context/CredentialsContext'
import ProfileForm from './ProfileForm'
import { Profile } from '../../models/profile'
import { useNavigation } from '@react-navigation/native'
import CancelButton from '../../components/ProfileForm/CancelButton'
import Colors from '../../constants/colors'
import { useCreateProfile } from '../../Hooks/ProfileReactQ'
import { useQueryClient } from '@tanstack/react-query'

const CreateProfile = () => {
  const queryClient = useQueryClient()
    //profile doesnt exist; create it
    const {setOptions:navOptions,navigate}=useNavigation()
    const {userId}=useContext(AuthContext)
    useLayoutEffect(() => {
      navOptions({
          headerLeft:()=><CancelButton onPress={()=>navigate('Profile' as never)}/>,
      })
  }, [])
  const {mutate, isError, isLoading,isSuccess}=useCreateProfile({queryClient})
  const onSubmit=({profile}:{profile:Profile})=>{
      mutate({
        userId,
        profile
      })
      isSuccess && navigate('Profile' as never)
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