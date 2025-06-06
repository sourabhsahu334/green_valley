import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions'
// import { CustomCutButton } from '../components/CustomButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../utils/GlobalStyles';

const CustomModal = ({
    visible, 
    setVisible,
    modalContent,
    onRequestClose,
    height,
    type,name
}) => {
  return (
    <View>
        <Modal visible={visible} onRequestClose={()=>onRequestClose?onRequestClose():setVisible(false)} transparent={true} animationType='slide' > 
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,.3)" }}
              ></View>
            </TouchableWithoutFeedback>
       {type=='normal'?<View>
        {modalContent}
       </View>:type=='bottom'? <View style={{width:responsiveWidth(100),justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,.3)",height:height||responsiveHeight(30)}}>
           <View style={{backgroundColor:"white",borderTopRightRadius:30,borderTopLeftRadius:30,flex:1,height:responsiveHeight(25),width:responsiveWidth(100),padding:10,paddingTop:15,}}>
            <View style={[globalStyles.rowflex,{}]}>
              <Text style={[globalStyles.text]}>{name||''}</Text>
            <TouchableOpacity onPress={()=>setVisible(false)} style={{marginLeft:"auto",}}>
              <MaterialCommunityIcons name='close' color={'black'} size={20}/>
            </TouchableOpacity>
            </View>
           {modalContent}
           </View></View>: <View style={{width:responsiveWidth(100),justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,.3)",height:height||responsiveHeight(30)}}>
           <View style={{backgroundColor:"white",borderRadius:10,flex:1,height:responsiveHeight(25),width:responsiveWidth(90),padding:10,paddingTop:15,}}>
           <View style={[globalStyles.rowflex,{width:responsiveWidth(95)}]}>
              <Text style={[globalStyles.text,{width:responsiveWidth(60)}]}>{name}</Text>
            <TouchableOpacity onPress={()=>setVisible(false)} style={{marginLeft:"auto",width:responsiveWidth(20)}}>
              <MaterialCommunityIcons name='close' color={'black'} size={20}/>
            </TouchableOpacity>
            </View>
           {modalContent}
           </View></View> }
           {type!=='bottom'&&<TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,.3)" }}
              ></View>
            </TouchableWithoutFeedback>}
        </Modal>
     </View>
  )
}

export default CustomModal