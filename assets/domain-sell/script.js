/* =========================================================
   SAURASHTRA DAIRY
   PREMIUM DOMAIN SALE PAGE
   File: assets/domain-sell/script.js
========================================================= */

(function () {
    "use strict";

    /* =====================================================
       01. INITIALIZE PAGE
    ===================================================== */

    const page = document.querySelector(".sd-sale-page");

    if (!page) {
        return;
    }


    /* =====================================================
       02. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = page.querySelectorAll(".sd-reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        revealElements.forEach(function (element) {
            element.classList.add("sd-visible");
        });
    } else {
        page.classList.add("sd-reveal-ready");

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("sd-visible");

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    }


    /* =====================================================
       03. SMOOTH SCROLL FOR INTERNAL LINKS
    ===================================================== */

    const internalLinks = page.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            let target;

            try {
                target = page.querySelector(href);
            } catch (error) {
                return;
            }

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });

            if (target.tabIndex < 0) {
                target.setAttribute("tabindex", "-1");
            }

            target.focus({
                preventScroll: true
            });
        });
    });


    /* =====================================================
       04. DOMAIN CARD POINTER EFFECT
    ===================================================== */

    const domainCards = page.querySelectorAll(
        ".sd-domain-card"
    );

    const isFinePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (isFinePointer && !prefersReducedMotion) {
        domainCards.forEach(function (card) {
            card.addEventListener("pointermove", function (event) {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = ((x - centerX) / centerX) * 3;
                const rotateX = ((centerY - y) / centerY) * 3;

                card.style.transform =
                    "perspective(1000px) " +
                    "rotateX(" + rotateX + "deg) " +
                    "rotateY(" + rotateY + "deg) " +
                    "translateY(-4px)";
            });

            card.addEventListener("pointerleave", function () {
                card.style.transform = "";
            });
        });
    }


    /* =====================================================
       05. PREVENT MULTIPLE CLICKS ON CONTACT LINKS
    ===================================================== */

    const contactLinks = page.querySelectorAll(
        ".sd-contact-method"
    );

    contactLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const href = link.getAttribute("href");

            if (!href) {
                return;
            }

            if (href.startsWith("mailto:")) {
                link.setAttribute(
                    "aria-label",
                    "Open email application to contact Saurashtra Dairy"
                );
            }

            if (href.includes("wa.me/")) {
                link.setAttribute(
                    "aria-label",
                    "Contact Saurashtra Dairy through WhatsApp"
                );
            }
        });
    });


    /* =====================================================
       06. CURRENT YEAR SUPPORT
       Optional: works if an element uses .sd-current-year
    ===================================================== */

    const yearElements = page.querySelectorAll(
        ".sd-current-year"
    );

    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });


    /* =====================================================
       07. PAGE READY
    ===================================================== */

    page.classList.add("sd-page-ready");

})();
