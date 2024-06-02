// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel-image');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    const updateCarousel = () => {
        for (let i = 0; i < images.length; i++) {
            if (i === currentIndex) {
                images[i].classList.add('active');
            } else {
                images[i].classList.remove('active');
            }
        }
    };

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    // Initialize carousel
    updateCarousel();
});
