import React ,{useEffect, useState} from 'react';
import Footer from './Footer';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productactions';
// import data from '../data/data';

function Single(props){
	// console.log(props.match.params.id);
	const [qty, setQty] = useState(1);
	const productDetails = useSelector(state =>state.productDetails);
	const {product, loading, error} = productDetails;
	const dispatch =useDispatch();
	console.log(product)
	useEffect(()=>{
		dispatch(detailsProduct(props.match.params.id));
		return () =>{
			//
		};
	},[dispatch,props.match.params.id])
	const handleAddToCart = () =>{
		props.history.push("/cart/"+props.match.params.id+"?qty="+qty)
	}
	return  <div>
          <Header {...props} />
		 {loading?<div>Loading...</div>:
		 error?<div>{error}</div>:
		 (	 
			<div className="banner-bootom-w3-agileits">
			
			<div className="container">
				
				<h3 className="tittle-w3l">Single Page
					<span className="heading-style">
						<i></i>
						<i></i>
						<i></i>
					</span>
				</h3>
				
				<div className="col-md-5 single-right-left ">
					<div className="grid images_3_of_2">
						<div className="flexslider">
							<ul className="slides">
								<li data-thumb="../images/si.jpg">
									<div className="thumb-image">
										<img src="../images/si.jpg" data-imagezoom="true" className="img-responsive" alt="" /> </div>
								</li>
								<li data-thumb="../images/si2.jpg">
									<div className="thumb-image">
										<img src="../images/si2.jpg" data-imagezoom="true" className="img-responsive" alt="" /> </div>
								</li>
								<li data-thumb="../images/si2.jpg">
									<div className="thumb-image">
										<img src="../images/si2.jpg"data-imagezoom="true" className="img-responsive" alt="" /> </div>
								</li>
							</ul>
							<div className="clearfix"></div>
						</div>
					</div>
				</div>
				<div className="col-md-7 single-right-left simpleCart_shelfItem">
		 <h3>{product.name}</h3>
					<div className="rating1">
						<span className="starRating">
							<input id="rating5" type="radio" name="rating" value="5" />
							<label htmlFor="rating5">5</label>
							<input id="rating4" type="radio" name="rating" value="4" />
							<label htmlFor="rating4">4</label>
							<input id="rating3" type="radio" name="rating" value="3" defaultChecked="" />
							<label htmlFor="rating3">3</label>
							<input id="rating2" type="radio" name="rating" value="2" />
							<label htmlFor="rating2">2</label>
							<input id="rating1" type="radio" name="rating" value="1" />
							<label htmlFor="rating1">1</label>
						</span>
					</div>
					<p>
		 <span className="item_price">{product.price}</span>
						<del>1300.00</del>
						<label>Free delivery</label>
					</p>
					<div className="single-infoagile">
						<ul>
							<li>
								Cash on Delivery Eligible.
							</li>
							<li>
								Shipping Speed to Delivery.
							</li>
							<li>
								Sold and fulfilled by Supple Tek (3.6 out of 5 | 8 ratings).
							</li>
							<li>
								1 offer from
								<span className="item_price">950.00</span>
							</li>
						</ul>
					</div>
					<div className="product-single-w3l">
						<p>
							<i className="fa fa-hand-o-right" aria-hidden="true"></i>This is a&nbsp;
							<label> Vegetarian</label> product.</p>
						<ul>
							<li>
								Best for Biryani and Pulao.
							</li>
							<li>
								After cooking, Zeeba Basmati rice grains attain an extra ordinary length of upto 2.4 cm/~1 inch.
							</li>
							<li>
								Zeeba Basmati rice adheres to the highest food afety standards as your health is paramount to us.
							</li>
							<li>
								Contains only the best and purest grade of basmati rice grain of Export quality.
							</li>
						</ul>
						<p>
							<i className="fa fa-refresh" aria-hidden="true"></i>All food products are&nbsp;
							<label>non-returnable.</label>
						</p>
					</div>

					<div className="occasion-cart">
						<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
							{product.countInStock>0?<div><input type="submit" name="submit" value="Add to cart" className="button" onClick={handleAddToCart} />
							<select value={qty} onChange={(e)=> {setQty(e.target.value)}}>
							{[...Array(product.countInStock).keys()].map(x=>
								<option key={x+1} value={x+1}>{x+1}</option>
							)}
						</select></div>:<div>Out of stock</div>
							}		
						</div>

					</div>
	
				</div>
				<div className="clearfix"> </div>
			</div>
		  
		  
		</div>
		 )
}
          
		  <Footer />
           <div className="copy-right">
		<div className="container">
			<p>© 2020 Yash Traders | All rights reserved 
			</p>
		</div>
	</div>
	   
	   
	</div>
}
export default Single;