import Product from './ProductInterface'
import Chip from '@mui/material/Chip'
import React from 'react'
function handleQuantityChange() {

}
export default function ProductOverview(product: Product, quantity: number) {
    return (<>
        <p className="text-[2rem]">{product.name.FR}</p>
        <span className="p-10 text-m">${product.price}/0.1 CO2e tonne</span>
        <div className="my-4">
            <span className="mainColor">{'Quantity'}</span>
            <input
                className="placeholder-black text-black"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
            />
        </div>

        <div>
            {product.description.FR}
        </div>

        <div className="my-4">
            {product.tags.map(chip => <Chip label={chip} key={chip} color="primary" />)}
        </div>

        <div>
            <span className="mainColor">{'Available Stock'}</span> {product.stock}
            <br />
            <span className="mainColor">{'Methodology'}</span> {product.methodology}
        </div>
    </>
    )
}