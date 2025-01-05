import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';


const MyAddressComponent = ({label, address,onPressDelete}) => {
  // console.log("data response is here",data)
  
  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <Text style={styles.name}>{label}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={[styles.iconView, {backgroundColor: '#f27b1fff'}]}>
          <MaterialCommunityIcons
            size={responsiveWidth(5)}
            name="pencil-outline"
            color="#ffffffff"
          />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={onPressDelete}
          style={[styles.iconView, {backgroundColor: '#ff5452ff'}]}>
          <MaterialCommunityIcons
            size={responsiveWidth(5)}
            name="delete-outline"
            color="#ffffffff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyAddressComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#ffffffff',
    paddingVertical: responsiveHeight(1),
    borderBottomWidth: 0.2,
    borderColor: 'grey',
    width: '100%',
  },
  name: {
    fontSize: responsiveFontSize(2),
    color: '#37474F',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  address: {
    fontSize: responsiveFontSize(1.8),
    color: '#37474F',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  iconView: {
    padding: responsiveWidth(2),
    borderRadius: 100,
    marginHorizontal: 2,
  },
});
