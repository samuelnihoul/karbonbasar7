import { StatusError } from "@hashgraph/sdk";
import { Satellite } from "@mui/icons-material";
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { CircularProgress } from "@mui/material";
import { useTranslation } from 'react-i18next'
// checkout page using react-paypal-js
// get the price from React state
export default function checkout({ product, quantity }) {
    const { t } = useTranslation(["checkout"])
    const [{ isPending }] = usePayPalScriptReducer();
    return (<section className="max-h-[200px] m-auto w-[80%] pt-3 mb-3"><p>{t('importantafteryour')}</p>
        <div className="checkout-form bg-white">
            {isPending ? <CircularProgress /> :
                <PayPalButtons style={{ layout: "horizontal" }} className={'rounded-xl mt-3 p-4 '}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        // @ts-ignore
                                        value: product.price * quantity,
                                    },
                                },
                            ],
                        });

                    }}

                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            const name = details.payer.name.given_name;
                            alert(`${t('transactioncompletedby')} ${name}${t('pleasemailyour')}`);
                            fetch('https://harmonia-ekoutils-mhbcpntktq-ew.a.run.app/notify');
                        });
                    }}
                ></PayPalButtons>}</div >     </section >)
}   
