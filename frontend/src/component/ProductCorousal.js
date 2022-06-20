import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Carousel,Image} from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import {ProductTopRated} from '../action/productAction';
import Loader from './Loader';
import Message from './Message';

const ProductCorousal = () =>{
    const dispatch=useDispatch();

    const productTopRated=useSelector((state) => state.productTopRated);
    const {loading ,products,error}=productTopRated;
    useEffect(() => {
      dispatch(ProductTopRated());
    }, [dispatch])
    
  return loading ? <Loader/> : error ? <Message varinat='danger'>{error}</Message>:
  (
    <Carousel pause='hover' className='bg-dark'>
       {products.map(x=>(
            <Carousel.Item key={x._id}>
                <Link to={`/product/${x._id}`}>
                   <Image src={x.image} alt={x.name} fluid/>
                
                    <Carousel.Caption>
                        <h2>
                          {x.name}($ {x.price})
                        </h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
        </Carousel>
  )
}

export default ProductCorousal