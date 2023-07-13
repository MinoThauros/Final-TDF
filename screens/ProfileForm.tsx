import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/colors';
import CustomTextInput from '../components/UI/CustomTextInput';
import { Avatar, Button, HStack, Stack } from '@react-native-material/core';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import ProfilePhotoBox from '../components/Profile/ProfilePhotoBox';

const ProfileForm = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [occupation, setOccupation] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    
  return (
    <View style={styles.overallContainer}>
        <ProfilePhotoBox/>
        <View>
            <HStack>
                <CustomTextInput
                nextValue={setName}
                title="Name"
                defaultValue={''}
                extraStyle={{flex:2}}
                />
                <CustomTextInput
                    nextValue={setLastName}
                    title="Last Name"
                    defaultValue={''}
                    extraStyle={{flex:3}}
                />
            </HStack>
            <CustomTextInput
                    nextValue={setDateOfBirth}
                    title="Date of Birth"
                    defaultValue={''}
                    />
            <HStack>
                <CustomTextInput
                    nextValue={setOccupation}
                    title="Occupation"
                    defaultValue={''}
                    extraStyle={{flex:3}}
                />
                <CustomTextInput
                    nextValue={setGender}
                    title="Gender"
                    defaultValue={''}
                    extraStyle={{flex:2}}
                    />
            </HStack>
            <HStack spacing={6} >
                <CustomTextInput
                    nextValue={setCity}
                    title="City"
                    defaultValue={''}
                    extraStyle={styles.cityInput}
                />
                <CustomTextInput
                    nextValue={setCountry}
                    title="Country"
                    defaultValue={''}
                    extraStyle={styles.countryInput}
            />
            </HStack>
            
        </View>
      
    </View>
  )
}

export default ProfileForm

const styles = StyleSheet.create({
    overallContainer:{
        backgroundColor:Colors.Slate_blue,
        padding:10,
        flex:1
    },
    cityInput:{
        flex:1
    },
    countryInput:{
        flex:1
    },
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