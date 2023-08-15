import { StyleSheet, View } from 'react-native'
import React, {  } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Colors from '../../constants/colors';
import PlaceSearchBar from '../../components/PlaceSearch/PlaceSearchBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PlaceSearchBarResult={
  name:string,
  photoUrl?:string,
  type:string,
}

const SpendingForm = () => {
  const {params}=useRoute<any>()
  const {navigate}=useNavigation<NativeStackNavigationProp<any>>()
  //after selecting a location, show a form where the user sees the location name, type, and photo
  //and some empty text fields for amount and the date
  const onSelectedLocation = async ({name,photoUrl,type}:PlaceSearchBarResult) => {
    navigate('ExpenseWithImage',{name,photoUrl,type})
  }
    //preview image of location+name+type
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