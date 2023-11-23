import React, { useEffect, useState } from 'react'
const [scriptLoaded, setScriptLoaded] = useState(false)
export default function Paypal() {

    useEffect(() => {
        const addPaypalScript = () => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL}`;
            script.async = true;

            script.onload = () => setScriptLoaded(true);

            document.body.appendChild(script);
        };
        addPaypalScript();
    }, []);
    return (
        <div>Paypal</div>
    )
}
