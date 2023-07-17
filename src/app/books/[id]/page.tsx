import { getPDF } from "@/actions/db_actions"
import { PDFDocument } from "pdf-lib"

export async function generateMetadata({ params }: {params:{title:string}}) {
    return {
      title: `${params.title} | BookLab`,
      description: "The first collaborative book reading platform",
    }
  }

export default async function Page({params, searchParams}: {
    params: { title: string }
    searchParams: { [key: string]: string | undefined }
}) {

    let book:any = await getPDF(searchParams.book_id)
    
    // book = await JSON.parse(book)
    // console.log(book)
    // const pdfDoc = await PDFDocument.load(book)
    // const pages = pdfDoc.getPages()
    // const pdfBytes = await pdfDoc.save()
    return (
        <div className="text-white flex justify-center">
            {/* <h1>Book pdf: {book}</h1> */}
            <iframe className="rounded-md block shadow-lg w-[700px] h-[700px]" title="PdfFrame"
                src={book}
            ></iframe>
        </div>
    )
}