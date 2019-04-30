// Sticky header function
let stickyHeader = document.querySelector('header');
window.addEventListener('scroll', function(e) {
   if (scrollY > 100 ) {
        stickyHeader.classList.add('sticky');
   } else {
    stickyHeader.classList.remove('sticky');
   }
})

// Show menu (mobile screen)
let menu = document.getElementById('menu');
document.getElementById('buttonMenu').addEventListener("click", function() {
    menu.classList.toggle('active');
})

// Smooth moving to anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block:    'start' 
        });
    });
});

var prev = document.querySelector(".prev");
var next = document.querySelector(".next");
next.addEventListener("click", showRightSlide);
prev.addEventListener("click", showLeftSlide);
var currentImage = 0;

function getSlides() {
    return document.querySelectorAll('.gallery-item');
}

function getDots() {
    return document.querySelectorAll('.dot');
}

updateButtonsVisibility(currentImage);

// Move to the right slide
function showRightSlide() {
    if (currentImage < getSlides().length - 1) {
        showSlide(currentImage, currentImage + 1);
        currentImage++;
    } else {
        showSlide(currentImage, 0);
        currentImage = 0;
    }
    updateButtonsVisibility(currentImage);
}

// Move to the left slide
function showLeftSlide() {
    if (currentImage == 0) {
       let last = getSlides.length - 1;
       showSlide(0, last);
       currentImage = last;
    } else {
       showSlide(currentImage, currentImage - 1);
       currentImage--;
    }
    updateButtonsVisibility(currentImage);
}

// Switch slide with arrows left/right
function pressArrows(e) {
    key = e.keyCode;
    if (key == 37) {
        showLeftSlide();
    } else if (key == 39) {
        showRightSlide();
    }
}

document.onkeydown = pressArrows;

// Update navigation arrows
function updateButtonsVisibility(active) {
    let slides = getSlides();
    if (slides === undefined) {
        return;
    }
    if (active == 0) {
        prev.classList.add('hidden');
    } else {
        prev.classList.remove('hidden');
    }
}

// Slide gallery using conrtols buttons
let idInterval;
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');

play.addEventListener('click', function(){
    this.classList.add('activeButton');
    pause.classList.remove('activeButton');
    idInterval = setInterval(function () {
        showRightSlide();
    }, 3000);
})

pause.classList.add('activeButton');

pause.addEventListener('click', function(){
    window.clearInterval(idInterval);
    this.classList.add('activeButton');
    play.classList.remove('activeButton');
})

// Rendering images using Unsplash API
let galleryContainer = document.querySelector('.gallery-container');
function renderGalleryItem() {
    let baseUrl = 'https://api.unsplash.com/collections/4637770/photos/';
    let accessKey = '3433e42b2d3f41b12c7c502fa3ca1898adc07a08124450e62bcef7564510cffe';
    let url = `${baseUrl}?client_id=${accessKey}`;

    fetch(url).then((response) => {
        response.json().then(function (data) {
            let imgArray = data;
            for (let j = 0; j < imgArray.length; j++) {
                let galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                let img = document.createElement('img');
                img.classList.add('gallery', 'item');
                img.src = imgArray[j].urls.full;

                galleryItem.appendChild(img);
                if (j == 0) {
                    galleryItem.classList.add('active');
                }
                galleryContainer.appendChild(galleryItem);
            }
            createDots();
            addButtonListener();
        });
    })
}

renderGalleryItem();

// Create navigation dots
function createDots() {
    let numberDots = document.querySelectorAll('.gallery-item');
    for (let i = 0; i < numberDots.length; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        if (i == 0) {
            dot.classList.add('active');
        }
        let dotsContainer = document.querySelector('.dots-container');
        dotsContainer.appendChild(dot);
    }
};

// Slide gallery with navigations dots
function addButtonListener() { 
    let buttons = document.querySelectorAll('.dot'); 
    let listener = function(e) {
        showSlide(currentImage, e.target.index);
        currentImage = e.target.index;
    };
    for (let j = 0; j < buttons.length; j++) { 
        buttons[j].index = j; 
        buttons[j].addEventListener("click", listener);
    }
}

// Switchs slides
function showSlide(prev, next) {
    let slides = getSlides();
    let dots = getDots();
    slides[prev].classList.remove('active');
    dots[prev].classList.remove('active');
    slides[next].classList.add('active');
    dots[next].classList.add('active');
}

