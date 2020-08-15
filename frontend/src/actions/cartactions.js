import Cookie from 'js-cookie';
const { default: Axios } = require("axios");
const { ADD_TO_CART, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } = require("../constants/cartConstants");

const addtoCart = (productId,qty) => async (dispatch,getState) =>{
    try{
        const {data} = await Axios.get("/api/products/"+productId);
        dispatch({type:ADD_TO_CART,payload:{
            product: data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        } });
        const {cart:{cartItems}} = getState();
        Cookie.set("cartItems",JSON.stringify(cartItems));
    } catch(e){

    }
}
const removefromcart = (productId)=>(dispatch,getState) =>{
    dispatch({type:CART_REMOVE_ITEM,payload:productId});
    const {cart:{cartItems}} = getState();
    Cookie.set("cartItems",JSON.stringify(cartItems));
}
const saveShipping = (data)=>(dispatch,getState) =>{
    dispatch({type:CART_SAVE_SHIPPING,payload:data});
    const {cart:{shipping}} = getState();
    Cookie.set("shipping",JSON.stringify(shipping));
}
const savePayments = (data) => (dispatch,getState) => {
    dispatch({type:CART_SAVE_PAYMENT,payload:data})
    const {cart:{payment}} = getState();
    Cookie.set("payment",JSON.stringify(payment));
}
export {addtoCart,removefromcart,saveShipping,savePayments};