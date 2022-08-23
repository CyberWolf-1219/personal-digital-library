let pdfs = [];

window.addEventListener("DOMContentLoaded", () => {
  refreshLib();
  createItem();
});

// Drop Down Function ======================================================
const dropArea = document.getElementById("drag-n-drop");

dropArea.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
});

dropArea.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  console.log(event);
});

// PDF Loading Function ===================================================
async function refreshLib() {
  const files = await window.electronAPI.getFiles();
  console.log(typeof files);
  for (let file of files) {
    pdfs.push(file);
  }
}

function createItem() {
  const parent = document.getElementsByClassName("library")[0];
  if (pdfs.length == 0) {
    parent.classList.add("no-item");
    parent.innerText =
      "Copy Your Files to the 'PDFs' Folder in the Program Directory";
  }
  for (let i = 0; i < pdfs.length; i++) {
    parent.classList.remove("no-item");
    const item = document.createElement("div");
    item.classList.add("item");
    item.id = i;
    item.addEventListener("click", () => {
      alert(i);
    });
    parent.append(item);
  }
}
