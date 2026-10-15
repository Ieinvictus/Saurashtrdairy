document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNavigation = document.querySelector("#mainNavigation");

  if (!menuToggle || !mainNavigation) return;

  function openMenu() {
    mainNavigation.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.innerHTML = "&times;";
    menuToggle.setAttribute("aria-label", "Close navigation");
  }

  function closeMenu() {
    mainNavigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = "☰";
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", function () {
    if (mainNavigation.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Link tap કરવાથી menu close થશે
  mainNavigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Menu બહાર tap કરવાથી close થશે
  document.addEventListener("click", function (event) {
    if (
      mainNavigation.classList.contains("open") &&
      !mainNavigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Escape key થી close
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  // Desktop screen પર જતાં menu reset
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) closeMenu();
  });
});
