import { ALL_REFERRAL_FAIL, ALL_REFERRAL_REQUEST, ALL_REFERRAL_SUCCESS, DELETE_REFERRAL_FAIL, DELETE_REFERRAL_REQUEST, DELETE_REFERRAL_SUCCESS, REF_PAYOUT_FAIL, REF_PAYOUT_REQUEST, REF_PAYOUT_SUCCESS, UPDATE_REF_PAYOUT_FAIL, UPDATE_REF_PAYOUT_REQUEST, UPDATE_REF_PAYOUT_RESET, UPDATE_REF_PAYOUT_SUCCESS } from "../constants/referralConstants";


export const allReferralReducer = (state = {allRef:[]}, action) => {
  switch (action.type) {
    case ALL_REFERRAL_REQUEST:
      return { loading: true };
    case ALL_REFERRAL_SUCCESS:
      return { loading: false, allRef: action.payload, success: true };
    case ALL_REFERRAL_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const updateRefPayoutReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REF_PAYOUT_REQUEST:
      return { loading: true };
    case UPDATE_REF_PAYOUT_SUCCESS:
      return { loading: false, pay: true };
    case UPDATE_REF_PAYOUT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_REF_PAYOUT_RESET:
      return {};
  
    default:
      return state;
  }
}

export const refPayoutReducer = (state = { details: {} }, action) => {
  switch (action.type) {
    case REF_PAYOUT_REQUEST:
      return { loading: true };
    case REF_PAYOUT_SUCCESS:
      return { loading: false, details: action.payload, success: true };
    case REF_PAYOUT_FAIL:
      return { loading: false, error: action.payload };
  
    default:
      return state;
  }
}

export const deleteReferralReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REFERRAL_REQUEST:
      return { loading: true };
    case DELETE_REFERRAL_SUCCESS:
      return { loading: false, deleted: true };
    case DELETE_REFERRAL_FAIL:
      return { loading: false, error: action.payload };
  
    default:
      return state;
  }
}