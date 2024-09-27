import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../store/Firebase';
import useDropdown from '../hooks/useDropdown';


function NavbarX() {
    const { activeDropdown, toggleDropdown } = useDropdown();
    // const [productsData, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const querySnapshot = await getDocs(collection(db, 'products'));
    //             const products = querySnapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 ...doc.data(),
    //             }));
    //             setProducts(products)
    //         } catch (error) {
    //             console.log('veri çekme hatası', error)
    //         }
    //     };
    //     fetchProducts();
    // }, []);
    // console.log(productsData)

    return (
        <React.Fragment>
            <Navbar expand="lg" bg='white' fixed='top'>
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        className='gap-3'
                        id="basic-navbar-nav">

                        <NavDropdown title='Kids'
                            drop='center'
                            onMouseEnter={() => toggleDropdown('Kids')}
                            onMouseLeave={() => toggleDropdown(null)}
                            show={activeDropdown === 'Kids'}>
                            <div className='mega-menu mx-auto'>
                                <Row>
                                    <Col>
                                        <h5>Summer 2024</h5>
                                        <React.Fragment>
                                            <NavDropdown.Item href="#action/3.2">Clothing
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Panths</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Shoes</NavDropdown.Item>
                                        </React.Fragment>
                                    </Col>

                                    <Col>
                                        <h5>Men </h5>
                                        <React.Fragment>
                                            <NavDropdown.Item href="#action/3.2">Clothing
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Panths</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Shoes</NavDropdown.Item>
                                        </React.Fragment>
                                    </Col>

                                    <Col>
                                        <h5>Women </h5>
                                        <React.Fragment>
                                            <NavDropdown.Item href="#action/3.2">Clothing
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Panths</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Shoes</NavDropdown.Item>
                                        </React.Fragment>
                                    </Col>
                                </Row>
                            </div>
                        </NavDropdown>

                        <NavDropdown title="Men"
                            drop='center'
                            onMouseEnter={() => toggleDropdown('Men')}
                            onMouseLeave={() => toggleDropdown(null)}
                            show={activeDropdown === 'Men'}
                        >
                            <div className='mega-menu '>
                                <Row>
                                    <Col>
                                        <h5>Summer</h5>
                                        <NavDropdown.Item href="#action/3.1">Clothes</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Shoes
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Panths</NavDropdown.Item>
                                    </Col>
                                    <Col>
                                        <h5>Winter</h5>
                                        <NavDropdown.Item href="#action/3.4">
                                            Clothes
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">
                                            Coat
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">
                                            Boat
                                        </NavDropdown.Item>
                                    </Col>
                                    <Col>
                                        <h5>Trend 2024</h5>
                                        <NavDropdown.Item href="#action/3.5">Cap</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.6">Accessory</NavDropdown.Item>
                                        <NavDropdown.Item href='#action/3.7'>Shoes</NavDropdown.Item>
                                    </Col>
                                </Row>
                            </div>
                        </NavDropdown>

                        <NavDropdown title="Women"
                            drop='center'
                            className='nav-dropdown mega-menu-dropdown'
                            onMouseEnter={() => toggleDropdown('Women')}
                            onMouseLeave={() => toggleDropdown(null)}
                            show={activeDropdown === 'Women'}>
                            <div className='mega-menu'>
                                <Row>
                                    < Col>
                                        <h5>Summer</h5>
                                        <NavDropdown.Item href="#action/3.1">Clothes</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Shoes
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Panths</NavDropdown.Item>
                                    </Col>
                                    <Col>
                                        <h5>Winter</h5>
                                        <NavDropdown.Item href="#action/3.4">
                                            Clothes
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">
                                            Coat
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">
                                            Boat
                                        </NavDropdown.Item>
                                    </Col>
                                    <Col>
                                        <h5>Trend 2024</h5>
                                        <NavDropdown.Item href="#action/3.5">Cap</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.6">Accessory</NavDropdown.Item>
                                        <NavDropdown.Item href='#action/3.7'>Shoes</NavDropdown.Item>
                                    </Col>
                                </Row>
                            </div>
                        </NavDropdown>
                    </Navbar.Collapse>

                    <Navbar.Collapse className='grid gap-3 '>
                        <div className='mx-auto '>

                            <FontAwesomeIcon icon={faUser} className='p-2 g-col-6' />
                            <FontAwesomeIcon icon={faCartShopping} className='p-2 g-col-6' />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment >
    )
}

export default NavbarX