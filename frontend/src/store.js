import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewReducer,
  productTopReducer
} from "./Reducer/productReducer.js";
import { cartReducer } from "./Reducer/cartReducer.js";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from "./Reducer/userReducers.js";

import {
  OrderCreateReducer,
  OrderDetailsReducer,
  OrderPayReducer,
  OrderListMyReducer,
  OrderListAdminReducer,
  OrderDeliveredReducer
} from "./Reducer/orderReducers.js";

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailReducer,
  productDelete:productDeleteReducer,
  productCreate:productCreateReducer,
  productUpdate:productUpdateReducer,
  productReviews:productReviewReducer,
  productTopRated:productTopReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList:userListReducer,
  userDelete:userDeleteReducer,
  userUpdate:userUpdateReducer,
  orderCreate: OrderCreateReducer,
  orderDetails: OrderDetailsReducer,
  orderPay:OrderPayReducer,
  orderListMy:OrderListMyReducer,
  orderList:OrderListAdminReducer,
  orderDelivered:OrderDeliveredReducer
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

  // const UserUpdateAdminFromStorage = localStorage.getItem("updateUserAdmin")
  // ? JSON.parse(localStorage.getItem("updateUserAdmin"))
  // : []; 

  
  
const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: ShippingAddressFromStorage,
    paymentMethod: PaymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  orderCreate:{order: OrderMethodFromStorage},
  userList:{users:UserListFromStorage},
  // userDetails:{user: UserUpdateAdminFromStorage},
  
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  // composeWithDevTools(applyMiddleware(thunk)) This is also alternative way to do the same
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
