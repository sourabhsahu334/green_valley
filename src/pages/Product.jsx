import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
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
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState();
  const [item, setItem] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const focus = useIsFocused();
  const categoryScrollRef = useRef();

  useEffect(() => {
    fetchcate();
  }, []);

  useEffect(() => {
    if (route?.params?.id) {
      setCategoryId(route?.params?.id);
    }
  }, [route?.params]);

  useEffect(() => {
    if (categoryid) {
      fetchProducts();
      scrollToActiveCategory();
    }
  }, [categoryid, focus]);

  const fetchcate = useCallback(async () => {
    try {
      const { data } = await http.get('/', { params: { method: 'categoryList' } });
      setCategory(data?.response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await http.get('/', { params: { method: "productList", categoryId: categoryid } });
      setProducts(data?.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsBySearch = useCallback(debounce(async (searchTerm) => {
    try {
      const { data } = await http.get('/', { params: { method: "productSearch", name: searchTerm } });
      setProducts(data?.response);
    } catch (error) {
      console.log(error);
    }
  }, 300), []);

  useEffect(() => {
    if (search && modal) {
      fetchProductsBySearch(search);
    }
  }, [search]);

  const scrollToActiveCategory = () => {
    const index = categories.findIndex(cat => cat.categoryId === categoryid);
    if (index !== -1 && categoryScrollRef.current) {
      categoryScrollRef.current.scrollTo({ x: index * 100, animated: true });
    }
  };

  const renderProduct = useCallback(({ item }) => {
    const quantity = item?.qty;
    return (
      <View style={styles.productContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Image source={{ uri: item.image }} style={{ height: 70, width: 60, borderRadius: 4, marginRight: 10 }} />
          <View style={{ width: '50%' }}>
            <Text style={[globalStyles.text, { width: '60%' }]}>{item.productName}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
              <View>
                {!quantity && <Text style={styles.productPrice}>₹{item?.productPrice}/{item?.productUnit}</Text>}
                {quantity && <Text style={[globalStyles.text2, { opacity: .7, fontSize: 12 }]}>QTY: {item?.sizeDefault}</Text>}
              </View>
            </View>
          </View>
          <View style={{ marginLeft: 'auto' }}>
            {quantity ? (
              <TouchableOpacity
                onPress={() => { setPricemodal(true); setItem(item); setSize(item?.sizeDefault); }}
                style={{ backgroundColor: 'yellow', paddingHorizontal: 10, borderRadius: 10 }}
              >
                <Text style={[globalStyles.text2, { color: 'black' }]}>₹{item?.priceDefault}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => { setPricemodal(true); setItem(item); }}
                style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 10, borderRadius: 10 }}
              >
                <Text style={[globalStyles.text2, { color: 'white' }]}>Add</Text>
              </TouchableOpacity>
            )}
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
            style={styles.searchBar}
            placeholderTextColor={'rgba(0,0,0,.5)'}
            placeholder="Search for item..."
          />
        </TouchableOpacity>
      </View>

      {!search && (
        <View style={{ height: 60 }}>
          <ScrollView
            ref={categoryScrollRef}
            style={{ height: 60, paddingVertical: 5 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories?.map((ite, index) => (
              <TouchableOpacity key={ite.categoryId} onPress={() => setCategoryId(ite.categoryId)}>
                <Text
                  style={[
                    ite.categoryId == categoryid && styles.activeTab,
                    { height: 30, paddingHorizontal: 10 }
                  ]}
                >
                  {ite.categoryName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator color={theme.colors.primary} size={'large'} />
        ) : (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={[globalStyles.text, { margin: 10 }]}>No Items Available</Text>}
          />
        )}

        {cartItemCount && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={[
              globalStyles.box,
              { backgroundColor: 'orange', width: '95%', marginLeft: 'auto', marginRight: 'auto' }
            ]}
          >
            <Text style={[globalStyles.text, { color: 'white', fontSize: responsiveFontSize(2.5) }]}>
              {cartItemCount} Items | ₹ {cartValue}
            </Text>
            <Text style={[globalStyles.text, { color: 'white', marginLeft: 'auto' }]}>View Cart</Text>
            <RenderIcon iconColor={'white'} iconName={"cart"} iconfrom={'MaterialCommunityIcons'} iconSize={20} styles={{ marginLeft: 10 }} />
          </TouchableOpacity>
        )}
      </View>

      <CustomModal
        visible={modal}
        setVisible={setModal}
        type={'bottom'}
        height={'100%'}
        modalContent={
          <View style={[globalStyles.container3]}>
            <CustomTextInput iconName={'card-search'} value={search} placeholder={'Search here...'} setValue={setSearch} />
            <FlatList
              data={products}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
            />
          </View>
        }
      />

      <CustomModal
        name={item.productName}
        height={responsiveHeight(40)}
        visible={priceModal}
        setVisible={setPricemodal}
        modalContent={
          <View>
            <View style={{ height: responsiveHeight(30), marginTop: 10 }}>
              <ScrollView>
                {item?.size?.map((ite, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={async () => {
                      setProducts(prev =>
                        prev?.map(prod =>
                          prod.productId === item?.productId
                            ? { ...prod, sizeDefault: ite }
                            : prod
                        )
                      );
                      const { data } = await http.get('/', {
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
                    style={{
                      flexDirection: 'row',
                      borderRadius: 10,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: ite == size ? theme.colors.primary : 'rgba(0,0,0,.1)',
                      marginTop: 4,
                      paddingHorizontal: 10,
                      paddingVertical: 5
                    }}
                  >
                    <Text style={[globalStyles.text2]}>{ite}</Text>
                    <Text style={[globalStyles.text2]}>{item.price[index]}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        }
      />
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
  activeTab: {
    color: "#E53935",
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
    justifyContent: "space-between"
  },
  productPrice: {
    fontSize: 14,
    color: "#333",
  }
});

export default Products;
