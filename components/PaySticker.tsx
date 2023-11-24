import React from 'react'
import db from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
async function post(data: FormData) {
    'use server'
    const address = data.get('address')
    const zip = data.get('zip')
    const city = data.get('city')
    const country = data.get('country')
    const email = data.get('email')
    addDoc(collection(db, 'purchases'), {
        'address': address,
        'zip': zip,
        'city': city,
        'country': country,
        'email': email
    })
}
export default function PaySticker() {
    return (
        <>
            <form action={post} className='flex flex-col gap-[0.5rem]'>
                <label htmlFor="address" >Address</label>
                <input type="text" name='address' id='address' />
                <label htmlFor="zip">ZIP</label>
                <input type="text" name='zip' id="zip" />
                <label htmlFor="city" >City</label>
                <input type="text" name='city' id='city' />
                <label htmlFor="country">Country</label>
                <input type="text" id="country" name='country' />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name='email' />
            </form>
        </>
    )
}
