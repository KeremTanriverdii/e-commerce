import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProductPage() {
    const { categoryName, subCategoryName, productId } = useParams();

    useEffect(() => {

    }, [productId])
    return (
        <div>
            <h1>Category: {categoryName}</h1>
        </div>
    )
}

export default ProductPage