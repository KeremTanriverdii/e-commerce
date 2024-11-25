import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Form, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { clearCart, removeToCart } from '../store/cartSlice';

const Basket = () => {
    const cartItems = useSelector((state) => state.cart.items); // Sepetteki ürünler
    const uniqueItemCount = useSelector((state) => state.cart.uniqueItemCount); // Toplam ürün sayısı
    const dispatch = useDispatch();
    console.log(cartItems)
    // Sipariş Özeti Verileri
    const subtotal = cartItems.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
    const discount = cartItems.reduce((acc, item) => acc + (item.originalPrice - item.discountPrice) * item.quantity, 0);
    const shipping = 10; // Sabit kargo ücreti

    const grandTotal = subtotal + shipping;

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

    return (
        <div className="my-5">
            <Row>
                {/* Ürünler Tablosu */}
                <Col md={8}>
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
                                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                className="me-3"
                                            />
                                            <div>
                                                <h6>{item.name}</h6>
                                                <p>Color: {item.color}</p>
                                                <p>Size: {item.selectedSize}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.discountPrice < item.originalPrice && (
                                            <div>
                                                <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                                                    ${item.price.toFixed(2)}
                                                </span>{' '}
                                                <span className="text-danger">${item.discountPrice}</span>
                                            </div>
                                        )}
                                        {!item.discountPrice && <span>${item.originalPrice}</span>}
                                    </td>
                                    <td>
                                        <Form.Control
                                            as="select"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(e, item.id)} // Sepet miktarını değiştirme fonksiyonu
                                            style={{ width: '60px' }}
                                        >
                                            {[...Array(10).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </td>
                                    <td>${(item.discountPrice * item.quantity).toFixed(2)}</td>
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
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Discount</p>
                            <p className="text-danger">-${discount.toFixed(2)}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Shipping</p>
                            <p>${shipping.toFixed(2)}</p>
                        </div>
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
