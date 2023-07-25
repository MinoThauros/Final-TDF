import { StyleSheet, Text, View, Pressable, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Stack } from '@react-native-material/core';
import Colors from '../../constants/colors';
import TextButton from '../UI/TextButton';
import ProfilePic from './ProfilePic';
import { AuthContext } from '../../states/context/CredentialsContext';
import { 
    ImagePickerResult, 
    useCameraPermissions,
    useMediaLibraryPermissions,
    PermissionStatus, 
    launchCameraAsync,
    launchImageLibraryAsync } from 'expo-image-picker';
import LargestRoundIconButton from '../UI/LargestRoundIconButton';
import verifyPermissions from '../../screens/utils/DeviceNative/PermissionsManager';
import { useGetProfile, useUpdateProfilePhoto } from '../../Hooks/ProfileReactQ';
import { useQueryClient } from "@tanstack/react-query";
import { Profile } from '../../models/profile';

type PhotoFormProps={
    onNewPhoto:({photoUrl}:{photoUrl:string})=>void
}


const PhotoForm = ({onNewPhoto}:PhotoFormProps) => {
    //handle photo change here
    const {userId}=useContext(AuthContext)
    //name of the file will be userId+CurrentTime+UUIDV4
    const [modalVisible,setModalVisible]=useState(false)
    const [cameraPermisisonInfo,cameraRequestPermission]=useCameraPermissions();
    const [mediaPermissionInfo, mediaRequestPermission] = useMediaLibraryPermissions()
    const queryClient=useQueryClient()
    const profile=useGetProfile({userId}).data?.response as Profile
    const {mutate:UpdatePhoto}=useUpdateProfilePhoto({queryClient})
    const changePhotoHandler=()=>{
        setModalVisible(!modalVisible)
    }

    const checkPermissions=async ({mode}:{mode: 'camera' | 'media'})=>{
        switch(mode){
            case 'camera':
                console.log('Permission',cameraPermisisonInfo?.status)
                return await verifyPermissions({
                    permissionState:{
                        permission:cameraPermisisonInfo,
                        requestPermission:cameraRequestPermission
                },
                PermissionStatus
            })
            case 'media':
                console.log('Permission',mediaPermissionInfo?.status)
                return await verifyPermissions({
                    permissionState:{
                        permission:mediaPermissionInfo,
                        requestPermission:mediaRequestPermission
                },
                PermissionStatus
            })
        }
        
    }

    const takePhoto=async ()=>{
        const hasPermission=await checkPermissions({mode:'camera'})
        if(!hasPermission){
            return
        }
        const image=await launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.2,
            })
        if (image) {
            console.log(image.assets ? image.assets[0].uri : 'LOOOL')
            onNewPhoto({photoUrl: image.assets ? image.assets[0].uri : ''});
        }
    }

    const pickFromGallery=async ()=>{
        const hasPermission=await checkPermissions({mode:'media'})
        if(!hasPermission){
            return
        }
        setModalVisible(false)
        const image=await launchImageLibraryAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.2,
            })
        if (image) {
            console.log(image.assets ? image.assets[0].uri : 'LOOOL')
            UpdatePhoto({
                userId,
                newProfile:{
                    ...profile,
                    imageUrl:image.assets ? image.assets[0].uri : ''}})
            onNewPhoto({photoUrl: image.assets ? image.assets[0].uri : ''});
        }
    }


    const ImageChangerModal=()=>{
        return(
            <Modal //make this a reusable component
                visible={modalVisible}
                animationType={'fade'}
                transparent={true}
                style={styles.modal}>
                <TouchableOpacity 
                    style={{flex:1}}
                    activeOpacity={1}
                    onPress={()=>setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <LargestRoundIconButton icon={'camera'} onPress={takePhoto}/>
                        <LargestRoundIconButton icon={'image'} onPress={pickFromGallery}/>                          
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
  return (
    <View style={styles.overallBox}>
        <Stack style={styles.photoBox}>
            <ProfilePic size={100}/>
            <ImageChangerModal/>
            <TextButton 
                text="Change photo" 
                onPress={changePhotoHandler}
                extraStyling={{
                    TextStyling:styles.extraStyling}}
            />
    </Stack>
    </View>
    
  )
}

export default PhotoForm

const styles = StyleSheet.create({
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
    overallBox:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
    },
    extraStyling:{
        color:Colors.Tangerine,
        fontSize:12,
        fontWeight:'bold',
    }
})