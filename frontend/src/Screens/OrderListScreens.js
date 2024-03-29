import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import Loader from "../component/Loader.js";
import Message from "../component/Message.js";

import {ListAdminOrder } from "../action/orderAction.js";

const OrderListScreens = ({ history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, ordersAdmin } = orderList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 
  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(ListAdminOrder());
    }else{
      history.push('/login');
    }
  }, [dispatch,userInfo,history]);
 

return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {ordersAdmin.map(order => (
               <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>
                  {order.createdAt.substring(0,10)}
                </td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.DeliverAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                  </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                  
                </td>
              </tr>
            
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreens;
