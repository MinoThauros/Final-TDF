import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { getExpensePhoto } from '../../utils/GetExpensePhoto'
import Colors from '../../constants/colors'
import { Place } from '../../models/GooglePlace';
import mapTypeToCategory from '../../utils/TypeToCatMapping'
import { Categories } from '../../models/spending'
import { PlaceSearchBarResult } from '../../screens/Expenses/PlaceForm'

type PlaceSearchProps={
    onSelectedLocation:({name,photoUrl,type}:{name:string,photoUrl?:string,type: typeof Categories[number]})=>void
}

const PlaceSearchBar = ({onSelectedLocation}:PlaceSearchProps) => {

    //get position of user: Canada/city

    //make this component construct an object of type 
    // {location_name: string, photoUrl: string, location_Type: string}

    const processSelectedLocation=async (data:any, details:any)=>{
        const url=await getExpensePhoto({details}) as string
        //use getExpensePhoto to get the photo hook from the details
        //we need to show the user that we are loading the image
        const dtails=details as Place
        const location:PlaceSearchBarResult={
            name:data.structured_formatting.main_text,
            photoUrl:url,
            type:mapTypeToCategory(dtails.types)??'Other',
        }
        onSelectedLocation(location)
        //dtails.types[0]
    }
  return (
    <View style={{flex:1}}>
      <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={processSelectedLocation}
      fetchDetails={true}
      query={{
        key: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
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
      


    />
  </View>
  )
}

export default PlaceSearchBar

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