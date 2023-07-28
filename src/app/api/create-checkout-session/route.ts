import { NextResponse, NextRequest } from 'next/server'
// Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { loadStripe } from '@stripe/stripe-js';

export async function POST(request: NextRequest) {
    const price_id = (await request.formData()).get("priceId")
    console.log(price_id)
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys
    if(process.env.STRIPE_SECRET_KEY != undefined) {
        const stripe = await loadStripe(process.env.STRIPE_SECRET_KEY);
    }

    const priceId = price_id;

    // const session = await stripe.checkout.sessions.create({
    // mode: 'subscription',
    // line_items: [
    //     {
    //     price: "",
    //     // For metered billing, do not pass quantity
    //     quantity: 1,
    //     },
    // ],
    // // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
    // // the actual Session ID is returned in the query parameter when your customer
    // // is redirected to the success page.
    // success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
    // cancel_url: 'https://example.com/canceled.html',
    // });

    // Redirect to the URL returned on the Checkout Session.
    // With express, you can redirect with:
    //   res.redirect(303, session.url);
    return NextResponse.json({ message: "hello there" });

}
