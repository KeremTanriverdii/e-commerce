import React, { useState } from 'react';
import { Button, Container, Offcanvas, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';

function NavbarX() {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const uniqueItemCount = useSelector((state) => state.cart.uniqueItemCount);

    // Offcanvas state
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null); // Ana kategori state

    const categories = [
        {
            name: 'Men',
            subCategories: ['Clothes', 'Shoes', 'Accessories', 'Coats', 'Boots', 'Cap', 'All Products'],
        },
        {
            name: 'Kids',
            subCategories: ['Clothes', 'Shoes', 'Coats', 'Boots', 'All Products'],
        },
        {
            name: 'Women',
            subCategories: ['Shoes', 'Accessories', 'Coats', 'Boots', 'Dress'],
        },
    ];

    // Offcanvas açma ve kapama işlemleri
    const handleCloseOffcanvas = () => {
        setShowOffcanvas(false);
        setCurrentCategory(null); // Kapatıldığında ana menüye dön
    };
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    // Kategoriye tıklama işlemi (Alt kategorilere geçiş)
    const handleCategoryClick = (category) => {
        setCurrentCategory(category); // Seçilen kategoriyi güncelle
    };

    // Geri dönme işlemi (Ana menüye dön)
    const handleBackToMainMenu = () => {
        setCurrentCategory(null); // Ana menüye dön
    };

    return (
        <>
            <Navbar expand="lg" bg="white">
                <Container className="nav-container">
                    <Navbar.Brand href="/">Lorem Shopping</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={handleShowOffcanvas} />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-center gap-5">
                        <Nav className="me-auto">
                            {/* Masaüstü için Dropdown Menü */}
                            {categories.map((category, idx) => (
                                <NavDropdown title={category.name} id={`nav-dropdown-${idx}`} key={idx}>
                                    {category.subCategories.map((subCategory, subIdx) => (
                                        <NavDropdown.Item
                                            as={Link}
                                            to={`/category/${category.name.toLowerCase()}/${subCategory.toLowerCase()}`}
                                            key={subIdx}
                                        >
                                            {subCategory}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ))}
                        </Nav>

                        {/* Kullanıcı ve Sepet İkonları */}
                        <div className="d-flex">
                            {user ? (
                                <div className="d-flex gap-4 ms-auto">
                                    <Link to={`/basket`}>
                                        <span>
                                            <FontAwesomeIcon icon={faCartShopping} size="2x" className="p-2 g-col-6" />
                                            {uniqueItemCount}
                                        </span>
                                    </Link>
                                    <NavDropdown
                                        title={<FontAwesomeIcon icon={faUser} size="2x" className="p-2 g-col-6" />}
                                    >
                                        <NavDropdown.Item id="navbarScroll">
                                            <div className="d-flex flex-column gap-2">
                                                <Button onClick={logOut}>Log Out</Button>
                                                <Button onClick={() => navigate('/order-history')}>Order History</Button>
                                            </div>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            ) : (
                                <div className="d-flex gap-2 align-items-center">
                                    <Link to="/login">
                                        <Button className="d-flex">Sign in or <span>Sign up</span></Button>
                                    </Link>
                                    <Link to={`/basket`}>
                                        <span>
                                            <FontAwesomeIcon icon={faCartShopping} size="2x" className="p-2 g-col-6" />
                                            {uniqueItemCount}
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Offcanvas Menü - Mobil ve Tablet Görünümü */}
            <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="start">
                <Offcanvas.Header closeButton>
                    {/* Eğer bir kategori seçiliyse geri dönme butonu, değilse başlık */}
                    {currentCategory ? (
                        <Offcanvas.Title onClick={handleBackToMainMenu} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back to Categories
                        </Offcanvas.Title>
                    ) : (
                        <Offcanvas.Title>Categories</Offcanvas.Title>
                    )}
                </Offcanvas.Header>

                <Offcanvas.Body>
                    {/* Ana menüdeysek tüm kategorileri göster, alt kategoriye geçtiysek sadece o kategori */}
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
                                            onClick={handleCloseOffcanvas} // Seçildiğinde Offcanvas'ı kapat
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
    );
}

export default NavbarX;
