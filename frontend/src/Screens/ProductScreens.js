import React, { useState, useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import Rating from "../component/Rating.js";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails } from "../action/productAction.js";
import Loader from "../component/Loader.js";
import Message from "../component/Message.js";


const ProductScreens = ({match}) => {
  const [qty, setQty] = useState(1);
  
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductsDetails(match.params.id));
  }, [dispatch, match]);

const history=useHistory();

const addToCartHandler=()=>{
history.push(`/cart/${match.params.id} ? qty=${qty}`)
}

  return (
    <>
      <div>
        <Link className="btn  my-3" to="/">
          Go back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flusk">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} `}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>price:${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  description:{product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flusk">
                  <ListGroup.Item>
                    <Row>
                      <Col>prices:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                             x =>  (
                                <option key={x + 1} value={x + 1}>
                                 {x+1}
                                   
                                </option>
                                
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn btn-dark"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default ProductScreens;
