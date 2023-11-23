import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
const addPaypalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL}`;
    document.body.appendChild(script);
};
addPaypalScript();
export default function Paypal({ amount, currency, onSuccess }: { amount: number, currency: string, onSuccess: Function }) {
    return (
        <PayPalButton amount={amount} currency={currency} onSuccess={onSuccess} />
    )
}
