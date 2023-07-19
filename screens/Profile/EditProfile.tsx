import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { AuthContext } from '../../states/context/CredentialsContext'
import ProfileForm from './ProfileForm'
import { Profile } from '../../models/profile'
import { useGetProfile } from '../../Hooks/ProfileReactQ'
import { useNavigation } from '@react-navigation/native'
import CancelButton from '../../components/ProfileForm/CancelButton'
import Colors from '../../constants/colors'

const EditProfile = () => {
  //profile doesnt exist; create it
  const {setOptions:navOptions,navigate}=useNavigation()
  const {userId}=useContext(AuthContext)
  useLayoutEffect(() => {
    navOptions({
        headerLeft:()=><CancelButton onPress={()=>navigate('Profile' as never)}/>,
    })
}, [])
    //get profile form context
    //-->profile API call here
    //send it as default value to the form]
    const {data,isFetched}=useGetProfile({userId})
    const onSubmit=({profile}:{profile:Profile})=>{
      console.log(profile)
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