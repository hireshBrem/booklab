
// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextResponse, NextRequest } from 'next/server'
import Cors from 'cors';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
    typescript: true
});

export async function POST(request: NextRequest) {

    console.log("API webhook called")
    let body = await request.text()
    let data;
    let eventType:any;

    // Check if webhook signing is configured.
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret) {
        console.log("webhookSecret")
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = request.headers.get("stripe-signature") as string

      try {
        console.log("signed!")
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          webhookSecret
        );
        data = event.data;
        eventType = event.type;
        console.log("event: ", eventType)
        // return NextResponse.json({received: true})
        return NextResponse.json({received: true})

    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return NextResponse.json({errorCode: 400})
      }
    }else{

      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.

        // data = request.body.data;
        // eventType = request.body.type;
    }
  
    switch (eventType) {
        case 'checkout.session.completed':
            console.log("checkout.session.completed")
            return NextResponse.json({msg: "checkout.session.completed"})

            // Payment is successful and the subscription is created.
            // You should provision the subscription and save the customer ID to your database.
          break;
        case 'invoice.paid':

            console.log("invoice.paid")
            return NextResponse.json({msg: "invoice.paid"})
            // Continue to provision the subscription as payments continue to be made.
          // Store the status in your database and check when a user accesses your service.
          // This approach helps you avoid hitting rate limits.
          break;
        case 'invoice.payment_failed':
            console.log("invoice.payment_failed")
            return NextResponse.json({msg: "invoice.payment_failed"})
          // The payment failed or the customer does not have a valid payment method.
          // The subscription becomes past_due. Notify your customer and send them to the
          // customer portal to update their payment information.
          break;
        default:
        // Unhandled event type
      }
  
}