// sticky header function

var stickyHeader = document.querySelector('header');

window.addEventListener('scroll', function(e) {
   if (scrollY > 100 ) {
        stickyHeader.classList.add('sticky');
   } else {
    stickyHeader.classList.remove('sticky');
   }
})

// smooth moving to anchor

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block:    "start" 
        });
    });
});


// var itemsExperiense = document.querySelectorAll(".experience-items h3");

// for (let i = 0; i < itemsExperiense.length; i++)  {
//     itemsExperiense[i].addEventListener('click', function(){
//         removeClass();
//         var activeClass = this.className;
//         document.querySelector("p." + this.className).classList.add('current');
//         this.classList.add('current');
//     })
// }

// function removeClass() {
//     var removeItemsClass =  document.querySelectorAll('.current');
//     for (let i = 0; i < removeItemsClass.length; i++)  {
//         removeItemsClass[i].classList.remove('current');
//     }
// }

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


function showSlideRight() {
    let slides = getSlides();
    let dots = getDots();
    slides[n].classList.add("active");
    dots[n].classList.add("active");
    if (n < slides.length - 1) {
        slides[n].classList.remove("active");
        slides[n + 1].classList.add("active");
        dots[n].classList.remove("active");
        dots[n + 1].classList.add("active");
        n++;
    }
    updateButtonsVisibility(n);

}

function showSlideLeft() {
    let slides = getSlides();   
    slides[n].classList.add("active");
    let dots = getDots();
    dots[n].classList.add("active");
    if (n >= 1) {
        slides[n].classList.remove("active");
        slides[n - 1].classList.add("active");
        dots[n].classList.remove("active");
        dots[n - 1].classList.add("active");
        n--;
    }
    updateButtonsVisibility(n);
}

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

    if (active == slides.length - 1) {
        next.classList.add('hidden');
    } else {
        next.classList.remove('hidden');
    }
}


(function() {
    setInterval(function () {
        showSlideRight()
    }, 2000);
 })();

const numItemsToGenerate = 1; //how many gallery items you want on the screen
const numImagesAvailable = 10; //how many total images are in the collection you are pulling from
const imageWidth = 600; //your desired image width in pixels
const imageHeight = 600; //desired image height in pixels
const collectionID = 'Ukraine'; //the collection ID from the original url
const $galleryContainer = document.querySelector('.gallery-container');

function renderGalleryItem(randomNumber) {
    let baseUrl = 'https://api.unsplash.com/search/photos?page=1&query=ukraine/';
    let accessKey = '3433e42b2d3f41b12c7c502fa3ca1898adc07a08124450e62bcef7564510cffe';
    let url = `${baseUrl}&client_id=${accessKey}&`;

    fetch(url).then((response) => {
        response.json().then(function (data) {
            let imgArray = data.results;
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
                $galleryContainer.appendChild(galleryItem);
            }
            dots();
        });
    })
}


renderGalleryItem(0, true)
for(let i = 1; i < numItemsToGenerate; i++) {
  let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
  renderGalleryItem(randomImageIndex, false);
}

function dots() {
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



