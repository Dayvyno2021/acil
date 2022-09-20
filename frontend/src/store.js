import { configureStore } from '@reduxjs/toolkit';
import { getOrderReducer, myordersReducer, placeOrderReducer } from './reducers/orderReducers';
import { choosePackageReducer } from './reducers/packageReducers';
import { getProductsReducer, singleProductReducer } from './reducers/productReducers';
import { getDownlinesReducer, loginReducer, profileReducer, registerReducer, uploadPixReducer } from './reducers/userReducers';

export const store = configureStore({
  reducer: {
    registerReducer: registerReducer,
    loginReducer: loginReducer,
    profileReducer: profileReducer,
    getProductsReducer: getProductsReducer,
    singleProductReducer: singleProductReducer,
    choosePackageReducer: choosePackageReducer,
    placeOrderReducer: placeOrderReducer,
    getOrderReducer: getOrderReducer,
    uploadPixReducer: uploadPixReducer,
    myordersReducer: myordersReducer,
    getDownlinesReducer: getDownlinesReducer
  }
})