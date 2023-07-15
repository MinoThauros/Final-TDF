import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Colors from '../constants/colors';
import CustomTextInput from '../components/UI/CustomTextInput';
import { Avatar, Button, HStack, Stack, TextInput } from '@react-native-material/core';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import ProfilePhotoBox from '../components/Profile/ProfilePhotoBox';
import { useNavigation } from '@react-navigation/native';
import TextButton from '../components/UI/TextButton';
import CancelButton from '../components/ProfileForm/CancelButton';

const ProfileForm = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [occupation, setOccupation] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const {setOptions:navOptions,goBack,navigate}=useNavigation()

    useLayoutEffect(() => {
        navOptions({
            headerLeft:()=><CancelButton onPress={()=>navigate('Profile' as never)}/>,
        })
    }, [])

  return (
    <View style={styles.overallContainer}>
        <View style={styles.card}>
            <View>
                <ProfilePhotoBox/>
            </View>
            <View>
                <Stack spacing={5} style={{padding:5, paddingVertical:5, marginBottom:15,marginHorizontal:10}}>
                    <TextInput
                    variant='standard'
                    label='Name'
                    onChangeText={setName}
                    color={Colors.Tangerine}
                    
                    /><TextInput
                    variant='standard'
                    label='Last Name'
                    onChangeText={setLastName}
                    />
                    <TextInput
                    variant='standard'
                    label="Date of Birth"
                    onChangeText={setDateOfBirth}
                    />
                    <TextInput
                    variant='standard'
                    label="Occupation"
                    onChangeText={setOccupation}
                    />
                    <TextInput
                    variant='standard'
                    label="Gender"
                    onChangeText={setGender}
                    />
                    <TextInput
                    variant='standard'
                    label="City"
                    onChangeText={setCity}
                    />
                    <TextInput
                    variant='standard'
                    label="Country"
                    onChangeText={setCountry}
                    />
                </Stack>
                
                    <TextButton 
                        text="Done"
                        onPress={()=>console.log('Saved')}
                        extraStyling={{
                            TextStyling:styles.buttonTextStyle,
                            ButtonStyling:styles.buttonContainerStyle
                    }}/>
                    </View>
            </View>
            <View>
                
        </View>
        
    </View>
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