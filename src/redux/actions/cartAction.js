import AsyncStorage from "@react-native-async-storage/async-storage";
import { http } from "../../utils/AxiosInstance";
// import { retrieveUser } from "../../utiles/authStorage";

export const getCartRedux= () => async (dispatch) => {
    try {
        // const data = await AsyncStorage.getItem("user")
        const { data } = await http.get("/", {
            params: {
              method: "myCart",
              // categoryId,
              userId: 1,
            },
          });
      dispatch({
        type: "SET_CART",
        payload: data?.response?.length,
        totalValue:data?.total
      });
    } catch (error) {
      dispatch({
        type: "CREATE_MINE_JOB_POST_FAILED",
        payload: "false",
      });
      console.log('Error retrieving creating:', error);
    }
  };
