
function hide(){
const select = document.getElementsByClassName("select");
const options =document.querySelectorAll('.option');
  select[0].classList.add("hide");
  options.forEach((item)=>{item.classList.add("show")});
}

function show(){
const select = document.getElementById("select");
const options =document.querySelectorAll('.option');
  select.classList.remove("hide");
  options.forEach((item)=>{item.classList.add("hide")});

}


window.onclick = function (event) {
  const select = document.getElementsByClassName("select");
const options =document.querySelectorAll('.option');
  if (!event.target.matches(".option") || !event.target.matches(".select")) {
    select[0].classList.remove("hide");
    options.forEach((item)=>{if (item.classList.contains("show")) {
      item.classList.remove("show")}
    });
      
  }
}
