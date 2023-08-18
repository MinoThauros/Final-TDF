import { StyleSheet, Text, View } from 'react-native'
import ExpenseWithImageCard, { ExpenseWithImageCardProps } from './ExpenseWithImageCard'
import { spending } from '../../../models/spending'
import CircleContainer from '../../UI/CircleContainer'

type ExpenseWithImageAndButtonsProps=ExpenseWithImageCardProps & {
    edit:()=>void,
    delete:()=>void,
    id:string,
}

//more details about the expense + buttons to edit/delete
const ExpenseWithImageAndButtons = (props:spending) => {
    const {category,date,price,title,id,imageUrl}=props
  return (
    <ExpenseWithImageCard name={title} photoUrl={imageUrl} type={category}>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Text style={{color:'white',fontSize:20}}>{price}</Text>
            <Text style={{color:'white',fontSize:20}}>{date}</Text>
        </View>
        <View>
            <CircleContainer onPress={()=>{}} icon={"delete"}/>
            <CircleContainer onPress={()=>{}} icon={"pen"}/>
        </View>
    </ExpenseWithImageCard>
  )
}

export default ExpenseWithImageAndButtons

const styles = StyleSheet.create({})