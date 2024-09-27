import React from 'react'
import { Button, Card } from 'react-bootstrap'
import HeroShoes2 from '../assets/skechers2.jpg'
function Shoes() {
    return (
        <div>
            <Card className='w-25 align-items-center'>
                <Card.Body >
                    <Card.Img src={HeroShoes2} className='img-fluid' />
                    <Card.Title className='mt-2'>S25 Air
                    </Card.Title>
                    <Button className='d-flex ms-auto'>Buy $25</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Shoes