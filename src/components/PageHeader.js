import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { globalStyles } from '../utiles/GlobalStyles';
import theme from '../utils/theme';
// import theme from '../utiles/theme';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { globalStyles } from '../utils/GlobalStyles';

export default function PageHeader({navigation,name}) {
  return (
    <View
        style={[
          globalStyles.rowflex2,
          {marginRight: 'auto', marginBottom: 15,backgroundColor:theme.colors.whiteBg,marginTop:10},
          
        ]}>
        <TouchableOpacity style={{height:30,width:30,justifyContent:"center",alignItems:"center",borderRadius:7,backgroundColor:theme.colors.primary,marginRight:50}} onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={18}
            // style={{marginRight: 10}}
            color={"white"}
          />
        </TouchableOpacity>
        <Text style={[{fontSize: 20,color:"black",fontWeight:"bold"}]}>{name}</Text>
      </View>
  )
}