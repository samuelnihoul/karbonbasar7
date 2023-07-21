import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Product from '../components/Product';
import { db } from '../lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Counter from '../components/Counter';
import { useTranslation } from 'react-i18next'
// transfer the price to the checkout page using React state
const Products = () => {
  const { t } = useTranslation(["offset"])
  const [products, setProducts] = useState([])
  //fetch from cloud firestore
  async function fetchProducts() {
    const snapshot = await getDocs(collection(db, 'products'))
    console.log(snapshot)
    snapshot.forEach(doc => {
      console.log(doc.data())
      setProducts(products => [...products, doc.data()])
    }
    )
  }
  useEffect(() => {
    fetchProducts();


  }, [])
  return (
    <>
      <section>

        <h2 className='center text-xl mt-[2.5vh] mb-[2.5vh]'>{t('ourprojects')}</h2><Grid container spacing={4}>
          {products.map((product) => (
            <Grid key={product.name} item xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
        <Counter  ></Counter>
      </section>
    </>
  );
};

export default Products;

