
document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector(".site-header");

    if (!header) return;

    const nav = header.querySelector(".main-nav");
    const toggle = header.querySelector(".menu-toggle");

    if (!nav) return;

    const links = nav.querySelectorAll("a");
    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

    /* =========================================
       ACTIVE PAGE UNDERLINE
    ========================================= */

    links.forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href || href.startsWith("#") || href.startsWith("mailto:")) {
            return;
        }

        let linkURL;

        try {
            linkURL = new URL(href, window.location.origin);
        } catch (error) {
            return;
        }

        const linkPath = linkURL.pathname.replace(/\/+$/, "") || "/";

        if (linkURL.origin === window.location.origin && linkPath === currentPath) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }

    });


    /* =========================================
       MOBILE MENU OPEN / CLOSE
    ========================================= */

    if (!toggle) return;

    function closeMenu() {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {

        const isOpen = nav.classList.toggle("open");

        toggle.setAttribute("aria-expanded", String(isOpen));

    });


    /* Close after clicking a navigation link */

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 768) {
                closeMenu();
            }

        });

    });


    /* Close when clicking outside the header */

    document.addEventListener("click", function (event) {

        if (
            window.innerWidth <= 768 &&
            !header.contains(event.target)
        ) {
            closeMenu();
        }

    });


    /* Close with Escape key */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
            toggle.focus();
        }

    });


    /* Reset menu when returning to desktop */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    });

});
