import axios from 'axios';
import { GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from '../constants/orderConstants';

export const placeOrderAction = (input) => async (dispatch, getState) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });

    const { loginReducer: { acilDetails: { token } } } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type':'application/json'
      }
    }

    const { data } = await axios.post('/api/investment/placeorder', input, config);
    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message: error.response
    })
  }
}

export const getOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const { loginReducer: { acilDetails: { token } } } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/investment/order/${id}`, config);

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message: error.response
    })
  }
}

export const myordersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }

    const { data } = await axios.get('/api/investment/myorders', config);

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data
    })

    
  } catch (error) {
      dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message: error.response
    })
  }
}