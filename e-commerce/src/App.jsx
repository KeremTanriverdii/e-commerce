import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import NavbarX from './components/NavbarX'
import { Col, Container, Row } from 'react-bootstrap'
import Hero from './assets/Adidas1.jpg'
import HeroShoes from './assets/skechers1.jpg'
import Clothes from './Category/Clothes.jsx';
import Shoes from './Category/Shoes.jsx'
import ImageZoom from './components/ImageZoom.jsx'
import MenLayout from './Category/Men/MenLayout.jsx';


function App() {
  return (
    <BrowserRouter>
      <NavbarX />
      <Container>
        <Row className='mt-5'>
          <Col className='mt-5'>

          </Col>

          <Col className='mt-5'>
            <ImageZoom src={Hero} alt="Clothes" className='img-fluid' />
          </Col>
        </Row>

      </Container >

      <Routes>
        <Route path="/Shoes" element={<Shoes />} />
        <Route path="/Clothes" element={<Clothes />} />
        <Route path='/MenLayout' element={<MenLayout />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
