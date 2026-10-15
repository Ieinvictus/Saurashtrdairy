/* =========================================================
   SAURASHTRA DAIRY
   Content JavaScript
   Reveal | Active Links | Copyright | Smooth Scrolling
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       01. DYNAMIC COPYRIGHT YEAR
    ===================================================== */

    document.querySelectorAll("[data-year]").forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });


    /* =====================================================
       02. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }

        );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        // Show content immediately if animations are unsupported
        revealElements.forEach(function (element) {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       03. ACTIVE NAVIGATION LINK
    ===================================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";


    document.querySelectorAll(".main-nav a").forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href) return;

        // Ignore external URLs and same-page section links
        if (
            href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("#")
        ) {
            return;
        }

        const linkPage = href
            .split("#")[0]
            .toLowerCase();

        // Keep the acquisition CTA separate from page highlighting
        if (link.classList.contains("nav-cta")) {
            return;
        }

        const isCurrentPage = linkPage === currentPage;

        if (isCurrentPage) {

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

        } else {

            link.classList.remove("active");

            link.removeAttribute("aria-current");

        }

    });


    /* =====================================================
       04. BACK TO TOP
    ===================================================== */

    const backToTopLinks = document.querySelectorAll(
        '.back-top, a[href="#top"]'
    );


    backToTopLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const target = document.querySelector("#top");

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: prefersReducedMotion ? "auto" : "smooth",

                block: "start"

            });

        });

    });


    /* =====================================================
       05. SMOOTH SCROLL FOR SAME-PAGE ANCHORS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            let target;

            try {

                target = document.querySelector(href);

            } catch (error) {

                return;

            }

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: prefersReducedMotion ? "auto" : "smooth",

                block: "start"

            });

            // Update URL hash without a sudden jump
            if (history.replaceState) {

                history.replaceState(null, "", href);

            }

        });

    });


    /* =====================================================
       06. PAGE VISIBILITY CHANGE
    ===================================================== */

    document.addEventListener("visibilitychange", function () {

        if (document.hidden) {

            // Content-only script: no navbar actions here.

        }

    });


});
