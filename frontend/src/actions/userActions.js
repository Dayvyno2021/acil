import axios from 'axios';
import { GET_DOWNLINES_FAIL, GET_DOWNLINES_REQUEST, GET_DOWNLINES_SUCCESS, SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, UPLOAD_IMAGE_FAIL, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstants';

export const registerAction = (input) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { username, email, psw, refCode, phone } = input;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    const {data} = await axios.post(
      '/api/user/register',
      { username, email, psw, refCode, phone },
      config
    )
    
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })


    
    localStorage.setItem('acilDetails', JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message: error.response
    })
  }
}

export const logoutAction = () => async(dispatch) =>{
  // localStorage.clear();
  localStorage.removeItem('acilDetails');
  localStorage.removeItem('pack');
  dispatch({type: USER_LOGOUT})
  document.location.href = '/';
}

export const loginAction = (login) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    
    const { user, password } = login;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const { data } = await axios.post(
      '/api/user/login', {user, password}, config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })


    localStorage.setItem('acilDetails', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message: error.response
    })
  }
}

export const profileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const { loginReducer: { acilDetails: { token } } } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }

    const { data } = await axios.get(
      '/api/user/profile', config
    )

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })
    

  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response: error.response.message
    })
  }
}


export const uploadPixAction = (detail) => async(dispatch, getState)=> {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });
    const {loginReducer:{acilDetails:{token}}} = getState()
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.put('/api/user/imageform', detail, config);
    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: error.response && error.response.message.data ?
        error.response.message.data: error.response
    })
  }
}

export const getDownlinesAction = (ref) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DOWNLINES_REQUEST });
    const {loginReducer:{acilDetails:{token}}} = getState()
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/referral/mydownline/${ref}`, config)
    dispatch({
      type: GET_DOWNLINES_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: GET_DOWNLINES_FAIL,
      payload: error.response && error.response.message.data ?
        error.response.message.data: error.response
    })
  }
}

export const sendMessageAction = (input) => async (dispatch) => {
  try {
    dispatch({ type: SEND_MESSAGE_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const { data } = await axios.post('/api/email/send', input, config);

    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload: error.response && error.response.message.data ?
        error.response.message.data: error.response
    })
  }
}