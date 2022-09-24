import axios from 'axios';
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, UPDATE_PAYOUT_FAIL, UPDATE_PAYOUT_REQUEST, UPDATE_PAYOUT_SUCCESS, UPDATE_TO_PAID_FAIL, UPDATE_TO_PAID_REQUEST, UPDATE_TO_PAID_SUCCESS } from '../constants/orderConstants';

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

//To fetch an individual order
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


//to get all the orders atrributted to a user
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

//Fetches all the orders. For Admins only
export const allOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }

    const {data} = await axios.get('/api/investment/all-orders', config)

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message: error.response
    })
  }
}

//Deletes an order

export const deleteOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.delete(`/api/investment/delete/${id}`, config);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message: error.response
    })
  }
}

export const updateToPaidAction = (input) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_TO_PAID_REQUEST })

    const {paid, id } = input;
    
    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.put(`/api/investment/update-as-paid/${id}`, {paid}, config);

    dispatch({
      type: UPDATE_TO_PAID_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: UPDATE_TO_PAID_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message: error.response
    })
  }
}

// Update payout
export const updatePayoutAction = (input) => async (dispatch, getState) => {
  try {

    dispatch({ type: UPDATE_PAYOUT_REQUEST })

    const {paidOut, id } = input;
    
    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.put(`/api/investment/update-as-paid-out/${id}`, { paidOut }, config);

    dispatch({
      type: UPDATE_PAYOUT_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: UPDATE_PAYOUT_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message: error.response
    })
  }
}