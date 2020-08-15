import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder, payOrder } from '../actions/orderActions';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import PaypalButton from '../components/PaypalButton';
 function Order(props){
    
    
    const orderPay = useSelector(state=>state.orderPay);
    const {loading:loadingPay, success:successPay, error: errorPay} = orderPay;
    const dispatch = useDispatch();

    useEffect(() =>{
        if(successPay){
            props.history.push("/profile");
        } else{
            dispatch(detailsOrder(props.match.params.id));
        }
        return () => {

        };

    },[successPay]);
    
        const handlerSuccessPayment = (paymentResult) => {
            dispatch(payOrder(order,paymentResult));
        }

        const orderDetails = useSelector(state=>state.orderDetails);
        const {loading,order,error} = orderDetails;
        
    return loading ? <div>Loading...</div> : error ? <div>{error}</div>:
     <div>
    <Header {...props}/>
   <div className="cart-main">
   <div className="cart-list">
       <div className="shipping-info">
           <h3>Shipping Address</h3>
           {order.shipping.address},
           {order.shipping.city},
           {order.shipping.postalcode},
           {order.shipping.country}
       </div>
       <div>
           {order.isDelivered ? "Delivered At " + order.deliveredAt : "Not Delivered."}
       </div>
       <div className="payment-info">
           <h3>Payment Method</h3>
           {order.payment.paymentMethod}
       </div>
       <div>
           {order.isPaid ? "Paid At" + order.paidAt : "Not Paid"}
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
                           
            { order.orderItems.map(item =><tbody key={item.product}><tr >
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
            
            <ul>
                <li>
                    {loadingPay && <div>Finishing Payment...</div>}
                    {!order.isPaid && 
                    <PaypalButton
                    amount = {order.totalprice}
                    onSuccess = {handlerSuccessPayment} 
                    />

                    }
                </li>
                <li>
                <h3>
                    Order Summary
                </h3>
                </li>
                <li>
                    <div>SubTotal:</div>
                    <div>{order.itemprice}</div>
                </li>
                <li>
                    <div>Shipping:</div>
                    <div>{order.shippingprice}</div>
                </li>
                <li>
                    <div>Tax:</div>
                    <div>{order.taxprice}</div>
                </li>
                <li  className="order-total">
                    <div>Order Total:</div>
                    <div>{order.totalprice}</div>
                </li>
            </ul>
    </div>
    </div>
    
   <Footer />
</div>


 }

 export default Order