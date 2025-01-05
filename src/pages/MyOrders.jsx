import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { http } from "../utils/AxiosInstance";
import theme from "../utils/theme";
import { globalStyles } from "../utils/GlobalStyles";
import { CustomButton } from "../components/CustomButton";
import { RenderIcon } from "../components/RenderIcon";

const MyOrders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [products, setProducts] = useState([]);



  const fetchProducts = async () => {
    try {
      const { data } = await http.get("/", {
        params: {
          method: "myorder",
          // categoryId,
          userId: 1,
        },
      });
      console.log(data)
      setProducts(data?.response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, []);


//   useEffect(() => {
//     if (categoryId) {
//       fetchProducts();
//     }
//   }, [categoryId]);

//   const addToCart = async () => {
//     try {
//       const { data } = await http.get("/", {
//         params: {
//           method: "addtocart",
//           userId: 1,
//           productId: cartItems.map((item) => item.productId).join(","),
//           size: cartItems.map((item) => item.size).join(","),
//           qty: cartItems.map((item) => item.quantity).join(","),
//           price: cartItems.map((item) => item.price).join(","),
//         },
//       });
//       console.log("MyOrders added successfully:", data);
//       setCartItems([]);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const handleIncrement = (id, price, size) => {
//     setCartItems((prevCartItems) => {
//       const existingItemIndex = prevCartItems.findIndex(
//         (item) => item.id === id
//       );

//       if (existingItemIndex !== -1) {
//         return prevCartItems.map((item, index) =>
//           index === existingItemIndex
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [
//           ...prevCartItems,
//           { id, quantity: 1, price, size },
//         ];
//       }
//     });

//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.productId === id
//           ? { ...product, quantity: (product.quantity || 0) + 1 }
//           : product
//       )
//     );
//   };

//   const handleDecrement = (id) => {
//     setCartItems((prevCartItems) => {
//       const existingItemIndex = prevCartItems.findIndex(
//         (item) => item.id === id
//       );

//       if (existingItemIndex !== -1) {
//         const updatedCartItems = [...prevCartItems];
//         if (updatedCartItems[existingItemIndex].quantity > 0) {
//           updatedCartItems[existingItemIndex].quantity -= 1;
//         }
//         if (updatedCartItems[existingItemIndex].quantity === 0) {
//           updatedCartItems.splice(existingItemIndex, 1);
//         }
//         return updatedCartItems;
//       }
//       return prevCartItems;
//     });

//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.productId === id && product.quantity > 0
//           ? { ...product, quantity: product.quantity - 1 }
//           : product
//       )
//     );
//   };

  const renderProduct = ({ item }) => {
    const quantity = item.quantity || 0;

    return (
      <View style={styles.productContainer}>
        <View style={styles.imageBox}></View>
        <View style={styles.productDetails}>
          <Text style={globalStyles.text}>{item.productName}</Text>
          <Text style={styles.productPrice}>₹{item?.price}</Text>
          <Text style={styles.productQuantity}>
            {item?.quantityOptions?.[0]}
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
        {quantity > 0 ? (
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
                onPress={() => handleIncrement(item.productId, item.price, item.sizeDefault)}
              >
                <Text style={styles.actionText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleIncrement(item.productId, item.price, item.sizeDefault)}
            style={styles.addButton}
          >
            <Text style={globalStyles.text2}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Garg Super Market</Text>
        <TextInput style={styles.searchBar} placeholder="Search for item..." />
      </View>
     
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.productId.toString()}
        contentContainerStyle={styles.list}
      />
      {cartItems.length > 0 && (
        <CustomButton
          onPressfuntion={addToCart}
          style={styles.cartButton}
          text="Add to MyOrders"
        />
      )}
    </View>
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
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
    fontWeight: "bold",
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
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
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


export default MyOrders;
