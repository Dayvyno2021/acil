import { configureStore } from '@reduxjs/toolkit';
import { allOrdersReducer, getOrderReducer, myordersReducer, placeOrderReducer } from './reducers/orderReducers';
import { choosePackageReducer } from './reducers/packageReducers';
import { getProductsReducer, singleProductReducer } from './reducers/productReducers';
import { adminUsersReducer, deleteUserReducer, getDownlinesReducer, loginReducer, makeAdminReducer, profileReducer, registerReducer, sendMessageReducer, updateUserReducer, uploadPixReducer } from './reducers/userReducers';

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
    getDownlinesReducer: getDownlinesReducer,
    sendMessageReducer: sendMessageReducer,
    allOrdersReducer: allOrdersReducer,
    updateUserReducer: updateUserReducer,
    adminUsersReducer: adminUsersReducer,
    makeAdminReducer: makeAdminReducer,
    deleteUserReducer: deleteUserReducer
  }
})