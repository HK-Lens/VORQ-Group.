(function () {
  "use strict";

  const root = document.documentElement;
  const allowedLanguages = ["de", "sv", "en"];
  const storageKey = "vorqLang";

  function isAllowedLanguage(lang) {
    return allowedLanguages.includes(lang);
  }

  function detectInitialLanguage() {
    try {
      const savedLanguage = localStorage.getItem(storageKey);
      if (isAllowedLanguage(savedLanguage)) return savedLanguage;
    } catch (error) {
      /* localStorage can be unavailable in some privacy modes. */
    }

    const browserLanguage = (navigator.language || "de").slice(0, 2).toLowerCase();
    return isAllowedLanguage(browserLanguage) ? browserLanguage : "de";
  }

  function setLanguage(lang) {
    const nextLanguage = isAllowedLanguage(lang) ? lang : "de";

    root.setAttribute("data-lang", nextLanguage);
    root.lang = nextLanguage;

    try {
      localStorage.setItem(storageKey, nextLanguage);
    } catch (error) {
      /* Ignore storage errors; language switching still works for the current page. */
    }

    document.querySelectorAll(".lang-btn").forEach((button) => {
      const active = button.dataset.lang === nextLanguage;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setupLanguageSwitcher() {
    setLanguage(root.getAttribute("data-lang") || detectInitialLanguage());

    document.querySelectorAll(".lang-btn").forEach((button) => {
      button.setAttribute("type", "button");
      button.addEventListener("click", () => setLanguage(button.dataset.lang));
    });
  }

  function setupMobileMenu() {
    const menuButton = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");

    if (!menuButton || !nav) return;

    menuButton.setAttribute("type", "button");
    menuButton.setAttribute("aria-expanded", "false");

    function setMenu(open) {
      nav.classList.toggle("open", open);
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    }

    menuButton.addEventListener("click", () => {
      setMenu(!nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) setMenu(false);
    });
  }

  function init() {
    setupLanguageSwitcher();
    setupMobileMenu();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
