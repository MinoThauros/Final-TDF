import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Avatar, Button, HStack, Stack } from '@react-native-material/core';
import Colors from '../../constants/colors';
import TextButton from '../UI/TextButton';
import ProfilePic from './ProfilePic';


const ProfilePhotoBox = () => {
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
        }}>
        <Stack style={styles.photoBox}>
            <ProfilePic size={100}/>
            <TextButton 
            text="Change photo" 
            onPress={()=>console.log('Changed photo')}
            extraStyling={{
                TextStyling:{
                    color:Colors.Tangerine,
                    fontSize:12,
                    fontWeight:'bold',
                }
            }}
            />
    </Stack>
    </View>
    
  )
}

export default ProfilePhotoBox

const styles = StyleSheet.create({
    buttonContainer:{
        alignItems:'flex-start'
    },
    pressed:{
        opacity:0.5
    },
    buttonText:{
        fontWeight:'bold',
        color:Colors.Tangerine,
        fontSize:12

    },
    photoBox:{
        alignItems:'center',
        marginHorizontal:10,
    }
})