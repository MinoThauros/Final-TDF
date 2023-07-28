import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const CustomModal = ({children}:any) => {
    const [modalVisible,setModalVisible]=useState(false)

    const togglePhotoDialog=()=>{
        setModalVisible(!modalVisible)
    }
  return (
    <Modal 
        visible={modalVisible}
        animationType={'fade'}
        transparent={true}
        style={styles.modal}>
        <TouchableOpacity 
            style={{flex:1}}
            activeOpacity={1}
            onPress={togglePhotoDialog}>
            <View style={styles.modalContent}>
                {children}                        
            </View>
        </TouchableOpacity>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
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