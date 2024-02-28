import React from 'react';
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
    <section>
      <h2 className='text-center text-2xl mx-[2rem]'>{'Our Projects'}</h2>
      <div className='flex flex-row gap-[2rem] m-auto flex-wrap'>
        {products.map((product) => (
          <Product product={product.data} key={product.id} />
        ))}
      </div>
      <Counter />
    </section>
  )
}


