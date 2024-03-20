import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from "axios"
import React, { Suspense } from 'react'
export default function Paypal({ price, email }: { price: number, email: string }) {
    return (
        <>
            <Suspense fallback={<p>loading...</p>}>
                <PayPalScriptProvider
                    options={{
                        clientId: process.env.NEXT_PUBLIC_PAYPAL_ID,
                        currency: 'USD',
                        intent: 'capture'
                    }}
                >
                    <PayPalButtons
                        style={{
                            color: 'gold',
                            shape: 'rect',
                            label: 'pay',
                            height: 50
                        }}
                        createOrder={async (data, actions) => {
                            let order_id = await paypalCreateOrder(price, email)
                            return order_id + ''
                        }}
                        onApprove={async (data, actions) => {
                            let response = await paypalCaptureOrder(data.orderID)
                            alert(response)

                        }}
                    />
                </PayPalScriptProvider>
            </Suspense>
        </>
    )
}
const paypalCreateOrder = async (price: number, email: string) => {
    try {
        let response = await axios.post('/paypal/createorder', {
            user_id: email,
            order_price: price
        })
        alert('success')
        return response.data.data.order.order_id
    } catch (err) {
        // Your custom code to show an error like showing a toast:
        // toast.error('Some Error Occured')
        alert('sorry, a payment error occurred :(')
        return null
    }
}
const paypalCaptureOrder = async orderID => {
    try {
        let response = await axios.post('/paypal/captureorder', {
            orderID
        })
        if (response.data.success) {
            // Order is successful
            // Your custom code
            // Like showing a success toast:
            // toast.success('Amount Added to Wallet')

            // And/Or Adding Balance to Redux Wallet
            // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
        }
    } catch (err) {
        // Order is not successful
        // Your custom code

        // Like showing an error toast
        // toast.error('Some Error Occured')
    }
}
