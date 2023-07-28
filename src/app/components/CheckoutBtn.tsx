'use client'

export default function CheckoutBtn({price_id}:{price_id:string}) {
    return(
    <form method="POST" action="/api/create-checkout-session">
        <input type="hidden" name="priceId" value={price_id} />
        <button type="submit" className="text-white hover:translate-x-1 hover:-translate-y-1 ease-in-out duration-150 bg-gradient-to-tr from-indigo-500 to-[#BA68C8] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</button>
    </form>
    )
}