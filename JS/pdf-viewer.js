//=============================================================================
// Global variables
//=============================================================================
const pdfjsLib = window["pdfjs-dist/build/pdf"];
let canvas = document.getElementById("page-viewer");
let canvasCntxt = canvas.getContext("2d");

let totalPageCountDisplay = document.getElementById("total-page-count-display");
let currentPageDisplay = document.getElementById("current-page-number-display");

var pdfDoc = null;
let currentPageNumber = 1;
let totalPages = null;
let pageScale = 1;
let transform = [pageScale, 0, 0, pageScale, 0, 0];

let isPageRendering = false;
let pendingPage = null;

//=============================================================================
// Adding event listners to the next and prev buttons
//=============================================================================
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

nextBtn.addEventListener("click", () => {
  if (currentPageNumber + 1 > totalPages) {
    return;
  } else {
    renderManager(currentPageNumber + 1);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPageNumber - 1 < 1) {
    return;
  } else {
    renderManager(currentPageNumber - 1);
  }
});

//=============================================================================
// Rendering Functions
//=============================================================================

// Load the PDF file===========================================================
let renderPDFFile = () => {
  if (typeof pdfDoc == "string") {
    pdfjsLib.getDocument("./../PDFs/" + pdfDoc).promise.then((pdf) => {
      pdfDoc = pdf;
      totalPageCountDisplay.innerText = pdfDoc.numPages;
      totalPages = pdfDoc.numPages;
      renderPage(1);
    });
  } else {
    pdfjsLib.getDocument(pdfDoc).promise.then((pdf) => {
      pdfDoc = pdf;
      totalPageCountDisplay.innerText = pdfDoc.numPages;
      totalPages = pdfDoc.numPages;
      renderPage(1);
    });
  }
};

// Render Function  ===========================================================
let renderPage = (pageNumber) => {
  pdfDoc.getPage(pageNumber).then((page) => {
    isPageRendering = true;

    renderSettings = {
      canvasContext: canvasCntxt,
      transform: transform,
      viewport: page.getViewport({ scale: pageScale }),
    };

    canvas.width = page.getViewport({ scale: pageScale }).width;
    canvas.height = page.getViewport({ scale: pageScale }).height;

    let renderer = page.render(renderSettings);

    renderer.promise.then(() => {
      isPageRendering = false;
      currentPageNumber = pageNumber;
      currentPageDisplay.value = currentPageNumber;
    });
  });

  if (pendingPage !== null) {
    renderPage(pendingPage);
    pendingPage = null;
  }
};

// Render Manager Function ========================================================
let renderManager = (pageNumbertoRender) => {
  if (isPageRendering) {
    pendingPage = pageNumbertoRender;
  } else {
    renderPage(pageNumbertoRender);
  }
};
