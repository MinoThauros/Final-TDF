import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PieChart  from 'react-native-pie-chart' //https://www.npmjs.com/package/react-native-pie-chart
import ChartLegends from './ChartLegends';
import { useGetExpenses } from '../../Hooks/ReactQ';
import { Categories, spending } from '../../models/spending';
import GetChartObj, {ChartObj, sliceColor} from '../../utils/ChartUtils';
import { SnackBarContext } from '../../states/context/SnackBarContext';
import { AuthContext } from '../../states/context/CredentialsContext';

export type CategoryTypes=typeof Categories[number]
const PieChartComponent = () => {
  const {setSnackBar}=useContext(SnackBarContext)
  const {userId}=useContext(AuthContext)
  
  const [chartData,setChartData]=useState<ChartObj[]>([
    {category:'Food',total:0,catColor:sliceColor[0]},
    {category:'Clothes',total:1,catColor:sliceColor[1]},
    {category:'Housing',total:0,catColor:sliceColor[2]},
    {category:'Transportation',total:0,catColor:sliceColor[3]},
    {category:'Utilities',total:0,catColor:sliceColor[4]},
    {category:'Insurance',total:0,catColor:sliceColor[5]},
    {category:'Health',total:0,catColor:sliceColor[6]},
    {category:'Personal',total:0,catColor:sliceColor[7]},
  ])
    useGetExpenses({
      onSuccess:({data})=>{
        if(data.length>0){
          setChartData([{
            category:'Clothes',total:1,catColor:sliceColor[1],
      }])}},
      userId,
      onError:({response})=>{
        setSnackBar({message:'Failed to fetch your spendings'})}})
    
    return (
      <View style={styles.overallContainer}>
        <View style={styles.ChartContainer}>
        <View>
             <Text>Spending overview:</Text>
        </View>
          <PieChart
            widthAndHeight={300}
            series={chartData.map((item)=>item['total'])}//this series somehow returns 0
            sliceColor={chartData.map((item)=>item['catColor'])}
            coverRadius={0.45}
            coverFill={'#FFF'}
            style={{ marginTop: '2.5%' }}
           />
        </View>
        <ChartLegends sliceColor={chartData.map((item)=>item['catColor'])}/>
      </View>
    )
  }


export default PieChartComponent

const styles = StyleSheet.create({
    ChartContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: '5%',
    },
    title: {
        fontSize: 24,
        margin: 10,
    },
    legends:{
        padding:'2.5%',
        marginHorizontal:'2.5%',
    },
    overallContainer:{
        flex:1,
        shadowColor: "#000",
        borderRadius: 10,
        backgroundColor:'white',
        marginHorizontal:'2%',
        margin:'4%',
        padding:'2%',
        shadowRadius: 10,
        shadowOpacity: 0.50,
        elevation: 5,
    }
  })