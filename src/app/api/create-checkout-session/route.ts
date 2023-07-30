import { NextResponse, NextRequest } from 'next/server'
import { startTransition } from 'react';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Cors from 'cors';
import Stripe from 'stripe';
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
    typescript: true
});

export const runtime = "edge";

const cors = Cors({
  methods: ["POST", "GET", "OPTIONS"],
});

export async function POST(request: NextRequest) {
    
    try{
        const { price_id } = await request.json()

        console.log("priceId: " + price_id)

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
                {
                price: price_id,
                quantity: 1,
                },
            ],
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: 'https://booklab-3v3b.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://booklab-3v3b.vercel.app/cancel'
        })
        console.log(session)
        if(session.url) {
            console.log(session.url)
            return NextResponse.json({ url: session.url });
        }

    }
    catch(err){
        console.log(err)
    }


    // revalidatePath("/api/create-checkout-session")
    // return NextResponse.json({ url: session.url });

}
