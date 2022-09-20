import { GET_DOWNLINES_FAIL, GET_DOWNLINES_REQUEST, GET_DOWNLINES_SUCCESS, UPLOAD_IMAGE_FAIL, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

const userFrmStorage = localStorage.getItem('acilDetails') ? 
  JSON.parse(localStorage.getItem('acilDetails')) : null;

export const registerReducer = (state = {acilDetails: userFrmStorage}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, acilDetails: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export const loginReducer = (state = { acilDetails: userFrmStorage }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:  
      return {loading: true};
    case USER_LOGIN_SUCCESS:
      return { loading: false, acilDetails: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export const profileReducer = (state = { acilDetails: userFrmStorage }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: true, acilDetails: action.payload };
    case USER_PROFILE_FAIL:
      return {loading: true, error:action.payload};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export const uploadPixReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, report: action.payload, success: true };
    case UPLOAD_IMAGE_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const getDownlinesReducer = (state = { downlines: [] }, action) => {
  switch (action.type) {
    case GET_DOWNLINES_REQUEST:
      return { loading: true };
    case GET_DOWNLINES_SUCCESS:
      return { loading: false, downlines: action.payload };
    case GET_DOWNLINES_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}