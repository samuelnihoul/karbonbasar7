import React, { useState, useRef } from 'react';
import { Card, CardContent, CardActions, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Checkout from '../pages/checkout';

const Product = ({ product }) => {
  const { i18n, t } = useTranslation(['product']);
  const [quantity, setQuantity] = useState(1);
  const [isCheckout, setIsCheckout] = useState(false);
  const cardRef = useRef(null);

  const productName = i18n.language === 'fr' && product.namefr ? product.namefr : product.name;
  const productDescription = i18n.language === 'fr' ? product.descriptionfr : product.description;

  const handleQuantityChange = (e) => {
    setQuantity(e.target.valueAsNumber > 0 ? e.target.valueAsNumber : quantity);
  };

  return (
    <Card ref={cardRef} className="p-10">
      {!isCheckout ? (
        <>
          <img className="max-w-[30rem] max-h-[30rem] lazy" src={product.image} alt={productName} />

          <CardContent>
            <p className="text-[2rem]">{productName}</p>
            <span className="p-10 text-sm">{product.price}$"/0.1 CO2e tonne"</span>

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
            {/*... similar adjustments to the Chip components */}
          </CardActions>
        </>
      ) : (
        <>
          <Checkout quantity={quantity} product={product} />
          <button
            className="m-10 rounded-xl bg-black text-white px-5"
            onClick={() => setIsCheckout(false)}
          >
            {t('backtoproduct')}
          </button>
        </>
      )}
    </Card>
  );
};

export default Product;
