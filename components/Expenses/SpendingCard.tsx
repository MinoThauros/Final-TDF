import { View, Text, Button, Modal, TextInput, StyleSheet } from 'react-native'
import { useContext, useState } from 'react'
import { Validator } from '../../API/validator';
import { spending } from '../../models/spending';
import CustomTextInput from '../UI/CustomTextInput';
import { Categories } from '../../models/spending';
import { CategoryTypes } from '../Profile/PieChart';
import { HStack } from '@react-native-material/core';
import CircleContainer from '../UI/CircleContainer';
import PlaceSearchButton from '../UI/PlaceSearchButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OverlayContext } from '../../states/context/InputOverlayContext';

type SpendingCardProps={
    initialValues?:spending,
    confirm?:({data,id}:{data:spending,id?:string})=>void,
    optionalButton?:()=>void,
    id?:string

}

/**
 * Function which creates a multi-input form for editing or creating a spending
 * Passes fields to the confirm function
 * @param param0 
 * @returns 
 */
const SpendingCard = ({initialValues,confirm,id}:SpendingCardProps) => {
    const {navigate}=useNavigation<NativeStackNavigationProp<any>>()
    const {toogleOverlay}=useContext(OverlayContext);
    const {wordValidator,numValidator}=new Validator()
    const ValidativeForm=():JSX.Element=>{
        const [amount,setAmount]=useState(initialValues?.price??'' as unknown as  number);
        const [category,setCategory]=useState(initialValues?.category??'' as CategoryTypes);
        const [date, setDate]=useState(initialValues?.date??'');
        const [title,setTitle]=useState(initialValues?.title??'');

        const [warnings,setWarnings]=useState({
            amountWarning:<></>,
            categoryWarning:<></>,
            dateWarning:<></>,
            titleWarning:<></>
        })

        const messages={
            amountWarning: !numValidator(amount)? <Text style={styles.validationError}>Invalid amount</Text>:<></>,
            categoryWarning:!wordValidator(category) || !Categories.includes(category as any) ?<Text style={styles.validationError}>Invalid Category</Text>:<></>,
            dateWarning:!wordValidator(date)?<Text style={styles.validationError}>Invalid date</Text>:<></>,
            titleWarning:!wordValidator(title)?<Text style={styles.validationError}>Invalid title</Text>:<></>
        }

        const gotToDetails=()=>{
            //navigate to details screen
            navigate('PlaceForm',{
                amount,
                category,
                date,
                title
            })
            toogleOverlay()
            
        }
        
        
        const submitButton=()=>{
            //check if all fields are valid

            if (numValidator(amount) && wordValidator(category) &&  wordValidator(date) &&  wordValidator(title) && Categories.includes(category as any)){
                if (Categories.includes(category as any)){
                    let enteredData:spending=new spending(amount,category,date,title)
                    confirm ? confirm({data:enteredData,id}):null
                }
            }
            else{
                setWarnings(messages)
            }
        } 
        return (
            <View style={styles.overallContainer}>
                <HStack style={{alignItems:'flex-end'}}>
                    <CustomTextInput 
                        nextValue={setTitle} 
                        title={'Title'}
                        validationErr={warnings.titleWarning}
                        defaultValue={initialValues?.title}
                        extraStyle={{flex:1}}  
                        />
                    <PlaceSearchButton onPress={gotToDetails}/>
                </HStack>
                    

                    <CustomTextInput
                        nextValue={(newText:any)=>setAmount(parseInt(newText))}
                        title={'Amount'}
                        validationErr={warnings.amountWarning}
                        defaultValue={initialValues?.price.toString()?? undefined}/>

                    <CustomTextInput
                        nextValue={setCategory}
                        title={'Category'}
                        validationErr={warnings.categoryWarning}
                        defaultValue={initialValues?.category??''}/>

                    <CustomTextInput
                        nextValue={setDate}
                        title={'Date'}
                        validationErr={warnings.dateWarning}
                        defaultValue={initialValues?.date??''}/>
                    <View style={styles.buttonStack}>
                        <Button title='Go back' onPress={toogleOverlay}/>
                        <Button title="Submit" onPress={submitButton}/>
                    </View>
            </View>)
        
        };


    return (

        <View style={styles.overallView}>
            <ValidativeForm/>
        </View>
    )
}

export default SpendingCard;

const styles=StyleSheet.create({
    overallView:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center',
    },
    overallContainer:{
        backgroundColor:"#521e87",
        borderRadius:18,
        padding:10,
        margin:20,
        width:'75%',
        justifyContent:'center'
    },

    textInputA:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'white',
        borderRadius:8
    },
    titles:{
        fontWeight:'bold',
        color:'white'
    },

    buttonStack:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    validationError:{
        fontSize:12,
        color:'red'

    }
})