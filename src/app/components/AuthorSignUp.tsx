'use client'
import { useTransition, useState } from "react"
import { addAuthorToWaitingList } from "@/app/actions/db_actions"
import Link from "next/link"

export default function AuthorSignUp() {
    const[isPending, startTransition] = useTransition()
    const [email, setEmail] = useState('')
    return(
        <div className='text-white font-martian_mono'>
            <button className='bg-gradient-to-tr from-indigo-500 to-[#BA68C8] rounded-l-sm p-2 mt-5' onClick={async () => {await addAuthorToWaitingList(email);setEmail("");console.log("func called!")}}>Sign Up</button>            
            <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='rounded-r-sm h-max p-[6px] border-[3px] border-indigo-500 bg-gray-900 w-80' placeholder='Your email (for authors)' required />
        </div>
    )
}