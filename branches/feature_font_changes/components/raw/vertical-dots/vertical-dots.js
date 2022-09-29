let mainNavLinks = document.querySelectorAll("nav ul li a.v-dot-link");
console.log(mainNavLinks);

window.addEventListener("scroll", event => {
    let fromTop = window.scrollY;

    mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash).parentNode.nextElementSibling;
        // console.log(section.offsetTop);
        // console.log([section.offsetTop <= fromTop, section.offsetTop + section.offsetHeight > fromTop, [section.offsetTop, section.offsetHeight, fromTop]]);

        if (
            section.offsetTop -50 <= fromTop &&
            section.offsetTop -50 + section.offsetHeight > fromTop
        ) {
            link.classList.add("current");
        } else {
            link.classList.remove("current");
        }
    });
});
