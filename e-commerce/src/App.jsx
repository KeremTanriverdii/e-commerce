import React from 'react';
import './App.css'
import { Outlet } from 'react-router-dom';
import NavbarX from './components/NavbarX'
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
function App() {
  return (
    <>
      <NavbarX />
      <main className='container'>
        <div  className='content'>
        <Outlet/>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
