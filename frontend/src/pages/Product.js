import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { saveProduct, listProducts, deleteProduct } from '../actions/productactions';
import Axios from 'axios';



function Product(props){

const [modalVisible, setModalVisible] = useState(false);
const [id,setId] = useState('');
const [name,setName] = useState('');
const [category,setCategory] = useState('');
const [countInStock,setCountInStock] = useState('');
const [price,setPrice] = useState('');
const [image,setImage] = useState('');
const [description,setDescription] = useState('');
const productList = useSelector(state => state.productList);
const {loading,products,error} = productList;
const productSave = useSelector(state => state.productSave);
const {loading:loadingSave,success:successSave,error:errorSave} = productSave;
const productDelete = useSelector(state => state.productDelete);
const {loading:loadingDel,success:successDel,error:errorDel} = productDelete;
// console.log(products)
const dispatch = useDispatch();
useEffect(()=>{
    if(successSave){
        setModalVisible(false);
    }
    dispatch(listProducts());
    return () =>{
        //
    };
    
},[successSave,successDel]);
// console.log(products)
const openModal = (product) =>{
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setCountInStock(product.countInStock);
    setImage(product.image);
    setDescription(product.description);
}
const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
}
const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
        _id:id,
        name,category,countInStock,price,image,description}));
}


    return <div className="singh">
        <Header {...props} />
       
        <h3 className="tittle-w3l">Add Product
					<span className="heading-style">
						<i></i>
						<i></i>
						<i></i>
					</span>
				</h3>
    <div className="product-header">
    <button onClick={()=>openModal({})}>Create Product</button>
    </div>
    {modalVisible && <div className="divi-container">
        {loadingSave && <div>Loading...</div>}
        {errorSave && <div>{errorSave}</div>}
        <form onSubmit={submitHandler}>
            <div className="product-container">
                <div>
                    <input type="text" name="name" value={name} required onChange={(e) => setName(e.target.value )}></input>
                    <label>Name </label>
                </div>
                <div>
                    <input type="text" name="category" value={category} required onChange={(e) => setCategory(e.target.value)}></input>
                    <label>Category </label>
                </div>
                <div>
                    <input type="text" name="countInStock" value={countInStock} required onChange={(e) => setCountInStock(e.target.value)}></input>
                    <label>CountInStock </label>
                </div>
                <div>
                    <input type="text" name="price" value={price} required onChange={(e) => setPrice(e.target.value)}></input>
                    <label>Price </label>
                </div>
                <div>
                    <input type="text" name="image" value={image} required onChange={(e) => setImage(e.target.value)}></input>
                    <label>Image </label>
                </div>
                <div>
                    <input type="text" name="description" value={description} required onChange={(e) => setDescription(e.target.value)}></input>
                    <label>Description </label>
                </div>
                <input type="submit" value={id?"update":"create"}></input>
                <input type="button" onClick={()=>setModalVisible(false)} value="Back"></input>
            </div>
        </form>
        </div>}
    
    <div className="product-list">
    <table className="table-name">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>CountInStock</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {products.map(product => ( <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.countInStock}</td>
            <td>
                <button onClick={()=>openModal(product)}>Edit</button>
                {'  '}
                <button onClick={() =>deleteHandler(product)}>Delete</button>
            </td>
            </tr>))}
           
        </tbody>
    </table>
    </div>
    
        <Footer />
        </div>
    
}

export default Product;