import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../component/Product.js";
import { listProducts } from "../action/productAction.js";
import Message from "../component/Message.js";
import Loader from "../component/Loader.js";
import Paginate from "../component/Paginate.js";
import ProductCorousal from "../component/ProductCorousal";
import Meta from "../component/Meta";
import { Link } from "react-router-dom";


const HomeScreens = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCorousal />
      ) : 
        (
          <Link className="btn  my-3" to="/">
          Go back
        </Link>
        )
      }
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={3} xl={3}>
                <Product product={product} key={product._id} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreens;
