document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     HEADER HIDE / SHOW ON SCROLL
  =============================== */

  const header = document.querySelector(".site-header");
  let lastScrollY = window.scrollY;
  const threshold = 50;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < threshold) {
      header.classList.remove("is-hidden");
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  /* ===============================
     MOBILE MENU TOGGLE
  =============================== */

  const toggle = document.getElementById("mobile-toggle");
  const menu = document.getElementById("mobile-menu");

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.textContent = "Menu";
    toggle.classList.add("red-pill");
    toggle.classList.remove("invert-pill");
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    toggle.focus();
  };

  const openMenu = () => {
    menu.classList.add("is-open");
    toggle.textContent = "Close";
    toggle.classList.remove("red-pill");
    toggle.classList.add("invert-pill");
    toggle.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  /* ===============================
     ESC KEY CLOSE
  =============================== */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });

});
