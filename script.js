// sticky header function

var stickyHeader = document.querySelector('header');

// window.addEventListener('scroll', function(e) {
//    if (scrollY > 100 ) {
//         stickyHeader.classList.add('sticky');
//    } else {
//     stickyHeader.classList.remove('sticky');
//    }
// })

//smooth moving to anchor

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block:    "start" 
        });
    });
});

function getSlides() {
    return document.querySelectorAll('.gallery-item');
}

function getDots() {
    return document.querySelectorAll('.dot');
}

var prev = document.querySelector(".prev");
var next = document.querySelector(".next");
next.addEventListener("click", showSlideRight);
prev.addEventListener("click", showSlideLeft);
var n = 0;

updateButtonsVisibility(n);

//move to right slide

function showSlideRight() {
    if (n < getSlides().length - 1) {
        showSlide(n, n + 1);
        n++;
    } else {
        showSlide(n, 0);
        n = 0;
    }
    updateButtonsVisibility(n);
}

//move to left slide

function showSlideLeft() {
    if (n == 0) {
       let last = getSlides.length - 1;
       showSlide(0, last);
       n = last;
    } else {
       showSlide(n, n - 1);
       n--;
    }
    updateButtonsVisibility(n);
}

//switch slide with arrows left/right

function pressArrows(e){
    key= window.event? event.keyCode: e.keyCode;
    if (key == 37) {
        showSlideLeft();
    }    else if (key == 39) {
        showSlideRight();
    }
}

document.onkeydown = pressArrows;

//update navigation arrows

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

var idInterval;


//slide gallery using conrtols buttons

document.querySelector('.play').addEventListener('click', function(){
    idInterval = setInterval(function () {
        showSlideRight();
    }, 2000);
})

document.querySelector('.pause').addEventListener('click', function(){
    window.clearInterval(idInterval);
})

//rendering images using Unsplash API

const galleryContainer = document.querySelector('.gallery-container');

function renderGalleryItem() {
    let baseUrl = 'https://api.unsplash.com/collections/3284053/photos/';
    let accessKey = '3433e42b2d3f41b12c7c502fa3ca1898adc07a08124450e62bcef7564510cffe';
    let url = `${baseUrl}?client_id=${accessKey}&`;

    fetch(url).then((response) => {
        response.json().then(function (data) {
            let imgArray = data;
            for (let j = 2; j < imgArray.length; j++) {
                let galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                let img = document.createElement('img');
                img.classList.add('gallery', 'item');
                img.src = imgArray[j].urls.full;
                galleryItem.appendChild(img);
                if (j == 2) {
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

// create navigations dots
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

//slide gallery with navigations dots

function addButtonListener() { 
    let buttons = document.querySelectorAll('.dot'); 
    let listener = function(e) {
        showSlide(n, e.target.index);
        n = e.target.index;
    };
    for (let j = 0; j < buttons.length; j++) { 
        buttons[j].index = j; 
        buttons[j].addEventListener("click", listener);
    }
}

//function that switchs slides

function showSlide(prev, next) {
    let slides = getSlides();
    let dots = getDots();
    slides[prev].classList.remove('active');
    dots[prev].classList.remove('active');
    slides[next].classList.add('active');
    dots[next].classList.add('active');
}

