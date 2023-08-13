import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Product from '../components/Product.jsx';
import { db } from '../lib/firebase.js'
import { collection, getDocs, DocumentData } from 'firebase/firestore'
import Counter from '../components/Counter.jsx';
import { useTranslation } from 'react-i18next'
// transfer the price to the checkout page using React state
const Products = () => {
  const { t } = useTranslation(["offset"])
  const [products, setProducts] = useState<DocumentData[]>([])
  //fetch from cloud firestore
  async function fetchProducts() {
    const snapshot = await getDocs(collection(db, 'products'))
    snapshot.forEach(doc => {
      setProducts(products => [...products, { id: doc.id, data: doc.data() }])
    }
    )
  }
  useEffect(() => {
    fetchProducts();


  }, [])
  return (
    <>
      <section>

        <h2 className='text-center text-2xl mt-[2.5vh] mb-[2.5vh]'>{t('ourprojects')}</h2><Grid container spacing={4}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <Product product={product.data} />
            </Grid>
          ))}
        </Grid>
        <Counter  ></Counter>
      </section>
    </>
  );
};

export default Products;

