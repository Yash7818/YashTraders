import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartactions';
import Checkoutsteps from '../components/shippingstats';

function Shipping(props){
    const [address,setAddress] = useState('');
    const [postalcode,setPostalcode] = useState('');
    const [city,setCity] = useState('');
    const [country,setCountry] = useState('');
    const [landmark,setLandmark] = useState('');
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShipping({address,postalcode,city,country,landmark}));
        props.history.push('/payment');
    }
   

    return <div className="singh">
         <Header {...props} />
         <Checkoutsteps step1 step2></Checkoutsteps>
        <div className="divi-container">
    <form onSubmit={submitHandler}>
        <div className="product-container">
            <div>
                <input type="text" name="name"  required onChange={(e) => setAddress(e.target.value )}></input>
                <label>Address</label>
            </div>
            <div>
                <input type="text" name="category" required onChange={(e) => setLandmark(e.target.value)}></input>
                <label>Landmark</label>
            </div>
            <div>
                <input type="text" name="countInStock"  required onChange={(e) => setCity(e.target.value)}></input>
                <label>City</label>
            </div>
            <div>
                <input type="text" name="price"  required onChange={(e) => setPostalcode(e.target.value)}></input>
                <label>Postal-code</label>
            </div>
            <div>
                <input type="text" name="image"  required onChange={(e) => setCountry(e.target.value)}></input>
                <label>Country </label>
            </div>
            <input type="submit" value="continue"></input>
        </div>
    </form>
    </div>
    <Footer />
    </div>
}

export default Shipping;