if (window.location.pathname.endsWith('/index.html')) {
    window.history.replaceState({}, '', window.location.pathname.slice(0, -10));
}

$(".logo").on("click", () => scrollToTop());

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}