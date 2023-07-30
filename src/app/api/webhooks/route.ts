
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

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_d1ea62b23b3289201f353cb9d3d1774bc175337b4abc9bd20f1de19c835ac5ca";

export async function POST(request: NextRequest) {

    console.log("API webhook called")

    let data;
    let eventType;

    // Check if webhook signing is configured.
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature:string|null = request.headers.get("stripe-signature")
      try {
        if(typeof request.body === "string" && signature) {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          webhookSecret
        );
        data = event.data;
        eventType = event.type;
        }
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
          // Payment is successful and the subscription is created.
          // You should provision the subscription and save the customer ID to your database.
          break;
        case 'invoice.paid':
            console.log("invoice.paid")
        // Continue to provision the subscription as payments continue to be made.
          // Store the status in your database and check when a user accesses your service.
          // This approach helps you avoid hitting rate limits.
          break;
        case 'invoice.payment_failed':
            console.log("invoice.payment_failed")
          // The payment failed or the customer does not have a valid payment method.
          // The subscription becomes past_due. Notify your customer and send them to the
          // customer portal to update their payment information.
          break;
        default:
        // Unhandled event type
      }
  
}