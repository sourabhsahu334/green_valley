import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { globalStyles } from '../utils/GlobalStyles';

export default function Success({navigation}) {
  // const navigation= useNavigation()
  const focus = useIsFocused()
  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate('Orders')
    }, 3000);
  },[focus])
  return (
    <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
      {/* <Text>Success</Text> */}
      <Image source={require('../../assets/suc.png')} style={{width:150,height:150}} resizeMode='contain'/>
      <Text style={[globalStyles.text,{color:'black'}]}>Order has been successfully</Text>

    </View>
  )
}