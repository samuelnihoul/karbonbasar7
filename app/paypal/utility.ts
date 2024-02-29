import paypal from '@paypal/checkout-server-sdk'

const configureEnvironment = function () {
    const clientId = process.env.PAYPAL_ID
    const clientSecret = process.env.PAYPAL_SECRET
    console.log("paypla clientId is" + clientId)
    console.log("paypal clientSecret is" + clientSecret)
    return process.env.NODE_ENV === 'production'
        ? new paypal.core.LiveEnvironment(clientId, clientSecret)
        : new paypal.core.SandboxEnvironment(clientId, clientSecret)
}

const client = function () {
    return new paypal.core.PayPalHttpClient(configureEnvironment())
}

export default client