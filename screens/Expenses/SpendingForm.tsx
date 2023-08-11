import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FIREBASE_API_KEY } from 'react-native-dotenv';
import Colors from '../../constants/colors';
import { spending } from '../../models/spending';
import { getExpensePhoto } from '../../utils/GetExpensePhoto';
import PlaceSearchBar from '../../components/Expenses/PlaceSearchBar';

const SpendingForm = () => {
  const [location, setLocation] = useState('')
  const onSelectedLocation = async ({name,photoUrl,type}:{name:string,photoUrl?:string,type:string}) => {
    console.log(name,photoUrl,type)
  }

    //get position of user: Canada/city
  return (
    <View style={{flex:1}}>
      <PlaceSearchBar onSelectedLocation={onSelectedLocation}/>
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