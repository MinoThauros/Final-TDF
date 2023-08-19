import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NoImageSpending =({spendingInfo,onLongPress}:{spendingInfo:any,onLongPress:()=>void}):JSX.Element=>{
    const {title, price, date}=spendingInfo;
    return (
        <Pressable 
        style={({pressed})=>(pressed ? styles.pressed:null)}
        onLongPress={onLongPress}>
        <View style={styles.overallContainer}>
            <View style={styles.DetailsContainer} >
                <View>
                    <Text style={styles.DetailsName}>{title}</Text>
                    <Text style={styles.DetailsDate}>{date}</Text>
                </View>
                <View style={styles.PriceContainer}>
                    <Text style={{fontWeight:'bold'}}>
                        {price}
                    </Text>
                </View>
            </View>
        </View>
         </Pressable>
    )
}

export default NoImageSpending

const styles = StyleSheet.create({    
overallContainer:{
    backgroundColor:"#521e87",
    borderRadius:6,
    padding:10,
    marginHorizontal:15,
    marginVertical:5,
    height:60,
    justifyContent:'center'
},
DetailsContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
},
PriceContainer:{
    borderRadius:5,
    backgroundColor:'white',
    height:40,
    width:65,
    alignItems:'center',
    paddingTop:6,
    justifyContent:'center',
    shadowRadius:4,

},
DetailsName:{
    fontWeight:'bold',
    color:'white'

},

DetailsDate:{
    color:'white'
},
PriceTexy:{

},
pressed:{
    opacity:0.5
},})