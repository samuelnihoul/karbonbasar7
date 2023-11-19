'use client'
import React, { useState, useRef } from 'react';
import PayHBAR from './Pay';
import ProductInterface from './ProductInterface'

export default function Product({ product }: { product: ProductInterface }) {
  const [quantity, setQuantity] = useState(1);
  const cardRef = useRef(null);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.valueAsNumber > 0 ? e.target.valueAsNumber : quantity);
  };

  return (
    <div className='bg-accent rounded-lg shadow-lg shadow-orange-400 p-[1rem] '>
      < img className="h-[10rem] m-auto rounded-md" src={product.image} alt={product.name.EN} />
      <div>
        <p className="text-[2rem]">{product.name.EN}</p>
        <span className="p-10 text-m">${product.price}/0.1 CO2e ton</span>
        <div className="my-4">
          <span className="mainColor">{'Quantity: '}</span>
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
          {product.tags.map(chip => <span key={chip} className='rounded-full bg-white m-[1rem] px-[1rem] py-[0.5rem]'>{chip}</span>)}
        </div>
        <div>
          <span className="mainColor">{'Available Stock: '}</span> {product.stock}
          <br />
          <span className="mainColor">{'Methodology: '}</span> {product.methodology}
        </div>
      </div>
      <div >
        <PayHBAR quantity={quantity} price={product.price} productName={product.name.EN} />
      </div>
    </div >
  );
};

