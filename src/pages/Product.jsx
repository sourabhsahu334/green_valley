import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";
import { http } from "../utils/AxiosInstance";
import theme from "../utils/theme";
import { globalStyles } from "../utils/GlobalStyles";
import { CustomButton } from "../components/CustomButton";
import { RenderIcon } from "../components/RenderIcon";

const Products = () => {
  const [cartItems, setCartItems] = useState([]);
  const [categories,setCategory]=useState([])
  const [categoryid,setCategoryId]=useState()
  useEffect(()=>{
  fetchcate()
  },[])
  const fetchcate= async()=>{
    try {
      const {data} = await http.get('/',{params:{method:'categoryList',userId:1}})
      console.log(data);
      setCategory(data?.response)
      setCategoryId(data?.response?.[0]?.categoryId)
    } catch (error) {
      console.log(error)
    }
  }
  const [products,setProducts]=useState();

 const addtocart = async()=>{
  try {
    const {data} = await http.get(`/`,{params:{
      method:"addtocart",
      userId:1,
      productId:cartItems?.map((item)=>{return item?.productId}).join(','),
      size:cartItems?.map((item)=>{return item?.productId}).join(',')
      ,qty:cartItems?.map((item)=>{return item?.quantity}).join(','),
      price:cartItems?.map((item)=>{return item?.price}).join(',')
    }})
    console.log(data)
    setCartItems([])
  } catch (error) {
    console.log(error)
  }
 }

  const fethrpdoc = async()=>{
    try {
      const {data} = await http.get('/',{params:{
        method:"productList",categoryId: 2,userId:1   }})
      console.log(data?.response?.[0],"prod",categoryid)
      setProducts(data?.response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
  fethrpdoc()
  },[categoryid])

  const handleIncrement = (id,price,size) => {
    console.log(cartItems, "cartItems before findIndex");
  
    if (!Array.isArray(cartItems)) {
      console.error("cartItems is not an array:", cartItems);
      return;
    }
  
    // Update the cartItems array
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex((item) => item.id === id);
  
      if (existingItemIndex !== -1) {
        // If the product already exists, increment the quantity
        return prevCartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the product doesn't exist, add it to the cart
        return [
          ...prevCartItems,
          { id, quantity: 1, price: price, size: size}, // Default values
        ];
      }
    });
  
    // Update the products array
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === id
          ? { ...product, quantity: (product.quantity || 0) + 1 }
          : product
      )
    );
  };
  
  
  
  const handleDecrement = (id,price,size) => {
    // Update the cartItems array
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex((item) => item.id === id);
  
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
  
        // Decrement the quantity if it's greater than 0
        if (updatedCartItems[existingItemIndex].quantity > 0) {
          updatedCartItems[existingItemIndex] = {
            ...updatedCartItems[existingItemIndex],
            quantity: updatedCartItems[existingItemIndex].quantity - 1,
          };
        }
  
        // Remove the item if the quantity becomes 0
        if (updatedCartItems[existingItemIndex].quantity === 0) {
          updatedCartItems.splice(existingItemIndex, 1);
        }
  
        return updatedCartItems;
      }
  
      return prevCartItems; // Return the previous state if the item doesn't exist
    });
  
    // Update the products array
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };
  
  
  const renderProduct = ({ item }) => {
    const quantity = item.quantity || 0;
  
    return (
      <View style={styles.productContainer}>
        <View style={styles.imageBox}></View>
        <View style={styles.productDetails}>
          <Text style={globalStyles.text}>{item.productName}</Text>
          <Text style={styles.productPrice}>₹{item?.price}</Text>
          <Text style={styles.productQuantity}>{item?.quantityOptions?.[0]}</Text>
          {item?.size?.map((ite)=>(
            <View style={{width:100}}>
              <TouchableOpacity onPress={()=>{
                setProducts((prevProducts) =>
                  prevProducts.map((product) =>
                    product.productId === id 
                      ? { ...product, sizeDefault:ite}
                      : product
                  )
                );
              }} style={[{flexDirection:'row',width:80,borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,.1)'}]}>
              <Text style={[globalStyles.text2]}>{ite}</Text>
              <RenderIcon iconName={'sort-down'} styles={{marginLeft:10,marginBottom:5}} iconSize={20} iconfrom={'FontAwesome'}/>
            </TouchableOpacity>
            </View>
          ))}
        </View>
        {quantity ? (
          <View style={styles.actionContainer}>
            <Text style={styles.totalPrice}>₹{item.price * quantity}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDecrement(item.productId)}
              >
                <Text style={styles.actionText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleIncrement(item.productId)}
              >
                <Text style={styles.actionText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleIncrement(item.productId,item.price * quantity, item?.sizeDefault)}
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
          >
            <Text style={[globalStyles.text2]}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Garg Super Market</Text>
        <TextInput style={styles.searchBar} placeholder="Search for item..." />
      </View>

      {/* Tab Bar */}
      <View style={{height:40}}>
      <ScrollView style={{height:40,paddingVertical:5}} horizontal>
       {categories?.map((ite)=>(
        <TouchableOpacity onPress={()=>setCategoryId(ite.categoryId)}>
                  <Text style={[styles.tabText,ite.categoryId==categoryid&& {...styles.activeTab},{height:30,paddingHorizontal:15}]}>{ite.categoryName}</Text>

        </TouchableOpacity>
       ))}
      </ScrollView>
      </View>

      {/* Product List */}
      <View style={{flex:1}}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      </View>
      {cartItems?.length>0&&<CustomButton onPressfuntion={()=>{addtocart()}} style={{width:'95%',margin:10}}  text={'Add to Cart'}/>}

      {/* Footer Navigation */}
      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>Home</Text>
        <Text style={styles.footerText}>Search</Text>
        <Text style={styles.footerText}>Ordr</Text>
        <Text style={styles.footerText}>Cart</Text>
      </View> */}
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
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
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
    fontWeight: "bold",
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
  },
  imageBox: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
