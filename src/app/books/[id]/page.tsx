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
    const isAllowedToChooseABook  = await checkAllowedBook(session?.user?.email)

    console.log(isAllowedToChooseABook)
    let {_id, title, data, comments}:any = await getPDF(params.id)
    
    let book = {title, data, comments}
    if(session) {
        if(isAllowedToChooseABook==false) {
            return(
                <div className="text-white font-martian_mono max-w-6xl m-auto mb-96 text-center">
                    <h1 className="text-xl underline mb-4">You cannot choose any more books!</h1>
                    <h1>To view our plans visit our <a href="/#pricing" className="underline">pricing section</a>.</h1>
                    <h1>If you are already on a plan, and wish to upgrade your plan to a higher tier, <a href="/contact" className="underline">contact us</a>.</h1>
                </div>
            )
        }
        else{
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
    }
    else{
        redirect('/api/auth/signin')
    }
}