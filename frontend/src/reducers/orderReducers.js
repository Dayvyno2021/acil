import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CANCEL_PLACEORDER, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, RESET_ORDER, RESET_ORDER_PAID, RESET_PAYOUT, UPDATE_PAYOUT_FAIL, UPDATE_PAYOUT_REQUEST, UPDATE_PAYOUT_SUCCESS, UPDATE_TO_PAID_FAIL, UPDATE_TO_PAID_REQUEST, UPDATE_TO_PAID_SUCCESS } from "../constants/orderConstants";

export const placeOrderReducer = (state = {orderDetails:{}}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return { loading: true };
    case PLACE_ORDER_SUCCESS:
      return { loading: false, orderDetails: action.payload, success: true };
    case PLACE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case CANCEL_PLACEORDER:
      return {};
  
    default:
      return state;
  }
}

export const getOrderReducer = (state = {order:{}}, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true };
    case GET_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success:true };
    case GET_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case RESET_ORDER:
      return {};
    
    default:
      return state;
  }
}

export const myordersReducer = (state = {myorders:[]}, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return { loading: true };
    case MY_ORDERS_SUCCESS:
      return { loading: false, myorders: action.payload, success: true };
    case MY_ORDERS_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const allOrdersReducer = (state = { allOrders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return { loading: true };
    case ALL_ORDERS_SUCCESS:
      return { loading: false, allOrders: action.payload, success: true };
    case ALL_ORDERS_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const deleteOderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return { loading: true };
    case DELETE_ORDER_SUCCESS:
      return { loading: false, del: true };
    case DELETE_ORDER_FAIL:
      return { loading: false, error: action.payload };
  
    default:
      return state;
  }
}

export const updateToPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TO_PAID_REQUEST:
      return { loading: true };
    case UPDATE_TO_PAID_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case UPDATE_TO_PAID_FAIL:
      return { loading: false, error: action.payload };
    case RESET_ORDER_PAID:
      return {};
  
    default:
      return state;
  }
}

export const updatePayoutReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PAYOUT_REQUEST:
      return { loading: true };
    case UPDATE_PAYOUT_SUCCESS:
      return { loading: false, po: action.payload };
    case UPDATE_PAYOUT_FAIL:
      return { loading: false, error: action.payload };
    case RESET_PAYOUT:
      return {};
  
    default:
      return state;
  }
}