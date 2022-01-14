var container = document.querySelector(".container");
var headerNav = container.querySelector(".header__nav");




function start(){
    handleOnScroll();
}

start();


// function
function handleOnScroll(){
    window.addEventListener("scroll", function(){
        headerNav.classList.toggle("sticky", window.scrollY > 200)
    })
}