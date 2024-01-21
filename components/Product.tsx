'use client'
import React, { useState, useRef } from 'react';
import PayHBAR from './PayNFT';
import ProductInterface from './ProductInterface'
import PaySticker from './PaySticker'
export default function Product({ product }: { product: ProductInterface }) {
  const [quantity, setQuantity] = useState(0.1);
  const [showPay, setShowPay] = useState(false)
  const [isNFT, setIsNFT] = useState(false)
  const cardRef = useRef(null);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.valueAsNumber > 0 ? e.target.valueAsNumber : quantity);
  };

  return (
    <div className='rounded-lg shadow-lg shadow-[--shadow] p-[1rem] flex-1 flex flex-col gap-[1rem]'>
      < img className=" rounded-md" src={product.image} alt={product.name.EN} />
      <div>
        <p className="text-[2rem]">{product.name.EN}</p>
        <span className=" text-m">{product.price}$/CO2 tonne</span>
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
          {product.description.EN}
        </div>
        <div className="my-4">
          {product.tags.map(chip => <span key={chip} className='rounded-full border-[--shadow] border-2 px-[1rem] py-[0.5rem] m-[0.5rem]'>{chip}</span>)}
        </div>
        <div>
          <span className="mainColor">{'Available Stock: '}</span> {product.stock}
          <br />
          <span className="mainColor">{'Methodology: '}</span> {product.methodology}
        </div>
      </div>
      {!showPay ?
        <>
          <button className="text-[--accent]" onClick={() => { setShowPay(true); setIsNFT(true) }}>Checkout (NFT)</button>
          <button className='text-[--accent]' onClick={() => { setShowPay(true); setIsNFT(false) }}>Checkout (Sticker)</button>
        </>
        :
        <>
          {isNFT ? <PayHBAR quantity={quantity} price={product.price} productName={product.name.EN} /> : <PaySticker amount={quantity * product.price} currency='USD' onSuccess={() => alert('Payment successful')}></PaySticker>}
          <button onClick={() => { setShowPay(false) }}>Cancel</button>
        </>
      }
    </div >
  );
};

