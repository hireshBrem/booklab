
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { getBooks, getUser, addBookToUser } from "@/app/actions/db_actions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import DirectBtn from "../components/DirectBtn";

export default async function Books() {
    let session = await getServerSession()
    let books:any = await getBooks()
    let user = await getUser(session?.user?.email)

    return(
        <>
        <div className="text-white font-martian_mono text-lg max-w-4xl m-auto flex flex-wrap justify-center mb-24 sapce-y-2">
        {
            books.map((book:any, index:number) => {
                console.log(`Book ${book.title} : ` + user?.owned_books?.includes(book._id))

                if(user?.plan=="free"){
                    return(
                    <div className="border-2 items-center bg-gray-700 rounded-md m-2 border-blue-700 flex flex-col justify-center">
                        {/* <Image className="rounded-lg" width={100} height={200} src={book.cover} alt="product image" /> */}
                        <div className="px-5 pb-5 spaxe-x-4 space-y-2">
                            <a href="#">
                                <h5 className="text-lg tracking-tight text-gray-900 dark:text-white">{book.title} by {book.author}</h5>
                            </a>
                            <div className="flex items-center justify-between space-x-5">
                                <h1 className="text-xl">{book.price}</h1>
                                <a href="/#pricing" type="submit" className="text-white text-sm bg-gradient-to-tr from-indigo-500 to-[#BA68C8] font-medium rounded-lg px-5 py-2.5 text-center dark:text-white">Purchase</a>                                
                            </div>
                        </div>
                    </div>
                    )
                }
                else if(user?.plan!="free" && user?.owned_books?.includes(book._id)==true){
                    console.log("You have a valid subscription and own this book: " +  user?.owned_books?.includes(book._id))
                    return(
                        <div className="border-2 bg-gray-700 items-center rounded-md m-2 border-blue-700 flex flex-col justify-center">
                            {/* <Image className="rounded-lg" width={100} height={200} src={book.cover} alt="product image" /> */}
                            <div className="px-5 pb-5 spaxe-x-4 space-y-2">
                                <a href="#">
                                    <h5 className="text-lg tracking-tight text-gray-900 dark:text-white">{book.title} by {book.author}</h5>
                                </a>
                                <div className="flex items-center justify-between space-x-5">
                                    <h1 className="text-xl">{book.price}</h1>
                                    <a href={`/books/${book._id}`} type="submit" className="text-white bg-gradient-to-tr from-indigo-500 to-[#BA68C8] text-sm font-medium rounded-lg px-5 py-2.5 text-center dark:text-white">View</a>                                
                                </div>
                            </div>
                        </div>
                    )
                }
                else if(user?.plan!="free" && book.price=="Free"){
                    // dont need to pay for this book
                    return(
                        <div className="border-2 bg-gray-700 items-center rounded-md m-2 border-blue-700 flex flex-col justify-center">
                            {/* <Image className="rounded-lg" width={100} height={200} src={book.cover} alt="product image" /> */}
                            <div className="px-5 pb-5 spaxe-x-4 space-y-2">
                                <a href="#">
                                    <h5 className="text-lg tracking-tight text-gray-900 dark:text-white">{book.title} by {book.author}</h5>
                                </a>
                                <div className="flex items-center justify-between space-x-5">
                                    <h1 className="text-3xl">{book.price}</h1>
                                    <DirectBtn book_id={book._id} email={user?.email} />
                                </div>
                            </div>
                        </div>
                    )

                }
                else if(user?.plan!="free" && user?.owned_books?.includes(book._id)==false) {
                    return(
                    <div className="border-2 bg-gray-700 rounded-md m-2 border-blue-700 hover:scale-110 ease-in-out duration-200">
                        <ProductCard id={book._id} author={book.author} hasSubscription={true} title={book.title} cover={book.cover} price={book.price} price_id={book.price_id} />
                    </div>
                    )
                }

                else{
                    return(
                        
                        <div className="border-2 bg-gray-700 rounded-md m-2 border-blue-700 hover:scale-110 ease-in-out duration-200">
                            <ProductCard id={book._id} author={book.author} hasSubscription={true} title={book.title} cover={book.cover} price={book.price} price_id={book.price_id} />
                        </div>
                    
                        )
                }
            })
        
        }
        <div className="w-fit flex justify-center items-center px-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="space-x-4 space-y-2">
                    <a>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">More books coming soon</h5>
                    </a>
                </div>
            </div>
        </div>
        
        </>
    )
}