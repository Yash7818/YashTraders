import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Single from './pages/Single';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Shipping from './pages/Shipping';
import Payment from './pages/payment';
import PlaceOrder from './pages/placeOrder';
import Order from './pages/order';
import Orders from './pages/orders';
import Profile from './pages/profile';
import Special from './pages/SpecialOffer';
function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={Home}></Route>
      <Route path="/single/:id" exact={true} component={Single}></Route>
      <Route path="/cart/:id?" component={Cart}></Route>
      <Route path="/products" component={Product}></Route>
      <Route path="/shipping" component={Shipping}></Route>
      <Route path="/payment" component={Payment}></Route>
      <Route path="/placeorder" component={PlaceOrder}></Route>
      <Route path="/order/:id" component={Order}></Route>
      <Route path="/orders" component={Orders}></Route>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/specialoffer" component = {Special}></Route>
    </Router>
  );
}
export default App;