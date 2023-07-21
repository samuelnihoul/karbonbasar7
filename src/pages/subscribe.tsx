// the subscribe page using react-paypal-js
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
// import the SubscriptionDetail type
export default function subscribe() {
    const [price, setPrice] = useState(0)
    const state = useLocation().state
    useEffect(() => {
        if (state) {
            //@ts-ignore
            setPrice(state.price)
        }
    }, [state])
    return (<><p>Sorry the subscriptions are currently unavailable but will be available soon.</p>
        state ?
            <div className="subscribe-form">
                <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_SANDBOX }}>
                    <PayPalButtons style={{ layout: "horizontal" }}
                        createSubscription={(data, actions) => {
                            return actions.subscription.create(
                                {
                                    shipping_amount:
                                    {
                                        // @ts-ignore
                                        value: state.price * state.quantity,
                                        currency_code: "USD",
                                    },

                                });
                        }}
                        onApprove={(data, actions) => {
                            return actions.subscription.get().then((details) => {
                                alert(`Subscription completed `);
                            });
                        }}
                    ></PayPalButtons>
                </PayPalScriptProvider>
            </div > : <p>You need to select a product to access the subscribe page</p>
    </>)
}
