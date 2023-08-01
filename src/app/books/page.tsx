
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { getBooks, getUser } from "@/app/actions/db_actions";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Books() {
    let session = await getServerSession()
    let books:any = await getBooks()
    let user = await getUser(session?.user?.email)

    return(
        <>
        <div className="text-white text-lg max-w-4xl m-auto flex flex-wrap justify-center mb-24 sapce-y-2">
        {
            books.map((book:any, index:number) => {
                if(user?.plan=="free"){
                    return(
                        <a href="/#pricing">
                            <div className="border-2 rounded-md m-2 p-2 border-blue-700 hover:scale-110 ease-in-out duration-200">
                                <ProductCard id={book._id} hasSubscription={false} title={book.title} cover={book.cover} price={book.price} price_id={book.price_id} />
                            </div>
                        </a>
                        )
                }
                else if(user?.plan!="free" && user?.owned_books?.includes(book._id)==true){
                    console.log("You have a valid subscription but you do not own this book")
                    return(
                        <Link key={index} href={{
                            pathname: `/books/${book._id}`
                        }}>
                            <div className="border-2 items-center rounded-md m-2 p-2 border-blue-700 hover:scale-110 ease-in-out duration-200 flex flex-col justify-center">
                                <Image className="rounded-t-lg" width={80} height={160} src={book.cover} alt="product image" />
                                <div className="px-5 pb-5 spaxe-x-4 space-y-2">
                                    <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
                                    </a>
                                <div className="flex items-center justify-between space-x-5">
                                    <a href="/#pricing" type="submit" className="text-white hover:translate-x-1 hover:-translate-y-1 ease-in-out duration-150 bg-gradient-to-tr from-indigo-500 to-[#BA68C8] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">View</a>                                
                                </div>
                            </div>
                            </div>
                        </Link>
                        )
                }
                else if(user?.plan!="free" && book.price=="Free"){
                    // dont need to pay for this book
                    return(
                        <Link key={index} href={{
                            pathname: `/books/${book._id}`
                        }}>
                            <div className="border-2 items-center rounded-md m-2 p-2 border-blue-700 hover:scale-110 ease-in-out duration-200 flex flex-col justify-center">
                                <Image className="rounded-t-lg" width={80} height={160} src={book.cover} alt="product image" />
                                <div className="px-5 pb-5 spaxe-x-4 space-y-2">
                                    <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
                                    </a>
                                <div className="flex items-center justify-between space-x-5">
                                    <a href={`/books/${book._id}`} type="submit" className="text-white hover:translate-x-1 hover:-translate-y-1 ease-in-out duration-150 bg-gradient-to-tr from-indigo-500 to-[#BA68C8] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">View</a>                                
                                </div>
                            </div>
                            </div>
                        </Link>
                    )

                }
                else{
                    return(
                        <a>
                            <div className="border-2 rounded-md m-2 p-2 border-blue-700 hover:scale-110 ease-in-out duration-200">
                                <ProductCard id={book._id} hasSubscription={true} title={book.title} cover={book.cover} price={book.price} price_id={book.price_id} />
                            </div>
                        </a>
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