/* =========================================================
   SAURASHTRA DAIRY — FOOTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       01. AUTO CURRENT YEAR
    ========================================= */

    const yearElement = document.querySelector(".site-footer [data-year]");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =========================================
       02. BACK TO TOP
    ========================================= */

    const backToTop = document.querySelector(".site-footer .back-top");

    if (backToTop) {
        backToTop.addEventListener("click", function (event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth"
            });
        });
    }


    /* =========================================
       03. FOOTER REVEAL ANIMATION
       Works with elements having .reveal
    ========================================= */

    const revealElements = document.querySelectorAll(".site-footer .reveal");

    if ("IntersectionObserver" in window && revealElements.length) {

        const revealObserver = new IntersectionObserver(function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
    }


    /* =========================================
       04. FOOTER SOCIAL LINKS
       Open external profiles in a new tab
    ========================================= */

    const socialLinks = document.querySelectorAll(
        ".site-footer .footer-social-vertical a"
    );

    socialLinks.forEach(function (link) {

        if (link.hostname && link.hostname !== window.location.hostname) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }

    });

});
