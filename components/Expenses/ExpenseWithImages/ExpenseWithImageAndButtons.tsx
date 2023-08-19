import { StyleSheet, Text, View } from 'react-native'
import ExpenseWithImageCard, { ExpenseWithImageCardProps } from './ExpenseWithImageCard'
import { spending } from '../../../models/spending'
import LargerCircleContainer from '../../UI/LargerCircleContainer';

type ExpenseWithImageAndButtonsProps=ExpenseWithImageCardProps & {
    edit:()=>void,
    delete:()=>void,
    id:string,
}

//more details about the expense + buttons to edit/delete
const ExpenseWithImageAndButtons = ({expense,details}:{expense:spending,details?:boolean}) => {
    const {category,date,price,title,id,imageUrl}=expense
  return (
    <ExpenseWithImageCard name={title} photoUrl={imageUrl} price={price} type={category}>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Text style={{color:'white',fontSize:20}}>{date}</Text>
        </View>
        {details&& 
        <View style={styles.buttons}>
            <LargerCircleContainer onPress={()=>{}} icon={"delete"}/>
            <LargerCircleContainer onPress={()=>{}} icon={"pen"}/>
        </View>}
    </ExpenseWithImageCard>
  )
}

export default ExpenseWithImageAndButtons

const styles = StyleSheet.create({
    buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
       paddingHorizontal:10,
    },
})