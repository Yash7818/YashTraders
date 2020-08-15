import React, { useState, useEffect } from 'react';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { logout, update } from '../actions/useractions';
import { listMyOrders } from '../actions/orderActions';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Profile(props){
    const [uploading,setUploading] = useState(false);
    const [modal1,setModal1] = useState(false);
    const [modal2,setModal2] = useState(false);
    const [name, setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [avatar,setAvatar] = useState(false);
    const dispatch = useDispatch();

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const handleLogout = () => {
        // e.preventDefault();
        dispatch(logout());
        props.history.push("/cart");
    }
    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(update({userId: userInfo._id,email,name,password}))
        // setModal1(false);
    }
    const userUpdate = useSelector(state => state.userUpdate);
    const {loading,success,error} = userUpdate;
    const myOrderList = useSelector(state =>state.myOrderList);
    const {loading:loadingOrders,orders,error:errorOrders}= myOrderList;
   
    useEffect(()=>{
        if(userInfo){
            setModal1(false);
        }
        dispatch(listMyOrders());
        return () =>{

        };
    },[userInfo])
    const openmodal = (userInfo) =>{
        if(modal1){
            setModal1(false);
        }
        else{
        setModal1(true);
        }
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPassword(userInfo.password);
    }
    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        console.log(file)
        const bodyFromData = new FormData();
        bodyFromData.append('avatar',file);
        setUploading(true);
        Axios.post('/api/users/mine/avatar',bodyFromData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
        }).then((res) =>{
            console.log(res.data)
            setAvatar(res.data);
            setUploading(false);
        }).catch((error) => {
            console.log(error);
            setUploading(false);
        })
    }
    return<div className="singh">
    <Header {...props} />
    <h3>
            Hi,{userInfo.name}
    </h3>
    <div className="nav-profile-buttons">
        <button onClick={modal2 ?()=>setModal2(false):()=>setModal2(true)}>
            My Orders
        </button>
        <button onClick={()=>openmodal(userInfo)}>
            Login And Security
        </button>
        <button onClick={handleLogout}>
            Logout
        </button>
        <input type="file" name="avatar" onChange={uploadFileHandler}></input>
        {uploading&&<div>Uploading...</div>}
    </div>
    { modal1 && <div className="divi-container" >
<form onSubmit={submitHandler}>
   <div className="product-container">
       <div>
           <input type="text" name="name" value={name} required onChange={(e) => setName(e.target.value )}></input>
           <label>Name</label>
       </div>
       <div>
           <input type="email" name="category" value={email} required onChange={(e) => setEmail(e.target.value)}></input>
           <label>Email</label>
       </div>
       <div>
           <input type="password" name="countInStock"  required onChange={(e) => setPassword(e.target.value)}></input>
           <label>Password</label>
       </div>
       <input type="submit" value="update"></input>{' '}
       <input type="submit" value="cancel" onClick={() => setModal1(false)}></input>
    </div>
</form>
</div>
}
{modal2 && <div className="order-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (<tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                            <Link to={"/order/" + order._id}>Details</Link>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
}
<Footer />
</div>
}

export default Profile;