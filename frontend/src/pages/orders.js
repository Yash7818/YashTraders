import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import Header from './Header';
import { Link } from 'react-router-dom';
function Orders(props){
    
    const orderList = useSelector(state=>state.orderList);
    const {loading,orders,error} = orderList;

    const orderDelete = useSelector(state=>state.orderDelete);
    const {loading:loadingDelete,success:successDelete,error:errorDelete} = orderDelete;
    const dispatch = useDispatch();
    // console.log(error)
    useEffect(()=>{
        dispatch(listOrders());
        return  () =>{

        };
    },[successDelete]);
    const deleteHandler = (order) =>{
        dispatch(deleteOrder(order._id));
    }
    return <div>
        <Header {...props}/>
        <div className="order-header">
        <h3 className="tittle-w3l">Orders
					<span className="heading-style">
						<i></i>
						<i></i>
						<i></i>
					</span>
				</h3>
        </div>
        <div className="order-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>USER</th>
                        <th>PAID</th>
                        <th>PAID AT</th>
                        <th>DELIVERED</th>
                        <th>DELIVERED AT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (<tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.user.name}</td>
                        <td>{order.isPaid.toString()}</td>
                        <td>{order.paidAt}</td>
                        <td>{order.isDelivered.toString()}</td>
                        <td>{order.deliveredAt}</td>
                        <td>
                            <Link to={"/order/" + order._id}>Details</Link>{'  '}
                            <button onClick={() => deleteHandler(order)}>Delete</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    </div>
}

export default Orders