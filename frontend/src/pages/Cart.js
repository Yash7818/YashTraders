import React,{useEffect}  from 'react';
import Footer from './Footer';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import  {addtoCart,removefromcart} from '../actions/cartactions';
import { Link } from 'react-router-dom';

function Cart(props){
    const cart  = useSelector(state=> state.cart);
    const {cartItems} = cart;
    const userSignin = useSelector(state=>state.userSignin)
	const {userInfo} = userSignin;
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();
    const removefromcarthandler = (productId) =>{
        dispatch(removefromcart(productId));
    }
    const checkoutHandler = () =>{
        props.history.push('/shipping');
    }
    useEffect(()=>{
        if(productId){
            dispatch(addtoCart(productId,qty))
        }
    },[dispatch,productId,qty])
    return <div>
    <Header {...props}/>
    <div className="cart-main">
    
        <div className="cart-list">
        <h3 className="tittle-w3l">Shopping cart
					<span className="heading-style">
						<i></i>
						<i></i>
						<i></i>
					</span>
				</h3>
            <div className="cart-list-container">
            <table className="dusra-container" >
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Qty</th>
                                        <th>Action</th>
                                        <th>Price</th>

                                    </tr>
                                </thead>
                                <tbody>
                {
                    cartItems.length === 0 ?
                    <div>
                        Cart is Empty
                    </div>
                    :
                    cartItems.map(item =><tr key={item.product}>
                                    <td className="cart-image">
                                        <img src={item.image} alt="product"></img>
                                    </td>
                                    <td className="cart-name">
                                        <Link to={"/single/"+item.product}>{item.name}</Link>
                                    </td>
                                    <td className="cart-select">
                                        <select value={item.qty} onChange={(e) => dispatch(addtoCart(item.product,e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(x =>
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            )}
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={()=>removefromcarthandler(item.product)}>
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <div className="cart-price">
                                             {item.price}
                                        </div>
                                    </td>
                                </tr>
                           
                    )
                }
                 </tbody>   
                        </table>
            </div>

        </div>
        <div className="cart-action">
                
                   <h3> Subtotal ( {cartItems.reduce((a, c)=>a + parseFloat(c.qty),0) } items):&nbsp;{cartItems.reduce((a, c)=> a+c.price * c.qty ,0)}</h3>
                {
                    userInfo? <button className="button" onClick={checkoutHandler} disabled={cartItems.length===0} >
                    Proceed to checkout
                </button>: <button className="button" disabled={cartItems.length===0} data-toggle="modal" data-target="#myModal1" >
                    Proceed to checkout
                </button>
               
                }
        </div>
    </div>
    <div className="modal fade" id="myModal1" tabIndex="-1" role="dialog">
				<div className="modal-dialog">
					
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
						</div>
						<div className="modal-body modal-body-sub_agile">
							<div className="main-mailposi">
								<span className="fa fa-envelope-o" aria-hidden="true"></span>
							</div>
							<div className="modal_body_left modal_body_left1">
								<h3 className="agileinfo_sign">Sign In </h3>
								<p>
									Sign In now, Let's start your Grocery Shopping. Don't have an account?
									<a href="#" data-toggle="modal" data-target="#myModal2">
										Sign Up Now</a>
								</p>
								<form action="#" method="post">
									<div className="styled-input agile-styled-input-top">
										<input type="text" placeholder="User Name" name="Name" required="" />
									</div>
									<div className="styled-input">
										<input type="password" placeholder="Password" name="password" required="" />
									</div>
									<input type="submit" value="Sign In" />
								</form>
								<div className="clearfix"></div>
							</div>
							<div className="clearfix"></div>
						</div>
					</div>
					
				</div>
			</div>
    <Footer />
    </div>
}

export default Cart;