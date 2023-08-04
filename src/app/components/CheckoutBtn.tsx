'use client'

// import { loadStripe } from '@stripe/stripe-js';
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import getStripe from "@/app/components/getStripe";

const stripePromise = getStripe();

export default function CheckoutBtn({priceId}:{priceId:string}) {
    const { data: session } = useSession()
    const[url,setURL] = useState('')

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
        if(url!=''){
            console.log("redirecting to checkout page")
            redirect(url)
        }
      }, [url])

      async function getStripeScript() {
        // if (!stripe) {const stripe = await stripePromise;}
        const stripe = await stripePromise
      }
    
    return(
        <>
        <form method="POST" action="/api/create-checkout-session">
            <input type="hidden" name="priceId" value={priceId} />
            {
                session ?
                <button onClick={async()=>{
                    const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/create-checkout-session`, {
                        method: 'POST',
                        body: JSON.stringify({email:session.user?.email, price_id: priceId})
                    }).then(r=>r.json())
                    console.log(res.url)
                    setURL(res.url)

                }} type="submit" className="text-white hover:translate-x-1 hover:-translate-y-1 ease-in-out duration-150 bg-gradient-to-tr from-indigo-500 to-[#BA68C8] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Purchase</button>
                :<a href='/api/auth/signin' type="submit" className="text-white hover:translate-x-1 hover:-translate-y-1 ease-in-out duration-150 bg-gradient-to-tr from-indigo-500 to-[#BA68C8] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Sign Up First</a>
            }
        </form>
        </>
        )    

}