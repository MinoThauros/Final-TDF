import { ScrollView, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import Colors from '../../constants/colors';
import { Stack, TextInput } from '@react-native-material/core';
import TextButton from '../../components/UI/TextButton';
import { Profile } from '../../models/profile';
import PhotoForm from '../../components/Profile/PhotoForm';
import objectsAreEqual from '../../utils/CheckEqualObj';

type ProfileFormProps={
    onSubmit:({profile,hasChanged}:{profile:Profile,hasChanged?:boolean})=>void,
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
        let hasChanged=false
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
        const modedDefault= defaultValue
        delete modedDefault?.imageUrl
        if(!objectsAreEqual(profile,modedDefault)){
            console.log('profile has changed', profile,'\n',modedDefault)
            hasChanged=true
        }
        onSubmit({profile,hasChanged:hasChanged})
    }


  return (
    <ScrollView 
    contentContainerStyle={{flexGrow:1}}
    style={{minHeight:'100%'}}>
     <View style={styles.card}>
            <View>
                <PhotoForm/>
            </View>
            
                <Stack spacing={6} style={{padding:5, paddingVertical:5,marginHorizontal:10}}>
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
            </ScrollView>

       
        
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
        marginTop:'10%',
        marginBottom:10,
    },
    buttonTextStyle:{
        color:Colors.Tangerine,
        fontSize:22,
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
        shadowRadius: 10,
        shadowOpacity: 1,
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