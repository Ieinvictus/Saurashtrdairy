/* =========================================================
   SAURASHTRA DAIRY — ABOUT PAGE SCRIPT
   Scroll Reveal + Staggered Animation
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const aboutPage = document.querySelector(".sd-about-page");

    if (!aboutPage) {
        return;
    }

    const revealElements = aboutPage.querySelectorAll(".sd-reveal");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach(function (element) {
            element.classList.add("sd-visible");
        });

        return;
    }

    /*
       Activate reveal CSS only when JavaScript is available.
       If the script fails, the content remains visible.
    */

    aboutPage.classList.add("sd-reveal-ready");

    const revealObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("sd-visible");

                    /*
                       Remove observation after revealing.
                       This prevents repeated animations.
                    */

                    revealObserver.unobserve(entry.target);

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


    /* Smooth scroll for internal About page links */

    aboutPage.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") {
                return;
            }

            const target = aboutPage.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            /*
               Update the URL fragment without forcing
               a full page reload.
            */

            if (history.replaceState) {
                history.replaceState(null, "", targetID);
            }

        });

    });

});
