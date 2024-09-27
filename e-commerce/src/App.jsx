import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import NavbarX from './components/NavbarX'
import { Col, Container, Row } from 'react-bootstrap'
import Hero from './assets/Adidas1.jpg'
import HeroShoes from './assets/skechers1.jpg'
import Clothes from './Category/Clothes.jsx';
import Shoes from './Category/Shoes.jsx'
import ImageZoom from './components/ImageZoom.jsx'


function App() {
  return (
    <>
      <NavbarX />
      <Container>
        <Row className='mt-5'>
          <Col className='mt-5'>
            <Link to='/shoes' >
              <ImageZoom src={HeroShoes} alt="Hero" className='img-fluid' zoomScale={2} />
            </Link>
          </Col>

          <Col className='mt-5'>
            <Link to='/clothes'>
              <ImageZoom src={Hero} alt="Clothes" className='img-fluid' zoomScale={2} />
            </Link>
          </Col>
        </Row>

      </Container >

      <Routes>
        <Route path="./category/shoes" element={<Shoes />} />
        <Route path="/category/clothes" element={<Clothes />} />
      </Routes>

    </>

  )
}

export default App
