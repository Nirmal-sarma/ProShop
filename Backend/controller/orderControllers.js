import expressAsyncHandler from "express-async-handler";
import Order from "../Models/orderModel.js";

// @ description craete new order
// @route GET api/products
//@ access private

const AddOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//@description Get order by id
//@route GET api/orders/:id
//@access private
const getOrderById = expressAsyncHandler(async (req, res) => {
  const order=await Order.findById(req.params.id).populate('user','name email')
  if(order){
    res.status(200).json(order);
  }else{
    res.status(404);
    throw new Error('Order Not Found')
  }
});

//@description update order to paid
//@route GET api/orders/myorders
//@access private

const UpdateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order=await Order.findById(req.params.id).populate('user','name email')
  if(order){
   order.idPaid=true;
   order.paidAt=Date.now();
   order.paymentResult={
     id:req.body.id,
     status:req.body.status,
     update_time:req.body.update_time,
     email_address:req.body.payer.email_address,
  }
    const updateOrder=await order.save();
    res.json(updateOrder);
  }else{
    res.status(404);
    throw new Error('Order Not Found')
  }
});

//@description update order to paid
//@route GET api/orders/:id/pay
//@access private
const  getMyOrder= expressAsyncHandler(async (req, res) => {
  const orders=await Order.find({user:req.user._id})
  res.json(orders);
});


export { AddOrderItems,getOrderById,UpdateOrderToPaid,getMyOrder};