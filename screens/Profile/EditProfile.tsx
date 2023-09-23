import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
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
  const {userId,token}=useContext(AuthContext)
  const {data}=useGetProfile({userId, IdToken:token??''})
  const {mutate,isSuccess}=useUpdateProfile({queryClient})
  useLayoutEffect(() => {
    navOptions({
        headerLeft:()=><CancelButton onPress={()=>navigate('Profile' as never)}/>,
    })
  }, [])

  const onSubmit=({profile,hasChanged}:{profile:Profile,hasChanged?:boolean})=>{
    if(!hasChanged){
      return navigate('Profile' as never)
    }
    mutate({
      newProfile:profile,
      userId:userId,
      IdToken:token??''
    })
    navigate('Profile' as never)
  }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={120}
    style={{flex:1}}>
      <View style={styles.overallContainer}>
        <ProfileForm onSubmit={onSubmit} defaultValue={data?.response as Profile}/>
      </View>
    </KeyboardAvoidingView>
    
  )
}

export default EditProfile

const styles = StyleSheet.create({
  overallContainer:{
    backgroundColor:Colors.Slate_blue,
    paddingHorizontal:10,
    flex: 1,            // Takes up all available space
    justifyContent: 'center', // Centers children components along the main axis (vertically)
    // If you want to center content while preserving its width (not stretching),
    // set alignItems to 'flex-start'
    alignItems: 'flex-start', 
    flexDirection:'row',
  },
})