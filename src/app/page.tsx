import Image from "next/image"
import readingPic from "@/app/pics/pic1.png"
import writingPic from "@/app/pics/pic2.png"
import feedbackPic from '@/app/pics/pic3.png'
import { getServerSession } from "next-auth"
import GetStarted from "@/app/components/GetStarted"
import CheckoutBtn from "@/app/components/CheckoutBtn"
import AuthorSignUp from "./components/AuthorSignUp"
import { addReaderToWaitingList, getUser } from "./actions/db_actions"
import { redirect } from "next/dist/server/api-utils"
import { signIn } from "next-auth/react"

export default async function Home() {
    const session = await getServerSession()
    let user = await getUser(session?.user?.email)

    return (
    // <div className='flex space-x-10 md:mx-20 mt-20 flex-wrap'>
    //     <div className='self-center md:w-[50%] md:mr-10 mx-5 md:mx-0 text-center md:text-left my-5'>
    //         <p className="text-6xl bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono">Welcome to BookLab</p>
    //         <p className="text-xl font-bold italic bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">The first collaborative book reading platform</p>
    //         <p className="text-xl bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">The problem?</p>
    //         <p className="text-lg bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">The amount of people reading books is declining. People who read are more than 25% more likely to be healthy than non-readers.</p>
    //         <p className="text-xl bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">The Solution?</p>
    //         <p className="text-lg bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">We provide a platform for readers to connect with others to read collaboratively. Therefore reading with others can conquer the single most important reason why people dont read books - they find it boring!</p>
    //         <p className="text-xl bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">Join the waiting list... </p>
    //         <GetStarted />
    //         <p className="text-xl bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">Are you a writer/author and have something to post?</p>
    //         <AuthorSignUp />
    //     </div>
    //     <div className=''>
    //         <Image className='hidden sm:inline p-2' src={readingPic} width={500} height={500} alt="books" /> 
    //     </div>
    // </div>
    <div className='max-w-6xl m-auto flex-col flex-wrap '>
        <div className="flex flex-wrap justify-center mt-20">
            <div className="self-center text-center mx-2">
                <p className="text-4xl md:text-6xl bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono">Welcome to BookLab</p>
                <p className="text-xl md:text-xl font-bold italic bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">The first collaborative book reading platform</p>
                <p className="text-lg bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">We provide a platform for readers to connect with others to read collaboratively. Therefore reading with others can conquer the single most important reason why people dont read books - they find it boring!</p>
            </div>
            <div className=''>
                <Image className='sm:inline p-2' src={readingPic} width={400} height={400} alt="books" /> 
            </div>
        </div>
        <section className="bg-white dark:bg-gray-900 font-martian_mono mb-14">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Collaborative reading tool for readers</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Comment on your favorite books, start conversations with other readers, ask questions and have fun reading together!</p>
                    <a href="/books" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Explore Book Collection
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                    <a href="/api/auth/signin" className="inline-flex items-center hover:translate-x-1 hover:-translate-y-1 ease-in-out duration-150 bg-gradient-to-tr from-indigo-500 to-[#BA68C8] justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Get Started
                    </a> 
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image src={writingPic} width={400} height={400} alt="mockup" />
                </div>                
            </div>
        </section>
        <section className="bg-white dark:bg-gray-900 font-martian_mono mb-14">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image src={feedbackPic} width={400} height={400} alt="mockup" />
                </div> 
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Feedback tool for authors</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Answer reader's questions, join the conversation, get feedback and publish the best version of your book!</p>
                    <a href="/authors" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Are you a writer?
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                    <a href="/authors" className="inline-flex items-center hover:translate-x-1 hover:-translate-y-1 ease-in-out duration-150 bg-gradient-to-tr from-indigo-500 to-[#BA68C8] justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Publish your work
                    </a> 
                </div>               
            </div>
        </section>
        <section id="pricing" className="bg-white dark:bg-gray-900 font-martian_mono">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Pricing</h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at BookLab, we provide readers with a platform where they can read collaboratively.</p>
                </div>
                {/* lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 */}
                <div className="space-y-8 flex justify-center">
                    {/* <!-- Pricing Card --> */}
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option to just get started.</p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">$25</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        {/* <!-- List --> */}
                        <ul role="list" className="mb-8 space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                {/* <!-- Icon --> */}
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Access to all collaborative tools</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                {/* <!-- Icon --> */}
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Customer support</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                {/* <!-- Icon --> */}
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Unlimited comments</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                {/* <!-- Icon --> */}
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Unlimited eBooks</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                {/* <!-- Icon --> */}
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Customer support</span>
                            </li>
                        </ul>
                        {
                            session && user?.plan === 'starter' ?
                            <div className="flex justify-center">
                            <a type="submit" className="text-white w-fit hover:translate-x-1 hover:-translate-y-1 ease-in-out duration-150 bg-gradient-to-tr from-green-600 to-green-300 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900" href="/books">Purchased!</a>
                            </div>
                            :<CheckoutBtn price_id="price_1NZwYQDZ67e7j3mHMn3WIkFx" />

                        }
                    </div>
                    {/* <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for frequent readers.</p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">$49</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <ul role="list" className="mb-8 space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>5 writings /month</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>10 comments /book</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Team size: <span className="font-semibold">10 developers</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Premium support: <span className="font-semibold">24 months</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Free updates: <span className="font-semibold">24 months</span></span>
                            </li>
                        </ul>
                        <CheckoutBtn price_id="price_1NYw6aDZ67e7j3mHsx3gL9Vt" link="https://buy.stripe.com/test_aEUcOC2sf0pf9DqdQR" />
                    </div>
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for immersive reading experiences.</p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">$99</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <ul role="list" className="mb-8 space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>10 writings /month</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Unlimited comments</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Team size: <span className="font-semibold">100+ developers</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Premium support: <span className="font-semibold">36 months</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                            
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Free updates: <span className="font-semibold">36 months</span></span>
                            </li>
                        </ul>
                        <CheckoutBtn price_id="price_1NYw7WDZ67e7j3mHjZ8tjMOs" link='https://buy.stripe.com/test_6oE6qe8QD0pfdTGfYY' />
                    </div> */}
                </div>
            </div>
        </section>
    </div>
  )
}
