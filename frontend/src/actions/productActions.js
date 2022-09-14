import axios from 'axios';
import { GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, SINGLE_PRODUCT_FAIL, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS } from '../constants/productConstants';

export const getProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    // const config = {
    //   headers: {
        
    //   }
    // }

    const { data } = await axios.get('/api/products');

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response && error.response.message.data ?
        error.response.message.data : error.response
    })
  }
}

export const singleProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQUEST })
    
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: SINGLE_PRODUCT_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
      payload: error.response && error.response.message.data ?
        error.response.message.data : error.response
    })
  }
}