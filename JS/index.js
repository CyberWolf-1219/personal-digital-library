const dropDownBtn = document.getElementById("drop-down-btn");
const dropDown = document.getElementsByClassName("drop-down")[0];

dropDownBtn.addEventListener("click", () => {
  dropDown.classList.toggle("visible");
});

const nextPageBtn = document.getElementById("next-btn");
const prevPageBtn = document.getElementById("prev-btn");

document.onkeydown = (e) => {
  if (e.code == "ArrowRight") {
    document.getElementById("next-btn").click();
  }
  if (e.code == "ArrowLeft") {
    document.getElementById("prev-btn").click();
  }
};
