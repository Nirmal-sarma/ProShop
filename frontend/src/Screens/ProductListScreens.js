import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button,Row,Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import Loader from "../component/Loader.js";
import Message from "../component/Message.js";
import Paginate from "../component/Paginate.js";

import { listProducts,deleteProduct, createProduct } from "../action/productAction.js";
import { PRODUCT_CREATE_RESET } from "../constant/productConstant.js";

const ProductListScreens = ({ history,match }) => {
 const dispatch = useDispatch();
 const pageNumber=match.params.pageNumber || 1;
 const productList = useSelector((state) => state.productList);
 const { loading, error, products,pages,page } = productList;

 const productDelete=useSelector((state) => state.productDelete);
 const { loading:loadingDelete, error:errorDelete, success:successDelete}=productDelete;
  
 const productCreate=useSelector((state) => state.productCreate);
 const { loading:loadingCreate, error:errorCreate, success:successCreate,product:CreateProduct}=productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  
  useEffect(() => {
    dispatch({ type : PRODUCT_CREATE_RESET })

    if(!userInfo.isAdmin){
      history.push('/login');
    }

    if(successCreate){
        history.push(`/admin/product/${CreateProduct._id}/edit`)
    }else{
        dispatch(listProducts('',pageNumber));
    }
  }, [dispatch,userInfo,history,successDelete,successCreate,CreateProduct,pageNumber]);

const deleteHandler=(id) => {
   if(window.confirm('Are you sure')){
       dispatch(deleteProduct(id));
   }
}

const createProductHandler=()=>{
dispatch(createProduct());
history.push('/admin/productlist');
}

return (
  <>
    <Row className="align-items-center">
        <Col>
        <h1>Products</h1>
        </Col>
        <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}><i className="fas fa-plus"/>Create Products</Button>
        </Col>
    </Row>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message  variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message  variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
    <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>
                  ${product.price}
                </td>
                <td>
                  {product.category}
                  
                </td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={()=> deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
       <Paginate pages={pages} page={page} isAdmin={true}/>
    </>
       )}
  </>
  );
};

export default ProductListScreens;
