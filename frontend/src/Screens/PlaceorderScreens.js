import React,{useEffect} from "react";
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
import CheckoutSteps from "../component/CheckoutSteps.js";
import Message from "../component/Message.js";
import { OrderCreate } from "../action/orderAction.js";


const PlaceorderScreens = ({history}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
   } = cart;
// Calculate Prices
const addDecimal=(num)=>{
    return (Math.round(num*100) / 100).toFixed(2)
}

cart.itemPrice=addDecimal(Number(cartItems.reduce((acc,item)=> acc + item.price * item.qty,0)));
cart.shippingPrice=addDecimal(Number(cart.itemPrice > 100 ? 0 : 100));
cart.taxPrice=addDecimal(Number(0.15 * cart.itemPrice));
cart.totalPrice=addDecimal((Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)));

const  orderCreate = useSelector(state => state.orderCreate);
const {success,order,error}=orderCreate;
useEffect(() => {
  if(success){
    history.push(`/order/${order._id}`)
  }
// eslint-disable-next-line
}, [history,success,order])

const placeOrderHandler = () => {
    // e.preventDefault();
    dispatch(OrderCreate({
    orderItems:cart.cartItems,
    shippingAddress:cart.shippingAddress,
    paymentMethod:cart.paymentMethod,
    itemPrice: cart.itemPrice,
    taxPrice:cart.taxPrice,
    shippingPrice: cart.shippingPrice,
    totalPrice:cart.totalPrice,
    }))
};



return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
              </p>
              {shippingAddress.address},{shippingAddress.city},
              {shippingAddress.postalCode},{shippingAddress.country}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {paymentMethod}
            </ListGroupItem>
            <ListGroupItem>
              <h2>OrderItems</h2>
              {cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
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
                  <Col>${cart.itemPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceorderScreens;
