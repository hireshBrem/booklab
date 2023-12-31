import { getServerSession } from "next-auth"
import { getUser, getBook } from "@/app/actions/db_actions"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default async function Page() {
    const session = await getServerSession()
    const user = await getUser(session?.user?.email)

    if(session) {
        return(
            <div className="text-white font-martian_mono max-w-6xl m-auto mb-72">
                <h1 className="text-xl m-3">My books</h1>    
                <div className="flex flex-wrap">
                {
                    user?.owned_books?.map(async(bookId:string, index:number) => {
                        console.log(bookId)
                        const book = await getBook(bookId)
                        if(book) {
                            return(
                                <Link href={{
                                    pathname: `/books/${bookId}`
                                }}>
                                    <div className="w-fit m-2 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    {/* <a href="#" className="flex justify-center my-2">
                                        {
                                            // book ? 
                                            // // <Image className="rounded-t-lg" width={100} height={200} src={book.cover} alt="product image" />
                                            // :null
                                        }
                                    </a> */}
                                    <div className="px-5 spaxe-x-4 space-y-2">
                                        <a href="#">
                                            <h5 className="tracking-tight text-gray-900 dark:text-white">{book.title} by {book.author}</h5>
                                        </a>
                                        
                                    </div>
                                    </div>
                                </Link>
                            )
                        }
                    })
                }
                </div>

                {
                    user?.owned_books === undefined ?
                    <div className="w-fit p-2 ml-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h1>No books found!</h1>
                    </div>
                    :null
                }
            </div>
        )    
    }else{
        redirect('/api/auth/signin')
    }
    
}