import mongoose from 'mongoose'
const productschema = new mongoose.Schema({
    name: {
        type : String,
        required :true,
        trim:true
    },
    price: {
        type:Number,
        default:0,
        required:true
    },
    countInStock: {
        type:Number,
        default:0,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image1:{
        type:Buffer,
        contentType:String
    }
},{
    timestamps:true
})

const productmodel = mongoose.model('Product',productschema)
export default productmodel 