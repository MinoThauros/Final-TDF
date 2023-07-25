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
import { useGetProfile, useUpdateProfile } from '../../Hooks/ProfileReactQ';
import { Profile } from '../../models/profile';
import { useQueryClient } from '@tanstack/react-query';

type PhotoFormProps={
    onNewPhoto:({photoUrl}:{photoUrl:string})=>void
}


const PhotoForm = ({onNewPhoto}:PhotoFormProps) => {
    //handle photo change here
    const {userId}=useContext(AuthContext)
    const profile=useGetProfile({userId}).data?.response as Profile
    const queryClient = useQueryClient()
    const {mutate:updateProfile}=useUpdateProfile({queryClient})
    //name of the file will be userId+CurrentTime+UUIDV4
    const [modalVisible,setModalVisible]=useState(false)
    const [cameraPermisisonInfo,cameraRequestPermission]=useCameraPermissions();
    const [mediaPermissionInfo, mediaRequestPermission] = useMediaLibraryPermissions();
    const [image,setImage]=useState<ImagePickerResult|undefined>()
    const changePhotoHandler=()=>{
        setModalVisible(!modalVisible)
    }

    const checkPermissions=async ({mode}:{mode: 'camera' | 'media'})=>{
        switch(mode){
            case 'camera':
                return await verifyPermissions({
                    permissionState:{
                        permission:cameraPermisisonInfo,
                        requestPermission:cameraRequestPermission
                },
                PermissionStatus
            })
            case 'media':
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
            quality:0.5,
            })
        if (image) {
            updateProfile({
                userId,
                newProfile:{
                    ...profile,
                    imageUrl:image.assets ? image.assets[0].uri : ''}})
            setModalVisible(false)
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
            quality:0.5,
            })
        if (image) {
            updateProfile({
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