'use client'

export default function Popup(){

    return(
        <div className="flex justify-center bg-gradient-to-tr from-indigo-500 to-[#BA68C8] font-martian_mono">
            <a href="/contact" className="text-white p-2 m-1 hover:underline">Looking for authors, contact us now for more info</a>
            <button onClick={async()=>{
                const res = await fetch('http://localhost:3000/api/create-checkout-session', {
                    method: 'POST',
                    body: JSON.stringify({msg: 'Hello Webhook api route!'})
                }).then(r=>r.json())
                console.log(res)
            }}>Call API</button>
        </div>
    )
}