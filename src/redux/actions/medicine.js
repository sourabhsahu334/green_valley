import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveUser } from "../../utiles/authStorage";
import { http } from "../../utils/AxiosInstance";

export const getMedicines = (body) => async (dispatch) => {
  const method="medicineProduct"

  const {data} = await http.get('/',{  params: {
    method,
  },});
  // console.log(data,"meds");
    try {
      dispatch({
        type: "GET_MEDICINE",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "CREATE_MINE_JOB_POST_FAILED",
        payload: "false",
      });
      console.log('Error retrieving creating:', error);
    }
  };