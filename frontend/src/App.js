import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomeScreens from "./Screens/HomeScreens";
import ProductScreens from "./Screens/ProductScreens";
import CartScreen from "./Screens/CartScreen.js";
import LoginScreens from "./Screens/LoginScreens.js";
import RegisterScreens from "./Screens/RegisterScreens";
import ProfileScreens from "./Screens/ProfileScreens";
import ShippingScreens from "./Screens/ShippingScreens";
import PaymentScreens from "./Screens/PaymentScreens";
import PlaceorderScreens from "./Screens/PlaceorderScreens";
import OrderScreens from "./Screens/OrderScreens";
import UserListScreens from "./Screens/UserListScreens.js";
import UserEditScreens from "./Screens/UserEditScreens.js";
import ProductListScreens from "./Screens/ProductListScreens";
import ProductEditScreens from "./Screens/ProductEditScreens";
import OrderListScreens from "./Screens/OrderListScreens.js";


function App(){
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/payment" component={PaymentScreens} exact />
          <Route path="/placeorder" component={PlaceorderScreens} exact />
          <Route path="/order/:id" component={OrderScreens} exact />
          <Route path="/shipping" component={ShippingScreens} exact />
          <Route path="/login" component={LoginScreens} exact />
          <Route path="/admin/userlist" component={UserListScreens}  exact />
          <Route path="/admin/productlist" component={ProductListScreens} exact/>
          <Route path="/admin/productlist/:pageNumber" component={ProductListScreens}  exact />
          <Route path="/admin/orderlist" component={OrderListScreens}  exact />
          <Route path="/product/:id" component={ProductScreens} exact />
          <Route path="/profile" component={ProfileScreens} exact />
          <Route path="/admin/user/:id/edit" component={UserEditScreens} exact />
          <Route path="/admin/product/:id/edit" component={ProductEditScreens} exact />
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/register" component={RegisterScreens} exact />
          <Route path="/search/:keyword" component={HomeScreens} exact/>
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreens} exact/>
          <Route path="/page/:pageNumber" component={HomeScreens} exact/>
          <Route path="/" component={HomeScreens} exact />


      </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
