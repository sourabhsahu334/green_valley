import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { globalStyles } from '../utils/GlobalStyles';
import theme from '../utils/theme';
// import { useDispatch } from 'react-redux';
// import { addNavREf } from '../redux/actions/navigationREf';
// import { globalStyles } from '../utils/GlobalStyles';
// import { retrireveUserFromLocal } from '../redux/actions/userAction';
// import theme from '../utils/theme';

const Splash = ({navigation}) => {
//   const dispatch = useDispatch()
  setTimeout(UserID => {
    AsyncStorage.getItem('UserID').then(value => {
      const UserID = value;
      // dispatch(addNavREf("Home"));
    //   dispatch(retrireveUserFromLocal())
      navigation.navigate(
        UserID == null || UserID == '' ? 'Login' : 'Home',
      );
    });
  }, 2500);
  

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:theme.colors.primary}}>
    
      <Animatable.Image
        animation="bounceIn"
        duration={5000}
        source={require('../../assets/icon.jpeg')}
        style={{width: 250, height: 250, resizeMode: 'contain'}}
      />
      {/* <Text style={[globalStyles.text2,{fontSize:28,color:theme.colors.primary,fontWeight:"bold"}]}>VAIDIK WORLD</Text>
      <Text style={[globalStyles.text2,{fontSize:28,color:theme.colors.primary,fontWeight:"bold"}]}>ASTROLOGY</Text> */}

      {/* <Text style={[globalStyles.text2,{fontSize:25}]}>ASTRO</Text> */}

    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Text: {
    fontSize: 35,
    color: '#fbb238',
    fontWeight: 'bold',
    marginTop: -25,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: -40,
  },
});
