import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveUser } from "../../utiles/authStorage";
import { http } from "../../utils/AxiosInstance";

export const getPathology = (body) => async (dispatch) => {
 const  method="pathalogoyPackage"
  const {data} = await http.get('/',{  params: {
    method,
  },});
  console.log(data.response);
    try {
      dispatch({
        type: "GET_PATHOLOGY",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "FAILED",
        payload: "false",
      });
      console.log('Error retrieving pathology:', error);
    }
  };
  export const getPathologyDetail = (id) => async (dispatch) => {
   const   method="packageDetail"
    const packageId=id
    const {data} = await http.get('/',{  params: {
      method,
      packageId
    },});
    console.log("sdfsdfsdf",data.response);
      try {
        dispatch({
          type: "GET_PATHOLOGY_DETAIL",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "FAILED",
          payload: "false",
        });
        console.log('Error retrieving pathology:', error);
      }
    };