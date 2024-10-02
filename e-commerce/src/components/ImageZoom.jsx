import React, { useRef, useState } from 'react'
import '../css/ImageZoom.css'
import { Link } from 'react-router-dom';

function ImageZoom({ src, alt = 'Zoomable Image', zoomScale = 2, className = '' }) {
    const imageZoomRef = useRef(null);
    const [zoomStyle, setZoomStyle] = useState({ display: 'none', zoomX: '0%', zoomY: '0%' });

    const handleMouseMove = (event) => {
        const imageZoom = imageZoomRef.current;
        if (imageZoom) {
            const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = imageZoom;
            const pointerX = ((event.pageX - offsetLeft) * 100) / offsetWidth;
            const pointerY = ((event.pageY - offsetTop) * 100) / offsetWidth;

            setZoomStyle({
                display: 'block',
                zoomX: `${pointerX}%`,
                zoomY: `${pointerY}%`,
            });
        }
    };

    const handleMouseOut = () => {
        setZoomStyle({ display: 'none', zoomX: '0%', zoomY: '0%' });
    }
    return (
        <div
            ref={imageZoomRef}
            className={`image-zoom-container ${className}`}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
            style={{
                '--zoom-x': zoomStyle.zoomX,
                '--zoom-y': zoomStyle.zoomY,
                '--display': zoomStyle.display,
            }}
        >
            <img className="zoom-image" style={{ transform: `scale(${zoomScale})` }} />
            <div
                className="zoom-preview"
                style={{
                    display: zoomStyle.display,
                    backgroundImage: `url(${src})`,
                    backgroundPosition: zoomStyle.zoomX + ' ' + zoomStyle.zoomY,
                    transform: `scale(${zoomScale})`,
                }}
            />
        </div>
    )
}

export default ImageZoom