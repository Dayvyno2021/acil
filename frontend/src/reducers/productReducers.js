import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, RESET_CREATE_PRODUCT, RESET_UPDATE_PRODUCT, SINGLE_PRODUCT_FAIL, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants";


export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload, success: true };
    case GET_PRODUCTS_FAIL:
      return {...state, loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const singleProductReducer = (state = {product:{}}, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case SINGLE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload, success:true };
    case SINGLE_PRODUCT_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, prod: action.payload, success: true };
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case RESET_CREATE_PRODUCT:
      return {};
  
    default:
      return {};
  }
}

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, upd: action.payload, success: true };
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case RESET_UPDATE_PRODUCT:
      return {};
  
    default:
      return state;
  }
}

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
  
    default:
      return state;
  }
}