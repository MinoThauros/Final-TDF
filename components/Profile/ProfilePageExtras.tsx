import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfilePageOptions from './ProfilePageOptions'
import { _handlePressButtonAsync } from '../../screens/utils/InAppBrowser'
import { useNavigation } from '@react-navigation/native'
const ProfilePageExtras = () => {
    const {navigate}=useNavigation();
  return (
    <View>
      <ProfilePageOptions
        options={[
            {
                title:"Edit profile",
                action:()=>{navigate('EditProfile' as never)}
            },
            {
                title:"Change password",
                action:()=>{_handlePressButtonAsync({link:"https://expo.dev"})}
            },
            {
                title:"Delete account",
                action:()=>{_handlePressButtonAsync({link:"https://expo.dev"})}
            },
            {
                title:"Terms and conditions",
                action:()=>{_handlePressButtonAsync({link:"https://expo.dev"})}
            },
            {
                title:"Privacy policy",
                action:()=>{_handlePressButtonAsync({link:"https://expo.dev"})}
            },
            {
                title:"About",
                action:()=>{_handlePressButtonAsync({link:"https://expo.dev"})}
            },
            {
                title:"Contact us",
                action:()=>{_handlePressButtonAsync({link:"https://expo.dev"})}
            },
            {
                title:"Help",
                action:()=>{_handlePressButtonAsync({link:"https://expo.dev"})}
            },
        ]}
      />
    </View>
  )
}

export default ProfilePageExtras

const styles = StyleSheet.create({})