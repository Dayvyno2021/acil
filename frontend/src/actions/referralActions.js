import axios from "axios";
import { ALL_REFERRAL_FAIL, ALL_REFERRAL_REQUEST, ALL_REFERRAL_SUCCESS, DELETE_REFERRAL_FAIL, DELETE_REFERRAL_REQUEST, DELETE_REFERRAL_SUCCESS, REF_PAYOUT_FAIL, REF_PAYOUT_REQUEST, REF_PAYOUT_SUCCESS, UPDATE_REF_PAYOUT_FAIL, UPDATE_REF_PAYOUT_REQUEST, UPDATE_REF_PAYOUT_SUCCESS } from "../constants/referralConstants";

export const allReferralAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_REFERRAL_REQUEST });

    const { loginReducer: { acilDetails: { token } } } = getState();
    
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/referral/all-downlines`, config);
    dispatch({
      type: ALL_REFERRAL_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: ALL_REFERRAL_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}

export const updateRefPayoutAction = (input) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_REF_PAYOUT_REQUEST });

    const { paidOut, id } = input;
    const { loginReducer: { acilDetails: { token } } } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.put(`/api/referral/update-to-paidout/${id}`, { paidOut }, config);

    dispatch({
      type: UPDATE_REF_PAYOUT_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: UPDATE_REF_PAYOUT_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}

export const refPayoutAction = (id) => async(dispatch, getState)=> {
  try {
    dispatch({ type: REF_PAYOUT_REQUEST });

    const { loginReducer: { acilDetails: { token } } } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    const { data } = await axios.get(`/api/referral/single/${id}`, config);
    dispatch({
      type: REF_PAYOUT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: REF_PAYOUT_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}

export const deleteReferralAction = (id) => async (dispatch, getState) => {
  try {

    dispatch({ type: DELETE_REFERRAL_REQUEST });

    const { loginReducer: { acilDetails: { token } } } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    const { data } = await axios.delete(`/api/referral/delete-referral/${id}`, config);
    dispatch({
      type: DELETE_REFERRAL_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: DELETE_REFERRAL_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}