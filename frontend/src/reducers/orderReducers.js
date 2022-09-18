import { GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../constants/orderConstants";

export const placeOrderReducer = (state = {orderDetails:{}}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return { loading: true };
    case PLACE_ORDER_SUCCESS:
      return { loading: false, orderDetails: action.payload, success: true };
    case PLACE_ORDER_FAIL:
      return {loading: false, error: action.payload}
  
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
      return {loading: false, error: action.payload}
    
    default:
      return state;
  }
}