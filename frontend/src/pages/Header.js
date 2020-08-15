import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin, register } from '../actions/useractions';
// import {userSignin} from '../store';
// import {withRouter} from 'react-router-dom';

function Header(props)  {
	const [modalVisible, setModalVisible] = useState(false);
	const cart  = useSelector(state=> state.cart);
    const {cartItems} = cart;
	const [email,setEmail] = useState('');
	const [password , setPassword] = useState('');
	const [name,setName] = useState('');
	const [rePassword,setRepassword] = useState('')
	// const [isModalOpen, setModalStatus] = useState(false);
	const userSignin = useSelector(state=>state.userSignin)
	const {loading,userInfo,error} = userSignin;
	const userRegister = useSelector(state=>state.userRegister);
	const {loading2,userInfo2,error2} = userRegister;
	const dispatch = useDispatch();
	const redirect = props.location.search?props.location.search.split("=")[1]:'/';
	// console.log(redirect)
	useEffect(() =>{
		if(userInfo){
			// props.history.push(redirect);
		}
		return () => {
			// 
		};
	},[userInfo]);
	
		const submithandler = (e) =>{
			e.preventDefault();
			dispatch(signin(email,password));
			
		}
		const registerhandler = (e) =>{
			e.preventDefault();
			dispatch(register(name,email,password));
		}
	    return <div className="row ">
	        <div className="medium-12 columns">
            <div className="header-most-top">
				<p>Grocery Offer Zone Top Deals & Discounts</p>
			</div>
			<div className="header-bot">
				<div className="header-bot_inner_wthreeinfo_header_mid">
					<div className="col-md-4 logo_agile">
						<h1>
							<Link to="/">
								<img src="/images/favicon.ico" alt="yash traders" />
							</Link>
						</h1>
					</div>
					<div className="col-md-8 header">
						<ul>
							
							<li>
								<a href="#" data-toggle="modal" data-target="#myModal1">
									<span className="fa fa-truck" aria-hidden="true"></span>Track Order</a>
							</li>
							<li>
								<span className="fa fa-phone" aria-hidden="true"></span> 9130537437
							</li>
							<li>
								<a href="#" data-toggle="modal" data-target="#myModal2">
									<span className="fa fa-pencil-square-o" aria-hidden="true"></span> Sign Up </a>
							</li>
							<li>
								{
									userInfo ? <Link to="/profile" className="profile-name">{userInfo.name}</Link>:<a  data-toggle="modal" data-target="#myModal1">
									<span className="fa fa-unlock-alt" aria-hidden="true"></span> Sign In </a>
								}
							</li>
							
						</ul>
						
						<div className="agileits_search"  >
							<form action="#" method="post">
								<input name="Search" type="search" placeholder="How can we help you today?" required=""  />
								<button type="submit" className="btn btn-default" aria-label="Left Align">
									<span className="fa fa-search fa-2x" aria-hidden="true"> </span>
								</button>
							</form>
						</div>
						
						<div className="top_nav_right">
							<div className="wthreecartaits wthreecartaits2 cart cart box_1">
								{/* <form action="#" method="post" className="last">
									<input type="hidden" name="cmd" value="_cart" />
									<input type="hidden" name="display" value="1" /> */}
									<Link to="/cart">
									<button className="w3view-cart" type="submit" name="submit" value="">
										<i className="fa fa-cart-arrow-down fa-2x" aria-hidden="true"></i>
										{
											cartItems!=0?<span className="cart-span-basket">{cartItems.reduce((a, c)=>a + parseFloat(c.qty),0) }
										</span>:<span></span>
										}
									</button>
									</Link>
								{/* </form> */}
							</div>
						</div>
						
						<div className="clearfix"></div>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
			
			 <div className="modal fade" id="myModal1" tabIndex="-1" role="dialog">
				<div className="modal-dialog">
					
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" >&times;</button>
						</div>
						<div className="modal-body modal-body-sub_agile">
							{!userInfo&&<div className="main-mailposi">
								<span className="fa fa-envelope-o" aria-hidden="true"></span>
							</div>
							}
							<div className="modal_body_left modal_body_left1">
							{userInfo ?<div className="after-signin"><img src="/images/tick.png"></img></div>:
							<div>
								<h3 className="agileinfo_sign">Sign In </h3>
								{loading && <div>Loading...</div>}
								{error && <div>{error}</div>}
								<p>
									Sign In now, Let's start your Grocery Shopping.<br /> Don't have an account?
									<a href="#" data-toggle="modal" data-target="#myModal2" data-dismiss="modal">
										Sign Up Now</a>
								</p>
							<form onSubmit={submithandler}>
									<div className="styled-input agile-styled-input-top">
										<input type="email" placeholder="User Name" name="Name" required="" onChange={(e) => setEmail(e.target.value)}/>
									</div>
									<div className="styled-input">
										<input type="password" placeholder="Password" name="password" required="" onChange={(e) => setPassword(e.target.value)} />
									</div>
									<input type="submit" value="Sign In" />
								</form>
								
								<div className="clearfix"></div>
								</div>
							}
							</div>
							<div className="clearfix"></div>
								
						</div>
								
					</div>
					
				</div>
			</div>
			<div className="modal fade" id="myModal2" tabIndex="-1" role="dialog">
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
								<h3 className="agileinfo_sign">Sign Up</h3>
								{loading2 && <div>Loading...</div>}
								{error2 && <div>{error2}</div>}
								<p>
									Come join Yash Traders! Let's set up your Account.
								</p>
								<form onSubmit={registerhandler}>
									<div className="styled-input agile-styled-input-top">
										<input type="text" placeholder="Name" name="Name" required=""  onChange={(e) => setName(e.target.value)}/>
									</div>
									<div className="styled-input">
										<input type="email" placeholder="E-mail" name="Email" required=""  onChange={(e) => setEmail(e.target.value)}/>
									</div>
									<div className="styled-input">
										<input type="password" placeholder="Password" name="password" id="password1" required="" onChange={(e) => setPassword(e.target.value)} />
									</div>
									<div className="styled-input">
										<input type="password" placeholder="Confirm Password" name="Confirm Password" id="password2" required=""  onChange={(e) => setRepassword(e.target.value)}/>
									</div>
									<input type="submit" value="Sign Up" id="signupbut" />
								</form>
								{userInfo2 && <div>Welcome!! to our Community.</div>}
								<p>
									<a href="#">By clicking register, I agree to your terms</a>
								</p>
							</div>
						</div>
					</div>
					
				</div>
			</div>
			<div className="ban-top">
		<div className="container">
			<div className="agileits-navi_search">
				<form action="#" method="post">
					<select id="agileinfo-nav_search" name="agileinfo_search" required="">
						<option value="">All Categories</option>
						<option value="Kitchen">Kitchen</option>
						<option value="Household">Household</option>
						<option value="Snacks &amp; Beverages">Snacks & Beverages</option>
						<option value="Personal Care">Personal Care</option>
						<option value="Gift Hampers">Gift Hampers</option>
						<option value="Fruits &amp; Vegetables">Fruits & Vegetables</option>
						<option value="Baby Care">Baby Care</option>
						<option value="Soft Drinks &amp; Juices">Soft Drinks & Juices</option>
						<option value="Frozen Food">Frozen Food</option>
						<option value="Bread &amp; Bakery">Bread & Bakery</option>
					</select>
				</form>
			</div>
			<div className="top_nav_left">
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
							    aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						</div>
						
						<div className="collapse navbar-collapse menu--shylock" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav menu__list">
								<li className="active">
									<a className="nav-stylehead" href="index.html">Home
										<span className="sr-only">(current)</span>
									</a>
								</li>
								<li className="">
									<a className="nav-stylehead" href="about.html">About Us</a>
								</li>
								<li className="dropdown">
									<a href="#" className="dropdown-toggle nav-stylehead" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Kitchen
										<span className="caret"></span>
									</a>
									<ul className="dropdown-menu multi-column columns-3">
										<div className="agile_inner_drop_nav_info">
											<div className="col-sm-4 multi-gd-img">
												<ul className="multi-column-dropdown">
													<li>
														<a href="product.html">Bakery</a>
													</li>
													<li>
														<a href="product.html">Baking Supplies</a>
													</li>
													<li>
														<a href="product.html">Coffee, Tea & Beverages</a>
													</li>
													<li>
														<a href="product.html">Dried Fruits, Nuts</a>
													</li>
													<li>
														<a href="product.html">Sweets, Chocolate</a>
													</li>
													<li>
														<a href="product.html">Spices & Masalas</a>
													</li>
													<li>
														<a href="product.html">Jams, Honey & Spreads</a>
													</li>
												</ul>
											</div>
											<div className="col-sm-4 multi-gd-img">
												<ul className="multi-column-dropdown">
													<li>
														<a href="product.html">Pickles</a>
													</li>
													<li>
														<a href="product.html">Pasta & Noodles</a>
													</li>
													<li>
														<a href="product.html">Rice, Flour & Pulses</a>
													</li>
													<li>
														<a href="product.html">Sauces & Cooking Pastes</a>
													</li>
													<li>
														<a href="product.html">Snack Foods</a>
													</li>
													<li>
														<a href="product.html">Oils, Vinegars</a>
													</li>
													<li>
														<a href="product.html">Meat, Poultry & Seafood</a>
													</li>
												</ul>
											</div>
											<div className="col-sm-4 multi-gd-img">
												<img src="images/nav.png" alt="" />
											</div>
											<div className="clearfix"></div>
										</div>
									</ul>
								</li>
								<li className="dropdown">
									<a href="#" className="dropdown-toggle nav-stylehead" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Household
										<span className="caret"></span>
									</a>
									<ul className="dropdown-menu multi-column columns-3">
										<div className="agile_inner_drop_nav_info">
											<div className="col-sm-6 multi-gd-img">
												<ul className="multi-column-dropdown">
													<li>
														<a href="product2.html">Kitchen & Dining</a>
													</li>
													<li>
														<a href="product2.html">Detergents</a>
													</li>
													<li>
														<a href="product2.html">Utensil Cleaners</a>
													</li>
													<li>
														<a href="product2.html">Floor & Other Cleaners</a>
													</li>
													<li>
														<a href="product2.html">Disposables, Garbage Bag</a>
													</li>
													<li>
														<a href="product2.html">Repellents & Fresheners</a>
													</li>
													<li>
														<a href="product2.html"> Dishwash</a>
													</li>
												</ul>
											</div>
											<div className="col-sm-6 multi-gd-img">
												<ul className="multi-column-dropdown">
													<li>
														<a href="product2.html">Pet Care</a>
													</li>
													<li>
														<a href="product2.html">Cleaning Accessories</a>
													</li>
													<li>
														<a href="product2.html">Pooja Needs</a>
													</li>
													<li>
														<a href="product2.html">Crackers</a>
													</li>
													<li>
														<a href="product2.html">Festive Decoratives</a>
													</li>
													<li>
														<a href="product2.html">Plasticware</a>
													</li>
													<li>
														<a href="product2.html">Home Care</a>
													</li>
												</ul>
											</div>
											<div className="clearfix"></div>
										</div>
									</ul>
								</li>
								<li className="">
									<a className="nav-stylehead" href="faqs.html">Faqs</a>
								</li>
								
								<li className="">
									<a className="nav-stylehead" href="contact.html">Contact</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</div>
	</div>
	<div className="page-head_agile_info_w3l">

	</div>
	<div className="services-breadcrumb">
		<div className="agile_inner_breadcrumb">
			<div className="container">
				<ul className="w3_short">
					<li>
						<a href="index.html">Home</a>
						<i>|</i>
					</li>
					<li>Product</li>
				</ul>
			</div>
		</div>
	</div>
	
            </div>
        </div>  
	    
}
export default Header;