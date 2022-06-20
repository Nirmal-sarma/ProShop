import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  FormControl,
  Form,
  FormGroup,
} from "react-bootstrap";
import Rating from "../component/Rating.js";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductsDetails,
  ProductReviews,
} from "../action/productAction.js";
import Loader from "../component/Loader.js";
import Message from "../component/Message.js";
import { PRODUCT_REVIEWS_RESET } from "../constant/productConstant";
import Meta from '../component/Meta';

const ProductScreens = ({ match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviews = useSelector((state) => state.productReviews);
  const { success: successProductReviews, error: errorProductReview } =
    productReviews;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (successProductReviews) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEWS_RESET });
    }

    dispatch(listProductsDetails(match.params.id));
  }, [dispatch, match, successProductReviews]);

  const history = useHistory();

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id} ? qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      ProductReviews(match.params.id, {
        rating,
        comment,
      })
    );
  };

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
          <>
          <Meta title={product.name}/>
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
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <FormControl
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
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
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                  {product.reviews.map((x) => (
                    <ListGroup key={x._id}>
                      <strong>{x.name}</strong>
                      <Rating value={x.rating} />
                      <p>{x.createdAt.substring(0, 10)}</p>
                      <p>{x.comment}</p>
                    </ListGroup>
                  ))}
                  <ListGroupItem>
                    <h2>Write a Customer Review</h2>
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <FormGroup>
                          <Form.Label controlId="rating">Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2-Fair</option>
                            <option value="3">3-Good</option>
                            <option value="4">4-Very Good</option>
                            <option value="5">5-Excellent</option>
                          </Form.Control>
                        </FormGroup>
                        <FormGroup>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textArea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </FormGroup>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please<Link to="/login">sign In</Link>to write a review
                      </Message>
                    )}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default ProductScreens;
