import {createStore ,combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productReviewSaveReducer } from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers'
import { userSigninReducer,userRegisterReducer, userUpdateReducer } from './reducers/userreducer';
import { orderDetailsReducer, orderCreateReducer, orderPayReducer, myOrderListReducer, orderDeleteReducer, orderListReducer } from './reducers/orderReducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {cart:{cartItems,shipping:{},payment:{}},userSignin:{userInfo}};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer,
    productReviewSave:productReviewSaveReducer,
    orderList:orderListReducer,
    orderDelete:orderDeleteReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    userUpdate:userUpdateReducer,
    myOrderList:myOrderListReducer
   
    
})
const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__||compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;