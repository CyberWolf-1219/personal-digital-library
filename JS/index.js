const dropDownBtn = document.getElementById("drop-down-btn");
const dropDown = document.getElementsByClassName("drop-down")[0];

dropDownBtn.addEventListener("click", () => {
  dropDown.classList.toggle("visible");
});
