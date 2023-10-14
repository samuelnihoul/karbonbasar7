import React, { useState, useRef } from 'react';
import { Card, CardContent, CardActions, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PayHBAR from './PayHBAR';

export default function Product({ product }) {
  const { i18n, t } = useTranslation(['product']);
  const [quantity, setQuantity] = useState(1);
  const cardRef = useRef(null);
  const productName = i18n.language === 'fr' && product.namefr ? product.namefr : product.name;
  const productDescription = i18n.language === 'fr' ? product.descriptionfr : product.description;
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
      < img className="w-4/5 h-4/5" src={product.image} alt={productName} />
      <CardContent>
        <p className="text-[2rem]">{productName}</p>
        <span className="p-10 text-m">${product.price}/0.1 CO2e tonne</span>
        <div className="my-4">
          <span className="mainColor">{t('quantity')}</span>
          <input
            className="placeholder-black text-black"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>

        <div>
          {productDescription}
        </div>

        <div className="my-4">
          {product.tags.map(chip => <Chip label={t(chip)} key={chip} color="primary" />)}
        </div>

        <div>
          <span className="mainColor">{t('availablestock')}</span> {product.stock}
          <br />
          <span className="mainColor">{t('methodology')}</span> {product.methodology}
        </div>
      </CardContent>

      <CardActions disableSpacing>
        <PayHBAR quantity={quantity} price={product.price} productName={product.name} />
      </CardActions>
    </Card >
  );
};

