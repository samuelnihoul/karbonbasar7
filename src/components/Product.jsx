import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Chip } from '@mui/material';
import { sendTransaction } from './HashButton';
import { useTranslation } from 'react-i18next'
import Checkout from '../pages/checkout'
const Product = ({ product }) => {
  const { i18n, t } = useTranslation(['product'])
  const [quantity, setQuantity] = useState(1);
  const [isCheckout, setIsCheckout] = useState(false);
  const cardRef = React.useRef(null);
  return (
    <Card ref={cardRef} style={{ padding: "10 10 10 10" }}>{
      !isCheckout ? <>
        <img style={{ maxWidth: '30rem', maxHeight: '30rem' }} loading='lazy' src={product.image} />
        <CardContent>
          <div >
            <p className="text-[2rem]">
              {i18n.language == 'fr' ? product.namefr ? product.namefr : product.name : product.name}
            </p>
            <span style={{ padding: '10px', fontSize: '14px' }}>
              {product.price}${"/0.1 CO2e tonne"}
            </span>
            <br /><br />
            <span className='mainColor'>{t('quantity')}</span><input className='placeholder-black t-black' style={{ color: 'black' }} type='number' value={quantity} onChange={(e) => { setQuantity(e.target.valueAsNumber > 0 ? e.target.valueAsNumber : quantity) }} />

          </div>

          {i18n.language == 'fr' ? product.descriptionfr : product.description}<br />
          <br />
          {product.tags.map((chip) => {
            return <Chip label={t(chip)} key={chip} color={'primary'}></Chip>
          })}<br /><br />
          <span >
            <span className="mainColor">{t('availablestock')}</span> {product.stock}<br></br>
            <span className='mainColor'>{t('methodology')}</span>{product.methodology}</span>
        </CardContent>
        <CardActions disableSpacing >
          <Chip label={t('payinhbar')} color='secondary' onClick={() => { if (product.stock) { alert(t('ifyou')); pay(product.price * quantity) } else alert(t('nomore')) }}></Chip>
          <Chip label={t("subscribe")} color='secondary' onClick={() => alert(t('sorrysubscriptions'))} />
          <Chip label={t("payinfiat")} color='secondary' onClick={() => {
            if (product.stock !== '0') {
              setIsCheckout(true); window.scrollTo({ left: 0, top: cardRef.current.offsetTop - 200, behavior: 'smooth' })
            }
            else alert(t('nomore'))
          }
          } />
        </CardActions>
      </>
        : <> <Checkout quantity={quantity} product={product} ></Checkout><button className='m-10 rounded-xl bg-black text-white pl-5 pr-5' onClick={() => setIsCheckout(false)}>{t('backtoproduct')}</button></>}

    </Card >
  )
};

export default Product;

