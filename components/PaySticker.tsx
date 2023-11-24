import React from 'react'
import action from '@/actions/paySticker'
export default function PaySticker() {
    return (
        <>
            <form action={action} className='flex flex-col gap-[0.5rem]'>
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
