
// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/app/actions/db_actions';
import Cors from 'cors';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
    typescript: true
});

export async function POST(request: NextRequest) {
    console.log("API webhook called")
    console.log("request: ", request.body)
    let body = await request.text()
    let data;
    let eventType:any;
    let event;

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret) {
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
            
            const client = await createClient()

            if(client && event){
                await client.connect()
        
                const db = client.db("bookdb")
                
                let plan:any = event.data.object
                
                let amount = plan.amount_total

                let customer_id = plan.customer

                let _email = plan.customer_email

                let subscription_id = plan.subscription

                let payment_mode = plan.mode


                console.log("amount: ", amount)
                console.log("customer_id: ", customer_id)
                console.log("email: ", _email)
                console.log("payment mode: ", payment_mode)

                if(amount == 1175 && payment_mode == "subscription"){
                    // adding customer id to mongodb
                    await db.collection("users")
                    .updateOne({email: _email},
                        {$set:{ customer_id: customer_id}})

                    //adding plan to mongodb
                    await db.collection("users")
                    .updateOne({email: _email}, 
                    {$set:{ plan: "starter"}})

                    //adding subscription to mongodb
                    await db.collection("users")
                    .updateOne({email: _email}, 
                    {$set:{ subscription: subscription_id}})
                    
                }
                if(payment_mode == "payment"){
                    // adding customer id to mongodb
                    // await db.collection("users")
                    // .updateOne({email: _email},
                    //     {$set:{ customer_id: customer_id}})
                        
                    let book_id = plan.metadata.book_id
                    //adding book to owned books
                    console.log("book_id: ", book_id)

                    await db.collection("users")
                    .updateOne({email: _email},{
                        $push: {owned_books: book_id}
                    })
                }

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