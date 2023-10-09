import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function Home() {
  const [pdfFileData, setPdfFileData] = useState();
  const [pageSelection, setPageSelection] = useState(""); // User input for page selection
  const [extractedPdfData, setExtractedPdfData] = useState(null);

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  function renderPdf(uint8array) {
    const tempblob = new Blob([uint8array], {
      type: "application/pdf",
    });
    const docUrl = URL.createObjectURL(tempblob);
    setPdfFileData(docUrl);
  }

  async function extractPdfPages(arrayBuff, pageSelection) {
    const pdfSrcDoc = await PDFDocument.load(arrayBuff);
    const pdfNewDoc = await PDFDocument.create();

    // Parse the user input for page selection
    const pagesToExtract = parsePageSelection(pageSelection, pdfSrcDoc.getPageCount());

    for (const pageNum of pagesToExtract) {
      const pages = await pdfNewDoc.copyPages(pdfSrcDoc, [pageNum - 1]);
      pages.forEach((page) => pdfNewDoc.addPage(page));
    }

    const newpdf = await pdfNewDoc.save();
    return newpdf;
  }

  // Parse user input for page selection
  function parsePageSelection(input, pageCount) {
    const pageRanges = input.split(",").map((range) => range.trim());
    const selectedPages = [];

    for (const pageRange of pageRanges) {
      if (pageRange.includes("-")) {
        const [start, end] = pageRange.split("-").map((num) => parseInt(num));
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= pageCount) {
            selectedPages.push(i);
          }
        }
      } else {
        const pageNum = parseInt(pageRange);
        if (pageNum >= 1 && pageNum <= pageCount) {
          selectedPages.push(pageNum);
        }
      }
    }

    return selectedPages;
  }

  // Execute when user selects a file
  const onFileSelected = async (e) => {
    const fileList = e.target.files;
    if (fileList?.length > 0) {
      const pdfArrayBuffer = await readFileAsync(fileList[0]);
      renderPdf(pdfArrayBuffer);
    }
  };

  // Handle changes in the page selection input
  const handlePageSelectionChange = (e) => {
    setPageSelection(e.target.value);
  };

  // Handle the extraction of the specified pages
  const handleExtractPages = async () => {
    if (!pdfFileData) {
      alert('Please select a PDF file.');
      return;
    }

    const extractedPdf = await extractPdfPages(
      await (await fetch(pdfFileData)).arrayBuffer(),
      pageSelection
    );
    setExtractedPdfData(extractedPdf);

    // Create a download link for the extracted PDF
    const extractedPdfBlob = new Blob([extractedPdf], {
      type: "application/pdf",
    });
    const extractedPdfUrl = URL.createObjectURL(extractedPdfBlob);

    // Trigger a download
    const a = document.createElement("a");
    a.href = extractedPdfUrl;
    a.download = "extracted.pdf";
    a.click();
  };

  return (
    <>
      <div className="bg-yellow-500 py-4 text-white text-center">
        <h1 className="text-2xl font-semibold">PDF Page Extractor</h1>
      </div>
      <div className="container mx-auto mt-8 p-4">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Select a PDF File:</label>
          <input
            type="file"
            id="file-selector"
            accept=".pdf"
            onChange={onFileSelected}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Page Selection (e.g., 1-10, 4, 5, 7):
          </label>
          <input
            type="text"
            value={pageSelection}
            onChange={handlePageSelectionChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          onClick={handleExtractPages}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
        >
          Extract Pages
        </button>
      </div>
      <div className="container mx-auto mt-8">
        <iframe
          className="w-full h-screen"
          title="PdfFrame"
          src={pdfFileData}
          type="application/pdf"
        ></iframe>
      </div>
    </>
  );
}