import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { globalStyles } from '../utils/GlobalStyles';
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:"white"}}>
      {/* <Image source={require('../Assets/logo.png')} style={styles.logo}/> */}
      {/* <Image
        source={require('../Images/SplashBG.png')}
        style={{position: 'absolute'}}
      /> */}
      <Text style={[globalStyles.text]}>Welcome to the green valley</Text>
      {/* <Animatable.Image
        animation="bounceIn"
        duration={5000}
        source={require('../Images/Start_HEADER.png')}
        style={{width: '100%', height: 350, resizeMode: 'contain',borderRadius:200}}
      /> */}
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
