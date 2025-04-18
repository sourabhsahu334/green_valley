import AsyncStorage from "@react-native-async-storage/async-storage";
import { http } from "../../utiles/AxiosInstance";
// import { retrieveUser } from "../../utiles/authStorage";

export const retrireveUserFromLocal = (body) => async (dispatch) => {
    try {
        const data = await AsyncStorage.getItem("user")
      dispatch({
        type: "GET_USER",
        payload: JSON.parse(data),
      });
    } catch (error) {
      dispatch({
        type: "CREATE_MINE_JOB_POST_FAILED",
        payload: "false",
      });
      console.log('Error retrieving creating:', error);
    }
  };


  
  
  export const Login = (type,data) => async (dispatch) => {
    try {
      const response = await http.post('auth/Login/'+type, data);
      console.log("login api",response.data);
      AsyncStorage.setItem("loggedUser", JSON.stringify(response?.data));
      dispatch({
        type: "LOGIN_MINE",
        payload:response.data,
      });
    } catch (error) {
      dispatch({
        type: "LOGIN_MINE_FAILED",
        payload: "false",
      });
      console.log('Error in login', error);
    }
  };
  // import { http } from "../../utiles/AxiosInstance";

export const Register = (body,image,type) => async (dispatch) => {
    try {
        dispatch({
            type: "LOADING_TRUE",
            payload: true,
          });
      const {data}= await http.post('auth/register/' + type, {...body,image});
      AsyncStorage.setItem("loggedUser", JSON.stringify(data));
      console.log("Login Data",data);
      dispatch({
        type: "LOADING_FALSE",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "REGISTER_COMPANY_FAILED",
        // payload: error,
        // error:error
      });
      console.log('Error retrieving creating:', error);
    }
  };
