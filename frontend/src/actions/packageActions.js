import axios from "axios";
import { ADD_PACKAGE_FAIL, ADD_PACKAGE_REQUEST, ADD_PACKAGE_SUCCESS, ALL_PACKAGES_FAIL, ALL_PACKAGES_REQUEST, ALL_PACKAGES_SUCCESS, CHOOSE_PACKAGE_FAIL, CHOOSE_PACKAGE_REQUEST, CHOOSE_PACKAGE_SUCCESS, DEL_PACKAGE_FAIL, DEL_PACKAGE_REQUEST, DEL_PACKAGE_SUCCESS } from "../constants/packageConstants";

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
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}

export const addPackageAction = (values) => async (dispatch, getState) => {
  try {
    // console.log(values)
    dispatch({ type: ADD_PACKAGE_REQUEST });
    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post('/api/products/add-package', values, config);
    dispatch({
      type: ADD_PACKAGE_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: ADD_PACKAGE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}

export const allPackagesAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PACKAGES_REQUEST });

    const { data } = await axios.get('/api/products/packages/all');

    dispatch({
      type: ALL_PACKAGES_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: ALL_PACKAGES_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}

export const delPackageAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEL_PACKAGE_REQUEST });
    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.delete(`/api/products/del-package/${id}`, config);

    dispatch({
      type: DEL_PACKAGE_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: DEL_PACKAGE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}