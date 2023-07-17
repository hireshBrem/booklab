'use client';
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { useTransition } from "react";
import { uploadBook } from "@/actions/db_actions";

export default function Navbar() {
    let [isPending, startTransition] = useTransition()

    const [buttonOpen, setButtonOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [book, setBook]: any = useState("")
    
    function convertToBase64(e:any| null) {
        let reader = new FileReader()
        
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                if(reader.result){
                    setBook(reader.result)
                }
            }
            reader.onerror = (error) => {
                console.log('Error: ', error)
            }

        } 
    }
    
    return(
    <>
    <div className="flex justify-center text-white border-b-2 border-indigo-400">
        <h1 className="bg-gradient-to-tr my-2 w-fit text-sm px-2 from-indigo-500 to-[#BA68C8] rounded-lg">BookLab Beta</h1>
    </div>
    <div className="flex font-martian_mono flex-wrap justify-center sm:justify-between p-3">       
        <div className="self-center">          
            {/* <div className="flex space-x-2">
                <input required onChange={(e)=>convertToBase64(e)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />   
                <button type="submit" onClick={()=>startTransition(()=>uploadBook(book))} className="bg-gradient-to-tr inline-block px-2 from-indigo-500 to-[#BA68C8] rounded-lg">Upload</button>
            </div> */}
            <div className="text-center m-5">
                <button onClick={()=>{setDrawerOpen(!drawerOpen)}} id="createProductButton" className="text-white bg-gradient-to-tr from-indigo-500 to-[#BA68C8] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" type="button" data-drawer-target="drawer-create-product-default" data-drawer-show="drawer-create-product-default" aria-controls="drawer-create-product-default">
                Upload Book
                </button>
            </div>
            {
                drawerOpen === true ?
            <div className="fixed top-0 left-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800">
                <h5 className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">New Book</h5>
                <button onClick={()=>setDrawerOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <form action="#">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type book name" />
                        </div>
                        <div className="space-y-2">
                            <input required onChange={(e)=>convertToBase64(e)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />   
                        </div>
                        <div className="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
                            <button type="submit" onClick={()=>startTransition(()=>uploadBook(title, book))} className="text-white bg-gradient-to-tr inline-block px-2 from-indigo-500 to-[#BA68C8] rounded-lg">
                                Upload
                            </button>
                            <button onClick={()=>setDrawerOpen(false)} type="button" className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                <svg className="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            :null
            }
        </div>      
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4 ">                
            <form>
                <div className="flex relative">
                    <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                    <button id="dropdown-button" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button" onClick={()=>{setButtonOpen(!buttonOpen)}}>All categories <svg className="w-2.5 h-2.5 ml-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    {
                    buttonOpen === true ?
                    <div className="z-10 mt-10 absolute bg-white divide-gray-100 rounded-lg shadow w-44 ">
                        <ul className="py-2 text-sm text-gray-700">
                        <Link href="/books">
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">General</button>
                        </Link>
                        <Link href="/books/science">
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Science</button>
                        </Link>
                        <Link href="/books/technology">
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Technology</button>
                        </Link>
                        <Link href="/books/finance">
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Finance</button>
                        </Link>
                        <Link href="/books/biography">
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Biography</button>
                        </Link>
                        </ul>
                    </div>
                    :null
                    }
                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" className="sm:block hidden p-2.5 w-full z-20 text-sm text-gray-900 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Books" required />
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-gradient-to-tr from-indigo-500 to-[#BA68C8] rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div className="self-center sm:ml-auto mt-3 sm:mt-0">
            <UserButton />
        </div>
    </div>
    </>
    )
}