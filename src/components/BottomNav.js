import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from "../utils/theme.js"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
// import { navigate } from '../../App.js/index.js';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { addNavREf } from '../redux/actions/navigationREf.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Fontist from 'react-native-vector-icons/Fontisto.js';


const styles = StyleSheet.create({
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  iconText: {
    fontSize: 10
  },
  bottomNav: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    height: 60,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    // paddingVertical: 14,
    paddingTop: -20,
    position: 'relative',
  },

  bottomNavOptions: {
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  bottomNavOptionactives2: {
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primaryOpacity,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 1,
  
  },
  bottomNavOptionactives: {
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 1,

  },
  optionExtra: {
    alignItems: 'center',
    marginLeft: -10,
  },
  bottomNavIcons: {
    color: theme.colors.bg,
  },
  bottomNavText: {
    color: theme.colors.secondaryDark,
    fontSize: 10,
    fontFamily: 'Montserrat_500Medium',
  },
  dcrButton: {
    backgroundColor: theme.colors.tertiary,
    height: 60,
    width: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    position: 'absolute',
    left: '48%',
    bottom: 38,
    shadowColor: theme.colors.tertiary,
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  dcrIcon: {
    color: '#fff',
    opacity: 0.8,
  },
  dcrText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    marginTop: 24,
    marginLeft: 5,
    opacity: 0.8,
  },
  activeBox: {
    backgroundColor: theme.colors.bg,
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -3,
  },
});

const BottomNav = () => {
  const nav = useSelector(({ nav }) => nav?.nav);

  console.log("redux", nav);
  const dispatch = useDispatch();
  const focus = useIsFocused()
  //   // useEffect(()=>{
  //     const nav = navigationRef?.current?.getCurrentRoute()?.name;
  //   console.log("fous",nav);
  // })


  // console.log('Current route name:', ref);

  


  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNav}>
      <View >
          <TouchableOpacity
            style={
              nav == 'Feed'
              ? styles.bottomNavOptionactives2:
              styles.bottomNavOptions
            }
            activeOpacity={0.5}
            onPress={() => {
              navigate('Feed');
              dispatch(addNavREf("Feed"));
            }}
            navigationRef>
            <MaterialIcons
              name="feed"
              size={24}
              style={[
                styles.bottomNavIcons,
                { color: nav == 'Feed' ? theme.colors.primary : theme.colors.background },
              ]}
            />
            {/* {nav !== "Medicine" && <Text style={[styles.iconText]}>Medicine</Text>} */}

            {/* <Text style={styles.bottomNavText}>Extras</Text> */}
          </TouchableOpacity>
        </View>

        <View >
          <TouchableOpacity
            style={
              nav=="Home"?styles.bottomNavOptionactives2:
              styles.bottomNavOptions
            }
            activeOpacity={0.5}
            onPress={() => {
              navigate('BottomNavigationBar');
              dispatch(addNavREf("Home"));
            }}
            navigationRef>
            <FontAwesome
              name="user-circle"
              size={24}
              style={[
                styles.bottomNavIcons,
                { color: nav == 'BottomNavigationBar' ? theme.colors.primary : theme.colors.background },
              ]}
            />
            {/* {nav !== "Home" && <Text style={[styles.iconText]}>Home</Text>} */}
            {/* <Text style={styles.bottomNavText}>Extras</Text> */}
          </TouchableOpacity>
        </View>

        

        {/* <TouchableOpacity onPress={() => navigation.navigate("MineJobCreation")}>
                navigationRef          <Text style={styles.dcrText}>Daily Call Report</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={styles.dcrButton}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("DCRHome")}
        >navigationRef
          <AntDesign name="form" size={30} style={styles.dcrIcon} />
        </TouchableOpacity> */}



        <View style={[styles.activeBox,{marginTop:-10}]}>
          <TouchableOpacity
            style={
              // nav == 'Upload'
              styles.bottomNavOptionactives
              // : styles.bottomNavOptions
            }
            activeOpacity={0.5}
            onPress={() => {
              navigate('Search');
              dispatch(addNavREf("Search"));

            }}
            navigationRef>
            <MaterialIcons
              name="search"
              size={27}
              style={[
                styles.bottomNavIcons,
                { color: 'white' },
              ]}
            />
            {/* {nav !== "Upload" && <Text style={[styles.iconText]}>Upload</Text>} */}

            {/* <Text style={styles.bottomNavText}>Extras</Text> */}
          </TouchableOpacity>
        </View>



        <View >
          <TouchableOpacity
            style={
              nav == 'CHATS'
                ? styles.bottomNavOptionactives2:
              styles.bottomNavOptions
            }
            activeOpacity={0.5}
            onPress={() => {
              navigate('Inbox');
              dispatch(addNavREf("CHATS"));

            }}
            navigationRef>
            <MaterialCommunityIcons
              name="chat-outline"
              size={24}
              style={[
                styles.bottomNavIcons,
                { color: nav == 'CHATS' ? theme.colors.primary : theme.colors.background },
              ]}
            />
            {/* {nav !== "Doctors" && <Text style={[styles.iconText]}>Doctors</Text>} */}

            {/* <Text style={styles.bottomNavText}>Extras</Text> */}
          </TouchableOpacity>
        </View>

        <View >
          <TouchableOpacity
            style={
               nav=="NOTIFICATION"?styles.bottomNavOptionactives2:
              styles.bottomNavOptions
            }
            activeOpacity={0.5}
            onPress={() => {
              navigate('Notification');
              dispatch(addNavREf("NOTIFICATION"));

            }}
            navigationRef>
            <MaterialIcons
              name="notifications-none"
              size={24}
              style={[
                styles.bottomNavIcons,
                { color: nav == 'NOTIFICATION' ? theme.colors.primary: theme.colors.background },
              ]}
            />
            {/* {nav !== "NOTIFICATION" && <Text style={[styles.iconText]}>NOTIFICATION</Text>} */}

            {/* <Text style={styles.bottomNavText}>Extras</Text> */}
          </TouchableOpacity>
        </View>


      </View>
    </View>
  );
};

export default BottomNav;
