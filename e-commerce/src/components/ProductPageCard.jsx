import React, { useEffect, useState } from 'react'
import '../css/Card.css'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, ButtonGroup, Alert, Row, Col, Accordion } from 'react-bootstrap'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

function ProductPageCard({ productDetails, id }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(productDetails.variants[0]?.color || null);
  const [selectedImage, setSelectedImage] = useState(productDetails.variants[0].imageUrl);
  const [selectedVariant, setSelectedVariant] = useState(null);
  
  const [cartMessage, setCartMessage] = useState("");
  const [showAlet ,setShowAlert] = useState(false)
  
  const sizes = productDetails.sizes || [];
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
    const location = useLocation()
  
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
        setSelectedSize(null); 
        setSelectedVariant(variant); 
        setCartMessage(''); 
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
        const selectedVariant = productDetails.variants.find((variant) => {
            return (
                variant.color === selectedColor && 
                productDetails.sizes.includes(selectedSize)
            );
        });
    
        if (selectedVariant) {
            const variantId = selectedVariant.variantId
            const variantImageUrl = selectedVariant.imageUrl
            console.log(variantImageUrl)

            dispatch(addToCart({
                ...productDetails,
                selectedSize,
                selectedColor,
                id: selectedVariant.variantId,
                price: productDetails.price,
                variantImageUrl: variantImageUrl
            }))

            setCartMessage(`Product ${productDetails.name}- ${selectedSize} - ${selectedColor} size add to cart succesfully`);
            setShowAlert(true)

            setTimeout(() => {
              setShowAlert(false);
            }, 3000)
        
        } else {
            setCartMessage(`The selected size : ${selectedSize} and color : ${selectedColor} combination is out of stock.`);
            setShowAlert(true)

            setTimeout(() => {
              setShowAlert(false);
            }, 2300)
        }
    }

    return (
        <Row className="mt-3">
        {/* Sol Tarafta - Ürün Görselleri */}
        <Col sm={12} md={7} lg={6} className="d-flex justify-content-center align-items-center position-relative">
          <img
            src={selectedImage}
            alt="Product"
            className="img-fluid"
            style={{ width: '100%', height: 'auto' }}
          />
          {/* Sağda Thumbnail Resimler */}
         
        </Col>
  
        {/* Sağ Tarafta - Ürün Bilgileri ve Seçenekler */}
        <Col sm={12} md={5} lg={6} className="d-flex flex-column mt-3">
          {/* Ürün Başlık ve Açıklama */}
          <div className="product-details mb-3">
            <h3 className="font-weight-bold">{productDetails.name}</h3>
            <h4 className="font-weight-bold">${productDetails.price}</h4>
          </div>
  
          {/* Beden Seçenekleri */}
          <div className="mb-3">
          <p>Variants:</p>
         
          {productDetails.variants.map((item,index) => (
              <ul className='d-inline'  key={index}>
                <img
                  src={item.imageUrl}
                  alt={`Thumbnail`}
                  className=" img-fluid "
                  style={{ width: '60px', height: '80px', cursor: 'pointer' }}
                  onClick={() => handleColor(item.color)}
                />
                </ul>
              ))} 
          </div>

            <div className='mt-3'>
            <p className="mb-2"><strong>Size:</strong></p>
            <ButtonGroup className="gap-2">
              {sizes.map((sizeItem, index) => (
                <Button
                  key={index}
                  variant={selectedSize === sizeItem ? "primary" : "outline-secondary"}
                  onClick={() => handleSize(sizeItem)}
                  className="px-2 py-2"
                >
                  {sizeItem}
                </Button>
              ))}
            </ButtonGroup>
            </div>
          {/* Fiyat ve Sepete Ekle Butonu */}
          <div className="d-flex justify-content-end w-100 align-items-center mt-2">
            
            <Button 
            className='p-3'
            variant="success" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
          {showAlet && (
                <Alert className='mt-3' 
                variant={selectedSize ? 'success' : 'danger'}
                onClose={() => setShowAlert(false)}
                dismissible >
                    {cartMessage}
                </Alert>
            )}
            <div>
                <Accordion defaultActiveKey={0} className='mt-3'>
                    <Accordion.Item eventKey='0'>
                    <Accordion.Header>Product Features</Accordion.Header>
                    <Accordion.Body className='h-100' >
                    <ol className='d-flex flex-column gap-4'>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.quam sequi 
                        sapiente voluptates,
                    </li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                         Doloremque quam sequi sapiente voluptates, explicabo qui quaerat!
                          Et quos quis.
                    </li>
                    <li>Doloremque quam sequi sapiente voluptates, explicabo qui quaerat!
                    Et quos quis iure, corrupti magnam nostrum velit, ullam non provident</li>
                    <li>Doloremque quam sequi sapiente voluptates, explicabo qui quaerat!
                    Et quos quis iure, corrupti magnam nostrum velit, ullam non provident</li>
                </ol>
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </Col>
        
      </Row>
    )
}

export default ProductPageCard