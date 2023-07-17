
import { auth } from "@clerk/nextjs"
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { getBooks } from "@/actions/db_actions";

export default async function Books() {

    let books:any = await getBooks()

    return(
        <div className="text-white text-lg max-w-4xl m-auto flex flex-wrap justify-center">
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
    )
}