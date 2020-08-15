import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Checkoutsteps from '../components/shippingstats';
import { addtoCart, removefromcart } from '../actions/cartactions';
import { useSelector, useDispatch } from 'react-redux';
import {createOrder} from '../actions/orderActions';
import { Link } from 'react-router-dom';


function PlaceOrder(props){

	const orderCreate = useSelector(state=>state.orderCreate);
	const {loading,success,order,error} = orderCreate;

	const cart  = useSelector(state=> state.cart);
	const {cartItems,shipping,payment} = cart;
	if(!shipping.address){
		props.history.push('/shipping');
	} else if(!payment.paymentMethod){
		props.history.push('/payment');
	}

	const dispatch = useDispatch();


	const itemprice= cartItems.reduce((a,c)=>a+c.price*c.qty, 0);
	const shippingprice = itemprice>100 ? 0:10;
	const taxprice = parseFloat((0.15*itemprice).toFixed(2));
	const totalprice = parseFloat(itemprice + shippingprice + taxprice);
	const placeorderHandler = () =>{
		dispatch(createOrder({
			orderItems: cartItems, 
			shipping, 
			payment,
			itemprice,
			shippingprice,
			taxprice,
			totalprice
		}))
	}
	useEffect(()=>{
		if(success){
			props.history.push("/order/"+order._id)
		}
		
	},[success])
    return<div>
        <Header {...props}/>
       <Checkoutsteps step1 step2 step3 step4></Checkoutsteps>
	   <div className="cart-main">
	   <div className="cart-list">
		   <div className="shipping-info">
			   <h3>Shipping Address</h3>
			   {cart.shipping.address},
			   {cart.shipping.city},
			   {cart.shipping.postalcode},
			   {cart.shipping.country}
		   </div>
		   <div className="payment-info">
			   <h3>Payment Method</h3>
			   {cart.payment.paymentMethod}
		   </div>
	   <div className="cart-list-container ship-details">
		   <h3>Order List</h3>
            <table className="dusra-container" >
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                               
                { cartItems.map(item =><tbody key={item.product}><tr >
                                    <td className="cart-image">
                                        <img src={item.image} alt="product"></img>
                                    </td>
                                    <td className="cart-name">
                                        <Link to={"/single/"+item.product}>{item.name}</Link>
                                    </td>
                                    <td className="cart-select">
                                       {item.qty}
                                    </td>
                                    <td>
                                        <div className="cart-price">
                                             {item.price}
                                        </div>
                                    </td>
                                </tr>
								</tbody> 
					)
					
                }
                    
                        </table>
            </div>
			</div>

        <div className="product-action">
                
                   {/* <h3> Subtotal ( {cartItems.reduce((a, c)=>a + parseFloat(c.qty),0) } items):&nbsp;{cartItems.reduce((a, c)=> a+c.price * c.qty ,0)}</h3> */}
                
                <button className="button" onClick={placeorderHandler} disabled={cartItems.length===0} >
                    Place Order
                </button>
				<ul>
					<h3>
						Order Summary
					</h3>
					<li>
						<div>SubTotal:</div>
						<div>{itemprice}</div>
					</li>
					<li>
						<div>Shipping:</div>
						<div>{shippingprice}</div>
					</li>
					<li>
						<div>Tax:</div>
						<div>{taxprice}</div>
					</li>
					<li  className="order-total">
						<div>Order Total:</div>
						<div>{totalprice}</div>
					</li>
				</ul>
        </div>
		</div>
		
	   <Footer />
    </div>
}


export default PlaceOrder;