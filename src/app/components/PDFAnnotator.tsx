import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Document, Page } from 'react-pdf';
import { fabric } from 'fabric';

const PDFAnnotator = () => {
  const router = useRouter();
  const { id } = router.query; // Assuming the PDF ID is part of the router query
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [canvas, setCanvas]:[canvas:any, setCanvas:any]  = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const annotationCanvas = new fabric.Canvas(canvasElement, { selection: false });

    setCanvas(annotationCanvas);

    return () => {
      annotationCanvas.dispose();
    };
  }, []);

  const handleDocumentLoadSuccess = (pdf:any) => {
    setNumPages(pdf.numPages);
  };

  const handlePageLoadSuccess = (page:any) => {
    const viewport = page.getViewport({ scale: 1 });
    if(canvas){
        canvas.setDimensions({ width: viewport.width, height: viewport.height }, { cssOnly: true });
    }

    // You can fetch and render existing annotations from your backend here
  };

  const handlePageChange = (newPage:any) => {
    setCurrentPage(newPage);
  };

  const handleAnnotationDraw = (e:any) => {
    const { offsetX, offsetY } = e.e;

    // Draw a rectangle as a sample annotation
    const rectangle = new fabric.Rect({
      left: offsetX - 50,
      top: offsetY - 50,
      width: 100,
      height: 100,
      fill: 'rgba(255, 0, 0, 0.5)',
      strokeWidth: 2,
      stroke: 'rgba(255, 0, 0, 0.7)',
    });
    if(canvas!=null){    
        canvas.add(rectangle);
        canvas.renderAll();
    }
  };

  return (
    <div>
      <Document file={`/api/pdf/${id}`} onLoadSuccess={handleDocumentLoadSuccess}>
        <Page pageNumber={currentPage} onLoadSuccess={handlePageLoadSuccess} />
      </Document>
      <canvas ref={canvasRef} onMouseUp={handleAnnotationDraw} />
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          Previous Page
        </button>
        <span>Page {currentPage} of {numPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= numPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PDFAnnotator;
