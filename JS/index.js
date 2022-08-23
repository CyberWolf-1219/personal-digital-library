//============================================================
// On Start
//============================================================
let pdfs = ["Just Item.PDF", "Just Second Item.pdf"];

window.addEventListener("DOMContentLoaded", async () => {
  refreshLib();
  createItem();
});
//=================== Drag n Drop Area =========================
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

//==================== Drop Down Panel =========================
const dropDownBtn = document.getElementById("drop-down-btn");
const dropDown = document.getElementsByClassName("drop-down")[0];

dropDownBtn.addEventListener("click", () => {
  dropDown.classList.toggle("visible");
});

//============================================================
// FUNCTIONS
//============================================================
async function refreshLib() {
  const files = await window.electronAPI.getFiles();
  for (let file of files) {
    pdfs.push(file);
  }
}

function createItem() {
  for (let i = 0; i < pdfs.length; i++) {
    const parent = document.getElementById("library");
    const item = document.createElement("div");
    item.classList.add("item");
    item.id = i;
    item.addEventListener("click", () => {
      alert(i);
    });
    parent.append(item);
  }
}
