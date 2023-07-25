
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { getBooks } from "@/actions/db_actions";
import { getServerSession } from "next-auth";

export default async function Books() {
    const session = await getServerSession()
    let books:any = await getBooks()

    return(
        <>
        {
            session ?
        <div className="text-white text-lg max-w-4xl m-auto flex flex-wrap justify-center mb-24">
        {
            books.map((book:any, index:number) => {
                return(
            <Link key={index} href={{
                pathname: `/books/${book.title}`,
                query : {
                    book_id: JSON.stringify(book._id),
                }
            }}>
                <div className="border-2 rounded-md m-2 p-2 border-blue-700 hover:scale-110 ease-in-out duration-200">
                    <ProductCard title={book.title} />
                </div>
            </Link>
            )})
        }
        </div>
        : 
        <div className="text-center mb-96 mt-10">
            <a href="/api/auth/signin" className="rounded-md border-2 border-indigo-500 p-2 text-white text-2xl">Go to sign in page first</a>
        </div>
        }
        </>
    )
}