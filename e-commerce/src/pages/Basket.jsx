import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table, Button, Form, Col, Row, CardBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTruck } from '@fortawesome/free-solid-svg-icons';
import { clearCart, removeToCart,uptadeQuantity } from '../store/cartSlice';

const Basket = () => {
    const cartItems = useSelector((state) => state.cart.items); // Sepetteki ürünler
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [subTotal, setSubTotal] = useState(0);
    const [discount,setDiscount] = useState(0);
    const [shipping ,setShipping] = useState(10)
    const [message,setMessage] = useState(null)
    useEffect(() => {
        const originalSubTotal = cartItems.length > 0 ? 
        cartItems.reduce((total,item) => total + item.price * item.quantity , 0) : 0;
        const discountAmount = originalSubTotal * 0.10;
        const discountSubTotal = originalSubTotal - discountAmount;

        setSubTotal(discountSubTotal);
        setDiscount(discountAmount)

        if(discountSubTotal > 50){
            setShipping(0);
            setMessage(
            <div className='d-flex justify-content-end align-items-center'> 
                <FontAwesomeIcon icon={faTruck} style={{color: "#74C0FC",}} className='me-2' />{' '}
                 Free Shipping!</div>
     )
        }else{
            setShipping(10)
                     setMessage(
                <div > 
                <FontAwesomeIcon icon={faTruck} style={{color: "#74C0FC",}} />
                 Free Shipping! When you spend over USD 50, shipping is free!
                 </div>
                     )
        }

    }, [cartItems])
    const grandTotal = subTotal + shipping;
    
    const handleRemoveItem = (item) => {
        if(item && item.id && item.selectedSize){
            dispatch(removeToCart({
                id:item.id,
                selectedSize:item.selectedSize
            }))
        }
    }

    const handleAllClear = () => {
        dispatch(clearCart())
    }

    const handleProductClick = (item) => {
        const slug = item.slug;
        const size = item.selectedSize;
        const color = item.selectedColor;

        navigate(`/product/${slug}?size=${size}&color=${color}`);
    };

    const handleQuantityChange = (e,item) => {
        const newQuantity = parseInt(e.target.value)
        if(item && item.id && item.selectedSize){
            dispatch(uptadeQuantity({
                id:item.id,
                selectedSize:item.selectedSize,
                quantity: newQuantity
            }))
        }
    }
    return (
        <div className="my-5">
            <Row>
                {/* Ürünler Tablosu */}
                <Col md={8} >
                    <h4>Product</h4>
                    <Table responsive className="align-middle">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={item.variantImageUrl}
                                                alt={item.name}
                                                style={{ width: '120px', height: '120px', objectFit: 'cover ' , cursor: 'pointer'}}
                                                className="img-fluid"
                                                onClick={() => handleProductClick(item)}
                                            />
                                            <div >
                                                <h6>{item.name}</h6>
                                                <p>Color: {item.selectedColor}</p>
                                                <p>Size: {item.selectedSize}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {discount < item.price && (
                                            <div>
                                                <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                                                    ${item.price.toFixed(2)}
                                                </span>{''}
                                                <span className="d-flex text-danger">${subTotal.toFixed(0)- discount}</span>
                                            </div>
                                        )}
                                        {!discount && <span>${item.price}</span>}
                                    </td>
                                    <td>
                                        <Form.Control
                                            as="select"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(e, item)} 
                                            style={{ width: '60px' }}
                                        >
                                            {[...Array(10).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </td>
                                    <td>${((item.price * 0.90) * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => handleRemoveItem(item)}>
                                            <FontAwesomeIcon icon={faTrash} style={{ color: "#000", }} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className='d-flex justify-content-end align-items-center '>
                    <Button  
                    className='d-flex align-items-center'
                    variant='danger'
                    onClick={() => handleAllClear()}>Clear All
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#000", marginLeft: '15px' }} />
                    </Button>
                    </div>

                </Col>

                {/* Sipariş Özeti */}
                <Col md={4}>
                    <div className="border p-4 rounded">
                        <h4>Order Summary</h4>
                        <div className="d-flex justify-content-between">
                            <p>Subtotal</p>
                            <p>${subTotal.toFixed(2)}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Discount</p>
                            <p className="text-danger">-${discount.toFixed(2)}</p>
                        </div>
                        <div className="d-flex justify-content-between  ">
                            <p >Shipping</p>
                            <p >${shipping.toFixed(2)}</p>


                        </div>
                            {message}
                        <hr />
                        <div className="d-flex justify-content-between">
                            <h5>Grand Total</h5>
                            <h5>${grandTotal.toFixed(2)}</h5>
                        </div>
                        <Button className="mt-3 w-100" variant="primary" as={Link} to="/basket/payment">
                            Proceed to Checkout
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Basket;
