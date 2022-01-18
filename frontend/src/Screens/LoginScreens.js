import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Col,
  Row,
  Button,
  FormLabel,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../component/Loader.js";
import Message from "../component/Message.js";
import { login } from "../action/userAction";
import FormContainer from "../component/FormContainer.js";

const LoginScreens = ({ location,history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect=location.search ? location.search.split('=')[1] : '/';
  const dispatch=useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo}=userLogin;
 
  useEffect(()=>{
      if(userInfo){
          history.push(redirect)
      }
  },[history,redirect,userInfo])

const submitHandler=(e)=>{
     e.preventDefault();
     //Dispatch login
     dispatch(login(email,password))
}
    
    

  return (
    <div>
      <FormContainer>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader>{loading}</Loader>}
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
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

          <Button type='submit' variant='primary' className="py-3">Sign In</Button>
        </Form>
        <Row className="py-3">
            <Col>
            New Customer? <Link to={redirect ?`/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default LoginScreens;
