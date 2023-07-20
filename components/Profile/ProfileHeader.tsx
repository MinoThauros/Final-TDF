import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Stack, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from '../../constants/colors';
import { AuthContext } from '../../states/context/CredentialsContext';
import { useGetProfile } from '../../Hooks/ProfileReactQ';
import { Profile } from '../../models/profile';

const ProfileHeader = () => {
    const {userId}=useContext(AuthContext)
    const profile=useGetProfile({userId}).data?.response as Profile

    return (
        <View style={{minWidth:'100%'}}>

            <View style={styles.avatarContainer} >
                <Avatar
                label={profile?.name??''}
                icon={props => <Icon name="account" {...props} />}
                image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
                size={75}
                style={{ margin: 4 }}
                />
            </View>
            
            <View style={styles.metaContainer} >
                <Text>{profile?.name??''}</Text>
                <Text>{profile?.occupation??''}</Text>
            </View>
    </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    metaContainer:{
        backgroundColor:Colors.Tangerine,
        justifyContent:'flex-start',
        alignItems:'center',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        //marginTop:'5%',
        padding:'2.5%',
    },
    avatarContainer:{
        //backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',    
        //marginTop:'5%',
        //borderTopRightRadius:20,
       // borderTopLeftRadius:20,
        backgroundColor:Colors.Skobeloff,
    },
})