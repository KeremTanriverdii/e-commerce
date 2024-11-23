import React, { useEffect, useState } from 'react'
import '../css/Card.css'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, ButtonGroup, Alert, Row, Col } from 'react-bootstrap'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

function ProductPageCard({ productDetails, id }) {
    const [searchParams] = useSearchParams()
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(productDetails.variants[0]?.color || null);
    const [cartMessage, setCartMessage] = useState("");
    const [selectedVariant, setSelectedVariant] = useState(null);
    const navigate = useNavigate()
    const location = useLocation()
    const sizes = productDetails.sizes || [];
    const dispatch = useDispatch();

    const handleSize = (size) => {
        console.log('clicked size', size)
        setSelectedSize(size);
        setCartMessage("");
        updateUrl(size, selectedColor)

    }
    const handleColor = (color) => {
        const variant = productDetails.variants.find(variant => variant.color === color);
        setSelectedColor(color);
        setSelectedSize(null); // Yeni renk seçildiğinde beden sıfırlanır
        setSelectedVariant(variant); // Seçilen varyant bilgisi
        setCartMessage(''); // Hata mesajını sıfırla
        updateUrl(selectedSize, color)
    };

    const updateUrl = (size, color) => {
        const searchParams = new URLSearchParams(location.search)
        if (size) {
            searchParams.set('size', size)
            setSelectedSize(size)
        }
        if (color) {
            searchParams.set('color', color)
            setSelectedColor(color)

        }
        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        }, { replace: true })
    }
    useEffect(() => {
        const selectSizeUrl = searchParams.get('size')
        const selectColorUrl = searchParams.get('color')
        if (selectSizeUrl) {
            setSelectedSize(selectSizeUrl)
        }
        if (selectColorUrl) {
            setSelectedColor(selectColorUrl)
        }
        if (selectSizeUrl || selectColorUrl) {
            const variant = productDetails.variants.find(v => v.color === selectColorUrl)
            setSelectedVariant(variant)

        }
    }, [searchParams])

    const handleAddToCart = () => {
        if (!selectedSize) {
            setCartMessage('Please choose a size')
            return;
        }
        if (!selectedColor) {
            setCartMessage('Please choose a color')
            return
        }
        const selectedVariant = productDetails.variants.find(variant => variant.color === selectedColor)
        if (selectedVariant) {
            const variantId = selectedVariant.variantId
            const variantImageUrl = selectedVariant.imageUrl
            console.log(variantId)

            dispatch(addToCart({
                ...productDetails,
                selectedSize,
                selectedColor,
                id: variantId,
                price: productDetails.price,
                variantImageUrl: variantImageUrl
            }))

            setCartMessage(`Product (${productDetails.name})- ${selectedSize} - ${selectedColor} - ${selectedVariant} size add to cart succesfully`);
        } else {
            setCartMessage("`The selected size (${selectedSize}) and color (${selectedColor}) combination is out of stock.`");
        }
    }

    return (
        <Row >
            <Col sm={4} md={4} lg={4}>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    loop={true}
                    autoplay={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 0,
                        modifier: 1,
                    }}
                    pagination={{ clickable: true }}
                    navigation={{
                        clickable: true,
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next'
                    }}
                    modules={[Navigation, Pagination, EffectCoverflow]}
                    className='swiper-container'
                >
                    {selectedColor && (
                        <div>
                            <SwiperSlide className='d-flex justify-content-center'>
                                <img src={productDetails.variants.find(variant =>
                                    variant.color === selectedColor)?.imageUrl}
                                    width={600}
                                    height={800}
                                    className='img-fluid'
                                    alt={`product image +1`} />
                            </SwiperSlide>
                        </div>
                    )}
                    <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                            <ion-icon name='arrow-back-outline'></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow">

                            <ion-icon name='arrow-forward-outline'></ion-icon>
                        </div>
                        <div className='swiper-pagination'>
                        </div>
                    </div>
                </Swiper>
            </Col>

            <Col>
                <p className=''>variant:
                    <ButtonGroup className=' gap-3 mt-3 rounded'>
                        {productDetails.variants.map((item, index) => (
                            <Button
                                key={index}
                                onClick={() => handleColor(item.color)}
                                className=''>
                                {item.color}
                            </Button>
                        ))}
                    </ButtonGroup>
                </p>
                <ButtonGroup>
                    {sizes.map((sizeItem, index) => (
                        <Button
                            key={index}
                            className='mt-5 h-25'
                            variant={selectedSize === sizeItem ? 'primary' : 'outline-warning'}
                            onClick={() => handleSize(sizeItem)}>
                            {sizeItem}
                        </Button>
                    ))}
                </ButtonGroup>
                <div>
                    <Button variant='success'
                        onClick={handleAddToCart}>Add To Cart</Button>
                </div>
            </Col>

            <Col sm={1} md={2} lg={2}>

                {cartMessage && (
                    <div>

                        <Alert className='mt-3' variant={selectedSize ? "success" : "danger"}>
                            {cartMessage}
                        </Alert>
                    </div>
                )}
            </Col>
        </Row>
    )
}

export default ProductPageCard