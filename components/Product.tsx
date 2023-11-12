'use client'
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardActions, Chip } from '@mui/material';
import PayHBAR from './Pay';
import ProductInterface from './ProductInterface'

export default function Product({ product }: { product: ProductInterface }) {
  const [quantity, setQuantity] = useState(1);
  const cardRef = useRef(null);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.valueAsNumber > 0 ? e.target.valueAsNumber : quantity);
  };

  return (
    <Card ref={cardRef} sx={
      {
        padding: '1rem',
        boxShadow: '0.5rem white',
      }
    }>
      < img className="w-4/5 h-4/5" src={product.image} alt={product.name.EN} />
      <CardContent>
        <p className="text-[2rem]">{product.name.EN}</p>
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
      </CardContent>
      <CardActions disableSpacing>
        <PayHBAR quantity={quantity} price={product.price} productName={product.name.EN} />
      </CardActions>
    </Card >
  );
};

