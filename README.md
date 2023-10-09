# PDF Extractor

This web application allows users to upload PDF files, view a simplified version of the PDF, and extract specific pages from it.

## Getting Started

To get started with this project, follow these steps:

### Clone the Repository

```bash
git clone https://github.com/GaganChaudhary6378/pdf-extractor.git
cd pdf-extractor
```

### Install Dependencies

```bash
npm install
```

### Start the Project

```bash
npm run start
```

The web application will be accessible in your web browser at http://localhost:3000 (or a different port if specified).

### Functionality

PDF Extractor provides the following functionality:

***Upload PDF***: Users can upload a PDF file of their choice.

***View PDF***: After uploading the PDF, the application displays a simplified view of the PDF on the same page using the pdf-lib library.

***Extract Pages***: Users can extract specific pages from the PDF by:

- Entering a single page number (e.g., 5).
- Specifying a range of pages (e.g., 1-8).
- Selecting random pages (e.g., 1, 5, 8).
  
Generate New PDF: When the user clicks on the "Extract" button, a new PDF containing the selected pages will be generated and made available for download.

### Preview 

***Upload Pdf***

![image](https://github.com/GaganChaudhary6378/pdf-extractor/assets/100700883/c806a64b-af76-437d-acf8-8539af0717c6)

***Extract Pages***

![image](https://github.com/GaganChaudhary6378/pdf-extractor/assets/100700883/6f574dc4-b6ce-4820-abaf-613d2326b921)

***Final Extracted Pdf***

![image](https://github.com/GaganChaudhary6378/pdf-extractor/assets/100700883/dc40967d-6e85-4d91-b681-54d084a59d3e)


