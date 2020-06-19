var carousel = $('div[data-carousel="carousel"]');
var fade = carousel.hasClass('carousel--fade');
carousel.slick({
    dots: true,
    fade: fade
});
