import client from '@/app/paypal/utility'
import paypal from '@paypal/checkout-server-sdk'

export async function POST(req: Request) {
    const body = await req.json()
    if (!body.order_price || !body.user_id)
        return new Response(JSON.stringify({ success: false, message: "Please provide order_price and usuer ID" }), { status: 400 })

    try {
        const PaypalClient = client()
        const request = new paypal.orders.OrdersCreateRequest()
        request.headers['prefer'] = 'return=representation'
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: body.order_price + "",
                    },
                },
            ],
        })
        const response = await PaypalClient.execute(request)
        if (response.statusCode !== 201) {
            console.log("RES: ", response)
            return new Response(JSON.stringify({ success: false, message: "some error occured at the backend" }), { status: 500 })
        }

        const order = response.order
        return new Response(JSON.stringify({ success: true, data: { order } }), { status: 200 })
    }
    catch (err) {
        console.log("Err at Create Order: ", err)
        return new Response(JSON.stringify({ success: false, message: "could not find the user" }))
    }

}