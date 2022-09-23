import axios from 'axios';
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, SINGLE_PRODUCT_FAIL, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from '../constants/productConstants';

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


export const createProductAction = (input) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    
    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post('/api/products/new/create', input, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response && error.response.message.data ?
        error.response.message.data : error.response
    })
  }
}


export const updateProductAction = (input) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const { id } = input;

    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.put(`/api/products/update/${id}`, input, config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response && error.response.message.data ?
        error.response.message.data : error.response
    })
  }
}

export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }

    const { data } = await axios.delete(`/api/products/delete/${id}`, config);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response && error.response.message.data ?
        error.response.message.data : error.response
    })
  }
}