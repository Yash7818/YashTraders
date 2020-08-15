import express from 'express'
import Product from '../models/productmodel'
import { isAdmin,isAuth } from '../utils';
const router = express.Router();

router.get("/", async (req,res) =>{
    const products = await Product.find({})
    res.send(products)
})
router.get("/:id",async (req,res)=>{
    try{
    const product = await Product.findById(req.params.id)
    res.send(product)
    } catch(e){
        res.status(404).send({error:"product not found"})
    }
})


router.post("/",isAuth,isAdmin,async(req,res)=>{
    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        countInStock:req.body.countInStock,
        description:req.body.description,
        category:req.body.category

    })
    const newProduct = await product.save()
    if(newProduct){
       return res.status(201).send({message:'New Product Created', data:newProduct})
    }else{
        return res.status(500).send({error:'new product is not created'})
    }
})
router.put("/:id",isAuth,isAdmin,async(req,res)=>{
    const productId = req.params.id;
    const product  = await Product.findOne({_id:productId})
    if(product){
        product.name = req.body.name
        product.price = req.body.price
        product.image = req.body.image
        product.countInStock = req.body.countInStock
        product.description = req.body.description
        product.category = req.body.category

        const updatedProduct = await product.save()
        if(updatedProduct){
           return res.status(200).send({message:'product update request success', data:updatedProduct})
        }

    }
      return res.status(500).send({error:'product update request failed'})
})
router.delete("/:id",isAuth,isAdmin,async(req,res)=>{
    const delpro = await Product.findById(req.params.id)
    if(delpro){
        await delpro.remove()
        res.send({msg:"product deleted"})
    } else{
        res.send("error in deletion")
    }
})

export default router