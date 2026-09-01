(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector("[data-theme-icon]");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector("[data-nav]");
  const navBackdrop = document.querySelector("[data-nav-backdrop]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopBreakpoint = window.matchMedia("(min-width: 861px)");

  const getSavedTheme = () => {
    try {
      return localStorage.getItem("theme");
    } catch (error) {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      // Le thème reste utilisable si le stockage local est indisponible.
    }
  };

  const applyTheme = (theme) => {
    const isDark = theme === "dark";

    body.classList.toggle("dark", isDark);
    body.classList.toggle("light", !isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Passer au ciel de l’aube" : "Passer au ciel nocturne"
      );
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.title = isDark ? "Ciel de l’aube" : "Ciel nocturne";
    }

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }
  };

  // La nuit est la toile de fond naturelle de DefSky Studio.
  const initialTheme = getSavedTheme() || "dark";
  applyTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });

  const setMenuState = (isOpen) => {
    if (!menuToggle || !nav || !navBackdrop) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    nav.classList.toggle("is-open", isOpen);
    navBackdrop.hidden = !isOpen;
    body.classList.toggle("menu-open", isOpen);
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  navBackdrop?.addEventListener("click", () => setMenuState(false));

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
      menuToggle?.focus();
    }
  });

  desktopBreakpoint.addEventListener?.("change", (event) => {
    if (event.matches) {
      setMenuState(false);
    }
  });

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealElements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -48px"
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
