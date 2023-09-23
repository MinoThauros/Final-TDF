import { View, Text, Modal, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import {useContext, useState} from 'react'
import { spending } from '../models/spending'
import { OverlayContext } from '../states/context/InputOverlayContext'
import { useStoreExpense } from '../Hooks/ReactQ'
import { useQueryClient,QueryClient } from '@tanstack/react-query'
import { SnackBarContext } from '../states/context/SnackBarContext'
import { AuthContext } from '../states/context/CredentialsContext'
import ExpenseForm from '../components/Forms/ExpenseForm'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

/**
 * Simple modal that displays a form to add a new spending
 * @returns API calls to post a new spending
 */
const SpendingInputReactQ = () => {
    const [imageMode,setImageMode]=useState<boolean>(false)
    const {visible,toogleOverlay}=useContext(OverlayContext);
    const {setSnackBar}=useContext(SnackBarContext)
    const {userId, token}=useContext(AuthContext)
    const queryClient = useQueryClient()
    const {navigate}=useNavigation<NativeStackNavigationProp<any>>()

    const {mutate}=useStoreExpense({onSuccess:toogleOverlay,queryClient,onError:({response}:{response:any})=>{
        toogleOverlay()
        setSnackBar({message:response.data.error})
    }})

    const submitAction=({data}:{data:spending})=>{
        mutate({
            spending: data,
            userId:userId,
            IdToken:token??''
        })
    }

    const imageModeHandler=()=>{
        //about to create a new image; navigate to places form
        navigate('PlaceForm')
        toogleOverlay()
        
    }


    return (
        <Modal
            style={styles.overallView} 
            visible={visible} 
            animationType={'fade'}
            transparent={true}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex:1}}>  
    <ExpenseForm //control of the 3 buttons on the component
                confirm={submitAction} 
                imageModeHandler={imageModeHandler} 
                optionalButton={toogleOverlay}/>
    </KeyboardAvoidingView>
            
        </Modal>
        
    )
}

export default SpendingInputReactQ

const styles=StyleSheet.create({
    overallView:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center',
    },
})