import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FIREBASE_API_KEY } from 'react-native-dotenv';
import Colors from '../../constants/colors';
import { spending, TypeToCategoryMapping } from '../../models/spending';
import { getExpensePhoto } from '../../utils/GetExpensePhoto';

const SpendingForm = () => {
    const {params}=useRoute()
    const handlePlaceSelected = (data:any, details:any) => {}
    const [enteredText, setEnteredText] = useState('')
    // find photos of place

    const onSelectedLocation = async (data:any, details:any) => {
      try{
        const url=await getExpensePhoto({details})
        console.log(url)
      }catch(e){
        console.log(e)
      }
    }

    
    //get position of user: Canada/city
  return (
    <View style={{flex:1}}>
      <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={onSelectedLocation}
      fetchDetails={true}
      query={{
        key: FIREBASE_API_KEY,
        language: 'en',
        components: 'country:ca',
        rankby: 'distance',
        //boost location to be the user's current location
        location: '45.421532,-75.697189',
      }}
      styles={{
        flex:1,
        textInputContainer: {
          borderRadius:4,
          marginHorizontal:10,
          marginTop:10,
        },
        textInput: styles.textInputA,
      }}

      GooglePlacesDetailsQuery={{
        fields: 'formatted_address,geometry,photos,types',

      }}

      
    />
  </View>
  )
}

export default SpendingForm

const styles = StyleSheet.create({
  textInputA:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:Colors.Skobeloff,
    borderRadius:8,
    color:Colors.Tangerine
},
})