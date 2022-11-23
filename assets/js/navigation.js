const header = document.querySelector("header");
const burger = document.querySelector(".burger");
const nav = document.querySelector(".linkovi");

burger.addEventListener("click", function(){
    header.classList.toggle("active");
    burger.classList.toggle("active");
    nav.classList.toggle("active");
})