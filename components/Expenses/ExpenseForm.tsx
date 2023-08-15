import { View, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { spending } from '../../models/spending';
import { OverlayContext } from '../../states/context/InputOverlayContext';
import ValidativeForm from './ValidativeForm';

export type SpendingCardProps={
    initialValues?:spending,
    confirm?:({data,id}:{data:spending,id?:string})=>void,
    optionalButton?:()=>void,
    imageModeHandler:()=>void
}

/**
 * A form which allows the user to input a new spending or edit an existing one
 * @param initialValues: optional, if provided, the form will be filled with the values of the spending
 * @param confirm: function to be called when the user confirms the form
 * @param id: optional, if provided, the form will be filled with the values of the spending 
 * @returns 
 */
const ExpenseForm = ({initialValues,confirm, optionalButton, imageModeHandler}:SpendingCardProps) => {
    return (
        <View style={styles.overallView}>
            <ValidativeForm
            initialValues={initialValues}
            confirm={confirm}
            cancelAction={()=>optionalButton? optionalButton():null }
            imageModeHandler={imageModeHandler}
            />
        </View>
    )
}

export default ExpenseForm;

const styles=StyleSheet.create({
    overallView:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center',
    }
})