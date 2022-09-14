import { CHOOSE_PACKAGE_FAIL, CHOOSE_PACKAGE_REQUEST, CHOOSE_PACKAGE_SUCCESS } from "../constants/packageConstants";

const choosenPackage = localStorage.getItem('pack') ?
  JSON.parse(localStorage.getItem('pack')) : {};

export const choosePackageReducer = (state = { pack: choosenPackage }, action) => {
  switch (action.type) {
    case CHOOSE_PACKAGE_REQUEST:
      return { ...state, loading: true };
    case CHOOSE_PACKAGE_SUCCESS:
      return { loading: false, pack: action.payload };
    case CHOOSE_PACKAGE_FAIL:
      return {...state, loading: false, error: action.payload}
  
    default:
      return state;
  }
}