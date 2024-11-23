import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../store/Firebase';
import ProductCard from '../components/ProductCard';

function CategoryPage() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'products'), where('productsObj.categoryId', '==', categoryId))
                const querySnapshot = await getDocs(q);
                const getProducts = querySnapshot.docs.map((doc) => {
                    const data = doc.data()
                    return data.productsObj
                })
                setProducts(getProducts);
            } catch (error) {
                console.log('Get a Error ', error)
            }
        }
        fetchData()
    }, [categoryId, db])

    return (
        <>
            <div className='product-list'>
                {products.map((product, index) => (
                    <Link key={index} to={`/product/${product.slug}`}>
                        <ProductCard productDetails={product} key={index} />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default CategoryPage