import React from 'react'
import NavbarX from '../components/NavbarX'
import '../App.css'
import { Container } from 'react-bootstrap'
import pictureOne from '../assets/output.jpg'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div className='d-flex'>
            <Link to={`category/kids`} className='mx-auto mt-4'>
                <img src={pictureOne} alt="hero_image" className='img-fluid'/>
            </Link>
        </div>
    )
}

export default HomePage