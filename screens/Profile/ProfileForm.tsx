import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import Colors from '../../constants/colors';
import CustomTextInput from '../../components/UI/CustomTextInput';
import { Avatar, Button, HStack, Stack, TextInput } from '@react-native-material/core';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import ProfilePhotoBox from '../../components/Profile/ProfilePhotoBox';
import { useNavigation } from '@react-navigation/native';
import TextButton from '../../components/UI/TextButton';
import CancelButton from '../../components/ProfileForm/CancelButton';
import { AuthContext } from '../../states/context/CredentialsContext';
import { Profile } from '../../models/profile';

type ProfileFormProps={
    onSubmit:({profile}:{profile:Profile})=>void,
    defaultValue?:Profile
}

//can be used to create a profile or edit a profile
const ProfileForm = ({onSubmit,defaultValue}:ProfileFormProps) => {
    const [name, setName] = useState( defaultValue?.name?? '');
    const [lastName, setLastName] = useState( defaultValue?.last_name?? '');
    const [dateOfBirth, setDateOfBirth] = useState( defaultValue?.date_of_birth?? '');
    const [gender, setGender] = useState( defaultValue?.gender?? '');
    const [occupation, setOccupation] = useState( defaultValue?.occupation?? '');
    const [city, setCity] = useState( defaultValue?.city?? '');
    const [country, setCountry] = useState( defaultValue?.country?? '');

    

    const submitHandler=()=>{
        const profile:Profile={
            name,
            last_name:lastName,
            date_of_birth:dateOfBirth,
            gender,
            occupation,
            city,
            country,
            id:defaultValue?.id??'',
        }
        onSubmit({profile})
    }

  return (
    <>
     <View style={styles.card}>
            <View>
                <ProfilePhotoBox/>
            </View>
            <View>
                <Stack spacing={6} style={{padding:5, paddingVertical:5, marginBottom:15,marginHorizontal:10}}>
                    <TextInput
                    variant='standard'
                    label='Name'
                    onChangeText={setName}
                    defaultValue={name}
                    value={name}
                    
                    /><TextInput
                    variant='standard'
                    label='Last Name'
                    onChangeText={setLastName}
                    defaultValue={lastName}
                    value={lastName}
                    />
                    <TextInput
                    variant='standard'
                    label="Date of Birth"
                    onChangeText={setDateOfBirth}
                    defaultValue={dateOfBirth}
                    value={dateOfBirth}
                    />
                    <TextInput
                    variant='standard'
                    label="Occupation"
                    onChangeText={setOccupation}
                    defaultValue={occupation}
                    value={occupation}
                    />
                    <TextInput
                    variant='standard'
                    label="Gender"
                    onChangeText={setGender}
                    defaultValue={gender}
                    value={gender}
                    />
                    <TextInput
                    variant='standard'
                    label="City"
                    onChangeText={setCity}
                    defaultValue={city}
                    value={city}
                    />
                    <TextInput
                    variant='standard'
                    label="Country"
                    onChangeText={setCountry}
                    defaultValue={country}
                    value={country
                    }
                    />
                </Stack>
                
                    <TextButton 
                        text="Done"
                        onPress={submitHandler}
                        extraStyling={{
                            TextStyling:styles.buttonTextStyle,
                            ButtonStyling:styles.buttonContainerStyle
                    }}/>
                    </View>
            </View>
            <View>
                
        </View>
    </>
       
        
  )
}

export default ProfileForm

const styles = StyleSheet.create({
    overallContainer:{
        backgroundColor:Colors.Slate_blue,
        padding:10,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
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
    buttonContainerStyle:{
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
    },
    buttonTextStyle:{
        color:Colors.Tangerine,
        fontSize:18,
        fontWeight:'bold',
        paddingHorizontal:10,
    },
    card:{
        flex:1,
        shadowColor: "#000",
        borderRadius: 15,
        backgroundColor:Colors.Skobeloff,
        marginHorizontal:'2%',
        margin:'4%',
        padding:'2%',
        shadowBorderRadius:10,
        shadowOpacity: 0.50,
        flexDirection:'column',
        justifyContent:'center',
    }

    
})

/**
    * we'll need to create a profile somewhere as a post request
    * this would poll the database for the profile and then display it
    * If profile is not found, then we'll display a form to create a profile
    * The Form should accept an optional profile object
 */