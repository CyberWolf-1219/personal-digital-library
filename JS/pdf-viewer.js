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
let pageScale = 2;
let transform = [1, 0, 0, 1, 0, 0];

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
// ZOOM Functions
//=============================================================================
const zoomInBtn = document.getElementById("zoom-in");
const zoomOutBtn = document.getElementById("zoom-out");
const zoomDisplay = document.getElementById("zoom-display");

let renderScale = () => {
  zoomDisplay.textContent = pageScale;
};

zoomInBtn.addEventListener("click", () => {
  if (pageScale >= 3.0) {
    return;
  }
  pageScale += 0.25;
  renderScale();
  renderManager(currentPageNumber);
});

zoomOutBtn.addEventListener("click", () => {
  if (pageScale <= 0.25) {
    return;
  }
  pageScale -= 0.25;
  renderScale();
  renderManager(currentPageNumber);
});

//=============================================================================
// Rendering Functions
//=============================================================================

// Load the PDF file===========================================================
let renderPDFFile = () => {
  renderScale();
  if (typeof pdfDoc == "string") {
    pdfjsLib.getDocument("./../PDFs/" + pdfDoc).promise.then((pdf) => {
      pdfDoc = pdf;
      totalPageCountDisplay.innerText = pdfDoc.numPages;
      totalPages = pdfDoc.numPages;
      renderPage(currentPageNumber);
    });
  } else {
    pdfjsLib.getDocument(pdfDoc).promise.then((pdf) => {
      pdfDoc = pdf;
      totalPageCountDisplay.innerText = pdfDoc.numPages;
      totalPages = pdfDoc.numPages;
      renderPage(currentPageNumber);
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
