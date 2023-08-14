import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FIREBASE_API_KEY } from 'react-native-dotenv';
import Colors from '../../constants/colors';
import { spending } from '../../models/spending';
import { getExpensePhoto } from '../../utils/GetExpensePhoto';
import PlaceSearchBar from '../../components/Expenses/PlaceSearchBar';
import ExpenseWithImage from '../../components/Expenses/ExpenseWithImage';

export type PlaceSearchBarResult={
  name:string,
  photoUrl?:string,
  type:string,
}

const SpendingForm = () => {
  const navigation=useNavigation()
  //after selecting a location, show a form where the user sees the location name, type, and photo
  //and some empty text fields for amount and the date
  const [location, setLocation] = useState<PlaceSearchBarResult | null>(null)
  const onSelectedLocation = async ({name,photoUrl,type}:PlaceSearchBarResult) => {
    setLocation({name,photoUrl,type})
  }

  useEffect(() => {
    setLocation(null)
  },[navigation])

  if (!location){
    return (
      <View style={{flex:1}}>
        <PlaceSearchBar onSelectedLocation={onSelectedLocation}/>
      </View>
    )
  }
    //preview image of location+name+type
  return (
    <ExpenseWithImage {...location}/>
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