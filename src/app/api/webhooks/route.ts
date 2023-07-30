
// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth';
import { createClient } from '@/app/actions/db_actions';

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
    let event;

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret) {
        console.log("webhookSecret")

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
        
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return NextResponse.json({errorCode: 400})
      }
    }
    console.log("Entering switch...")
    switch (eventType) {
        case 'checkout.session.completed':
            console.log("checkout.session.completed")
            
            // You should provision the subscription and save the customer ID to your database.

            const session = await getServerSession()

            const client = await createClient()

            if(client && session && event){
                await client.connect()
        
                const db = client.db("bookdb")
                
                let plan:any = event.data.object
                console.log(plan)

                if(plan == ""){

                }

                // await db.collection("users")
                // .updateOne({email: session.user?.email}, 
                // {$set:{ booksLeft:}})

                console.log("Added to waiting list")
                await client.close();
            }    

            return NextResponse.json({msg: "checkout.session.completed"})

            // Payment is successful and the subscription is created.
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