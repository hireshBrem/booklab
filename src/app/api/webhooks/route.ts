
// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
    typescript: true
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

import { NextRequest, NextResponse } from 'next/server';

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_d1ea62b23b3289201f353cb9d3d1774bc175337b4abc9bd20f1de19c835ac5ca";

export async function POST(request: NextRequest) {
    console.log("API webhook called")
//   const sig = request.headers.get("stripe-signature")

//   let event;

//     try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     } catch (err:any) {
//         console.log(`Webhook Error: ${err.message}`);
//         NextResponse.json({ msg: 'All good!' }, { status: err.statusCode })
//     return;
//     }

//     // Handle the event
//     switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//     }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ msg: 'All good!' })
}