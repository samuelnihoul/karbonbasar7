import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'

export default function Paypal({ amount, currency, onSuccess }: { amount: number, currency: string, onSuccess: Function }) {
    return (
        <>
            <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL}`}></script>
            <PayPalButton amount={amount} currency={currency} onSuccess={onSuccess} />
        </>
    )
}
