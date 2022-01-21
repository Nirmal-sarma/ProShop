import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailReducer,
} from "./Reducer/productReducer.js";
import { cartReducer } from "./Reducer/cartReducer.js";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
  userListReducer
} from "./Reducer/userReducers.js";

import {
  OrderCreateReducer,
  OrderDetailsReducer,
  OrderPayReducer,
  OrderListMyReducer
} from "./Reducer/orderReducers.js";

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList:userListReducer,
  orderCreate: OrderCreateReducer,
  orderDetails: OrderDetailsReducer,
  orderPay:OrderPayReducer,
  orderListMy:OrderListMyReducer,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const ShippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const PaymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

  const OrderMethodFromStorage = localStorage.getItem("orderInfo")
  ? JSON.parse(localStorage.getItem("orderInfo"))
  : {}; 

  const UserListFromStorage = localStorage.getItem("userList")
  ? JSON.parse(localStorage.getItem("userList"))
  : []; 

const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: ShippingAddressFromStorage,
    paymentMethod: PaymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  orderCreate:{order: OrderMethodFromStorage},
  userList:{users:UserListFromStorage}
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  // composeWithDevTools(applyMiddleware(thunk)) This is also alternative way to do the same
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
