import mongoose from "mongoose";

const reviewSchema=mongoose.Schema({
    name:{type:String,required:true},
   rating:{type:Number,required:true},
   comment:{type:String,required:true},
},
{
    timestamps:true,
})

const ProductSchema = mongoose.Schema(
  {
    name:{
    type:String,
    required:true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
     
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
      
    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    
    reviews: [reviewSchema],
    rating: {
      type:Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      
    },
    price: {
      type:Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
