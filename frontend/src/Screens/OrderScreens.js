import React, { useState,useEffect } from "react";
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import Message from "../component/Message.js";
import { getOrderDetails,payOrder } from "../action/orderAction.js";
import Loader from "../component/Loader.js";
import { ORDER_PAY_RESET } from '../constant/OrderConstants.js';

const OrderScreens = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false)
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  
  const orderPay = useSelector((state) => state.orderPay);
  const { loading:loadingPay,success:successPay } = orderPay;

  useEffect(() => {
    const addPayPalScript= async()=>{
       const { data: clientId }=await axios.get('/api/config/paypal')
       const script=document.createElement('script')
       script.type='text/javascript'
       script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
       script.async=true
       script.onLoad=()=>{
         setSdkReady(true);
       }
       document.body.appendChild(script);
    }
  
   if(!order || successPay || order._id !== orderId ){
      dispatch({type:ORDER_PAY_RESET})
      dispatch(getOrderDetails(orderId));
   }else if(!order.isPaid){
      if(!window.paypal){
        addPayPalScript();
      }else{
        setSdkReady(true)
      }
    }
  }, [order,orderId,successPay]);

const successPaymentHandler=(paymentResult)=>{
console.log(paymentResult)
dispatch(payOrder(orderId,paymentResult));
}

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>OrderId:{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Name:{order.user.name}</strong>
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">Paid on {order.DeliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>OrderItems</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {/* {loadingPay && <Loader/>} */}
                  {!sdkReady ? <Loader/> : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreens;

// sb-ted5a11731287@personal.example.com
//7gLkWW-1
