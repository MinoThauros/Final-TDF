import { Text, View, StyleSheet, ScrollView } from "react-native";
import PieChartComponent from "../../components/Profile/PieChart";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { Stack, Button } from "@react-native-material/core";
import Colors from "../../constants/colors";
import { useContext, useState } from "react";
import { AuthContext } from "../../states/context/CredentialsContext";
import ProfilePageExtras from "../../components/Profile/ProfilePageExtras";
import ActiveButton from "../../components/UI/ActiveButton";
import { useGetProfile } from "../../Hooks/ProfileReactQ";
import LoadingOvelay from "../../components/UI/LoadingOverlay";




const Profile=()=>{
    const {logout,userId}=useContext(AuthContext);
    const [hideMore,setHideMore]=useState(false);
    //-->profile API call here
    //send it as default value to the form]

    const LogOut=()=>{
        //navigation.navigate('Recent expenses');
        logout();
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
                <Stack style={styles.optionsContainer}>
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
        shadowOpacity: 0.50,
        shadowRadius: 10,
    },
})