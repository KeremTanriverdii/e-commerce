import React, { useRef, useState } from 'react'
import '../css/ImageZoom.css'

function ImageZoom({ src, alt }) {
    const [isZoomed, setIsZoomed] = useState(false)
    const handleZoom = () => {
        setIsZoomed(!isZoomed);
    }
    // const imageZoomRef = useRef(null);
    // const [zoomStyle, setZoomStyle] = useState({ display: 'none', zoomX: '0%', zoomY: '0%' });

    // const handleMouseMove = (event) => {
    //     const imageZoom = imageZoomRef.current;
    //     if (imageZoom) {
    //         const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = imageZoom;
    //         const pointerX = ((event.pageX - offsetLeft) * 100) / offsetWidth;
    //         const pointerY = ((event.pageY - offsetTop) * 100) / offsetHeight;

    //         setZoomStyle({
    //             display: 'block',
    //             zoomX: `${pointerX}%`,
    //             zoomY: `${pointerY}%`,
    //         });
    //     }
    // };

    // const handleMouseOut = () => {
    //     setZoomStyle({ display: 'none', zoomX: '0%', zoomY: '0%' });
    // };

    return (
        <div onMouseEnter={handleZoom} onMouseOut={handleZoom}>
            <img src={src} alt={alt} width={500} height={500}
                style={{ transform: isZoomed ? 'scale(1.50)' : 'scale(1)' }} />
        </div>
        // <div
        //     ref={imageZoomRef}
        //     className=""
        //     onMouseMove={handleMouseMove}
        //     onMouseOut={handleMouseOut}
        //     style={{
        //         '--zoom-x': zoomStyle.zoomX,
        //         '--zoom-y': zoomStyle.zoomY,
        //         '--display': zoomStyle.display,
        //     }}
        // >
        //     <img src={src} alt={alt} className="zoom-image"
        //         style={{ transform: `scale(${zoomScale})` }} />
        // </div>
    );
}

export default ImageZoom