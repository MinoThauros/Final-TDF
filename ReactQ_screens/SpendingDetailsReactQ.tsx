import { View, Text,Button, StyleSheet, Modal} from 'react-native'
import { spending } from '../models/spending';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteExpense,useUpdateExpense} from '../Hooks/ReactQ';
import NoImageSpendingWithButtons from '../components/Expenses/SimpleExpenses/NoImageSpendingWithButtons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { SnackBarContext } from '../states/context/SnackBarContext';
import { AuthContext } from '../states/context/CredentialsContext';
import ExpenseForm from '../components/Forms/ExpenseForm';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * Displays the details of a spending and allows the user to edit or delete it
 * Does so by summoning a expense form modal with the details of the spending 
 * @param spending
 * @param optional: optional function to be called when the user deletes the spending
 * @returns API calls to delete or edit a spending
 */
const SpendingDetailsReactQ = ({spending,optional}:{spending:spending,optional?:()=>void}) => {
        //useQueryClient  returns the same instance of queryClient
        const {userId, token}=useContext(AuthContext)
        const queryClient = useQueryClient()
        //const spending=route.params.Spending;
        const [editWindow,setEditWindow]=useState(false);
        const {setSnackBar}=useContext(SnackBarContext)
        const {navigate}=useNavigation<NativeStackNavigationProp<any>>()

        const onError=({response}:{response:any})=>{
            setSnackBar({message:response.data.error})
        }
    
        const deleteHandler=({data}:any)=>{
    
        }
        const {mutate:deleteItem,error:deleteError,isSuccess:deleteSuccess}=useDeleteExpense({
            onSuccess:deleteHandler,
            queryClient,
            onError
        });

        const {mutate:editItem,error:updateErr,isSuccess:updateSuccess}=useUpdateExpense({
            onSuccess:deleteHandler,
            queryClient,
            onError});

        const deleteSpending=async ()=>{
            /** We no longer need to seaprately modify local cache and remote server
            dispatch(DeleteSpending({element:spending}))
            deleteExpense(spending.id)
             */
            deleteItem({
                id:spending.id??'',
                userId:userId,
                IdToken:token??''
            })
            //navigation.goBack()
        };
    
        const editSpending=()=>{
            //dispatch(EditSpending({element:spending,newElement:newSpending}))
            setEditWindow(true)
        }

        const confirmEdit=({data,id}:{data: spending,id?: string})=>{
            if(!id){
                return setEditWindow(false)
            }
            editItem({
                updatedExpense:data,
                id,
                IdToken:token??'',
                userId:userId})
            setEditWindow(false)
            return 
        }

        const imageModeHandler=()=>{
            //navigate directly to ExpenseAndImage component
            navigate('ExpenseWithImageForm',{
                name:spending.title,
                photoUrl:spending.imageUrl,
                type:spending.category,
                amount:spending.price,

            })
            setEditWindow(false)
        }

        //construct the submission function here

        
    
        const Content=()=>{
            var Details:JSX.Element=(
            <View>
                <NoImageSpendingWithButtons 
                    spending={spending} 
                    Delete={deleteSpending} 
                    Edit={editSpending} 
                    optional={optional}/>
            </View>
                
            )
            if (!spending){
                Details=(
                    <View style={{flex:1}}>
                        <Text>Deleted Spending</Text>
                    </View>
                )
            }
            return Details
        }


        
        return (
            <View >
                <Modal 
                    visible={editWindow} 
                    animationType={'fade'}
                    transparent={true}>
                    <ExpenseForm 
                        initialValues={spending} 
                        confirm={confirmEdit} 
                        optionalButton={()=>setEditWindow(false)}
                        imageModeHandler={imageModeHandler}/>
                </Modal>
                <Content/>
            </View>
            
        )
    
    };


export default SpendingDetailsReactQ