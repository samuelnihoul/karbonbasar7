import client from '@/app/paypal/utility'
import paypal from '@paypal/checkout-server-sdk'



export async function POST(req: Request) {
    const body = await req.json()
    if (!body.orderID) {
        return new Response('Please provide order ID', { status: 400 })
    }
    //Capture order to complete payment
    const orderID = body.orderID
    const PaypalClient = client()
    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({})
    const response = await PaypalClient.execute(request)
    if (!response) {
        return new Response(JSON.stringify({ success: false, message: "Some Error Occured at backend" }), { status: 500 })
    }
    const payer = response.payer
    return new Response(JSON.stringify({ success: true, data: { payer } }), { status: 200 })
}