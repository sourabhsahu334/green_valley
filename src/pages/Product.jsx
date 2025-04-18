import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { http } from "../utils/AxiosInstance";
import theme from "../utils/theme";
import { globalStyles } from "../utils/GlobalStyles";
import { CustomButton } from "../components/CustomButton";
import { RenderIcon } from "../components/RenderIcon";
import { useIsFocused } from "@react-navigation/native";
import CustomModal from "../components/CustomModal";
import { CustomTextInput } from "../components/CustomTextInput";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { showToast } from "../components/Toast";
import { getCartRedux } from "../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../components/Button/IconButton";
import Entypo from 'react-native-vector-icons/Entypo';
import { debounce } from "lodash";

const Products = ({ navigation, route }) => {
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategory] = useState([]);
  const [categoryid, setCategoryId] = useState();
  const cartItemCount = useSelector(state => state.cart?.data);
  const cartValue = useSelector(state => state.cart?.total);
  const [priceModal, setPricemodal] = useState(false);
  const [size, setSize] = useState();
  const [modal, setModal] = useState(false);
  const [expandid, setExpandId] = useState();
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState();
  const [item, setItem] = useState({});
  const [searchdat, setSearchdata] = useState([]);
  const dispatch = useDispatch();
  const focus = useIsFocused();

  useEffect(() => {
    fetchcate();
  }, []);

  // useEffect(() => {
  //   if (modal) {
  //     setProducts([]);
  //   } else {
  //     setSearch('');
  //     // fetchProducts();
  //     if(categoryid){
  //       fetchProducts()
  //     }
  //   }
  // }, [modal]);

 
  
  useEffect(() => {
    if(route?.params?.id){
      setCategoryId(route?.params?.id);

    }
  }, [route?.params]);

  const fetchcate = useCallback(async () => {
    try {
      const { data } = await http.get('/', { params: { method: 'categoryList' } });
      setCategory(data?.response);
      // setCategoryId(data?.response?.[0]?.categoryId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [products, setProducts] = useState([]);

  const fetchCarts = useCallback(async () => {
    try {
      const { data } = await http.get("/", {
        params: {
          method: "myCart",
          userId: 1,
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchCarts();
  }, [categoryid,focus]);

  const addtocart = useCallback(async () => {
    try {
      const { data } = await http.get(`/`, {
        params: {
          method: "addtocart",
          productId: cartItems?.map((item) => item?.id).join(','),
          size: cartItems?.map((item) => item?.size).join(','),
          qty: cartItems?.map((item) => item?.quantity).join(','),
          price: cartItems?.map((item) => item?.price).join(',')
        }
      });
      setCartItems([]);
      navigation.navigate('Cart');
    } catch (error) {
      console.log(error);
    }
  }, [cartItems, navigation]);
  const [loading,setLoading]=useState(false)
  const fetchProducts = async() => {
      try {
        setLoading(true)
        const { data } = await http.get('/', { params: { method: "productList", categoryId: categoryid } });
        setProducts(data?.response);
        // Alert.alert(categoryid)
      } catch (error) {
        console.log(error);
  
      }
      finally{
        setLoading(false)
      }
    
  };
  useEffect(()=>{
    if(categoryid){
      fetchProducts()
    }
  },[categoryid,focus])


  const fetchProductsBySearch = useCallback(debounce(async (searchTerm) => {
    try {
      const { data } = await http.get('/', { params: { method: "productSearch", name: searchTerm } });
      setProducts(data?.response);
    } catch (error) {
      console.log(error);
    }
  }, 300), []);

  useEffect(() => {
    if(search&&modal){
      fetchProductsBySearch(search);

    }
  }, [search]);

  const handleIncrement = useCallback(async (id, price, size, qty) => {
    try {
      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems.findIndex((item) => item.id === id);
        if (existingItemIndex !== -1) {
          return prevCartItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: qty, size: size, price: price }
              : item
          );
        } else {
          return [...prevCartItems, { id, quantity: 1, price: price, size: size }];
        }
      });

      setProducts((prevProducts) =>
        prevProducts?.map((product) =>
          product.productId === id
            ? { ...product, quantity: (qty || 0) + 1, qty: product.qty + 1 }
            : product
        )
      );

      await http.get(`/`, {
        params: {
          method: "addtocart",
          productId: id,
          size: size,
          qty: qty + 1,
          price: Number(price)
        }
      });
    } catch (error) {
      console.log(error, "add toca");
    }
  }, []);

  const handleDecrement = useCallback(async (id, price, size, qty) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        if (updatedCartItems[existingItemIndex].quantity > 0) {
          updatedCartItems[existingItemIndex] = {
            ...updatedCartItems[existingItemIndex],
            quantity: updatedCartItems[existingItemIndex].quantity - 1,
          };
        }
        if (updatedCartItems[existingItemIndex].quantity === 0) {
          updatedCartItems.splice(existingItemIndex, 1);
        }
        return updatedCartItems;
      }
      return prevCartItems;
    });

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === id && product.quantity > 0
          ? { ...product, quantity: product.qty - 1, qty: product.qty - 1 }
          : product
      )
    );

    await http.get(`/`, {
      params: {
        method: "addtocart",
        productId: id,
        size: size,
        qty: qty - 1,
        price: Number(price)
      }
    });
  }, []);

  const renderProduct = useCallback(({ item }) => {
    const quantity = item?.qty;
    console.log(item)
    return (
      <View style={styles.productContainer}>
        <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
          <Image source={{ uri: item.image }} style={{ height: 70, width: 60, borderRadius: 4, marginRight: 10 }} />
          <View style={styles.productDetails}>
          <Text style={[globalStyles.text,{width:'60%'}]}>{item.productName}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%'}}>
          <View>
           {!quantity&&<Text style={styles.productPrice}>₹{item?.productPrice}/{item?.productUnit}</Text>}
           {quantity && <Text style={[globalStyles.text2, { opacity: .7,fontSize:12 }]}>QTY: {item?.sizeDefault}</Text>}
           </View>
           {quantity ? (
          <TouchableOpacity
            onPress={() => { setPricemodal(true); setItem(item); setSize(item?.sizeDefault); }}
            style={{
              backgroundColor: 'yellow',
              paddingHorizontal: 10,
              borderRadius: 10,
              // marginLeft: 'auto'
            }}
          >
            <Text style={[globalStyles.text2, { color: 'black' }]}>₹{item?.priceDefault}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => { setPricemodal(true); setItem(item); }}
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 10,
              borderRadius: 10,
              marginLeft: 'auto'
            }}
          >
            <Text style={[globalStyles.text2, { color: 'white' }]}>Select</Text>
          </TouchableOpacity>
        )}
          </View>
        </View>
        </View>
       
        
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>सब्ज़ी HousE</Text>
        <TouchableOpacity onPress={() => setModal(true)}>
          <TextInput
            editable={false}
            value={search}
            onChangeText={(e) => setSearch(e)}
            style={styles.searchBar}
            placeholderTextColor={'rgba(0,0,0,.5)'}
            placeholder="Search for item..."
          />
        </TouchableOpacity>
      </View>

      {!search && <View style={{ height: 60 }}>
        <ScrollView style={{ height: 60, paddingVertical: 5 }} horizontal>
          {categories?.map((ite) => (
            <TouchableOpacity key={ite.categoryId} onPress={() => setCategoryId(ite.categoryId)}>
              <Text style={[ite.categoryId == categoryid && { ...styles.activeTab }, { height: 30, paddingHorizontal: 10 }]}>
                {ite.categoryName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>}

      <View style={{ flex: 1 }}>
        {loading?
        <ActivityIndicator color={theme.colors.primary} size={'large'}/>:<FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={[globalStyles.text, { margin: 10 }]}>No Items Available</Text>}
        />}
        {cartItemCount &&
         <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={[globalStyles.box, { backgroundColor: 'orange', width: '95%', marginLeft: 'auto', marginRight: 'auto' }]}>
          <Text style={[globalStyles.text, { color: 'white', fontSize: responsiveFontSize(2.5) }]}>{cartItemCount} Items | ₹ {cartValue}</Text>
          <Text style={[globalStyles.text, { color: 'white', marginLeft: 'auto' }]}>View Cart</Text>
          <RenderIcon iconColor={'white'} iconName={"cart"} iconfrom={'MaterialCommunityIcons'} iconSize={20} styles={{ marginLeft: 10 }} />
        </TouchableOpacity>}
      </View>

      <CustomModal visible={modal} setVisible={setModal} type={'bottom'} height={'100%'} modalContent={
        <View style={[globalStyles.container3]}>
          <CustomTextInput iconName={'card-search'} value={search} placeholder={'Search here...'} setValue={setSearch} />
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        </View>
      } />
      <CustomModal name={item.productName} height={responsiveHeight((40))} modalContent={
        <View>
          <View style={{ height: responsiveHeight(30), marginTop: 10 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              {item?.size?.map((ite, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={async() => {
                    setProducts((prevProducts) =>
                      prevProducts?.map((product) =>
                        product.productId === item?.productId
                          ? { ...product, sizeDefault: ite }
                          : product
                      )
                    );
                    setExpandId('');
                    // setSize(ite);
                    setPrice(item.price[index]);
                      const { data } = await http.get(`/`, {
                        params: {
                          method: "addtocart",
                          productId: item?.productId,
                          size: ite,
                          qty: 1,
                          price: Number(item.price[index])
                        }
                      });
                      setPricemodal(false);
                      setSize('');
                      showToast('Successfully added');
                      dispatch(getCartRedux());
                      fetchProducts();
                    
                  }}
                  style={[{ flexDirection: 'row', borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', backgroundColor: ite == size ? theme.colors.primary : 'rgba(0,0,0,.1)', marginTop: 4, paddingHorizontal: 10, paddingVertical: 5 }]}
                >
                  <Text style={[globalStyles.text2]}>{ite}</Text>
                  <Text style={[globalStyles.text2]}>{item.price[index]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
         
        </View>
      } visible={priceModal} setVisible={setPricemodal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    // //fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    color: 'black',
    fontSize: 14,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 14,
    color: "#333",
  },
  activeTab: {
    color: "#E53935",
    // //fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#E53935",
  },
  list: {
    paddingHorizontal: 16,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent:"space-between"
  },
  imageBox: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    // //fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#333",
  },
  productQuantity: {
    fontSize: 14,
    color: "#666",
  },
  actionContainer: {
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 14,
    // //fontWeight: "bold",
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#E53935",
    fontSize: 18,
    // //fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#eee",
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
});

export default Products;
