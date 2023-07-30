'use client';
import { useState } from "react";
import { sendFeedback } from "../actions/db_actions";
import { useSession } from "next-auth/react";

export default function FeedBackForm() {
    const {data: session} = useSession()
    const[feedback, setFeedback] = useState("")
    const[rating, setRating] = useState("2.5")

    return(
    <div className="px-2">
        <div className="max-w-5xl m-auto flex flex-col space-y-4 border-2 border-indigo-500 rounded-md p-4 bg-gradient-to-r from-indigo-500 to-[#BA68C8]">
            <h1 className="text-xl">Give Us Feedback</h1>
            <h1 className="">We would love to hear your thoughts and suggestions about our product. Whether it's a feature you'd like to see, an improvement you think we can make, or simply your overall experience with the platform, your feedback matters to us.</h1>
            <label htmlFor="message" className="block mb-2 font-medium text-gray-900 dark:text-white">Your feedback</label>
            <textarea required id="message" value={feedback} onChange={(e)=>setFeedback(e.target.value)} rows={4} className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
            <label htmlFor="steps-range" className="block mb-2 font-medium text-gray-900 dark:text-white">Rate us: {rating} /5</label>
            <input required id="steps-range" type="range" min="0" max="5" value={rating} onChange={(e)=>setRating(e.target.value)} step="0.5" color="#BA68C8" className="w-fit h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <button onClick={async()=>{await sendFeedback(session?.user?.email, feedback, rating)}} className="bg-gradient-to-tr border-2 border-white from-indigo-500 to-[#BA68C8] p-2 rounded-md w-fit mt-2">Submit</button>
        </div>
    </div>
    )
}