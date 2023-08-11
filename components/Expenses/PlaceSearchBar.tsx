import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FIREBASE_API_KEY } from 'react-native-dotenv'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { getExpensePhoto } from '../../utils/GetExpensePhoto'
import Colors from '../../constants/colors'
import { Place } from '../../models/GooglePlace';
import mapTypeToCategory from '../../utils/TypeToCatMapping'

type PlaceSearchProps={
    onSelectedLocation:({name,photoUrl,type}:{name:string,photoUrl?:string,type:string})=>void
}

const PlaceSearchBar = ({onSelectedLocation}:PlaceSearchProps) => {

    //get position of user: Canada/city

    //make this component construct an object of type 
    // {location_name: string, photoUrl: string, location_Type: string}

    const processSelectedLocation=async (data:any, details:any)=>{
        const url=await getExpensePhoto({details}) as string
        const dtails=details as Place
        console.log('data',data)
        const location={
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