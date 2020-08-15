import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productactions';
import { signin, register } from '../actions/useractions';
function Home(props){
	// const [products, setProduct] = useState( [] );
	const productList = useSelector(state => state.productList);
	const {products,loading,error} = productList;
	const cart  = useSelector(state=> state.cart);
    const {cartItems} = cart;
	const [email,setEmail] = useState('');
	const [password , setPassword] = useState('');
	const [name,setName] = useState('');
	const [rePassword,setRepassword] = useState('')
	// const [isModalOpen, setModalStatus] = useState(false);
	const userSignin = useSelector(state=>state.userSignin)
	const {loading : loading1,userInfo,error : error1} = userSignin;
	const userRegister = useSelector(state=>state.userRegister);
	const {loading2,userInfo2,error2} = userRegister;

	const dispatch = useDispatch();
		useEffect(()=>{
			dispatch(listProducts());
			return () =>{
				//
			};
		},[userInfo])
		const submithandler = (e) =>{
			e.preventDefault();
			dispatch(signin(email,password));
			
		}
		const registerhandler = (e) =>{
			e.preventDefault();
			dispatch(register(name,email,password));
		}
		// console.log(products)
			
		return loading? <div><img src="../images/preloader.gif"></img></div>:
		error? <div>{error}</div>:
		<div className="row ">
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
							<div className="main-mailposi">
								<span className="fa fa-envelope-o" aria-hidden="true"></span>
							</div>
							<div className="modal_body_left modal_body_left1">
							{userInfo ?<div className="after-signin">
								<img src="../public/images/tick.png"></img>
							</div>:
							<div>
								<h3 className="agileinfo_sign">Sign In </h3>
								{loading1 && <div>Loading...</div>}
								{error1 && <div>{error1}</div>}
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
	<div id="myCarousel" className="carousel slide" data-ride="carousel">
		<ol className="carousel-indicators">
			<li data-target="#myCarousel" data-slide-to="0" className="active"></li>
			<li data-target="#myCarousel" data-slide-to="1" className=""></li>
			<li data-target="#myCarousel" data-slide-to="2" className=""></li>
			<li data-target="#myCarousel" data-slide-to="3" className=""></li>
		</ol>
		<div className="carousel-inner" role="listbox">
			<div className="item active">
				<div className="container">
					<div className="carousel-caption">
						<h3>Big
							<span>Save</span>
						</h3>
						<p>Get flat
							<span>10%</span> Cashback</p>
						<a className="button2" href="product.html">Shop Now </a>
					</div>
				</div>
			</div>
			<div className="item item2">
				<div className="container">
					<div className="carousel-caption">
						<h3>Healthy
							<span>Saving</span>
						</h3>
						<p>Get Upto
							<span>30%</span> Off</p>
						<a className="button2" href="product.html">Shop Now </a>
					</div>
				</div>
			</div>
			<div className="item item3">
				<div className="container">
					<div className="carousel-caption">
						<h3>Big
							<span>Deal</span>
						</h3>
						<p>Get Best Offer Upto
							<span>20%</span>
						</p>
						<a className="button2" href="product.html">Shop Now </a>
					</div>
				</div>
			</div>
			<div className="item item4">
				<div className="container">
					<div className="carousel-caption">
						<h3>Today
							<span>Discount</span>
						</h3>
						<p>Get Now
							<span>40%</span> Discount</p>
						<a className="button2" href="product.html">Shop Now </a>
					</div>
				</div>
			</div>
		</div>
		<a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
			<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			<span className="sr-only">Previous</span>
		</a>
		<a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
			<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			<span className="sr-only">Next</span>
		</a>
	</div>
	<div className="ads-grid">
		<div className="container">
			
			<h3 className="tittle-w3l">Our Top Products
				<span className="heading-style">
					<i></i>
					<i></i>
					<i></i>
				</span>
			</h3>
			
			<div className="side-bar col-md-3">
				<div className="search-hotel">
					<h3 className="agileits-sear-head">Search For Product</h3>
					<form action="product.html" method="post">
						<input type="search" placeholder="Product name..." name="search" required="" />
						<input type="submit" value=" " />
					</form>
				</div>
				
				<div className="range">
					<h3 className="agileits-sear-head">Price range</h3>
					<ul className="dropdown-menu6">
						<li>

							<div id="slider-range"></div>
							<input type="text" id="amount"  />
						</li>
					</ul>
				</div>

				<div className="customer-rev left-side">
					<h3 className="agileits-sear-head">Customer Review</h3>
					<ul>
						<li>
							<a href="#">
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<span>5.0</span>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star-o" aria-hidden="true"></i>
								<span>4.0</span>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star-half-o" aria-hidden="true"></i>
								<i className="fa fa-star-o" aria-hidden="true"></i>
								<span>3.5</span>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star-o" aria-hidden="true"></i>
								<i className="fa fa-star-o" aria-hidden="true"></i>
								<span>3.0</span>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star-half-o" aria-hidden="true"></i>
								<i className="fa fa-star-o" aria-hidden="true"></i>
								<i className="fa fa-star-o" aria-hidden="true"></i>
								<span>2.5</span>
							</a>
						</li>
					</ul>
				</div>
				<div className="deal-leftmk left-side">
				
					<h3 className="agileits-sear-head">Special Deals</h3>
					{
							products.map(product =>
								<div className="special-sec1" key={product._id}>
							<div className="col-xs-4 img-deals">
							<Link to={'/single/'+product._id}><img src={product.image} alt="" /></Link>
							</div>
							<div className="col-xs-8 img-deal1">
							<h3>{product.name}</h3>
							<Link to={'/single/'+product._id}>{product.price}</Link>
							</div>
							<div className="clearfix"></div>
						</div>
						)
					}
				</div>
				
			</div>
			
			<div className="agileinfo-ads-display col-md-9">
				<div className="wrapper">
				
					<div className="product-sec1">
						<h3 className="heading-tittle">Nuts</h3>
						<div className="col-md-4 product-men">
							<div className="men-pro-item simpleCart_shelfItem">
								<div className="men-thumb-item">
									<img src="/images/m1.jpg" alt="" />
									<div className="men-cart-pro">
										<div className="inner-men-cart-pro">
											<a href="single.html" className="link-product-add-cart">Quick View</a>
										</div>
									</div>
									<span className="product-new-top">New</span>
								</div>
								<div className="item-info-product ">
									<h4>
										<a href="single.html">Almonds, 100g</a>
									</h4>
									<div className="info-product-price">
										<span className="item_price">149.00</span>
										<del>280.00</del>
									</div>
									<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
										<form action="#" method="post">
											<fieldset>
												<input type="hidden" name="cmd" value="_cart" />
												<input type="hidden" name="add" value="1" />
												<input type="hidden" name="business" value=" " />
												<input type="hidden" name="item_name" value="Almonds, 100g" />
												<input type="hidden" name="amount" value="149.00" />
												<input type="hidden" name="discount_amount" value="1.00" />
												<input type="hidden" name="currency_code" value="USD" />
												<input type="hidden" name="return" value=" " />
												<input type="hidden" name="cancel_return" value=" " />
												<input type="submit" name="submit" value="Add to cart" className="button" />
											</fieldset>
										</form>
									</div>

								</div>
							</div>
						</div>
						<div className="col-md-4 product-men">
							<div className="men-pro-item simpleCart_shelfItem">
								<div className="men-thumb-item">
									<img src="images/m2.jpg" alt="" />
									<div className="men-cart-pro">
										<div className="inner-men-cart-pro">
											<a href="single.html" className="link-product-add-cart">Quick View</a>
										</div>
									</div>
									<span className="product-new-top">New</span>

								</div>
								<div className="item-info-product ">
									<h4>
										<a href="single.html">Cashew Nuts, 100g</a>
									</h4>
									<div className="info-product-price">
										<span className="item_price">200.00</span>
										<del>420.00</del>
									</div>
									<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
										<form action="#" method="post">
											<fieldset>
												<input type="hidden" name="cmd" value="_cart" />
												<input type="hidden" name="add" value="1" />
												<input type="hidden" name="business" value=" " />
												<input type="hidden" name="item_name" value="Cashew Nuts, 100g" />
												<input type="hidden" name="amount" value="200.00" />
												<input type="hidden" name="discount_amount" value="1.00" />
												<input type="hidden" name="currency_code" value="USD" />
												<input type="hidden" name="return" value=" " />
												<input type="hidden" name="cancel_return" value=" " />
												<input type="submit" name="submit" value="Add to cart" className="button" />
											</fieldset>
										</form>
									</div>

								</div>
							</div>
						</div>
						<div className="col-md-4 product-men">
							<div className="men-pro-item simpleCart_shelfItem">
								<div className="men-thumb-item">
									<img src="images/m3.jpg" alt="" />
									<div className="men-cart-pro">
										<div className="inner-men-cart-pro">
											<a href="single.html" className="link-product-add-cart">Quick View</a>
										</div>
									</div>
									<span className="product-new-top">New</span>

								</div>
								<div className="item-info-product ">
									<h4>
										<a href="single.html">Pista..., 250g</a>
									</h4>
									<div className="info-product-price">
										<span className="item_price">520.99</span>
										<del>600.99</del>
									</div>
									<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
										<form action="#" method="post">
											<fieldset>
												<input type="hidden" name="cmd" value="_cart" />
												<input type="hidden" name="add" value="1" />
												<input type="hidden" name="business" value=" " />
												<input type="hidden" name="item_name" value="Pista, 250g" />
												<input type="hidden" name="amount" value="520.99" />
												<input type="hidden" name="discount_amount" value="1.00" />
												<input type="hidden" name="currency_code" value="USD" />
												<input type="hidden" name="return" value=" " />
												<input type="hidden" name="cancel_return" value=" " />
												<input type="submit" name="submit" value="Add to cart" className="button" />
											</fieldset>
										</form>
									</div>

								</div>
							</div>
						</div>
						<div className="clearfix"></div>
					</div>
			
					<div className="product-sec1 product-sec2">
						<div className="col-xs-7 effect-bg">
							<h3 className="">Pure Energy</h3>
							<h6>Enjoy our all healthy Products</h6>
							<p>Get Extra 10% Off</p>
						</div>
						<h3 className="w3l-nut-middle">Nuts & Dry Fruits</h3>
						<div className="col-xs-5 bg-right-nut">
							<img src="images/nut1.png" alt="" />
						</div>
						<div className="clearfix"></div>
					</div>
				
					<div className="product-sec1">
						<h3 className="heading-tittle">Oils</h3>
						<div className="col-md-4 product-men">
							<div className="men-pro-item simpleCart_shelfItem">
								<div className="men-thumb-item">
									<img src="images/mk4.jpg" alt="" />
									<div className="men-cart-pro">
										<div className="inner-men-cart-pro">
											<a href="single.html" className="link-product-add-cart">Quick View</a>
										</div>
									</div>
									<span className="product-new-top">New</span>
								</div>
								<div className="item-info-product ">
									<h4>
										<a href="single.html">Freedom Oil, 1L</a>
									</h4>
									<div className="info-product-price">
										<span className="item_price">78.00</span>
										<del>110.00</del>
									</div>
									<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
										<form action="#" method="post">
											<fieldset>
												<input type="hidden" name="cmd" value="_cart" />
												<input type="hidden" name="add" value="1" />
												<input type="hidden" name="business" value=" " />
												<input type="hidden" name="item_name" value="Freedom Sunflower Oil, 1L" />
												<input type="hidden" name="amount" value="78.00" />
												<input type="hidden" name="discount_amount" value="1.00" />
												<input type="hidden" name="currency_code" value="USD" />
												<input type="hidden" name="return" value=" " />
												<input type="hidden" name="cancel_return" value=" " />
												<input type="submit" name="submit" value="Add to cart" className="button" />
											</fieldset>
										</form>
									</div>

								</div>
							</div>
						</div>
						<div className="col-md-4 product-men">
							<div className="men-pro-item simpleCart_shelfItem">
								<div className="men-thumb-item">
									<img src="images/mk5.jpg" alt="" />
									<div className="men-cart-pro">
										<div className="inner-men-cart-pro">
											<a href="single.html" className="link-product-add-cart">Quick View</a>
										</div>
									</div>
									<span className="product-new-top">New</span>

								</div>
								<div className="item-info-product ">
									<h4>
										<a href="single.html">Saffola Gold, 1L</a>
									</h4>
									<div className="info-product-price">
										<span className="item_price">130.00</span>
										<del>150.00</del>
									</div>
									<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
										<form action="#" method="post">
											<fieldset>
												<input type="hidden" name="cmd" value="_cart" />
												<input type="hidden" name="add" value="1" />
												<input type="hidden" name="business" value=" " />
												<input type="hidden" name="item_name" value="Saffola Gold, 1L" />
												<input type="hidden" name="amount" value="130.00" />
												<input type="hidden" name="discount_amount" value="1.00" />
												<input type="hidden" name="currency_code" value="USD" />
												<input type="hidden" name="return" value=" " />
												<input type="hidden" name="cancel_return" value=" " />
												<input type="submit" name="submit" value="Add to cart" className="button" />
											</fieldset>
										</form>
									</div>

								</div>
							</div>
						</div>
						<div className="col-md-4 product-men">
							<div className="men-pro-item simpleCart_shelfItem">
								<div className="men-thumb-item">
									<img src="images/mk6.jpg" alt="" />
									<div className="men-cart-pro">
										<div className="inner-men-cart-pro">
											<a href="single.html" className="link-product-add-cart">Quick View</a>
										</div>
									</div>
									<span className="product-new-top">New</span>

								</div>
								<div className="item-info-product ">
									<h4>
										<a href="single.html">Fortune Oil, 5L</a>
									</h4>
									<div className="info-product-price">
										<span className="item_price">399.99</span>
										<del>500.00</del>
									</div>
									<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
										<form action="#" method="post">
											<fieldset>
												<input type="hidden" name="cmd" value="_cart" />
												<input type="hidden" name="add" value="1" />
												<input type="hidden" name="business" value=" " />
												<input type="hidden" name="item_name" value="Fortune Oil, 5L" />
												<input type="hidden" name="amount" value="399.99" />
												<input type="hidden" name="discount_amount" value="1.00" />
												<input type="hidden" name="currency_code" value="USD" />
												<input type="hidden" name="return" value=" " />
												<input type="hidden" name="cancel_return" value=" " />
												<input type="submit" name="submit" value="Add to cart" className="button" />
											</fieldset>
										</form>
									</div>

								</div>
							</div>
						</div>
						<div className="clearfix"></div>
					</div>
				
					<div className="product-sec1">
						<h3 className="heading-tittle">Pasta & Noodles</h3>
						<div className="col-md-4 product-men">
							<div className="men-pro-item simpleCart_shelfItem">
								<div className="men-thumb-item">
									<img src="images/mk7.jpg" alt="" />
									<div className="men-cart-pro">
										<div className="inner-men-cart-pro">
											<a href="single.html" className="link-product-add-cart">Quick View</a>
										</div>
									</div>
								</div>
								<div className="item-info-product ">
									<h4>
										<a href="single.html">Yippee Noodles, 65g</a>
									</h4>
									<div className="info-product-price">
										<span className="item_price">15.00</span>
										<del>25.00</del>
									</div>
									<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
										<form action="#" method="post">
											<fieldset>
												<input type="hidden" name="cmd" value="_cart" />
												<input type="hidden" name="add" value="1" />
												<input type="hidden" name="business" value=" " />
												<input type="hidden" name="item_name" value="YiPPee Noodles, 65g" />
												<input type="hidden" name="amount" value="15.00" />
												<input type="hidden" name="discount_amount" value="1.00" />
												<input type="hidden" name="currency_code" value="USD" />
												<input type="hidden" name="return" value=" " />
												<input type="hidden" name="cancel_return" value=" " />
												<input type="submit" name="submit" value="Add to cart" className="button" />
											</fieldset>
										</form>
									</div>

								</div>
							</div>
						</div>
						<div className="col-md-4 product-men">
							<div className="men-pro-item simpleCart_shelfItem">
								<div className="men-thumb-item">
									<img src="images/mk8.jpg" alt="" />
									<div className="men-cart-pro">
										<div className="inner-men-cart-pro">
											<a href="single.html" className="link-product-add-cart">Quick View</a>
										</div>
									</div>
									<span className="product-new-top">New</span>

								</div>
								<div className="item-info-product ">
									<h4>
										<a href="single.html">Wheat Pasta, 500g</a>
									</h4>
									<div className="info-product-price">
										<span className="item_price">98.00</span>
										<del>120.00</del>
									</div>
									<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
										<form action="#" method="post">
											<fieldset>
												<input type="hidden" name="cmd" value="_cart" />
												<input type="hidden" name="add" value="1" />
												<input type="hidden" name="business" value=" " />
												<input type="hidden" name="item_name" value="Wheat Pasta, 500g" />
												<input type="hidden" name="amount" value="98.00" />
												<input type="hidden" name="discount_amount" value="1.00" />
												<input type="hidden" name="currency_code" value="USD" />
												<input type="hidden" name="return" value=" " />
												<input type="hidden" name="cancel_return" value=" " />
												<input type="submit" name="submit" value="Add to cart" className="button" />
											</fieldset>
										</form>
									</div>

								</div>
							</div>
						</div>
						<div className="col-md-4 product-men">
							<div className="men-pro-item simpleCart_shelfItem">
								<div className="men-thumb-item">
									<img src="images/mk9.jpg" alt="" />
									<div className="men-cart-pro">
										<div className="inner-men-cart-pro">
											<a href="single.html" className="link-product-add-cart">Quick View</a>
										</div>
									</div>
									<span className="product-new-top">New</span>

								</div>
								<div className="item-info-product ">
									<h4>
										<a href="single.html">Chinese Noodles, 68g</a>
									</h4>
									<div className="info-product-price">
										<span className="item_price">11.99</span>
										<del>15.00</del>
									</div>
									<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
										<form action="#" method="post">
											<fieldset>
												<input type="hidden" name="cmd" value="_cart" />
												<input type="hidden" name="add" value="1" />
												<input type="hidden" name="business" value=" " />
												<input type="hidden" name="item_name" value="Chinese Noodles, 68g" />
												<input type="hidden" name="amount" value="11.99" />
												<input type="hidden" name="discount_amount" value="1.00" />
												<input type="hidden" name="currency_code" value="USD" />
												<input type="hidden" name="return" value=" " />
												<input type="hidden" name="cancel_return" value=" " />
												<input type="submit" name="submit" value="Add to cart" className="button" />
											</fieldset>
										</form>
									</div>

								</div>
							</div>
						</div>
						<div className="clearfix"></div>
					</div>
				
				</div>
			</div>
			
		</div>
	</div>
	<div className="featured-section" id="projects">
		<div className="container">
			
			<h3 className="tittle-w3l">Special Offers
				<span className="heading-style">
					<i></i>
					<i></i>
					<i></i>
				</span>
			</h3>
			
			<div className="content-bottom-in">
				<ul id="flexiselDemo1">
					<li>
						<div className="w3l-specilamk">
							<div className="speioffer-agile">
								<a href="single.html">
									<img src="images/s1.jpg" alt="" />
								</a>
							</div>
							<div className="product-name-w3l">
								<h4>
									<a href="single.html">Aashirvaad, 5g</a>
								</h4>
								<div className="w3l-pricehkj">
									<h6>220.00</h6>
									<p>Save 40.00</p>
								</div>
								<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
									<form action="#" method="post">
										<fieldset>
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" />
											<input type="hidden" name="business" value=" " />
											<input type="hidden" name="item_name" value="Aashirvaad, 5g" />
											<input type="hidden" name="amount" value="220.00" />
											<input type="hidden" name="discount_amount" value="1.00" />
											<input type="hidden" name="currency_code" value="USD" />
											<input type="hidden" name="return" value=" " />
											<input type="hidden" name="cancel_return" value=" " />
											<input type="submit" name="submit" value="Add to cart" className="button" />
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div className="w3l-specilamk">
							<div className="speioffer-agile">
								<a href="single.html">
									<img src="images/s4.jpg" alt="" />
								</a>
							</div>
							<div className="product-name-w3l">
								<h4>
									<a href="single.html">Kissan Tomato Ketchup, 950g</a>
								</h4>
								<div className="w3l-pricehkj">
									<h6>99.00</h6>
									<p>Save 20.00</p>
								</div>
								<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
									<form action="#" method="post">
										<fieldset>
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" />
											<input type="hidden" name="business" value=" " />
											<input type="hidden" name="item_name" value="Kissan Tomato Ketchup, 950g" />
											<input type="hidden" name="amount" value="99.00" />
											<input type="hidden" name="discount_amount" value="1.00" />
											<input type="hidden" name="currency_code" value="USD" />
											<input type="hidden" name="return" value=" " />
											<input type="hidden" name="cancel_return" value=" " />
											<input type="submit" name="submit" value="Add to cart" className="button" />
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div className="w3l-specilamk">
							<div className="speioffer-agile">
								<a href="single.html">
									<img src="images/s2.jpg" alt="" />
								</a>
							</div>
							<div className="product-name-w3l">
								<h4>
									<a href="single.html">Madhur Pure Sugar, 1g</a>
								</h4>
								<div className="w3l-pricehkj">
									<h6>69.00</h6>
									<p>Save 20.00</p>
								</div>
								<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
									<form action="#" method="post">
										<fieldset>
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" />
											<input type="hidden" name="business" value=" " />
											<input type="hidden" name="item_name" value="Madhur Pure Sugar, 1g" />
											<input type="hidden" name="amount" value="69.00" />
											<input type="hidden" name="discount_amount" value="1.00" />
											<input type="hidden" name="currency_code" value="USD" />
											<input type="hidden" name="return" value=" " />
											<input type="hidden" name="cancel_return" value=" " />
											<input type="submit" name="submit" value="Add to cart" className="button" />
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div className="w3l-specilamk">
							<div className="speioffer-agile">
								<a href="single2.html">
									<img src="images/s3.jpg" alt="" />
								</a>
							</div>
							<div className="product-name-w3l">
								<h4>
									<a href="single2.html">Surf Excel Liquid, 1.02L</a>
								</h4>
								<div className="w3l-pricehkj">
									<h6>187.00</h6>
									<p>Save 30.00</p>
								</div>
								<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
									<form action="#" method="post">
										<fieldset>
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" />
											<input type="hidden" name="business" value=" " />
											<input type="hidden" name="item_name" value="Surf Excel Liquid, 1.02L" />
											<input type="hidden" name="amount" value="187.00" />
											<input type="hidden" name="discount_amount" value="1.00" />
											<input type="hidden" name="currency_code" value="USD" />
											<input type="hidden" name="return" value=" " />
											<input type="hidden" name="cancel_return" value=" " />
											<input type="submit" name="submit" value="Add to cart" className="button" />
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div className="w3l-specilamk">
							<div className="speioffer-agile">
								<a href="single.html">
									<img src="images/s8.jpg" alt="" />
								</a>
							</div>
							<div className="product-name-w3l">
								<h4>
									<a href="single.html">Cadbury Choclairs, 655.5g</a>
								</h4>
								<div className="w3l-pricehkj">
									<h6>160.00</h6>
									<p>Save 60.00</p>
								</div>
								<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
									<form action="#" method="post">
										<fieldset>
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" />
											<input type="hidden" name="business" value=" " />
											<input type="hidden" name="item_name" value="Cadbury Choclairs, 655.5g" />
											<input type="hidden" name="amount" value="160.00" />
											<input type="hidden" name="discount_amount" value="1.00" />
											<input type="hidden" name="currency_code" value="USD" />
											<input type="hidden" name="return" value=" " />
											<input type="hidden" name="cancel_return" value=" " />
											<input type="submit" name="submit" value="Add to cart" className="button" />
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div className="w3l-specilamk">
							<div className="speioffer-agile">
								<a href="single2.html">
									<img src="images/s6.jpg" alt="" />
								</a>
							</div>
							<div className="product-name-w3l">
								<h4>
									<a href="single2.html">Fair & Lovely, 80 g</a>
								</h4>
								<div className="w3l-pricehkj">
									<h6>121.60</h6>
									<p>Save 30.00</p>
								</div>
								<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
									<form action="#" method="post">
										<fieldset>
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" />
											<input type="hidden" name="business" value=" " />
											<input type="hidden" name="item_name" value="Fair & Lovely, 80 g" />
											<input type="hidden" name="amount" value="121.60" />
											<input type="hidden" name="discount_amount" value="1.00" />
											<input type="hidden" name="currency_code" value="USD" />
											<input type="hidden" name="return" value=" " />
											<input type="hidden" name="cancel_return" value=" " />
											<input type="submit" name="submit" value="Add to cart" className="button" />
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div className="w3l-specilamk">
							<div className="speioffer-agile">
								<a href="single.html">
									<img src="images/s5.jpg" alt="" />
								</a>
							</div>
							<div className="product-name-w3l">
								<h4>
									<a href="single.html">Sprite, 2.25L (Pack of 2)</a>
								</h4>
								<div className="w3l-pricehkj">
									<h6>180.00</h6>
									<p>Save 30.00</p>
								</div>
								<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
									<form action="#" method="post">
										<fieldset>
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" />
											<input type="hidden" name="business" value=" " />
											<input type="hidden" name="item_name" value="Sprite, 2.25L (Pack of 2)" />
											<input type="hidden" name="amount" value="180.00" />
											<input type="hidden" name="discount_amount" value="1.00" />
											<input type="hidden" name="currency_code" value="USD" />
											<input type="hidden" name="return" value=" " />
											<input type="hidden" name="cancel_return" value=" " />
											<input type="submit" name="submit" value="Add to cart" className="button" />
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div className="w3l-specilamk">
							<div className="speioffer-agile">
								<a href="single2.html">
									<img src="images/s9.jpg" alt="" />
								</a>
							</div>
							<div className="product-name-w3l">
								<h4>
									<a href="single2.html">Lakme Eyeconic Kajal, 0.35 g</a>
								</h4>
								<div className="w3l-pricehkj">
									<h6>153.00</h6>
									<p>Save 40.00</p>
								</div>
								<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
									<form action="#" method="post">
										<fieldset>
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" />
											<input type="hidden" name="business" value=" " />
											<input type="hidden" name="item_name" value="Lakme Eyeconic Kajal, 0.35 g" />
											<input type="hidden" name="amount" value="153.00" />
											<input type="hidden" name="discount_amount" value="1.00" />
											<input type="hidden" name="currency_code" value="USD" />
											<input type="hidden" name="return" value=" " />
											<input type="hidden" name="cancel_return" value=" " />
											<input type="submit" name="submit" value="Add to cart" className="button" />
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div className="footer-top">
		<div className="container-fluid">
			<div className="col-xs-8 agile-leftmk">
				<h2>Get your Groceries delivered from YASH TRADERS</h2>
				<p>Free Delivery on your first order!</p>
				<form action="#" method="post">
					<input type="email" placeholder="E-mail" name="email" required="" />
					<input type="submit" value="Subscribe" />
				</form>
				<div className="newsform-w3l">
					<span className="fa fa-envelope-o" aria-hidden="true"></span>
				</div>
			</div>
			<div className="col-xs-4 w3l-rightmk">
				<img src="images/tab3.png" alt=" " />
			</div>
			<div className="clearfix"></div>
		</div>
	</div>
	<footer>
		<div className="container">
		
			<p className="footer-main">
				<span>"Yash Traders"</span> is one of the best grocery shopee in Wardha.One can get every needy grocery at a resonable rate.
			We are a team evenif the needed grocery isn't available at that moment ,we will make it available for customer.
			We have fantastic coverage of all the brands. we make sure the customer's needs . We keep in mind the quality is important than quantity.
		We are recognized by "FSSAI" for the quality food products.</p>
			
			<div className="w3l-grids-footer">
				<div className="col-xs-4 offer-footer">
					<div className="col-xs-4 icon-fot">
						<span className="fa fa-map-marker" aria-hidden="true"></span>
					</div>
					<div className="col-xs-8 text-form-footer">
						<h3>Track Your Order</h3>
					</div>
					<div className="clearfix"></div>
				</div>
				<div className="col-xs-4 offer-footer">
					<div className="col-xs-4 icon-fot">
						<span className="fa fa-refresh" aria-hidden="true"></span>
					</div>
					<div className="col-xs-8 text-form-footer">
						<h3>Free & Easy Returns</h3>
					</div>
					<div className="clearfix"></div>
				</div>
				<div className="col-xs-4 offer-footer">
					<div className="col-xs-4 icon-fot">
						<span className="fa fa-times" aria-hidden="true"></span>
					</div>
					<div className="col-xs-8 text-form-footer">
						<h3>Online cancellation </h3>
					</div>
					<div className="clearfix"></div>
				</div>
				<div className="clearfix"></div>
			</div>

			<div className="footer-info w3-agileits-info">
			
				<div className="col-sm-5 address-right">
					<div className="col-xs-6 footer-grids">
						<h3><b>Categories</b></h3>
						<ul>
							<li>
								<a href="product.html">Grocery</a>
							</li>
							<li>
								<a href="product.html">Fruits</a>
							</li>
							<li>
								<a href="product.html">Soft Drinks</a>
							</li>
							<li>
								<a href="product2.html">Dishwashers</a>
							</li>
							<li>
								<a href="product.html">Biscuits & Cookies</a>
							</li>
							<li>
								<a href="product2.html">Baby Diapers</a>
							</li>
						</ul>
					</div>
					<div className="col-xs-6 footer-grids agile-secomk">
						<ul>
							<li>
								<a href="product.html">Snacks & Beverages</a>
							</li>
							<li>
								<a href="product.html">Bread & Bakery</a>
							</li>
							<li>
								<a href="product.html">Sweets</a>
							</li>
							<li>
								<a href="product.html">Chocolates & Biscuits</a>
							</li>
							<li>
								<a href="product2.html">Personal Care</a>
							</li>
							<li>
								<a href="product.html">Dried Fruits & Nuts</a>
							</li>
						</ul>
					</div>
					<div className="clearfix"></div>
				</div>
			
				<div className="col-sm-5 address-right">
					<div className="col-xs-6 footer-grids">
						<h3><b>Quick Links</b></h3>
						<ul>
							<li>
								<a href="about.html">About Us</a>
							</li>
							<li>
								<a href="contact.html">Contact Us</a>
							</li>
							<li>
								<a href="help.html">Help</a>
							</li>
							<li>
								<a href="faqs.html">Faqs</a>
							</li>
							<li>
								<a href="terms.html">Terms of use</a>
							</li>
							<li>
								<a href="privacy.html">Privacy Policy</a>
							</li>
						</ul>
					</div>
					<div className="col-xs-6 footer-grids">
						<h3><b>Get in Touch</b></h3>
						<ul>
							<li>
								<i className="fa fa-map-marker"></i> Gond Plot,Wardha.</li>
							<li>
								<i className="fa fa-mobile"></i> +91-9130537437 </li>
							<li>
								<i className="fa fa-mobile"></i> +91-9021086238 </li>
							<li>
								<i className="fa fa-envelope-o"></i>
								<a href="mailto:yashtraders@gmail.com"> yashtraders@gmail.com</a>
							</li>
						</ul>
					</div>
				</div>
				
				<div className="col-sm-2 footer-grids  w3l-socialmk">
					<h3><b>Follow Us on</b></h3>
					<div className="social">
						<ul>
							<li>
								<a className="icon fb" href="#">
									<i className="fa fa-facebook"></i>
								</a>
							</li>
							<li>
								<a className="icon ins" href="#">
									<i className="fa fa-instagram"></i>
								</a>
							</li>
							<li>
								<a className="icon tw" href="#">
									<i className="fa fa-twitter"></i>
								</a>
							</li>
							<li>
								<a className="icon gp" href="#">
									<i className="fa fa-google-plus"></i>
								</a>
							</li>
						</ul>
					</div>
					<div className="agileits_app-devices">
						<h5><b>Download the App</b></h5>
						<a href="#">
							<img src="images/1.png" alt="" />
						</a>
						<a href="#">
							<img src="images/2.png" alt="" />
						</a>
						<div className="clearfix"> </div>
					</div>
				</div>
				
				<div className="clearfix"></div>
			</div>
		
			<div className="agile-sometext">
				<div className="sub-some">
					<h5>Online Grocery Shopping</h5>
					<p>Order online. All your favourite products from the low price online supermarket for grocery home delivery in Our Wardha.
						 Lowest prices guaranteed on Patanjali, Aashirvaad, Pampers, Maggi,Saffola, Huggies, Fortune, Nestle, Amul, MamyPoko Pants,
						Surf Excel, Ariel, Vim, Haldiram's and others.</p>
				</div>
				<div className="sub-some">
					<h5>Shop online with the best deals & offers</h5>
					<p>Now Get Upto 40% Off On Everyday Essential Products Shown On The Offer Page. The range includes Grocery, Personal Care,
						Baby Care, Pet Supplies, Healthcare and Other Daily Need Products. Discount May Vary From Product To Product.</p>
				</div>
				
				<div className="sub-some">
					<h5>Popular Brands</h5>
					<ul>
						<li>
							<a href="product.html">Aashirvaad</a>
						</li>
						<li>
							<a href="product.html">Amul</a>
						</li>
						<li>
							<a href="product.html">Bingo</a>
						</li>
						<li>
							<a href="product.html">Boost</a>
						</li>
						<li>
							<a href="product.html"> Maggi</a>
						</li>
						<li>
							<a href="product.html">Glucon-D</a>
						</li>
						<li>
							<a href="product.html">Horlicks</a>
						</li>
						<li>
							<a href="product2.html">Head & Shoulders</a>
						</li>
						<li>
							<a href="product2.html">Dove</a>
						</li>
						<li>
							<a href="product2.html">Dettol</a>
						</li>
						<li>
							<a href="product2.html">Dabur</a>
						</li>
						<li>
							<a href="product2.html">Colgate</a>
						</li>
						<li>
							<a href="product.html">Coca-Cola</a>
						</li>
						<li>
							<a href="product2.html">Closeup</a>
						</li>
						<li>
							<a href="product2.html"> Cinthol</a>
						</li>
						<li>
							<a href="product.html">Cadbury</a>
						</li>
						<li>
							<a href="product.html">Bru</a>
						</li>
						<li>
							<a href="product.html">Bournvita</a>
						</li>
						<li>
							<a href="product.html">Tang</a>
						</li>
						<li>
							<a href="product.html">Pears</a>
						</li>
						<li>
							<a href="product.html">Oreo</a>
						</li>
						<li>
							<a href="product.html"> Taj Mahal</a>
						</li>
						<li>
							<a href="product.html">Sprite</a>
						</li>
						<li>
							<a href="product.html">Thums Up</a>
						</li>
						<li>
							<a href="product2.html">Fair & Lovely</a>
						</li>
						<li>
							<a href="product2.html">Lakme</a>
						</li>
						<li>
							<a href="product.html">Tata</a>
						</li>
						<li>
							<a href="product2.html">Sunfeast</a>
						</li>
						<li>
							<a href="product2.html">Sunsilk</a>
						</li>
						<li>
							<a href="product.html">Patanjali</a>
						</li>
						<li>
							<a href="product.html">MTR</a>
						</li>
						<li>
							<a href="product.html">Kissan</a>
						</li>
						<li>
							<a href="product2.html"> Lipton</a>
						</li>
					</ul>
				</div>
			
				<div className="sub-some child-momu">
					<h5>Payment Method</h5>
					<ul>
						<li>
							<img src="images/pay2.png" alt="" />
						</li>
						<li>
							<img src="images/pay5.png" alt="" />
						</li>
						<li>
							<img src="images/pay1.png" alt="" />
						</li>
						<li>
							<img src="images/pay4.png" alt="" />
						</li>
						<li>
							<img src="images/pay6.png" alt="" />
						</li>
						<li>
							<img src="images/pay3.png" alt="" />
						</li>
						<li>
							<img src="images/pay7.png" alt="" />
						</li>
						<li>
							<img src="images/pay8.png" alt="" />
						</li>
						<li>
							<img src="images/pay9.png" alt="" />
						</li>
					</ul>
				</div>
				
			</div>
			
		</div>
	</footer>
	
	<div className="copy-right">
		<div className="container">
			<p>© 2020 Yash Traders | All rights reserved 
			</p>
		</div>
	</div>
            </div>
        </div>  
	    
    }

export default Home;