import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ImagePickerResult, useCameraPermissions } from 'expo-image-picker';

const PhotoSelect = () => {
    //name of the file will be userId+CurrentTime+UUIDV4
    const [cameraPermisisonInfo,requestPermission]=useCameraPermissions();
    const [image,setImage]=useState<ImagePickerResult|undefined>()
    
  return (
    <View>
      <Text>PhotoSelect</Text>
    </View>
  )
}

export default PhotoSelect

const styles = StyleSheet.create({})