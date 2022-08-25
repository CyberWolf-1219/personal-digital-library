const fileReader = new FileReader();
// Drag n Drop Function ======================================================
dropArea.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
});

dropArea.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  const file = event.dataTransfer.files[0].arrayBuffer();
  file
    .then((buffer) => {
      pdfDoc = buffer;
      renderPDFFile();
    })
    .catch((err) => {
      console.log(err);
    });
});
