'use client'

import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

export default function MainNavbar() {
    const { data: session, status } = useSession();

    const[dropdownNavbar, setDropdownNavbar] = useState(false)
    const[burgerMenu, setBurgerMenu] = useState(false)

    return(
    
    <nav className="bg-white font-martian_mono border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent">BookLab</span>
        </a>
        <button onClick={()=>setBurgerMenu(!burgerMenu)} data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        {
        burgerMenu === false ?
        <div className="w-full md:block md:w-auto text-sm content-center" id="navbar-dropdown">
        <ul className="text-indigo-500 flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
            <a href="/" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-500 md:p-0 text-white ">Home</a>
            </li>
            <li>
                <a href="/books" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-500 md:p-0 text-white">Browse</a>
            </li>
            <li>
                <a href="/#pricing" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-500 md:p-0 text-white">Pricing</a>
            </li>
            {
            
            session ?
            <li>
                <button onClick={()=>setDropdownNavbar(!dropdownNavbar)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-white rounded md:p-0 md:w-auto hover:text-indigo-500">Dashboard <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg></button>
                {/* <!-- Dropdown menu --> */}
                {
                dropdownNavbar === true ?
                <div id="dropdownNavbar" className="z-10 mt-5 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <li>
                        <a href="/mybooks" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Books</a>
                    </li>
                    <li>
                        <a href="/myplan" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Plan</a>
                    </li>
                    </ul>
                    <div className="py-1">
                        <a href="/api/auth/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>
                    </div>
                </div>
                :null
                }
            </li>
            :
            <li>
                <a href="/api/auth/signin" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-500 md:p-0 text-white">Get Started</a>
            </li>
            }
        </ul>
        </div>
        :null
        }
    </div>
    </nav>

    )
}