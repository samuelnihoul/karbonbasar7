'use client'
import React from 'react'
import Counter from '../../components/Counter'
export default function About() {
    return (
        <div className='min-h-[80vh] minw-[80%] m-auto align-center p-[5vw]'>
            <section >
                <h1 className='text-xl text-center mt-[2.5vh] mb-[2.5vh]'>{'About'}</h1>
                <p>{'Karbon Basar is the Global and cross-chain carbon assets platform.'}</p><br></br>
                <p>{'It is integrated with our own carbon coin called Karbon Moneta that rewards emission reductions in a new way.'}</p>

            </ section>
            <section>
                <h2 className='mb-[2.5vh] mt-[2.5vh] text-xl text-center'> {'FAQ'}</h2>
                <ul><li>
                    <b>{'What is a NFT?'}</b><hr></hr><p>{'NFT stands for Non-Fungible Token. That is by oppositions to regular cryptographic tokens (i.e. cryptocurrencies). It is primarily used to represent various kinds of digital property, most notably art.'}</p></li>
                </ul>
            </section>
            <Counter />
        </div>
    )
}
