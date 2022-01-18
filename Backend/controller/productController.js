import expressAsyncHandler from 'express-async-handler';
import Product from '../Models/productModel.js';

// @ description Fetch all products
// @route GET api/products
//@ access Public
const getProduct=expressAsyncHandler(async(req,res)=>{
    const products=await Product.find();
    
    res.json(products);
})
//Fetch all product with its id

const getProductById=expressAsyncHandler(async(req,res)=>{
    const product =await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getProduct,getProductById};