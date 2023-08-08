import { getPDF, checkAllowedBook } from "@/app/actions/db_actions"
import FeedBackForm from "@/app/components/FeedBackForm"
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth"
import PDFViewer from "@/app/components/PDFViewer"

export async function generateMetadata({ params }: {params:{title:string}}) {
    return {
      title: `BookLab | Collaborative Reading Platform`,
      description: "The first collaborative book reading platform",
    }
}

export default async function Page({params, searchParams}: {
    params: { id:string }
    searchParams: { [key: string]: string | undefined }
}) {

    const session = await getServerSession()
    const isAllowedToViewBook  = await checkAllowedBook(session?.user?.email, params.id)

    console.log(isAllowedToViewBook)
    let {_id, title, data, comments}:any = await getPDF(params.id)
    
    let book = {title, data, comments}
    if(session) {
        // if(isAllowedToViewBook==false) {
        //     redirect("/books")
        // }
        return (
            <>
            {
            book ?
            <div className="text-white flex-col justify-center font-martian_mono">
                <h1 className="text-center text-lg underline mb-5">{book.title}</h1>
                <PDFViewer book={book} />
                <FeedBackForm />
            </div>
            :null
        }
        </>
        )
    }
    else{
        redirect('/api/auth/signin')
    }
}