import React from 'react'
import Product from '../../components/ProductInterface'

export default function Product({ product }: { product: Product }) {
    return (
        <div>{product.description.EN}</div>
    )
}
