import React from 'react'
import Image from "next/image"
export default function HowItWorks() {
    return (
        <section className='text-center'>
            <h2 className='my-[2rem]  text-2xl'>{'How It Works'}</h2>
            <p className='py-[2rem] px-[1rem] '>{'On Karbon Basar, you can find a selection of most efficient emission reduction projects from across the globe.'}</p>
            <Image width={0} height={0} sizes='80vw' alt="One NFT at different rarity levels" src='/assets/images/example2.png' className='m-auto w-[80%] mb-[2rem]'></Image>
            <a href="/products" className='rounded-md px-[2rem] m-[2rem] py-[1rem] shadow-md shadow-orange-400 '>
                {'Try It'}
            </a>
        </section >
    )
}
