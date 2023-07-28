import { Pressable, Text, Touchable, View, StyleSheet, ScrollView } from "react-native";
import PieChartComponent from "../../components/Profile/PieChart";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { Stack, Button, Switch, Divider } from "@react-native-material/core";
import Colors from "../../constants/colors";
import { useContext, useState } from "react";
import { AuthContext } from "../../states/context/CredentialsContext";
import { AntDesign } from '@expo/vector-icons';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ProfilePageExtras from "../../components/Profile/ProfilePageExtras";
import ActiveButton from "../../components/UI/ActiveButton";
import { useGetProfile } from "../../Hooks/ProfileReactQ";
import CreateProfile from "./CreateProfile";
import { useNavigation } from "@react-navigation/native";



const Profile=()=>{
    const {navigate}=useNavigation();
    const {logout,userId}=useContext(AuthContext);
    const [hideMore,setHideMore]=useState(false);
    //-->profile API call here
    //send it as default value to the form]
    const {data:profileData,isFetched}=useGetProfile({userId})

    const LogOut=()=>{
        //navigation.navigate('Recent expenses');
        logout();
    }

    if(!isFetched){
        return <View><Text>Loading...</Text></View>
    }
    /**
        if(isFetched && profileData?.message==='No Profile found'){
        return (
        <View>
            <Text>You do not have a profile yet</Text>
            <Button title="Create Profile" onPress={()=>navigate('CreateProfile' as never)}/>
        </View>)
    }
     */



   

    return (
        <View style={styles.overallContainer}>
            <View style={styles.bioZone}>
                <ProfileHeader/>
            </View>
            <ScrollView>
                <View style={{minWidth:'100%'}}>
                    <PieChartComponent/>
                </View>
                <Stack style={{...styles.optionsContainer}}>
                    <ActiveButton
                        condition={hideMore}
                        IfTrue={{title:"Less Options",buttonTitle:"downcircle"}}
                        ifFalse={{title:"More Options",buttonTitle:"rightcircle"}}
                        onPress={()=>{setHideMore(!hideMore)}}
                    />
                    {hideMore&&<ProfilePageExtras/>}
                </Stack>
                <Button 
                    title="Log out"  
                    variant="outlined"  
                    onPress={LogOut}
                    style={styles.button}
                    loading={true}
                />
            </ScrollView>
        </View>
    )
}

export default Profile;
const styles = StyleSheet.create({
    overallContainer:{
        flex:1,
        alignItems:'center',
        backgroundColor:Colors.Slate_blue,
    },
    bioZone:{
        alignItems:'flex-start',
        justifyContent:'center',
        //marginTop:0
        
    },
    button:{
        maxWidth:'30%',
        alignSelf:'center',
        marginTop:'5%',
        borderColor:'red',
    },
    optionsContainer:{
        flex:1,
        shadowColor: "#000",
        borderRadius: 10,
        backgroundColor:'white',
        marginHorizontal:'2%',
        shadowBorderRadius:10,
        shadowOpacity: 0.50,
    },
    optionsButton:{

    }
})