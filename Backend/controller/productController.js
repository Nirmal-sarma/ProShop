import expressAsyncHandler from 'express-async-handler';
import Product from '../Models/productModel.js';

// @ description Fetch all products
// @route GET api/products
//@ access Public
const getProduct=expressAsyncHandler(async(req,res)=>{
    const pageSize=4;
    const page=Number(req.query.pageNumber) || 1;
    const keyword=req.query.keyword ? {
       name:new RegExp(req.query.keyword, 'i')
    }:{}
    const count =await Product.count({ ...keyword });
    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));
    
    res.json({products,page,pages: Math.ceil(count/pageSize)});
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

// @ description update a product
// @route POST api/products/:id/reviews
//@ access private
const ReviewProduct=expressAsyncHandler(async(req,res)=>{
    const {rating,comment}=req.body;
    const product =await Product.findById(req.params.id);
    
    if(product){ 

        const alreadyReview=product.reviews.find(r => r.user.toString() === req.user._id.toString())
        
        if(alreadyReview){
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(review)
        product.numReviews=product.reviews.length
        product.rating=product.reviews.reduce((acc,item)=> item.rating+acc,0)/(product.reviews.length);
        await product.save()
       res.status(201).json({message:"Review added"})
    
    }else{
        res.status(404);
        throw new Error('Product not found'); 
    }
})
// @ description update a product
// @route get /
//@ access public
const getTopProducts=expressAsyncHandler(async(req,res)=>{
    const products=await Product.find({}).sort({rating: -1}).limit(3);
    res.json(products);
})

export {getProduct,getProductById,deleteProductById,UpdateProduct,createProduct,ReviewProduct,getTopProducts};