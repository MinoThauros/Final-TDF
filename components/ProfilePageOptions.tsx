import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { Button, Divider } from '@react-native-material/core'

type Option={
    title:string,
    action:()=>void,
}

const ProfilePageOptions = ({options}:{options:Option[]}) => {
  return (
    <View style={{minHeight:2}}>
        <FlashList //using flashlist to render the options
        data={options}
        renderItem={({item})=>(
            <View>
                <Button variant="text" onPress={item.action} title={item.title} style={{alignSelf:'flex-start'}}/>
                <Divider style={{ margin:2 }} />
            </View>  
        )}
        estimatedItemSize={41}
    />
    </View>
    
  )
}

export default ProfilePageOptions

const styles = StyleSheet.create({})