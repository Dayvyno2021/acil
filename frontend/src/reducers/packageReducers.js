import { ADD_PACKAGE_FAIL, ADD_PACKAGE_REQUEST, ADD_PACKAGE_RESET, ADD_PACKAGE_SUCCESS, ALL_PACKAGES_FAIL, ALL_PACKAGES_REQUEST, ALL_PACKAGES_SUCCESS, CHOOSE_PACKAGE_FAIL, 
  CHOOSE_PACKAGE_REQUEST, 
  CHOOSE_PACKAGE_RESET, 
  CHOOSE_PACKAGE_SUCCESS,
  DEL_PACKAGE_FAIL,
  DEL_PACKAGE_REQUEST,
  DEL_PACKAGE_SUCCESS
} from "../constants/packageConstants";

const choosenPackage = localStorage.getItem('pack') ?
  JSON.parse(localStorage.getItem('pack')) : {};

export const choosePackageReducer = (state = { pack: choosenPackage }, action) => {
  switch (action.type) {
    case CHOOSE_PACKAGE_REQUEST:
      return { ...state, loading: true };
    case CHOOSE_PACKAGE_SUCCESS:
      return { loading: false, pack: action.payload };
    case CHOOSE_PACKAGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CHOOSE_PACKAGE_RESET:
      return {};
  
    default:
      return state;
  }
}

export const addPackageReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PACKAGE_REQUEST:
      return { loading: true };
    case ADD_PACKAGE_SUCCESS:
      return { loading: false, status: action.payload };
    case ADD_PACKAGE_FAIL:
      return { loading: false, error: action.payload };
    case ADD_PACKAGE_RESET:
      return {};
  
    default:
      return state;
  }
}

export const allPackagesReducer = (state = { packages: [] }, action) => {
  switch (action.type) {
    case ALL_PACKAGES_REQUEST:
      return { ...state, loading: true };
    case ALL_PACKAGES_SUCCESS:
      return { loading: false, packages: action.payload };
    case ALL_PACKAGES_FAIL:
      return { ...state, loading: false, error: action.payload };
  
    default:
      return state;
  }
}

export const delPackageReducer = (state = {success: false}, action) => {
  switch (action.type) {
    case DEL_PACKAGE_REQUEST:
      return { loading: true };
    case DEL_PACKAGE_SUCCESS:
      return { loading: false, success: true };
    case DEL_PACKAGE_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}