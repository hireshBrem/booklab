'use client'

export default function Footer() {
    return(
        
<footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-10">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0">
                <span className="self-center text-2xl font-semibold whitespace-nowrap bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent">BookLab</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/books" className="mr-4 hover:underline md:mr-6 ">Browse Books</a>
                </li>
                <li>
                    <a href="/contact" className="mr-4 hover:underline md:mr-6 ">Publish Writing</a>
                </li>
                {/* <li>
                    <a href="/terms&conditions" className="mr-4 hover:underline md:mr-6 ">Terms and conditions</a>
                </li> */}
                <li>
                    <a href="/privacy" className="mr-4 hover:underline md:mr-6 ">Privacy Policy</a>
                </li>
                <li>
                    <a href="/community-guidelines" className="mr-4 hover:underline md:mr-6 ">Community Guidelines</a>
                </li>
                <li>
                    <a href="/contact" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        {/* <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">BookLab™</a>. All Rights Reserved.</span> */}
    </div>
</footer>
    )
}