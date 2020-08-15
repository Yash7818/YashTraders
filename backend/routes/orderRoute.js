import express from 'express'
import Order from '../models/ordermodel'
import {isAuth, isAdmin} from '../utils'
const router = express.Router()

router.get("/",isAuth,async(req,res)=>{
    const orders = await Order.find({}).populate('user')
    // console.log(orders)
    res.send(orders)
})

router.get("/mine",isAuth,async(req,res)=>{
    const orders = await Order.find({user:req.user._id})
    res.send(orders)
})

router.get("/:id",isAuth,async(req,res)=>{
    const order = await Order.findOne({_id:req.params.id})
    if(order){
        res.send(order)
    }
    else{
        res.status(404).send("Order Not Found")
    }
})

router.delete("/:id",isAuth,isAdmin,async(req,res)=>{
    const order = await Order.findOne({_id:req.params.id})
    if(order){
        const deletedOrder = await order.remove()
        res.send(deletedOrder);
    }
    else{
        res.status(404).send("Order Not Found")
    }
})

router.post("/",isAuth,async(req,res)=>{
    try{
    const newOrder = new Order({
        user:req.user._id,
        orderItems:req.body.orderItems,
        shipping:req.body.shipping,
        payment:req.body.payment,
        itemsPrice:req.body.itemsprice,
        taxPrice:req.body.taxprice,
        shippingPrice:req.body.shippingprice,
        totalPrice:req.body.totalprice
    })
    const newOrderCreated = await newOrder.save()
    res.status(201).send({message:"New Order Created",data:newOrderCreated})
    } catch(e){
        console.log(e)
        res.status(404).send(e)
    }
})

router.put("/:id/pay",isAuth,async(req,res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now();
        order.payment = {
            paymentMethod:'paypal',
            paymentResult:{
                payerID:req.body.payerID,
                orderID:req.body.orderID,
                paymentID:req.body.paymentID
            }
        }
        const updatedOrder = await order.save()
        res.send({message:'Order Paid',order:updatedOrder})
    } else{
        res.status(404).send({message:'Order not found'})
    }
})

export default router