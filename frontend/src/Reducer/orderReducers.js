import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_RESET,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_RESET,
} from "../constant/OrderConstants.js";

export const OrderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
      break;
  }
};

export const OrderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
      break;
  }
};

export const OrderPayReducer = (state = { }, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
      break;
  }
};

export const OrderListMyReducer = (state = { orders:[] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        orders:action.payload,
        loading: false,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_LIST_MY_RESET:
      return { orders:[] };

    default:
      return state;
      break;
  }
};

export const OrderListAdminReducer = (state = { ordersAdmin:[] }, action) => {
  switch (action.type) {
    case ORDER_LIST_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_ADMIN_SUCCESS:
      return {
        ordersAdmin:action.payload,
        loading: false,
      };
    case ORDER_LIST_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_LIST_ADMIN_RESET:
      return { ordersAdmin:[] };

    default:
      return state;
      break;
  }
};

export const OrderDeliveredReducer = (state = { }, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
      break;
  }
};