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

    document.addEventListener("adobe_dc_view_sdk.ready", function(){
        var adobeDCView = new AdobeDC.View({clientId: "abd1af088d86476fb223867c75c8fa02", divId: "adobe-dc-view"});
        adobeDCView.previewFile({
        content:{ location:
            { url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"}},
        metaData:{fileName: "Bodea Brochure.pdf"}
        },
        {
        embedMode: "SIZED_CONTAINER"
        });
    });
    // book = await JSON.parse(book)
    // console.log(book)
    // const pdfDoc = await PDFDocument.load(book)
    // const pages = pdfDoc.getPages()
    // const pdfBytes = await pdfDoc.save()
    return (
        <div className="text-white flex justify-center">
            <iframe className="rounded-md block shadow-lg w-[700px] h-[700px]" title="PdfFrame"
                src={book}
            ></iframe>
            <div id="adobe-dc-view" className="h-[360px] w-[500px]"></div>   
        </div>
    )
}