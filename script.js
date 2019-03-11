var stickyHeader = document.querySelector('header');

window.addEventListener('scroll', function(e) {
   if (scrollY > 100 ) {
        stickyHeader.classList.add('sticky');
   } else {
    stickyHeader.classList.remove('sticky');
   }
})