import React, { useEffect, useState } from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../store/Firebase';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function OrderHistory() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setOrders([]);
                setLoading(false);
                return;
            }
            try {
                const orderRef = collection(db, 'users', user.uid, 'orders');
                const querySnapshot = await getDocs(orderRef);
                const orderList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(orderList);
            } catch (error) {
                console.error(`Error fetching orders: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const handleProductClick = (item) => {
        const { slug, selectedColor, selectedSize } = item;
        console.log(`Product clicked: ${slug}, Color: ${selectedColor}, Size: ${selectedSize}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <Accordion>
                    {orders.map((order) => (
                        <Accordion.Item key={order.id} eventKey={order.id}>
                            <Accordion.Header>
                                <div className="d-flex w-100 gap-3 justify-content-between align-items-center p-3">
                                    <img
                                        src={order.items[0]?.variantImageUrl}
                                        width={100}
                                        height={100}
                                        className='img-fluid'
                                        alt="Order Thumbnail"
                                    />
                                    <p>
                                        Order ID: <span className="text-warning">{order.id}</span>
                                    </p>
                                    <p>Status: {order.status}</p>
                                    <div>
                                        <p>{new Date(order.orderDate.seconds * 1000).toLocaleString()}</p>
                                        <p className="text-center">${order.totalPrice}</p>
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body >
                                {order.items.map((item, index) => (
                                    <Card key={index} className="w-100 flex-row ">
                                        <Card.Body className="me-auto">
                                            <img
                                                className='img-fluid'
                                                onClick={() => handleProductClick(item)}
                                                src={item.variantImageUrl}
                                                alt={item.name}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Card.Body>
                                        <Card>
                                            <Card.Body className="">
                                                <div >
                                                    <h5>{item.name}</h5>
                                                    <p>Variant: {item.color}</p>
                                                    <p>Size: {item.selectedSize}</p>
                                                    <p>quantity {item.quantity}</p>
                                                </div>

                                            </Card.Body>
                                        </Card>
                                        <Card className="bg-success">
                                            <Card.Header>Payment and Delivery</Card.Header>
                                            <Card.Body>
                                                <p>Cardholder Name: {order.card.cardholderName}</p>
                                                <p>Delivery Address: {order.address.addressName}</p>
                                            </Card.Body>
                                        </Card>
                                    </Card>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </Container>
    );
}

export default OrderHistory;
