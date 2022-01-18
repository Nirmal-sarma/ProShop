import React, { useState, useEffect } from "react";
import {
  Form,
  Col,
  Row,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Table,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../component/Loader.js";
import Message from "../component/Message.js";
import { getUserDetails, UpdateUserProfile } from "../action/userAction.js";
import { ListMyOrder } from "../action/orderAction.js";
import FormContainer from "../component/FormContainer.js";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreens = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading:loadingOrder,error: errorOrders, orders } = orderListMy;
  
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(ListMyOrder()); 
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, redirect,dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch register
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(UpdateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col >
        <FormContainer>
          {success && <Message variant="success">Profile Update</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader>{loading}</Loader>}
          <h2>User Profile</h2>
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="email">
              <FormLabel>Email address</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="confirmpassword">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></FormControl>
            </FormGroup>
            <Button type="submit" variant="primary" className="py-3">
              Update
            </Button>
          </Form>
        </FormContainer>
      </Col>
      <Col md={7.5}>
        <h2>My order</h2>
        {loadingOrder ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.deliveredAt ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreens;
