import { configureStore } from '@reduxjs/toolkit';
import { placeOrderReducer } from './reducers/orderReducers';
import { choosePackageReducer } from './reducers/packageReducers';
import { getProductsReducer, singleProductReducer } from './reducers/productReducers';
import { loginReducer, profileReducer, registerReducer } from './reducers/userReducers';

export const store = configureStore({
  reducer: {
    registerReducer: registerReducer,
    loginReducer: loginReducer,
    profileReducer: profileReducer,
    getProductsReducer: getProductsReducer,
    singleProductReducer: singleProductReducer,
    choosePackageReducer: choosePackageReducer,
    placeOrderReducer: placeOrderReducer
  }
})