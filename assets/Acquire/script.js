/* ==================================================
   SAURASHTRA DAIRY — FULL PAGE REVEAL JS
   Scroll Reveal + Stagger + Footer + Performance
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================
       SETTINGS
    ========================================= */

    const SELECTORS = [
        ".hero-content",
        ".hero-title",
        ".hero-description",
        ".hero-actions",
        ".section-header",
        ".section-heading",
        ".section-description",
        ".domain-card",
        ".domain-panel",
        ".feature-card",
        ".category-card",
        ".benefit-card",
        ".process-card",
        ".timeline-item",
        ".scope-panel",
        ".scope-column",
        ".faq-item",
        ".closing-inner",
        ".footer-brand-section",
        ".footer-links",
        ".footer-domain",
        ".footer-bottom",
        ".footer-social-vertical",
        ".reveal"
    ];

    const REVEAL_CLASS = "is-visible";

    const REVEAL_THRESHOLD = 0.12;

    const REVEAL_ROOT_MARGIN = "0px 0px -40px 0px";

    const STAGGER_DELAY = 100;

    const MAX_STAGGER_DELAY = 500;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =========================================
       REDUCED MOTION
    ========================================= */

    if (prefersReducedMotion) {
        document.querySelectorAll(SELECTORS.join(",")).forEach(element => {
            element.classList.add(REVEAL_CLASS);
        });

        return;
    }


    /* =========================================
       ADD REVEAL CSS DYNAMICALLY
    ========================================= */

    if (!document.getElementById("page-reveal-styles")) {
        const style = document.createElement("style");

        style.id = "page-reveal-styles";

        style.textContent = `
            .js-reveal {
                opacity: 0;
                transform: translate3d(0, 28px, 0);

                transition:
                    opacity 0.7s ease,
                    transform 0.7s cubic-bezier(0.2, 0.65, 0.3, 1);

                transition-delay: var(--reveal-delay, 0ms);

                will-change: opacity, transform;
            }

            .js-reveal.${REVEAL_CLASS} {
                opacity: 1;
                transform: translate3d(0, 0, 0);
                will-change: auto;
            }

            .js-reveal.reveal-left {
                transform: translate3d(-35px, 0, 0);
            }

            .js-reveal.reveal-left.${REVEAL_CLASS} {
                transform: translate3d(0, 0, 0);
            }

            .js-reveal.reveal-right {
                transform: translate3d(35px, 0, 0);
            }

            .js-reveal.reveal-right.${REVEAL_CLASS} {
                transform: translate3d(0, 0, 0);
            }

            .js-reveal.reveal-scale {
                transform: scale(0.94);
            }

            .js-reveal.reveal-scale.${REVEAL_CLASS} {
                transform: scale(1);
            }

            @media (prefers-reduced-motion: reduce) {
                .js-reveal,
                .js-reveal.reveal-left,
                .js-reveal.reveal-right,
                .js-reveal.reveal-scale {
                    opacity: 1 !important;
                    transform: none !important;
                    transition: none !important;
                    transition-delay: 0ms !important;
                    will-change: auto !important;
                }
            }
        `;

        document.head.appendChild(style);
    }


    /* =========================================
       COLLECT PAGE ELEMENTS
    ========================================= */

    const elements = new Set();

    SELECTORS.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            elements.add(element);
        });
    });


    /* =========================================
       PREVENT NESTED REVEAL CONFLICTS
    ========================================= */

    elements.forEach(element => {
        element.classList.add("js-reveal");
    });


    /* =========================================
       STAGGER ANIMATION
    ========================================= */

    const staggerGroups = [
        ".footer-links nav",
        ".footer-social-vertical",
        ".process-timeline",
        ".domain-features",
        ".features-grid",
        ".categories-grid",
        ".benefits-grid",
        ".cards-grid"
    ];

    staggerGroups.forEach(groupSelector => {
        document.querySelectorAll(groupSelector).forEach(group => {
            const children = Array.from(group.children).filter(child => {
                return !child.matches("h2, h3, p");
            });

            children.forEach((child, index) => {
                if (!child.classList.contains("js-reveal")) {
                    child.classList.add("js-reveal");
                    elements.add(child);
                }

                const delay = Math.min(
                    index * STAGGER_DELAY,
                    MAX_STAGGER_DELAY
                );

                child.style.setProperty("--reveal-delay", `${delay}ms`);
            });
        });
    });


    /* =========================================
       ALTERNATE SECTION ANIMATIONS
    ========================================= */

    document.querySelectorAll(".reveal-left").forEach(element => {
        element.classList.add("js-reveal");
        elements.add(element);
    });

    document.querySelectorAll(".reveal-right").forEach(element => {
        element.classList.add("js-reveal");
        elements.add(element);
    });

    document.querySelectorAll(".reveal-scale").forEach(element => {
        element.classList.add("js-reveal");
        elements.add(element);
    });


    /* =========================================
       REVEAL ELEMENTS ON SCROLL
    ========================================= */

    const revealElements = Array.from(elements).filter(element => {
        return !element.classList.contains(REVEAL_CLASS);
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(REVEAL_CLASS);

                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: REVEAL_THRESHOLD,
                rootMargin: REVEAL_ROOT_MARGIN
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {
        /* Fallback for older browsers */

        revealElements.forEach(element => {
            element.classList.add(REVEAL_CLASS);
        });
    }


    /* =========================================
       SHOW ELEMENTS ALREADY IN VIEWPORT
    ========================================= */

    requestAnimationFrame(() => {
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();

            if (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            ) {
                element.classList.add(REVEAL_CLASS);
            }
        });
    });


    /* =========================================
       BACK TO TOP
    ========================================= */

    document.querySelectorAll(".back-top").forEach(button => {
        button.addEventListener("click", event => {
            const href = button.getAttribute("href");

            if (href === "#" || href === "#top") {
                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    });


    /* =========================================
       DYNAMIC COPYRIGHT YEAR
    ========================================= */

    document.querySelectorAll("[data-year]").forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =========================================
       ACTIVE NAVIGATION LINKS
    ========================================= */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document.querySelectorAll(".main-nav a").forEach(link => {
        const href = link.getAttribute("href");

        if (!href || href.startsWith("#")) {
            return;
        }

        const linkPage = href
            .split("/")
            .pop()
            .split("?")[0]
            .toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");

    const mainNavigation = document.querySelector("#mainNavigation");

    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener("click", () => {
            const isExpanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            mainNavigation.classList.toggle("is-open", !isExpanded);
        });

        mainNavigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.setAttribute("aria-expanded", "false");

                mainNavigation.classList.remove("is-open");
            });
        });

        document.addEventListener("click", event => {
            if (
                !mainNavigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                mainNavigation.classList.remove("is-open");

                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

});
