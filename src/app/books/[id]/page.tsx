import { getPDF, checkAllowedBook } from "@/app/actions/db_actions"
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth"
import PDFViewer from "@/app/components/PDFViewer"

export async function generateMetadata({ params }: {params:{title:string}}) {
    return {
      title: `${params.title} | BookLab`,
      description: "The first collaborative book reading platform",
    }
}

export default async function Page({params, searchParams}: {
    params: { id:string }
    searchParams: { [key: string]: string | undefined }
}) {

    const session = await getServerSession()
    const isAllowedToChooseABook  = await checkAllowedBook(session?.user?.email)

    // console.log(isAllowedToChooseABook)
    let book = await getPDF(params.id)
    
    if(session && isAllowedToChooseABook===true) {
        return (
            <>
            {
            book ?
                <div className="text-white flex-col justify-center font-martian_mono">
                <h1 className="text-center text-lg underline mb-5">{book.title}</h1>
                <PDFViewer book={book} />
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