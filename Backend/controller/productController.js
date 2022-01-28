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

// @ description delete product by id
// @route DELETE api/products/:id
//@ access private/admin

const deleteProductById=expressAsyncHandler(async(req,res)=>{
    const product =await Product.findById(req.params.id);
    if(product){
       await product.remove();
       res.json({message:'Products Removed'});
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
})
// @ description post product
// @route POST api/products
//@ access private/admin

const createProduct=expressAsyncHandler(async(req,res)=>{
    const product =new Product({
        name:"Sample name",
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample category',
        category:'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description:'Sample description'
    })

    const createProduct=await product.save();
    res.status(201).json(createProduct);
    
})
// @ description update a product
// @route PUT api/products/:id
//@ access private/admin

const UpdateProduct=expressAsyncHandler(async(req,res)=>{
    const {name,price,user,image,brand,category,countInStock,numReviews,description}=req.body;
    const product =await Product.findById(req.params.id);
    
    if(product){ 

    product.name=name,
    product.price=price,
    product.user=user,
    product.image=image,
    product.brand=brand,
    product.category=category,
    product.countInStock=countInStock,
    product.numReviews=numReviews,
    product.description=description


    const updateProduct=await product.save();
        res.status(201).json(updateProduct);
    }else{
        res.status(404);
        throw new Error('Product not found'); 
    }

    
})
export {getProduct,getProductById,deleteProductById,UpdateProduct,createProduct};