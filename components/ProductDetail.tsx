import Product from './ProductInterface'
import React from 'react'
export default function ProductDetail(product: Product) {

    return (
        <>
            <p>{product.description.FR}</p>
        </>
    )

}