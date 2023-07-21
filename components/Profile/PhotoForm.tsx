import { StyleSheet, Text, View, Pressable, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Stack } from '@react-native-material/core';
import Colors from '../../constants/colors';
import TextButton from '../UI/TextButton';
import ProfilePic from './ProfilePic';
import { AuthContext } from '../../states/context/CredentialsContext';
import { ImagePickerResult, useCameraPermissions } from 'expo-image-picker';
import LargestRoundIconButton from '../UI/LargestRoundIconButton';

type PhotoFormProps={
    onNewPhoto:({photoUrl}:{photoUrl:string})=>void
}


const PhotoForm = ({onNewPhoto}:PhotoFormProps) => {
    //handle photo change here
    const {userId}=useContext(AuthContext)
    //name of the file will be userId+CurrentTime+UUIDV4
    const [cameraPermisisonInfo,requestPermission]=useCameraPermissions();
    const [image,setImage]=useState<ImagePickerResult|undefined>()
    const [modalVisible,setModalVisible]=useState(false)
    const changePhotoHandler=()=>{
        console.log('clicked')
        setModalVisible(!modalVisible)
    }

    const ImageChangerModal=()=>{
        return(
   
                <Modal 
                    visible={modalVisible}
                    animationType={'fade'}
                    transparent={true}
                    style={styles.modal}>
                    <TouchableOpacity 
                        style={{flex:1}}
                        activeOpacity={1}
                        onPress={()=>setModalVisible(false)}>
                        <View style={styles.modalContent}>
                            <LargestRoundIconButton icon={'camera'} onPress={()=>{}}/>
                            <LargestRoundIconButton icon={'image'} onPress={()=>{}}/>                          
                        </View>
                    </TouchableOpacity>

                </Modal>

        )
    }
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
        }}>
        <Stack style={styles.photoBox}>
            <ProfilePic size={100}/>
            <ImageChangerModal/>
            <TextButton 
            text="Change photo" 
            onPress={changePhotoHandler}
            extraStyling={{
                TextStyling:{
                    color:Colors.Tangerine,
                    fontSize:12,
                    fontWeight:'bold',
                }
            }}
            />
    </Stack>
    </View>
    
  )
}

export default PhotoForm

const styles = StyleSheet.create({
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
    photoBox:{
        alignItems:'center',
        marginHorizontal:10,
    },
    modal:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center',
    },
    modalContent:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center',
    },
})