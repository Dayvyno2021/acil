import axios from "axios";
import { CHOOSE_PACKAGE_FAIL, CHOOSE_PACKAGE_REQUEST, CHOOSE_PACKAGE_SUCCESS } from "../constants/packageConstants";

export const choosePackageAction = (option, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHOOSE_PACKAGE_REQUEST });

    const {data} = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CHOOSE_PACKAGE_SUCCESS,
      payload: {
        ID: data._id,
        pName: data.name,
        img: data.img,
        ROI: data.ROI,
        maturity: data.maturity,
        packageType: option.packageType,
        amount: option.amount
      }
    })

    localStorage.setItem("pack", JSON.stringify(getState().choosePackageReducer.pack))
    
  } catch (error) {
    dispatch({
      type: CHOOSE_PACKAGE_FAIL,
      payload: error.response && error.response.message.data ?
        error.response.message.data: error.response
    })
  }
}