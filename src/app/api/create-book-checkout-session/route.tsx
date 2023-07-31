import { NextResponse, NextRequest } from 'next/server'
import Cors from 'cors';
import Stripe from 'stripe';
import { createClient } from '@/app/actions/db_actions';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import { revalidatePath } from 'next/cache'
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
    const { email, book_id, price_id } = await request.json()

    try{
        console.log("priceId: " + price_id)

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            customer_email: email,
            metadata: {
                book_id: book_id
            },
            line_items: [
                {
                price: price_id,
                quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/cancel`
        })
        console.log(session)

        if(session.url) {
            return NextResponse.json({ url: session.url });
        }

    }
    catch(err){
        console.log(err)
    }

}
