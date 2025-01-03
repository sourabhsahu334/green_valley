import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {globalStyles} from '../utils/GlobalStyles';
import theme from '../utils/theme';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Fontist from 'react-native-vector-icons/Fontisto.js';
export const CustomTextInput = ({
  label,
  value,
  setValue,
  placeholder,
  marginTop,
  numeric,
  secure,
  iconName,
  visible,
  setVisible,
  width,
  noicon
}) => {
  const [ focus ,setFoucs ]=useState(false);
  return (

     <View style={{flexDirection:"row",alignItems:"center",marginTop:marginTop,borderRadius:10,  borderWidth:1,
     borderColor:focus?theme.colors.primary:theme.colors.primaryOpacity,backgroundColor:"white",     paddingHorizontal:5,width:width
    }}>
    {placeholder!=="Write here..."&&(!noicon&&<View style={{height:30,width:30,justifyContent:"center",alignItems:"center",borderRadius:7,backgroundColor:theme.colors.primaryOpacity}}>
    <MaterialCommunityIcons name={iconName} size={20} color={theme.colors.primary}/>

    </View>)}
     <TextInput
     onFocus={()=>setFoucs(true)}
     onBlur={()=>setFoucs(false)}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"rgba(0,0,0,.7)"}
        onChangeText={e => setValue(e)}
        keyboardType={numeric}
        secureTextEntry={visible}
        style={{
          width: '90%',
          borderRadius: 15,
          backgroundColor: theme.colors.white,
        //   elevation: 2,
          height: 50,
          justifyContent: 'center',
        
          color: 'black',
        }}
      />
{      secure&&<TouchableOpacity onPress={()=>setVisible(!visible)}>
  <Ionicons name={!visible?"eye-off-sharp":"eye"} size={20} color="black" style={{marginLeft:-30}}/>
</TouchableOpacity>
}
     </View>
  );
};
export const CustomTextInput2 = ({
  label,
  value,
  setValue,
  placeholder,
  marginTop,
  numeric,
  secure,
  iconName,
  visible,
  setVisible
}) => {
  const [ focus ,setFoucs ]=useState(false);
  return (

     <View style={{flexDirection:"row",alignItems:"center",marginTop:marginTop,borderRadius:10,  borderWidth:1,
     borderColor:focus?theme.colors.primary:theme.colors.primaryOpacity,backgroundColor:"white",     paddingHorizontal:5
    }}>

     <TextInput
     onFocus={()=>setFoucs(true)}
     onBlur={()=>setFoucs(false)}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"black"}
        onChangeText={e => setValue(e)}
        keyboardType={numeric}
        secureTextEntry={visible}
        style={{
          width: '100%',
          borderRadius: 10,
          backgroundColor: theme.colors.white,
        //   elevation: 2,
          height: 50,
          justifyContent: 'center',
        
          color: 'black',
        }}
      />
{      secure&&<TouchableOpacity onPress={()=>setVisible(!visible)}>
  <Ionicons name={visible?"eye-off-sharp":"eye"} size={20} color="black" style={{marginLeft:-30}}/>
</TouchableOpacity>
}
     </View>
  );
};

export const CustomTextInput3 = ({
  label,
  value,
  setValue,
  placeholder,
  marginTop,
  numeric,
  secure,
  iconName,
  visible,
  setVisible,
  width,
  noicon,
  indexNumber,
  name
}) => {
  const [ focus ,setFoucs ]=useState(false);
  return (

     <View style={{flexDirection:"row",alignItems:"center",marginTop:marginTop,borderRadius:10,  borderWidth:1,
     borderColor:focus?theme.colors.primary:theme.colors.primaryOpacity,backgroundColor:"white",     paddingHorizontal:5,width:width
    }}>
    {placeholder!=="Write here..."&&(!noicon&&<View style={{height:30,width:30,justifyContent:"center",alignItems:"center",borderRadius:7,backgroundColor:theme.colors.primaryOpacity}}>
    <MaterialCommunityIcons name={iconName} size={20} color={theme.colors.primary}/>

    </View>)}
     <TextInput
     onFocus={()=>setFoucs(true)}
     onBlur={()=>setFoucs(false)}
        value={value[indexNumber][name]}
        placeholder={placeholder}
        placeholderTextColor={"black"}
        onChangeText={e => setValue((prev)=>{
          const updatedValues = [...prev];
          updatedValues[indexNumber][name] = e;
          return updatedValues;
        })}
        keyboardType={numeric}
        secureTextEntry={visible}
        style={{
          width: '90%',
          borderRadius: 15,
          backgroundColor: theme.colors.white,
        //   elevation: 2,
          height: 50,
          justifyContent: 'center',
        
          color: 'black',
        }}
      />
{      secure&&<TouchableOpacity onPress={()=>setVisible(!visible)}>
  <Ionicons name={!visible?"eye-off-sharp":"eye"} size={20} color="black" style={{marginLeft:-30}}/>
</TouchableOpacity>
}
     </View>
  );
};