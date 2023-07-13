import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Avatar, Button, HStack, Stack } from '@react-native-material/core';
import Colors from '../../constants/colors';


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
        <View style={styles.buttonContainer}>
            <Pressable 
                onPress={()=>console.log('Changed photo')}
                style={({pressed})=>(pressed ? styles.pressed:null)}>
                <Text style={styles.buttonText}>Change photo</Text>
            </Pressable>
        </View>
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