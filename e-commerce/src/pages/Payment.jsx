import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Offcanvas } from 'react-bootstrap'

import CreditCart from '../components/CreditCart'
import ExistingCreditCard from '../components/ExistingCreditCard'
import { useSelector } from 'react-redux'
import ExistingAddress from '../components/ExistingAddress'
import Address from '../components/Address'
import useAuth from "../hooks/useAuth"
import { db } from '../store/Firebase'
import { addDoc, collection, or, setDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Payment() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const cartItems = useSelector(state => state.cart.items);

    const [selectedCard, setSelectedCard] = useState(() => {
        const savedCard = sessionStorage.getItem('selectedCard');
        return savedCard ? JSON.parse(savedCard) : '';
    })
    const [selectedAddress, setSelectedAddres] = useState(() => {
        const savedAddress = sessionStorage.getItem('selectedAddress')
        return savedAddress ? JSON.parse(savedAddress) : '';
    }
    );

    const [totalPrice, setTotalPrice] = useState(0);
    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false)
    const [contentA, setContentA] = useState('initialA');
    const [contentB, setContentB] = useState('initialB');

    useEffect(() => {
        const calculateTotalPrice = () => {
            const newTotalPrice = cartItems.reduce((acc, item) => {
                return acc + item.price * item.quantity
            }, 0);
            setTotalPrice(newTotalPrice.toFixed(2))
        };
        calculateTotalPrice();
    }, [cartItems])

    const handleSelectedCard = (card) => {
        setSelectedCard(card)
        sessionStorage.setItem('selectedCard', JSON.stringify(card))
        handleCloseA()
    }

    const handleAddressSelected = (adress) => {
        setSelectedAddres(adress)
        sessionStorage.setItem('selectedAddress', JSON.stringify(adress))
        handleCloseB()
    }

    const handleCloseA = () => {
        setContentA('initialA')
        setShowA(false)
    }
    const handleShowA = () => setShowA(true)
    const handeBackToInitialA = () => {
        setContentA('initialA')
        setShowA(true)
    }

    const handleShowB = () => setShowB(true)
    const handleCloseB = () => {
        setContentB('initialB')
        setShowB(false)
    }
    const handeBackToInitialB = () => {
        setContentB('initialB')
        setShowB(true)
    }
    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }
    const addOrder = async () => {
        if (!user) {
            alert('Please a login')
            return;
        }
        try {
            const orderRef = collection(db, 'users', user.uid, 'orders')
            console.log(orderRef)
            const orderDetails = {
                items: cartItems,
                orderDate: new Date(),
                totalPrice,
                status: 'completed',
                address: selectedAddress,
                card: selectedCard,
            }
            const newDocRef = await addDoc(orderRef, orderDetails)
            navigate('/order-successful', {
                state: {
                    orderId: newDocRef.id,
                    totalPrice,
                }
            }
            )
        }
        catch (error) {
            console.log('Order add error:', error)
        }
    }

    return (
        <div className='container d-flex flex-column align-items-center '>
            <Card className="w-75 bg-light">
                {selectedCard ? (
                    <Card.Body className='d-flex flex-column w-100 border rounded'>
                        <div className=''>
                            <p className='text-warning text-end' onClick={handleShowA}>Add/Select</p>
                        </div>
                        <p><strong>Cardholder:</strong> {selectedCard.cardholderName}</p>
                        <p><strong>Card Number:</strong> **** {selectedCard.cardNumber}</p>
                        <p><strong>Expiration Date:</strong> {selectedCard.expirationDate}</p>
                    </Card.Body>


                ) : (
                    <Card className="border rounded mt-3 w-50 bg-light">
                        <Card.Body className='' >
                            <div>
                                <label htmlFor="creditCard">Choose a credit cart: </label>
                                <p className='text-warning justify-content-end' onClick={handleShowA}>Add/Select</p>
                            </div>
                        </Card.Body>
                    </Card>
                )}
                <Card className='w-100 h-25 rounded border bg-light'>
                    <p className='text-danger ms-auto' onClick={handleShowB}>Select Addres</p>
                    {selectedAddress && (
                        <Card.Body className='d-flex flex-column w-100'>
                            <p><strong>Adress Line</strong> {selectedAddress.streetAddress}</p>
                            <p><strong>City</strong> **** {selectedAddress.city}</p>
                            <p><strong>Zip Code:</strong> {selectedAddress.zipCode}</p>
                            <p><strong>Country</strong> {selectedAddress.country}</p>
                        </Card.Body>
                    )}

                </Card>
                <Card>

                    {totalPrice}
                    <Button
                        onClick={() => addOrder()}>
                        Complete Shopping
                    </Button>
                </Card>

            </Card>

            <Offcanvas show={showA} onHide={handleCloseA} placement='end'>
                <Offcanvas.Header closeButton />
                <Offcanvas.Body>
                    {contentA === 'initialA' && (
                        <div >
                            <div className='d-flex align-items-center'>
                                <Button variant='outline-warning'
                                    size='lg'
                                    onClick={() => setContentA('newA')}>
                                    + Add New Cart</Button>
                                <Offcanvas.Title className='ms-auto'>My Cart</Offcanvas.Title>
                            </div>

                            <div>
                                <ExistingCreditCard onSelectedCart={handleSelectedCard} />
                            </div>
                        </div>
                    )}
                    {contentA === 'newA' && (
                        <CreditCart onBackToOffCanvasMenuA={handeBackToInitialA} />
                    )}
                </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas show={showB} onHide={handleCloseB} placement='end'>
                <Offcanvas.Header closeButton />
                <Offcanvas.Body>
                    {contentB === 'initialB' && (
                        <div >
                            <div className='d-flex align-items-center'>
                                <Button variant='outline-warning'
                                    size='lg'
                                    onClick={() => setContentB('newB')}>
                                    + Add New Address</Button>
                                <Offcanvas.Title className='ms-auto'>My Address</Offcanvas.Title>
                            </div>

                            <div>
                                <ExistingAddress onSelectedAddress={handleAddressSelected} />
                            </div>
                        </div>
                    )}
                    {contentB === 'newB' && (
                        <Address onBackToOffCanvasMenuB={handeBackToInitialB} />
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </div >

    )
}

export default Payment