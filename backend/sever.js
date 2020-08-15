import express from 'express'
import data from './data/data'
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'
import orderModel from './models/ordermodel'
dotenv.config()
const mongodbUrl = config.MONGODB_URL

mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error => console.log(error.reason));

const app = express()
app.use(bodyParser.json())
app.use("/api/users",userRoute)
app.use('/api/products',productRoute)
app.use('/api/orders',orderRoute)
app.get('/api/config/paypal',(req,res) => {
    res.send(config.PAYPAL_CLIENT_ID)
})
// app.use("/api/products",productRoute)
// app.get('/api/products/:id',(req,res)=>{
//     const productId = req.params.id;
//     var product
//     data.products.forEach((x)=>{
//       if(x._id==productId){
//           product = x;
//       }
//     })
//     if(product){
//         res.send(product)
//     }
//     else
//     res.status(404).send({error:"product not found"});
// })
// app.get('/api/products',(req,res)=>{
//     res.send(data.products)
// })

app.listen(5000,()=>{
    console.log('server started at 5000')
})