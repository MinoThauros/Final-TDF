import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constants/colors';
import { AuthContext } from '../../states/context/CredentialsContext';
import { useGetProfile } from '../../Hooks/ProfileReactQ';
import { Profile } from '../../models/profile';
import ProfilePic from './ProfilePic';

const ProfileHeader = () => {
    const {userId,token}=useContext(AuthContext)
    const profile=useGetProfile({userId,IdToken:token??''}).data?.response as Profile
    //improve this to taka care of loading as well



    if(!profile){
        return <View><Text>You do not have a profile yet</Text></View>
    }
    return (
        <View style={{minWidth:'100%'}}>
            <View style={styles.avatarContainer} >
                <ProfilePic size={120}/>
            </View>
            <View style={styles.metaContainer} >
                <Text>{profile?.last_name??''},{profile?.name??''}</Text>
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
        padding:'2.5%',
    },
    avatarContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.Skobeloff,
        padding:6,
    },
})