
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { getBooks, getUser } from "@/app/actions/db_actions";
import { getServerSession } from "next-auth";

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
                if(user?.plan!="free" && user?.ownedBooks?.includes(book._id)==false){
                    console.log("You have a valid subscription but you do not own this book")
                    return(
                        <button key={index}>
                            <div className="border-2 rounded-md m-2 p-2 border-blue-700 hover:scale-110 ease-in-out duration-200">
                                <ProductCard id={book._id} hasSubscription={true} title={book.title} cover={book.cover} price={book.price} price_id={book.price_id} />
                            </div>
                        </button>
                        )
                }
                else{
                    return(
                        <Link key={index} href={{
                            pathname: `/books/${book._id}`
                        }}>
                            <div className="border-2 rounded-md m-2 p-2 border-blue-700 hover:scale-110 ease-in-out duration-200">
                                <ProductCard id={book._id} hasSubscription={true} title={book.title} cover={book.cover} price={book.price} price_id={book.price_id} />
                            </div>
                        </Link>
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