//we'll create here a function who takes in a list of expenses and returns a flatlist of expenses
import { useNavigation } from "@react-navigation/native";
import { FlatList,View } from "react-native";
import Expense from "../SpendingsDisplayer";
import { spending } from '../../../models/spending';
//import { SetSpending } from "../states/redux/expenses";



const DisplaySpendings=({spendings}:any)=>{
    return (
        <View style={{flex:1}}>
            <FlatList 
                data={spendings} 
                keyExtractor={(element:spending)=>((spendings.indexOf(element)).toString())} 
                renderItem={({item})=><Expense spending={item}/>}
                />
        </View>
        
    )
};
export default DisplaySpendings;
