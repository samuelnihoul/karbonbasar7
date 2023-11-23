import React from 'react'

export default function PaySticker() {
    return (
        <>
            <form action="/" className='flex flex-col gap-[0.5rem]'>
                <label htmlFor="address">Address</label>
                <input type="text" id='address' />
                <label htmlFor="zip">ZIP</label>
                <input type="text" id="zip" />
                <label htmlFor="city">City</label>
                <input type="text" />
                <label htmlFor="country">Country</label>
                <input type="text" id="country" />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" />
            </form>
        </>
    )
}
