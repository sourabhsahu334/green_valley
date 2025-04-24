import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  BackHandler,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import { http } from "../utils/AxiosInstance";
import theme from "../utils/theme";
import { globalStyles } from "../utils/GlobalStyles";
import { CustomButton } from "../components/CustomButton";
import { RenderIcon } from "../components/RenderIcon";
import moment from 'moment'
import Entypo from 'react-native-vector-icons/Entypo';

import { useIsFocused } from "@react-navigation/native";
import CustomModal from "../components/CustomModal";
import MyAddresses from "./MyAddresses";
import { CustomTextInput } from "../components/CustomTextInput";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { getCartRedux } from "../redux/actions/cartAction";
import { showToast } from "../components/Toast";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import IconButton from "../components/Button/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = ({navigation}) => {

  const [cartItems, setCartItems] = useState([]);
  const [discount,setDiscount]=useState(false)
  const [categories, setCategories] = useState([]);
  // const [loading,setLoading]=useState(fa)
  const [categoryId, setCategoryId] = useState();
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState()
  const [couper,setCouper]=useState();
  const [step,setStep]=useState(1)
  const [paymentType,setPaymenttype]=useState('on')
  const [selectedTime, setSelectedTime] = useState(null);
  const [feedback,setFeedback]=useState()
  const [addresses,setAddresses]=useState([])
  const [modal2,setModal2]=useState(false)
  const [ whastapp,setWhaspapp]=useState()
  const [detail,setDetail]=useState(false)
  const [modal3,setModal3]=useState(false)
  const [item, setItem] = useState({});
  const [size, setSize] = useState();
  const [selectpricemodal,setselectPricemodal]=useState(false)
  const [priceModal, setPricemodal] = useState(false);

  const [times,setTimes]=useState()
  const [total,setTotal]=useState()
  const [modal,setModal]=useState(false)
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch()
  const [del,setdel]=useState();
 const focus = useIsFocused()
  useEffect(() => {
    const backAction = () => {
      if (modal) {
      //  setStep(1)
      //   return true;
      } else {
        navigation.navigate('Main')
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  const handleStarPress = (index) => {
    setRating(index + 1); // Stars are 1-indexed
  };
  const fcous = useIsFocused()
  // const [moda]
  const [address,setAddress]=useState();
  useEffect(() => {
    fetchCategories();
    getaddress()
    getTime()
  }, []);

  useEffect(()=>{
   getaddress()
  },[address])

  const getaddress= async()=>{
    try {
      const userId = await AsyncStorage.getItem('UserId');
      const {data} = await http.get(`/`,{params:{
        method:"viewAddress",userId:userId
      }})
      console.log(data,"obbbb")
      const d= data?.response?.find((te)=>te?.default==1)?.addressId
      console.log(d,'kkk')
      setAddress(d)
      setAddresses(data)
    } catch (error) {
      console.log(error,"onnn")
    }
  }


  const getTime= async()=>{
    try {
      const userId = await AsyncStorage.getItem('UserId');
      const {data} = await http.get(`/`,{params:{
        method:"deliverySlots",userId:userId
      }})
      console.log(data,"obbbb")
      
      // setAddresses(data)
      setTimes(data?.response)
    } catch (error) {
      console.log(error,"onnn")
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await http.get("/", {
        params: { method: "categoryList", userId: 1 },
      });
      setCategories(data?.response);
      setCategoryId(data?.response?.[0]?.categoryId);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const currentTime = moment();
  const isAfter1AM = currentTime.hour() >= 1;
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data } = await http.get("/", {
        params: {
          method: "myCart",
          // categoryId,
          userId: 1,
        },
      });
      console.log(data,"cartx")
      const d= await http.get('/',{params:{
        method:'whatsapp'
      }})
      setWhaspapp(d?.data?.mobile)
      setProducts(data?.response);
      if(data?.response?.length>0){
        const toal = data?.response?.reduce((total, product) => {
          return total + product.price * product.qty;
        }, 0);
        setTotal(toal)
      }
      setdel(data?.delivery)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching products:", error);
    }
  };
 const sendrating= async()=>{
  try {
    const {data} = await http.get("/",{params:{
      method:'orderRating',rating:4,userId:2,orderId:1,feedback:feedback
    }})
    console.log(data)
  } catch (error) {
    console.log(error)
  }
 }
 const openWhatsApp = async () => {
  // const openWhatsAppBrowser = async () => {
    // Using the provided URL with the '+' sign
    const phoneNumber = whastapp
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
  
    try {
      // Open the URL in the browser. This should load WhatsApp's web page.
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL in browser:', error);
      Alert.alert('Error', 'Something went wrong while trying to open the URL.');
    }
  };
  
  const sendcoupen = async()=>{
    try {
      const {data} = await http.get('/',{params:{
        method:'applyCoupon',amount:total,code:couper
      }})
      setModal2(false)
      console.log(data)
      if(data?.response?.status==1){
        showToast('Successfully applied')
        setTotal(total-data?.response?.offer);
        setDiscount(data?.response?.offer);

      }
      else{
        showToast('Invalid Coupen')
      }
      // ordernow()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // if (categoryId) {
      fetchProducts();
    // }
  }, [fcous]);

  const ordernow = async () => {
    try {
      if(!address){
        Alert('Select address first')
      }
      setModal3(false)
      const { data } = await http.get("/", {
        params: {
          method: "placeOrder",
          addressId:address,
          userId: 1,
          productId: products.map((item) => item.productId).join(","),
          productSize: products.map((item) => item.size).join(","),
          productQty: products.map((item) => item.quantity).join(","),
          productPrice: products.map((item) => item.price).join(","),
          pmode:'cod',
          discount:discount,
          coupon:couper
        },
      });
      console.log("Order Placed successfully:", data);
      navigation.navigate('Success')
      setCartItems([]);
      // fetchProducts()
      setProducts([])
      setModal(false)
      setModal3(true)
      setCouper('')
      dispatch(getCartRedux())
      setPricemodal(false)
      setDiscount(false)
      setStep(1)

      // navigation.navigate('Orders')
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleIncrement = async (id, qty,size,price) => {
    try {
      setLoading(true)
      // return console.log(id,qty,size)
      const { data } = await http.get("/", {
        params: {
          method:"addtocart",
          userId: 1,
          productId: id,
          size: size,
          qty: qty, // Increment by 1
          price: price,
        },
      });
      console.log("Product incremented:", data);

      // Update the cart items and products state
      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems.findIndex(
          (item) => item.id === id
        );

        if (existingItemIndex !== -1) {
          return prevCartItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCartItems, { id, quantity: 1, price: price, size: size }];
        }
      });

      fetchProducts()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error incrementing product:", error);
    }
  };
  const handleDecrement = async (id,qty,size,price) => {
    try {
      setLoading(true)
      if(qty==0){
        const { data } = await http.get("/", {
          params: {
            method:"deleteCart",
            userId: 1,
            productId: id,
          },
        });
      }
      else{
        const { data } = await http.get("/", {
          params: {
            method:"addtocart",
            userId: 1,
            productId: id,
            size:size,
            qty: qty, // Decrement by 1
            price:price
          },
        });
      }
      // console.log("Product decremented:", data);

      // Update the cart items and products state
      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems.findIndex(
          (item) => item.id === id
        );

        if (existingItemIndex !== -1) {
          const updatedCartItems = [...prevCartItems];
          if (updatedCartItems[existingItemIndex].quantity > 1) {
            updatedCartItems[existingItemIndex].quantity -= 1;
          } else {
            updatedCartItems.splice(existingItemIndex, 1);
          }
          return updatedCartItems;
        }
        return prevCartItems;
      });

      fetchProducts()
      dispatch(getCartRedux())
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error decrementing product:", error);
    }
  };

  const renderProduct = ({ item }) => {
    const quantity = item.qty || 0;

    return (
      <TouchableOpacity
      onPress={() => { setPricemodal(true); setItem(item); setSize(item?.size); }}
      style={styles.productContainer}>
          <Image source={{uri:item.productImg}} style={{height:70,width:60,borderRadius:4,marginRight:10}}/>
          <View style={styles.productDetails}>
          <Text style={globalStyles.text}>{item.productName}</Text>
          <Text style={styles.productPrice}>₹{item?.price}</Text>
          <Text style={styles.productQuantity}>
            QTY: {item?.size}
          </Text>
          {/* {item?.size?.map((size) => (
            <View style={{ width: 100 }} key={size}>
              <TouchableOpacity
                onPress={() => {
                  setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                      product.productId === item.productId
                        ? { ...product, sizeDefault: size }
                        : product
                    )
                  );
                }}
                style={styles.sizeButton}
              >
                <Text style={globalStyles.text2}>{size}</Text>
                <RenderIcon
                  iconName="sort-down"
                  styles={styles.iconStyle}
                  iconSize={20}
                  iconfrom="FontAwesome"
                />
              </TouchableOpacity>
            </View>
          ))} */}
        </View>
        {/* {quantity > 0 ? ( */}
          <View style={styles.actionContainer}>
            {/* <Text style={styles.totalPrice}>₹{item?.price * quantity}</Text> */}
            <TouchableOpacity disabled={loading}
                style={styles.actionButton}
                onPress={() => { setPricemodal(true); setItem(item); setSize(item?.size); }}
                >
                {/* <Text style={styles.actionText}>-</Text> */}
                <RenderIcon iconName={'edit'} iconfrom={'MaterialIcons'} iconColor={'blue'} iconSize={20}/>

              </TouchableOpacity>
            <View style={styles.buttonGroup}>
              <TouchableOpacity disabled={loading}
                style={styles.actionButton}
                onPress={() => handleDecrement(item.productId,item?.qty-1,item?.size,item?.price)}
              >
                {/* <Text style={styles.actionText}>-</Text> */}
                <RenderIcon iconName={'delete'} iconfrom={'MaterialIcons'} iconColor={'red'} iconSize={20}/>

              </TouchableOpacity>
              {/* <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity disabled={loading}
                style={styles.actionButton}
                onPress={() => {
                  console.log(item)
                  handleIncrement(item.productId, item.qty+1,item.size,item?.price)
                }}
              >
                <Text style={styles.actionText}>+</Text>
              </TouchableOpacity> */}
            </View>
          </View>

      </TouchableOpacity>
    );
  };

  return (
    loading?<ActivityIndicator size={'large'} color={'black'}/>:
    (
      products?.length?
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>सब्ज़ी HousE Cart</Text>
          {/* <View style={styles.header}>
          <Text style={styles.headerText}>सब्ज़ी HousE Cart</Text> */}
          {/* <TouchableOpacity style={{marginLeft:'auto'}} onPress={()=>openWhatsApp()}>
          <Image source={require("../../assets/whats.png")} style={{height:30,width:30,borderRadius:40}}/>

          </TouchableOpacity> */}

                </View>
  
                {/* <MyAddresses address={address} setAddress={setAddress}/> */}
  
        {/* {cartItems.length > 0 && ( */}
         <View style={{flex:1,padding:15}}>
         <FlatList
          data={products}
          renderItem={renderProduct}
          // ListHeaderComponent={()=>(
  
          // )}
          keyExtractor={(item) => item.productId.toString()}
          contentContainerStyle={styles.list}
        />
  
         {detail&&
         <View style={[globalStyles.box,{flexDirection:'column',}]}>
         <TouchableOpacity onPress={()=>setDetail(false)}>
            <RenderIcon iconColor={'black'} iconfrom={"MaterialCommunityIcons"} iconName={'arrow-down-drop-circle-outline'} iconSize={25}/>
          </TouchableOpacity>
         <CustomButton text={'Add coupon'} onPressfuntion={()=>setModal2(true)} style={{height:35,marginTop:10}}/>
  
          <View style={[globalStyles.rowflex
            ,{marginTop:10}]}>
          <Text style={[globalStyles.text2,]}>Total</Text>
          <Text style={[globalStyles.text2,{textAlign:'right'}]}>₹ {Number(total)+Number(discount)}</Text>
          </View>
          <View style={[globalStyles.rowflex,]}>
          <Text style={[globalStyles.text2]}>Delivery Charges</Text>
          <Text style={[globalStyles.text2,{textAlign:'right'}]}>₹ {total >= 100 ? 0 : del}</Text>
          </View>
          {total >= 100&&<Text style={[globalStyles.text2,{textAlign:'left',opacity:.5,marginRight:'auto',marginTop:5}]}>Total is more than ₹100 so delivery charge is ₹0</Text>}
          {/* <View>
            <Text style={[globalStyles.text2,{opacity:.5}]}>
              {addresses?.response?.find((te)=>te?.default==1)?.address}
              </Text>
              <TouchableOpacity>
                <RenderIcon iconName={"edit"} iconColor={'black'} iconSize={20} iconfrom={"Fontawesome5"}/>
              </TouchableOpacity>
          </View> */}
          {discount&&
          <View style={[globalStyles.rowflex,]}>
          <Text style={[globalStyles.text2]}>Discount</Text>
          <Text style={[globalStyles.text2,{textAlign:'right'}]}>₹ {discount}</Text>
          </View>}
          <View style={[globalStyles.straightline]}></View>
  
          <View style={[globalStyles.rowflex,{marginTop:10}]}>
          <Text style={[globalStyles.text]}>Grand Total</Text>
          <Text style={[globalStyles.text,{textAlign:'right'}]}>₹ {total >= 100 ? total : total + del}</Text>
          </View>
        </View>}
         <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          {!detail&&<View>
            <Text style={[globalStyles.text,{color:theme.colors.primary,fontSize:responsiveFontSize(2.5)}]}>₹ {total >= 100 ? total : total + del}</Text>
            <TouchableOpacity onPress={()=>setDetail(true)}>
              <Text style={[globalStyles.text,{color:theme.colors.primary}]}>Billing Detail</Text>
            </TouchableOpacity>
          </View>}
         <CustomButton
            onPressfuntion={()=>{console.log(modal);setModal(true)}}
            // onPressfuntion={()=>setModal(true)}
            style={{backgroundColor:theme.colors.primary,width:detail?responsiveWidth(95):'60%'}}
            text="Order Now"
            textColor={'white'}
          />
         </View>
         </View>
         <CustomModal name={item.productName} height={responsiveHeight((40))} modalContent={
        <View>
          <View style={{ height: responsiveHeight(30), marginTop: 10 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              {item?.sizeList?.map((ite, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={async() => {
                    // setProducts((prevProducts) =>
                    //   prevProducts?.map((product) =>
                    //     product.productId === item?.productId
                    //       ? { ...product, sizeDefault: ite }
                    //       : product
                    //   )
                    // );
                    // setExpandId('');
                    // setSize(ite);
                     try {
                      // setPrice(item.priceList[index]);
                      const { data } = await http.get(`/`, {
                        params: {
                          method: "addtocart",
                          productId: item?.productId,
                          size: ite,
                          qty: 1,
                          price: Number(item.priceList[index])
                        }
                      });
                      setPricemodal(false);
                      setSize('');
                      showToast('Successfully added');
                      dispatch(getCartRedux());
                      fetchProducts();
                     } catch (error) {
                      console.log(error)
                     }
                    
                  }}
                  style={[{ flexDirection: 'row', borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', backgroundColor: ite == size ? theme.colors.primary : 'rgba(0,0,0,.1)', marginTop: 4, paddingHorizontal: 10, paddingVertical: 5 }]}
                >
                  <Text style={[globalStyles.text2]}>{ite}</Text>
                  <Text style={[globalStyles.text2]}>{item.priceList[index]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
         
        </View>
      } visible={priceModal} setVisible={setPricemodal} />
          <CustomModal
           onRequestClose={()=>{
            if(step==1){
              setModal(false)
            }
            else{
              setStep(step-1)
            }
          }
        } height={'100%'} type={'bottom'} name={step==1?'Select Delivery Slot':step==3?"Select Payment Type":'Select Address'} visible={modal} setVisible={setModal} modalContent={
            step==1?
            <View style={{flex:1}}>
                      <View style={{padding:20,marginTop:10}}>
    {times?.map((te)=>(
      <TouchableOpacity
      onPress={() => setSelectedTime(te?.slot)}
style={[globalStyles.box,{marginVertical:15}]}>
   <View
     style={[globalStyles.circle, selectedTime === te?.slot? { backgroundColor: 'black' } : {}]}
   ></View>
   <Text style={[globalStyles.text,{marginLeft:20}]}>{te?.slot}</Text>
 </TouchableOpacity>
    ))}
    
  </View>
              <View style={{ position:"absolute",bottom:10,left:0,right:0 ,paddingHorizontal:12}}>
  
          <IconButton
              text="Next"
              textColor="black"
              backgroundColor={theme.colors.primary}
              onPress={() => { 
                if(!selectedTime){
                  return showToast('Select Slot')
                }
                setStep(2)}}
              icon={
                <Entypo
                  name="forward"
                  size={responsiveFontSize(2.3)}
                  color="black"
                />
              }
            />
          </View>
          </View>:
          step==3?
          <View style={{padding:15,marginTop:20,flex:1}}>
            <ScrollView>

              <TouchableOpacity style={[globalStyles.box,{justifyContent:'space-between',borderWidth:1.5,borderColor:theme.colors.primary}]}>
              <Image source={require("../../assets/cod.png")} style={{height:40,width:40,marginRight:10,borderRadius:40}}/>

                <View>
                  <Text style={[globalStyles.text,{fontSize:responsiveFontSize(2.5)}]}>Cash On Delivery</Text>
                  <Text style={[globalStyles.text2,{width:responsiveWidth(50),opacity:.5}]}>Pay when order delivery at your home door step secure delivery to your address</Text>
                </View>
                <RenderIcon iconName={'checkbox'} iconfrom={'Ionicons'} iconSize={30} iconColor={theme.colors.primary}/>

              </TouchableOpacity>
              <TouchableOpacity disabled style={[globalStyles.box,{justifyContent:'space-between',borderWidth:1.5,borderColor:theme.colors.primary,opacity:.6}]}>
              <Image source={require("../../assets/walet.jpeg")} style={{height:40,width:40,marginRight:10,borderRadius:40}}/>

                <View>
                  <Text style={[globalStyles.text,{fontSize:responsiveFontSize(2.5)}]}>Pay Online</Text>
                  <Text style={[globalStyles.text2,{width:responsiveWidth(50),opacity:.5}]}>Pay Online through wallet this is not enable for now</Text>
                </View>
                <RenderIcon iconName={'checkbox-blank-outline'} iconfrom={'MaterialCommunityIcons'} iconSize={30} iconColor={'rgba(0,0,0,.5)'}/>

              </TouchableOpacity>
              <View style={[globalStyles.box,{flexDirection:'column',alignItems:'flex-start'}]}>
                <Text style={[globalStyles.text]}>
                  Delivery Address
                </Text>
                <Text style={[globalStyles.text2,{opacity:.5}]}>
                {addresses?.response?.find((te)=>te?.default==1)?.name}

                </Text>
                <Text style={[globalStyles.text2,{opacity:.5}]}>
             {addresses?.response?.find((te)=>te?.default==1)?.houseNo},{addresses?.response?.find((te)=>te?.default==1)?.address},{addresses?.response?.find((te)=>te?.default==1)?.pincode}

              </Text>
             
              <Text style={[globalStyles.text2,{opacity:.5}]}>
              Area : {addresses?.response?.find((te)=>te?.default==1)?.area}
              </Text><Text style={[globalStyles.text2,{opacity:.5}]}>
              Landmark : {addresses?.response?.find((te)=>te?.default==1)?.landmark}
              </Text>
              <Text style={[globalStyles.text2,{opacity:.5}]}>
              Mobile : {addresses?.response?.find((te)=>te?.default==1)?.mobile}
              </Text>
              </View>
              <View style={[globalStyles.box,{flexDirection:'column',}]}>
         {/* <TouchableOpacity onPress={()=>setDetail(false)}>
            <RenderIcon iconColor={'black'} iconfrom={"MaterialCommunityIcons"} iconName={'arrow-down-drop-circle-outline'} iconSize={25}/>
          </TouchableOpacity> */}
         {/* <CustomButton text={'Add coupon'} onPressfuntion={()=>setModal2(true)} style={{height:35,marginTop:10}}/> */}
         {/* <CustomButton text={'Add coupon'} onPressfuntion={()=>setModal2(true)} style={{height:35,marginTop:10}}/> */}
          <View style={[globalStyles.box,{flexDirection:'column'}]}>
            <View style={[globalStyles.rowflex]}>
             <View>
             <Text style={[globalStyles.text2,{}]}>Coupon discount</Text>
              <Text style={[globalStyles.text2,{opacity:.5,width:responsiveWidth(40)}]}>Use coupon code to save more</Text>

             </View>
              <TouchableOpacity onPress={()=>setModal2(true)}>
            <Text style={[globalStyles.text2,{color:theme.colors.primary}]}>Apply</Text>

            </TouchableOpacity>
            </View>
    
          </View>
          <View style={[globalStyles.rowflex
            ,{marginTop:10}]}>
          <Text style={[globalStyles.text2,]}>Total</Text>
          <Text style={[globalStyles.text2,{textAlign:'right'}]}>₹ {Number(total)+Number(discount)}</Text>
          </View>
          <View style={[globalStyles.rowflex,]}>
          <Text style={[globalStyles.text2]}>Delivery Charges</Text>
          <Text style={[globalStyles.text2,{textAlign:'right'}]}>₹ {total >= 100 ? 0 : del}</Text>
          </View>
          {total >= 100&&<Text style={[globalStyles.text2,{textAlign:'left',opacity:.5,marginRight:'auto',marginTop:5}]}>Total is more than ₹100 so delivery charge is ₹0</Text>}
          {/* <View>
            <Text style={[globalStyles.text2,{opacity:.5}]}>
              {addresses?.response?.find((te)=>te?.default==1)?.address}
              </Text>
              <TouchableOpacity>
                <RenderIcon iconName={"edit"} iconColor={'black'} iconSize={20} iconfrom={"Fontawesome5"}/>
              </TouchableOpacity>
          </View> */}

          {discount&&
          <View style={[globalStyles.rowflex,]}>
          <Text style={[globalStyles.text2]}>Discount</Text>
          <Text style={[globalStyles.text2,{textAlign:'right'}]}>₹ {discount}</Text>
          </View>}
          <View style={[globalStyles.straightline]}></View>
  
          <View style={[globalStyles.rowflex,{marginTop:10}]}>
          <Text style={[globalStyles.text]}>Grand Total</Text>
          <Text style={[globalStyles.text,{textAlign:'right'}]}>₹ {total >= 100 ? total : total + del}</Text>
          </View>
        </View>
              <CustomButton onPressfuntion={()=>ordernow()} marginTop={'auto'} style={{marginTop:'auto'}} bg={theme.colors.primary} text={'Confirm Order'}/>
              </ScrollView>

          </View>:
          <MyAddresses onPress={()=>{
            if(step==2&&selectedTime&&address){
              // ordernow()
              setStep(3)
            }
            else{
              if(!selectedTime){
                showToast('Select Slot')
              }
              if(!address){
                showToast('Select Address')
              }
              else{
                setStep(2)

              }
            }
            if(!address){
              showToast('Select Address')
            }
            }} onClose={()=>setModal(false)} address={address}  setAddress={setAddress}/>}/>
          <CustomModal  visible={modal2} setVisible={setModal2} modalContent={<View>
            <CustomTextInput placeholder={'Coupon code'} value={couper} setValue={setCouper}/>
            <CustomButton onPressfuntion={()=>{
              sendcoupen()
            }} style={{marginTop:20,backgroundColor:theme.colors.primary}}  text={'Submit'}/>
  
          </View>}/>
          {/* <CustomModal height={'30%'} visible={modal3} setVisible={setModal3} modalContent={<View>
            <Text style={[globalStyles.text]}>Rate us:</Text>
        <View style={[globalStyles.rowflex,{width:200,marginVertical:10}]}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleStarPress(index)}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={index < rating ? "star" : "star-o"}
                size={30}
                color={index < rating ? "#FFD700" : "#ccc"}
                // style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[globalStyles.text2]}>You rated: {rating} / 5</Text>
                  <CustomButton onPressfuntion={()=>{
              sendrating()
            }} style={{marginTop:20,backgroundColor:theme.colors.primary}}  text={'Submit'}/>
          </View>}/> */}
  
      </View>:<View style={{flex:1}}>
      <View style={styles.header}>
          <Text style={styles.headerText}>सब्ज़ी HousE Cart</Text>
          {/* <TouchableOpacity onPress={()=>openWhatsApp()}>
          <Image source={require("../../assets/whats.png")} style={{height:30,width:30,marginLeft:"auto",borderRadius:40}}/>

          </TouchableOpacity> */}

        </View>
        <Text style={[globalStyles.text,{textAlign:'center',marginTop:15}]}>Empty Cart</Text></View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    padding: 16,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'row'
  },
  headerText: {
    fontSize: 20,
    //fontWeight: "bold",
    color: "#fff",
  },
  searchBar: {
    marginTop: 8,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  tabBar: {
    marginTop: 8,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 16,
    color: "#333",
    marginRight: 16,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
  },
  activeTab: {
    backgroundColor: theme.colors.secondary,
    color: "#fff",
  },
  list: {
    // paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imageBox: {
    width: 80,
    height: 80,
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  productPrice: {
    fontSize: 16,
    //fontWeight: "bold",
    color: theme.colors.primary,
  },
  productQuantity: {
    marginTop: 4,
    color: "#666",
  },
  sizeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
  },
  iconStyle: {
    marginLeft: 5,
  },
  actionContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  actionButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: theme.colors.secondary,
  },
  actionText: {
    color: "black",
    //fontWeight: "bold",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    //fontWeight: "bold",
    marginHorizontal: 8,
  },
  totalPrice: {
    fontSize: 16,
    //fontWeight: "bold",
    color: theme.colors.primary,
  },
  addButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  cartButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default Cart;
