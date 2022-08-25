const pdfsjsLib = window["pdfjs-dist/build/pdf"];
const library = document.getElementsByClassName("library")[0];
const dropArea = document.getElementById("drag-n-drop");
let pdfs = [];

// Scan For Files On Start ====================================================
window.addEventListener("DOMContentLoaded", () => {
  cleanLibrary();
  refreshLib();
  createItem();
});

// Scan on Refresh Button Click ====================================================
const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click", () => {
  cleanLibrary();
  refreshLib();
  createItem();
});

// Drag n Drop Function ======================================================
dropArea.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
});

dropArea.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  console.log(event);
});

// Clean the Library ==================================================
function cleanLibrary() {
  while (library.lastChild) {
    library.lastChild.remove();
  }
}
// Requesting PDFs ===================================================
function refreshLib() {
  window.electronAPI.scanForFiles();
  window.electronAPI.getScanResults((event, data) => {
    pdfs = data;
  });

  if (pdfs.length == 0) {
    library.classList.add("no-item");
    library.classList.remove("items");

    library.innerText =
      "Copy Your Files to the 'PDFs' Folder in the Program Directory";
  } else {
    library.classList.add("items");
    library.classList.remove("no-items");
  }
}

// Generate Thumbnails ===============================================
function generateThumbnails(canvas, pdfId) {
  let PDF = "./../PDFs/" + pdfs[pdfId];
  console.log(`CURRENT PDF: ${PDF}`);
  pdfjsLib.getDocument(PDF).promise.then((pdf) => {
    pdf.getPage(1).then((page) => {
      let s = canvas.width / page.getViewport({ scale: 1 }).width;

      console.log(s);

      renderSettings = {
        canvasContext: canvas.getContext("2d"),
        transform: [1, 0, 0],
        viewport: page.getViewport({ scale: s }),
      };

      page.render(renderSettings);
    });
  });
}

// Generating and Adding PDFs to the Library Panel ===================
function createItem() {
  for (let i = 0; i < pdfs.length; i++) {
    let item = document.createElement("div");
    let canvas = document.createElement("canvas");
    canvas.setAttribute("name", pdfs[i]);
    item.append(canvas);
    item.id = i;
    item.classList.add("item");
    item.addEventListener("click", () => {
      alert(item.id);
    });
    library.append(item);

    generateThumbnails(canvas, i);
  }
}
