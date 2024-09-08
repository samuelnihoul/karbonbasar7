import paypal from '@paypal/checkout-server-sdk'

const configureEnvironment = function () {
    const clientId = process.env.PAYPAL_ID
    const clientSecret = process.env.PAYPAL_SECRET
    const a = process.env.PAYPAL_SANDBOX
    const b = process.env.PAYPAL_SECRET_SANDBOX
    console.log("paypal clientId is" + clientId)
    console.log("paypal clientSecret is" + clientSecret)
    return process.env.NODE_ENV === 'production'
        ? new paypal.core.LiveEnvironment(clientId, clientSecret)
        : new paypal.core.SandboxEnvironment(a, b)
}

const client = function () {
    return new paypal.core.PayPalHttpClient(configureEnvironment())
}

export default client