var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var gallery__dots = document.getElementsByClassName("gallery__dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < gallery__dots.length; i++) {
        gallery__dots[i].className = gallery__dots[i].className.replace(" gallery__active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    gallery__dots[slideIndex-1].className += " gallery__active";
}