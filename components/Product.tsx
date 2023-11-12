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
      </CardContent>

      <CardActions disableSpacing>
        <PayHBAR quantity={quantity} price={product.price} productName={product.name.EN} />
      </CardActions>
    </Card >
  );
};

