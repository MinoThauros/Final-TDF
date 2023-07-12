import { Pressable, Text, Touchable, View, StyleSheet, ScrollView } from "react-native";
import PieChartComponent from "../components/Profile/PieChart";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { Stack, Button, Switch, Divider } from "@react-native-material/core";
import Colors from "../constants/colors";
import { useContext, useState } from "react";
import { AuthContext } from "../states/context/CredentialsContext";
import { AntDesign } from '@expo/vector-icons';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ProfilePageExtras from "../components/Profile/ProfilePageExtras";
import ActiveButton from "../components/UI/ActiveButton";


const Profile=({navigation,route}:any)=>{
    const {logout}=useContext(AuthContext);
    const [hideMore,setHideMore]=useState(false);

    const LogOut=()=>{
        //navigation.navigate('Recent expenses');
        console.log('logout');//tigger a message to the user that they are logging out
        logout();
    }

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