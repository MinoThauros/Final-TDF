import { Button, Text, View, StyleSheet, Pressable } from "react-native";
import { spending } from '../../models/spending';
import { useState } from "react";
import SpendingDetailsReactQ from "../../ReactQ_screens/SpendingDetailsReactQ";
import ExpenseWithImageCard from "./ExpenseWithImages/ExpenseWithImageCard";
import NoImageSpending from "./SimpleExpenses/NoImageSpending";


const Expense=({spending}:{spending:spending}):JSX.Element=>{
    const {title,price,date,imageUrl}=spending;
    const [details,setDetails]=useState(false);
  
    return (//enable this component to handle the case where the expense has an image
        <>
            {!details && !imageUrl && <NoImageSpending spendingInfo={{title,price,date}} onLongPress={()=>setDetails(!details)}/>}
            {details && !imageUrl && <SpendingDetailsReactQ spending={spending} optional={()=>setDetails(!details)}/>}
            {imageUrl && <ExpenseWithImageCard name={spending.title} type={spending.category} photoUrl={spending.imageUrl}/>}
            {details && imageUrl && <SpendingDetailsReactQ spending={spending} optional={()=>setDetails(!details)}/>}
        </>
    )};

const styles=StyleSheet.create({
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
    DetailsColumn:{
        //paddingEnd:220

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


export default Expense