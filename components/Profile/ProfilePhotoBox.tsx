import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Avatar, Button, HStack, Stack } from '@react-native-material/core';
import Colors from '../../constants/colors';
import TextButton from '../UI/TextButton';


const ProfilePhotoBox = () => {
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
        }}>
        <Stack style={styles.photoBox}>
        <Avatar
            label="Jed Watson"
            image={{uri: "https://mui.com/static/images/avatar/1.jpg"}}
            size={100}
            imageStyle={{
                borderWidth: 4,
                borderColor: Colors.Dark_Purple,
            }}
            style={{ margin: 4 }}
            />
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