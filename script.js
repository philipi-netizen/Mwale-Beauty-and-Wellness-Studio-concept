/* =========================================================
   MWALI BEAUTY & WELLNESS STUDIO
   V2 — PREMIUM INTERACTION SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENT REFERENCES
       ===================================================== */

    const body = document.body;

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    const navItems =
        document.querySelectorAll(".nav-links a");

    const navbar =
        document.querySelector(".navbar");

    const sections =
        document.querySelectorAll("main section[id]");

    const loader =
        document.querySelector(".page-loader");


    /* =====================================================
       02. PAGE LOADER
       ===================================================== */

    if (loader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                loader.classList.add("loaded");

            }, 100);

        });

    }


    /* =====================================================
       03. MOBILE NAVIGATION
       ===================================================== */

    function closeMenu() {

        if (!menuToggle || !navLinks) return;

        menuToggle.classList.remove("active");

        navLinks.classList.remove("mobile-active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        body.classList.remove("menu-open");

    }


    function openMenu() {

        if (!menuToggle || !navLinks) return;

        menuToggle.classList.add("active");

        navLinks.classList.add("mobile-active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        body.classList.add("menu-open");

    }


    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.classList.contains("active");

            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        });

    }


    /* =====================================================
       04. CLOSE MENU WHEN LINK IS CLICKED
       ===================================================== */

    navItems.forEach((link) => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* =====================================================
       05. CLOSE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", (event) => {

        if (!menuToggle || !navLinks) return;

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navLinks.classList.contains("mobile-active")
        ) {

            closeMenu();

        }

    });


    /* =====================================================
       06. ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });


    /* =====================================================
       07. RESPONSIVE MENU RESET
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth >= 900) {

            closeMenu();

        }

    });


    /* =====================================================
       08. NAVBAR SCROLL EFFECT
       ===================================================== */

    let lastScroll = 0;

    function handleNavbarScroll() {

        const currentScroll =
            window.scrollY;

        if (!navbar) return;


        if (currentScroll > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }


        /* Hide navbar slightly while scrolling down */

        if (
            currentScroll > lastScroll &&
            currentScroll > 180
        ) {

            navbar.classList.add("nav-hidden");

        } else {

            navbar.classList.remove("nav-hidden");

        }


        lastScroll =
            Math.max(currentScroll, 0);

    }


    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );


    /* =====================================================
       09. ACTIVE NAVIGATION
       ===================================================== */

    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                navItems.forEach((item) => {

                    item.classList.remove("active");

                });


                const activeLink =
                    document.querySelector(
                        `.nav-links a[href="#${sectionId}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add("active");

                }

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =====================================================
       10. SMOOTH ANCHOR NAVIGATION
       ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const navHeight =
                    navbar
                        ? navbar.offsetHeight + 20
                        : 20;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navHeight;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });


    /* =====================================================
       11. SCROLL REVEAL SYSTEM
       ===================================================== */

    const revealTargets = [

        ".section-heading",

        ".brand-intro-copy",

        ".service-card",

        ".featured-image",

        ".featured-content",

        ".gallery-item",

        ".instagram-item",

        ".about-visual",

        ".about-content",

        ".testimonial",

        ".location-content",

        ".hours-card",

        ".booking-card"

    ];


    const revealElements =
        document.querySelectorAll(
            revealTargets.join(",")
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       12. STAGGER SERVICE CARDS
       ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 80}ms`;

        }
    );


    /* =====================================================
       13. STAGGER TESTIMONIALS
       ===================================================== */

    const testimonials =
        document.querySelectorAll(
            ".testimonial"
        );


    testimonials.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 100}ms`;

        }
    );


    /* =====================================================
       14. STAGGER INSTAGRAM GRID
       ===================================================== */

    const instagramItems =
        document.querySelectorAll(
            ".instagram-item"
        );


    instagramItems.forEach(
        (item, index) => {

            item.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       15. STAGGER GALLERY
       ===================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryItems.forEach(
        (item, index) => {

            item.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       16. IMAGE ERROR HANDLING
       ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

                image.removeAttribute(
                    "src"
                );

                image.alt =
                    "Mwali Beauty & Wellness Studio";

            },
            { once: true }
        );

    });


    /* =====================================================
       17. PREMIUM IMAGE PARALLAX
       ===================================================== */

    const parallaxImages =
        document.querySelectorAll(
            ".featured-image img, .about-visual img"
        );


    function handleParallax() {

        if (
            window.innerWidth < 900
        ) {

            return;

        }


        parallaxImages.forEach(
            (image) => {

                const parent =
                    image.parentElement;

                if (!parent) return;


                const rect =
                    parent.getBoundingClientRect();


                const viewportHeight =
                    window.innerHeight;


                if (
                    rect.bottom < 0 ||
                    rect.top > viewportHeight
                ) {

                    return;

                }


                const progress =
                    (
                        viewportHeight -
                        rect.top
                    ) /
                    (
                        viewportHeight +
                        rect.height
                    );


                const movement =
                    (progress - 0.5) * 18;


                image.style.transform =
                    `scale(1.04) translateY(${movement}px)`;

            }
        );

    }


    window.addEventListener(
        "scroll",
        handleParallax,
        { passive: true }
    );


    /* =====================================================
       18. HERO IMAGE MOUSE MOVEMENT
       ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    const heroImageElement =
        document.querySelector(
            ".hero-image img"
        );


    if (
        heroImage &&
        heroImageElement &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        heroImage.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroImage.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                const moveX =
                    (x - 0.5) * 8;


                const moveY =
                    (y - 0.5) * 8;


                heroImageElement.style.transform =
                    `scale(1.04) translate(${moveX}px, ${moveY}px)`;

            }
        );


        heroImage.addEventListener(
            "mouseleave",
            () => {

                heroImageElement.style.transform =
                    "scale(1) translate(0, 0)";

            }
        );

    }


    /* =====================================================
       19. SERVICE CARD POINTER EFFECT
       ===================================================== */

    serviceCards.forEach((card) => {

        if (
            !window.matchMedia(
                "(pointer: fine)"
            ).matches
        ) {

            return;

        }


        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    (
                        (y / rect.height) -
                        0.5
                    ) * -3;


                const rotateY =
                    (
                        (x / rect.width) -
                        0.5
                    ) * 3;


                card.style.transform =
                    `translateY(-7px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       20. CURRENT YEAR
       ===================================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom span:first-child"
        );


    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} Mwali Beauty & Wellness Studio`;

    }


    /* =====================================================
       21. KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Tab"
            ) {

                body.classList.add(
                    "keyboard-user"
                );

            }

        }
    );


    document.addEventListener(
        "mousedown",
        () => {

            body.classList.remove(
                "keyboard-user"
            );

        }
    );


    /* =====================================================
       22. INITIALIZATION
       ===================================================== */

    handleNavbarScroll();

    handleParallax();

});