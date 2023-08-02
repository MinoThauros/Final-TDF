import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FIREBASE_API_KEY } from 'react-native-dotenv';

const SpendingForm = () => {
    const {params}=useRoute()
    const handlePlaceSelected = (data:any, details:any) => {

    }
    //get position of user: Canada/city
  return (
    <View style={{flex:1}}>
      <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: FIREBASE_API_KEY,
        language: 'en',
        components: 'country:ca',
      }}
    />
  </View>
  )
}

export default SpendingForm

const styles = StyleSheet.create({})