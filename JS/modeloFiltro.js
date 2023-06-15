const violeta = document.querySelector(".Btn-violeta");
const verde = document.querySelector(".Btn-verde");
const todos = document.querySelector(".Btn-todos");

const vio = document.querySelectorAll(".violeta");
const ver = document.querySelectorAll(".verde");
let total;

verde.addEventListener("click", () => {
  for (index = 0; index < vio.length; index++) {
    ver[index].classList.remove("btn-off");
    vio[index].classList.add("btn-off");
    total = document.querySelectorAll(".btn-off");
  }
  console.log("verde + Add btn-off");
});
