import { View, Text } from 'react-native'
import { Avatar } from '@react-native-material/core';
import Colors from '../../constants/colors';
import { useContext } from 'react';
import { useGetProfile } from '../../Hooks/ProfileReactQ';
import { Profile } from '../../models/profile';
import { AuthContext } from '../../states/context/CredentialsContext';

const ProfilePic = ({size}:{size:number}) => {
    const {userId}=useContext(AuthContext)
    const profile=useGetProfile({userId}).data?.response as Profile
  return (
    <Avatar
    label={profile?.name??'?'}
    //need a placeholder image
    image={{
        uri: profile?.imageUrl?.length ? profile.imageUrl : "https://mui.com/static/images/avatar/8.jpg"}}
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