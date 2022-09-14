import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

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