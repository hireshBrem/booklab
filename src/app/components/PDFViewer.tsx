'use client';

import {useEffect, useTransition } from 'react';
import { addComment, getPDF } from '../actions/db_actions';
import { pdfjs } from 'react-pdf';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useSession } from 'next-auth/react';

export default function PDFViewer({book}: {book: any}) {
    const session = useSession()
    const[isPending, startTransition] = useTransition()
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const[ comment, setComment ] = useState<any>("")
    const[scale, setScale] = useState<number>(1.2)
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
        ).toString();
        
        if(window.screen.width > 770) {
            setScale(1.2)
        }
        if(window.screen.width > 413 && window.screen.width < 770) {
            setScale(0.7)
        }
        if(window.screen.width < 413){
            setScale(0.5)
        }

      }, []);
  
    return (
    <div className='mb-10 font-martian_mono'>
    <div className='flex justify-center'>
        <p className='inline-block text-center mb-2'>
            Page {pageNumber} of {numPages}
        </p>    
    </div>
    <div className='flex flex-col'>
        <div className='flex justify-center flex-wrap'>
            <div>
                <div className='flex justify-center mb-2'>
                    <button onClick={()=>{
                        if(pageNumber!=1){
                            setPageNumber(pageNumber-1)
                        }
                    }} className='p-2 mx-2 rounded-md bg-gradient-to-tr from-indigo-500 to-[#b18fb7]'>Previous Page</button>
                    <button onClick={()=>{
                        if(pageNumber!=numPages){
                            setPageNumber(pageNumber+1)
                        }
                    }} className='p-2 mx-2 rounded-md bg-gradient-to-tr from-indigo-500 to-[#BA68C8]'>Next Page</button>
                </div>
                <Document className="border-4 h-fit border-indigo-500 rounded-md" file={book.data} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page renderAnnotationLayer={false} renderTextLayer={false} height={794} scale={scale} pageNumber={pageNumber} />
                </Document>            
            
            </div>
            <div className='flex flex-col items-center'>
            <div className='bg-gray-700 rounded-md p-2 flex flex-col justify-center mx-2 mt-10'>
                {   
                    book.comments ?
                    book.comments.map((_comments:any, index:number) => {
                        if(index+1==pageNumber && _comments) {
                            return(
                            _comments.map((_comment:any, _index:number) => {
                                let date = new Date(_comment.date).toLocaleString()
                                return(
                                    <>
                                    {
                                    _comment ?
                                <div key={_index} className='bg-gray-500 p-2 m-2 rounded-md'>
                                    <div className='flex justify-between space-x-6'>
                                        <h1 className='inline-block'>{_comment.sender_name}</h1>
                                        <h1 className='inline-block'>{date}</h1>                            
                                    </div>
                                    <h1 className='text-sm'>{_comment.comment_text}</h1>
                                </div>:null
                                    }
                                    </>
                                )
                                })
                            )
                        }
                        else{
                            <div className='bg-gray-500 p-2 m-2 rounded-md'>
                                <h1>No comments!</h1>
                            </div>
                        }
                    }) :
                    <>
                    <button className='bg-gradient-to-tr from-indigo-500 to-[#BA68C8] p-2 rounded-md font-bold w-fit content-center mt-3 ml-2'> Start comment! </button>
                    </>
                }
            <form>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea value={comment} onChange={(e)=>setComment(e.target.value)} id="comment" rows={4} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button onClick={()=>{addComment(comment, pageNumber, session.data?.user?.name, book.title)}} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Post comment
                    </button>
                    {/* <div className="flex pl-0 space-x-1 sm:pl-2">
                        <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                </svg>
                            <span className="sr-only">Attach file</span>
                        </button>
                        <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                </svg>
                            <span className="sr-only">Set location</span>
                        </button>
                        <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            <span className="sr-only">Upload image</span>
                        </button>
                    </div> */}
                </div>
            </div>
            </form>
            {/* <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p> */}
            </div>
            </div>
        </div>
    </div>
    </div>

    );
  };