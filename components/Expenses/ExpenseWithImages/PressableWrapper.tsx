import { Pressable, StyleSheet, Text, View } from 'react-native'
import LargerCircleContainer from '../../UI/LargerCircleContainer'

const PressableWrapper = ({onLongPress,children}:{onLongPress:()=>void, children:React.ReactNode}) => {
  return (
    <Pressable
      style={({pressed})=>(pressed ? styles.pressed:null)} 
      onLongPress={onLongPress}>
        {children}
    </Pressable>
  )
}

export default PressableWrapper

const styles = StyleSheet.create({
  pressed:{
    opacity:0.5
},
})