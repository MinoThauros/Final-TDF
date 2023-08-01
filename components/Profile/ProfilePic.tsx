import { View, Text } from 'react-native'
import { Avatar } from '@react-native-material/core';
import Colors from '../../constants/colors';
import { useContext } from 'react';
import { useGetProfile } from '../../Hooks/ProfileReactQ';
import { Profile } from '../../models/profile';
import { AuthContext } from '../../states/context/CredentialsContext';
import { useGetProfilePicture } from '../../Hooks/ProfilePhotoHooks';

const ProfilePic = ({size}:{size:number}) => {
    const {userId}=useContext(AuthContext)
    const profile=useGetProfile({userId}).data?.response as Profile
    const {data}=useGetProfilePicture({userId})

  return (
    <Avatar
    label={profile?.name??'?'}
    //need a placeholder image
    image={{
        uri: data?.response}}
    size={size}
    imageStyle={{
        borderWidth: 4,
        borderColor: Colors.Dark_Purple,
    }}
    style={{ margin: 4 }}
    />
  )
}

export default ProfilePic