'use client'

// import { loadStripe } from '@stripe/stripe-js';
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import getStripe from "@/app/components/getStripe";

const stripePromise = getStripe();

async function postSubscribe(e:any) {
    try {
      const dataSend = {
        lookup_key: e.target.lookup_key.value,
        customerEmail: e.target.user_Email.value,
      };
      const jsonSend = JSON.stringify(dataSend);
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        mode: "no-cors",
        headers: {"Content-Type": "application/json",},
        redirect: "follow",
        body: jsonSend,
      });
    //   if (response.statusCode === 500) {
    //     console.error(response.message);
    //     return;
    //   }
      return response;
    } catch (err:any) {console.log(`Error when calling postJSON: `, err.message);}
  }

export default function CheckoutBtn({price_id, link}:{price_id:string, link:string}) {
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
            <input type="hidden" name="priceId" value={price_id} />
            {
                session ?
                <a onClick={async()=>{
                    const res = await fetch('http://localhost:3000/api/create-checkout-session', {
                        method: 'POST',
                        body: JSON.stringify({price_id: price_id})
                    }).then(r=>r.json())
                    console.log(res.url)
                    setURL(res.url)

                }} type="submit" className="text-white hover:translate-x-1 hover:-translate-y-1 ease-in-out duration-150 bg-gradient-to-tr from-indigo-500 to-[#BA68C8] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Purchase</a>
                :<a href='/api/auth/signin' type="submit" className="text-white hover:translate-x-1 hover:-translate-y-1 ease-in-out duration-150 bg-gradient-to-tr from-indigo-500 to-[#BA68C8] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Sign Up First</a>
            }
        </form>
        </>
        )    

}