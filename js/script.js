if (window.location.pathname.endsWith('/index.html')) {
    window.history.replaceState({}, '', window.location.pathname.slice(0, -10));
}
var hoverElements;
document.addEventListener("DOMContentLoaded", () => {
    $('.postopbar').css('width', '100vw');
    $('.postopbar').css('left', '0%');

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
    });
    Animate();
});

function Animate() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 100}ms`;
        observer.observe(element);
    });

    const animatedCards = document.querySelectorAll('.animate-on-scroll-for-cards');
    const cardsobserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.1 });

    animatedCards.forEach((element, index) => {
        element.style.transitionDelay = `${index * 50}ms`;
        cardsobserver.observe(element);
    });
}

function filterPosts() {
    const filterBar = document.getElementById('filter-bar');
    const posts = document.querySelectorAll('#posts-grid .post-card');
    const noResultsMessage = document.getElementById('no-results-message');
    const activeFilterEl = filterBar.querySelector('.active');
    if (!activeFilterEl) return;
    const activeFilter = activeFilterEl.dataset.filter;
    let visibleCount = 0;

    posts.forEach(post => {
        const postTags = post.dataset.tags.split(',');

        if (activeFilter === 'all' || postTags.includes(activeFilter)) {
            post.classList.remove('hidden');
            visibleCount++;
        } else {
            post.classList.add('hidden');
        }
    });
    UpdateHoverElements();
    setTimeout(() => {
        $(".post-card").each(function () {
                $(this).css({
                    'border-bottom-color': '#838383',
                    'border-right-color': '#838383',
                    'border-left-color': '#838383',
                });
            });
    }, 500);

    if (visibleCount === 0) {
        noResultsMessage.classList.add('visible');
    } else {
        noResultsMessage.classList.remove('visible');
    }
}

function UpdateHoverElements() {
    hoverElements = document.querySelectorAll('.post-card');
    const cursor = document.querySelector('.cursor');

    const onMouseMove = (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    };

    const onMouseEnter = () => {
        cursor.classList.remove('is-hidden');
        $("body").css('cursor', 'none');
    };

    const onMouseLeave = () => {
        cursor.classList.add('is-hidden');
        $("body").css('cursor', 'default');
    };

    window.addEventListener('mousemove', onMouseMove);
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
    });
}