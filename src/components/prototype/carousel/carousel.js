var carousel = $('div[data-carousel="carousel"]');
var fade = carousel.hasClass('carousel-fade');
carousel.find('.carousel-container').slick({
    dots: true,
    fade: fade
});