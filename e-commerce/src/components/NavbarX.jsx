import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../store/Firebase'

function NavbarX() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Category'));
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productList);
            } catch (error) {
                console.log('Veri Hatası', error)
            }
        }
        fetchData();
    }, [])

    const returnCategories = (category) => {
        return products.length > 0 ? (
            Object.keys(products[0][category]).map((item) => (
                <NavDropdown.Item key={item} >
                    <div className='nav-item'>
                        {item} {/* item: Shoes, Clothes, vb. */}
                    </div>
                </NavDropdown.Item>
            ))
        ) : (
            <NavDropdown.Item>Loading...</NavDropdown.Item>
        )
    }
    return (
        <React.Fragment>
            <Navbar expand="lg" bg='white' fixed='top'>
                <Container>
                    <Navbar.Brand href='/App'>Lorem Shopping
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        className='justify-content-center gap-4'
                        id="basic-navbar-nav">

                        <NavDropdown title='Kids' drop='center'>
                            <div className='mega-menu' >
                                {returnCategories('Kid')}
                            </div>
                        </NavDropdown>


                        <NavDropdown title="Men" drop='center'>
                            <div className='mega-menu '>
                                {returnCategories('Men')}
                            </div>
                        </NavDropdown>

                        <NavDropdown title="Women" drop='center'><div className='mega-menu'>
                            {returnCategories('Women')}
                        </div>
                        </NavDropdown>
                    </Navbar.Collapse>

                    <Navbar.Collapse className='grid gap-5 '>
                        <div className='mx-auto'>
                            <FontAwesomeIcon icon={faUser} size='2x' className='p-2 g-col-6' />
                            <FontAwesomeIcon icon={faCartShopping} size='2x' className='p-2 g-col-6' />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment >

    )
}

export default NavbarX