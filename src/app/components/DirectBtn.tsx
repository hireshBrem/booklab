'use client'

import { redirect } from "next/navigation";
import { addBookToUser } from "../actions/db_actions"

export default function DirectBtn({book_id, email}: {book_id:string, email:string}) {
    return(
        <a href={`/books/${book_id}`} onClick={async()=>{await addBookToUser(book_id, email) }} type="submit" className="text-white bg-gradient-to-tr from-indigo-500 to-[#BA68C8] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">View</a>                                
    )
}