import React from "react";
import { Route} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar,NavDropdown} from "react-bootstrap";
import { Logout } from "../action/userAction";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch=useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

const LogoutHandler=()=>{
  dispatch(Logout);
}

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShopApp</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
           <Route render={({ history })=><SearchBox history={history}/>}/>
           {/* <SearchBox history={history}/> */}
            <Nav className="ml-auto">
              <LinkContainer to="/Cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={LogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
               <NavDropdown title='Admin' id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item >
                    Users
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>
                 Products
                </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item >
                 Orders
                </NavDropdown.Item>
                </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
