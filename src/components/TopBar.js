import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import theme from '../utils/theme';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//   import {retrieveToken, retrieveUser} from './authStorage';
  import {useDispatch, useSelector} from 'react-redux';
  import {retrireveUserFromLocal} from '../redux/actions/userAction';
//   import {globalStyles} from './GlobalStyles';
import { globalStyles } from '../utils/GlobalStyles';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import { addNavREf, setScreenName } from '../redux/actions/navigationREf';
  import { navigate } from '../App';
//   import { CustomButton } from '../PageComoponents/button/Button';
import { CustomButton } from './CustomButton';
//   import Shippiensvg from '../assets/shippiensvg';fshiip
  
  const Appbar = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const nav = useSelector(({ nav }) => nav?.nav)||"EXPLORE";

    const user = useSelector(state => state.user?.data);
    const [ logutStatus,setLogoutStatus]=useState(false);

    console.log(user,"user");
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(retrireveUserFromLocal());
    }, []);
    
  
    return (
      <View
        style={{
          width: '100%',
          height: 45,
          backgroundColor:theme.colors.bg,
          // elevation: 2,
          flexDirection: 'row',
          
          padding: 5,
        }}>
          <View style={{marginLeft:10}}>
            {/* <Shippiensvg/> */}
          </View>
        {!modalVisible && (
         <View style={{flexDirection:"row"}}>
                  <TouchableOpacity
            style={[{marginRight:"auto"}]}
            onPress={() => {setModalVisible(true); dispatch(addNavREf("null"))}}>
            <Ionicons
              name="menu"
              size={35}
              color={theme.colors.background}
              style={{opacity: 0.8}}
            />
          </TouchableOpacity>
          <Text style={{marginTop:5,color:"black",fontSize:19,fontWeight:"bold",textAlign:"center",width:Dimensions.get("window").width-100,backgroundColor:"white"}}>{nav}</Text>

          </View>
        )}
        {/* <View style={{marginRight:"auto"}}> */}

        {/* </View> */}
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
            {logutStatus&&<View style={{width:"100%",height:Dimensions.get("window").height,position:"absolute",zIndex:10000,backgroundColor:"rgba(0,0,0,.7)"}}>
          
            <View style={{width:"100%",height:200,backgroundColor:"white",borderTopRightRadius:20,borderTopLeftRadius:20,marginTop:"auto",padding:20,justifyContent:"center",alignItems:"center"}}>
            <Text style={[globalStyles.text,{fontSize:20,borderBottomWidth:1,borderColor:"rgba(0,0,0,.2)",paddingBottom:15,width:"100%",textAlign:"center"}]}>Log Out</Text>
            <Text style={[globalStyles.text2,{fontSize:15,marginTop:20}]}>Are you sure you want to log Out?</Text>
            <View style={[globalStyles.rowflex,{marginTop:20}]}>
            <CustomButton
                onPressfuntion={()=>setLogoutStatus(false)}
              text={'Cancel'}
                buttontextcolor={'white'}
                bg={theme.colors.background}
                width={140}
                
              />
              <CustomButton
                // onpressFuntion={()=>navigation.navigate("ChatPage",{id:item?._id,senderId:user,recivierId:item?.submitter,state:item?.from,companyName:item?.companyName})}
                onPressfuntion={()=>{ 
                  dispatch(addNavREf("Login"));navigate("Login"); setLogoutStatus(false); setModalVisible(false)}
              }
              text={'Log Out'}
                buttontextcolor={'white'}
                bg={theme.colors.primary}
                width={140}
                
              />
            </View>
            </View>
  
            </View>}
         <View style={{flexDirection:"row"}}>
         
         <View
            style={{
              width: '75%',
              height: Dimensions.get('window').height,
              backgroundColor: theme.colors.primary,
              marginRight: 'auto',
              padding: 45,
              // marginTop: 10,
            }}>
           <TouchableOpacity
            style={[{marginLeft: 'auto',marginTop:-40,marginBottom:30,marginRight:-30}]}
            onPress={() => setModalVisible(!modalVisible)}>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color={theme.colors.background}
              style={{opacity: 0.8}}
            />
          </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigate("OwnProfile"); setModalVisible(false)}} style={[styles.adminbox]}>
              <View
                style={{
                  borderRadius: 80,
                  height: 80,
                  width: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#CAD6EB',
                  overflow: 'hidden',
                }}>
                <FontAwesome name="user" size={90} color="#E5F0FF" />
              </View>
              <View>
               
                <Text style={[styles.adminname]}>{user?.name||"Test USer"}</Text>
                <Text style={[styles.adminname,{opacity:.8}]}>{user?.mobile||"+91988798798"}</Text>

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigate("UpdateProfile"); setModalVisible(false)}}
              style={[globalStyles.rowflex, styles.options, {marginTop: 65}]}>
              <FontAwesome name="user" size={20} color="white" />
              <Text
                style={[styles.adminname, {marginRight: 'auto', marginLeft: 10}]}>
                Update Profile
              </Text>
            </TouchableOpacity>
          
        
            <TouchableOpacity onPress={()=>{navigate("Mymeetups"); setModalVisible(false); dispatch(addNavREf("MY MEETUP"))}}
             style={[globalStyles.rowflex, styles.options]}>
              <Ionicons
                name="chevron-back"
                size={20}
                color="white"
              />
              <Text
                style={[styles.adminname, {marginRight: 'auto', marginLeft: 10}]}>
                My Meetups
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigate("MyRequest"); setModalVisible(false); dispatch(addNavREf("MY MEETUP"))}}
             style={[globalStyles.rowflex, styles.options]}>
              <Ionicons
                name="chevron-back"
                size={20}
                color="white"
              />
              <Text
                style={[styles.adminname, {marginRight: 'auto', marginLeft: 10}]}>
                My Requests
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigate("CreateMeetUps"); setModalVisible(false); dispatch(addNavREf("CREATE MEETUP"))}}
             style={[globalStyles.rowflex, styles.options]}>
              <Ionicons
                name="chevron-back"
                size={20}
                color="white"
              />
              <Text
                style={[styles.adminname, {marginRight: 'auto', marginLeft: 10}]}>
                Host a Meetups
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigate("MyConnection"); setModalVisible(false); dispatch(addNavREf("MY CONNECTION"))}}
             style={[globalStyles.rowflex, styles.options]}>
              <Ionicons
                name="chevron-back"
                size={20}
                color="white"
              />
              <Text
                style={[styles.adminname, {marginRight: 'auto', marginLeft: 10}]}>
                My Connection
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigate("Inbox"); setModalVisible(false)}}
             style={[globalStyles.rowflex, styles.options]}>
              <MaterialIcons name="message" size={20} color="white" />
              <Text
                style={[styles.adminname, {marginRight: 'auto', marginLeft: 10}]}>
                Chat
              </Text>
            </TouchableOpacity>
         
            <TouchableOpacity style={[globalStyles.rowflex, styles.options]}>
              <FontAwesome5 name="user-friends" size={20} color="white" />
              <Text
                style={[styles.adminname, {marginRight: 'auto', marginLeft: 10}]}>
                Refer App
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setLogoutStatus(true)} style={[globalStyles.rowflex, styles.options]}>
              <Ionicons name="log-in" size={20} color="white" />
              <Text
                style={[styles.adminname, {marginRight: 'auto', marginLeft: 10}]}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}>
          <View style={{width:"25%",backgroundColor:"rgba(0,0,0,.3)"}}></View>
         </TouchableWithoutFeedback>
         </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    options: {
      paddingHorizontal: 10,
      borderRadius: 5,
      paddingVertical: 7,
      marginTop: 10,
      backgroundColor: theme.colors.lightPink,
      // elevation: 1,
    },
    adminname: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
    adminbox: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
      width: '90%',
      justifyContent: 'space-between',
    },
    admintext: {
      backgroundColor: theme.colors.primary,
      borderRadius: 15,
      paddingHorizontal: 5,
      paddingVertical: 3,
      textAlign: 'center',
    },
    elevation: {
      backgroundColor: theme.colors.lightPink,
      elevation: 2,
    },
  });
  
  export default Appbar;
  