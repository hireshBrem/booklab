'use client';
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation"

export default function ProductCard({id, author, title, cover, price, price_id, hasSubscription}: {id:string, author:string, title:string, cover:string, price:string, price_id:string, hasSubscription:boolean}) {
    const { data: session } = useSession()
    const[url,setURL] = useState('')

    useEffect(()=>{
        if(url!=''){
            console.log("redirecting to checkout page")
            redirect(url)
        }    }, [url])

    return (
       
    <div className="w-full rounded-lg shadow">
        <a href="#" className="flex justify-center my-2">
            <Image className="rounded-lg" width={100} height={200} src={cover} alt="product image" />
            {/* <div className="bg-red-500 w-20 h-40 flex justify-center"></div> */}
        </a>
        <div className="px-5 pb-5 spaxe-x-4 space-y-2">
            <a href="#">
                <h5 className="text-lg tracking-tight text-gray-900 dark:text-white">{title} by {author}</h5>
            </a>
            <div className="flex items-center justify-between space-x-5">
                <span className="text-3xl text-gray-900 dark:text-white">{price}</span>
                <input type="hidden" name="priceId" value={price_id} />
                {
                session ?
                    hasSubscription==true ?
                    <a onClick={async()=>{
                        const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/create-book-checkout-session`, {
                            method: 'POST',
                            body: JSON.stringify({email: session.user?.email, price_id: price_id, book_id: id })
                        }).then(r=>r.json())
                        setURL(res.url)

                    }} type="submit" className="text-white bg-gradient-to-tr from-indigo-500 to-[#BA68C8] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Purchase</a>
                    :<a href="/#pricing" type="submit" className="text-white text-sm bg-gradient-to-tr from-indigo-500 to-[#BA68C8] rounded-lg px-5 py-2.5 text-center dark:text-white">Purchase</a>
                :<a href='/api/auth/signin' type="submit" className="text-white text-sm bg-gradient-to-tr from-indigo-500 to-[#BA68C8] rounded-lg px-5 py-2.5 text-center dark:text-white">Sign Up First</a>
            }
            </div>
        </div>
    </div>


  );
}
