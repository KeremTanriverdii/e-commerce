import React, { useEffect, useState } from 'react';
import { Button, Container, Offcanvas, Navbar, Nav, NavDropdown, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faArrowLeft, faRightFromBracket, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';

function NavbarX() {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const uniqueItemCount = useSelector((state) => state.cart.uniqueItemCount);

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const categories = [
        {
            name: 'Men',
            subCategories: ['Clothes', 'Shoes', 'Accessories', 'Coats', 'Boots', 'Cap', 'men'],
        },
        {
            name: 'Kids',
            subCategories: ['Clothes', 'Shoes', 'Coats', 'Boots', 'kids'],
        },
        {
            name: 'Women',
            subCategories: ['Shoes', 'Accessories', 'Coats', 'Boots', 'Dress'],
        },
    ];

    const handleCloseOffcanvas = () => {
        setShowOffcanvas(false);
        setCurrentCategory(null);
    };
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
    };

    const handleBackToMainMenu = () => {
        setCurrentCategory(null); // Ana menüye dön
    };

    return (
        <>
            <Navbar expand="md" bg="light" className='px-3'>
                <Navbar.Brand href="/">Lorem Shopping</Navbar.Brand>

                {/* Mobile Review */}
                <div className="d-flex gap-2 align-items-center order-md-3">
                    <Link to="/basket">
                        <FontAwesomeIcon icon={faCartShopping} size="lg" className="p-2" />
                        {uniqueItemCount}
                    </Link>

                    {user ? (
                        <div className="d-flex gap-4 ms-auto">
                            <NavDropdown
                                title={<FontAwesomeIcon icon={faUser} size="lg" className="p-2 g-col-6"
                                />}
                                align={'end'}
                                menuVariant='light'
                            >
                                <NavDropdown.Item
                                    id="navbarScroll"
                                    className="d-flex flex-column gap-3"
                                >
                                    <Button
                                        variant='outline-primary'
                                        className='d-flex w-100 align-items-center justify-content-between'
                                        onClick={logOut}
                                    >Log Out
                                        <FontAwesomeIcon icon={faRightFromBracket} size='sm'
                                            className='g-col-6' />

                                    </Button>
                                    <NavDropdown.Divider />
                                    <Button
                                        variant='outline-primary'
                                        className='d-flex w-100 justify-content-between align-items-center'
                                        onClick={() => navigate('/order-history')}>
                                        Orders
                                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: '#FFD4B3' }}
                                            size='sm'
                                            className='g-col-6'
                                        />
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    ) : (<><Link to="/login">
                        <FontAwesomeIcon icon={faUser} size="lg" className="p-2" />
                    </Link></>)}
                </div>


                <Navbar.Toggle aria-controls="navbarScroll" onClick={handleShowOffcanvas} placement='end' />
                {isMobile ? (
                    <>
                        <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="start">
                            <Offcanvas.Header closeButton>
                                {currentCategory ? (
                                    <Offcanvas.Title onClick={handleBackToMainMenu} style={{ cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back to Categories
                                    </Offcanvas.Title>
                                ) : (
                                    <Offcanvas.Title>Categories</Offcanvas.Title>
                                )}
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                {!currentCategory ? (
                                    categories.map((category, idx) => (
                                        <div key={idx}>
                                            <h6 onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer' }}>
                                                {category.name}
                                            </h6>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <h6>{currentCategory.name} Categories</h6>
                                        <ul>
                                            {currentCategory.subCategories.map((subCategory, subIdx) => (
                                                <li key={subIdx}>
                                                    <Link
                                                        to={`/category/${currentCategory.name.toLowerCase()}/${subCategory.toLowerCase()}`}
                                                        onClick={handleCloseOffcanvas}
                                                    >
                                                        {subCategory}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Offcanvas.Body>
                        </Offcanvas>
                    </>
                ) : (
                    <Nav className="mx-auto gap-4">
                        {categories.map((category, index) => (
                            <div key={index} className='dropdown-container'>
                                <NavDropdown
                                    className='w-100'
                                    title={category.name}
                                    drop='center'
                                >
                                    <div className='mega-menu-content'>
                                        {category.subCategories.map((subCategory, subIdx) => (
                                            <div key={`${category.name}-${subIdx}`} className="mega-menu-item" >
                                                <NavDropdown.Item
                                                    className=''
                                                    as={Link}
                                                    to={`/category/${category.name.toLowerCase()}/${subCategory.toLowerCase()}`}
                                                >
                                                    {subCategory}
                                                </NavDropdown.Item>
                                            </div>
                                        ))}
                                    </div>
                                </NavDropdown>
                            </div>
                        ))}
                    </Nav>
                )}
            </Navbar>
        </>
    );
}

export default NavbarX;
