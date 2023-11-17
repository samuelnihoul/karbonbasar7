import React from 'react';
import Grid from '@mui/material/Grid';
import Product from '../../components/Product';
import db from '../../lib/firebase'
import { collection, getDocs, DocumentData } from 'firebase/firestore'
import Counter from '../../components/Counter';
async function fetchProducts() {
  let products = []
  if (products.length == 0) {
    const snapshot = await getDocs(collection(db, 'products'))
    snapshot.forEach(doc => {
      products = [...products, { id: doc.id, data: doc.data() }]
    }
    )
  }
  return products
}
export default async function Products() {
  const products = await fetchProducts()
  return (
    <>
      <section>
        <h2 className='text-center text-2xl mt-[2.5vh] mb-[2.5vh]'>{'Our Projects'}</h2><Grid container spacing={4}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <Product product={product.data} />
            </Grid>
          ))}
        </Grid>
        <Counter />
      </section>
    </>
  )
}

