import React, { useState } from 'react';
import Header from './Header';
import Checkoutsteps from '../components/shippingstats';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { savePayments } from '../actions/cartactions';


function Payment(props){
const [paymentMethod,setPaymentMethod] = useState('');
const dispatch = useDispatch();
const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(savePayments({paymentMethod}));
    props.history.push('/placeorder');
}
    return <div className="singh">
    <Header {...props} />
    <Checkoutsteps step1 step2 step3></Checkoutsteps>
   <div className="division-container">
<form onSubmit={submitHandler}>
   <div className="payment-container">
       <div className="payment-method">
           <input type="radio" name="payment" value="paypal" onChange={(e) => setPaymentMethod(e.target.value )} />
           <label htmlFor="paymentMethods" className="label-payment">
            Paypal
           </label>
       </div>
       <input type="submit" value="continue"></input>
   </div>
</form>
</div>
<Footer />
</div>
}

export default Payment;