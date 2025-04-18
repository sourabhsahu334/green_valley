import { http } from "../../utiles/AxiosInstance";

export const addNavREf = (name) => async (dispatch) => {
    try {
      dispatch({
        type: "SET_REF",
        payload: name,
      });
    } catch (error) {
      dispatch({
        type: "CREATE_MINE_JOB_POST_FAILED",
        payload: "false",
      });
      console.log('Error retrieving creating:', error);
    }
  };

  export const setScreenName = (name) => async (dispatch) => {
    console.log(name,"s");
    try {
      dispatch({
        type:"SET_NAME_SCREEN_REF",
        payload: name,
      });
    } catch (error) {
      dispatch({
        type: "CREATE_MINE_JOB_POST_FAILED",
        payload: "false",
      });
      console.log('Error retrieving creating:', error);
    }
  };