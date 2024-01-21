import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import Script from 'next/script'
export default function Paypal({ amount, currency, onSuccess }: { amount: number, currency: string, onSuccess: Function }) {
    return (
        <>
            <Script strategy='beforeInteractive' src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL}`}></Script>
            <PayPalButton amount={amount} currency={currency} onSuccess={onSuccess} />
        </>
    )
}
