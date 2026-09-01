(() => {
  "use strict";

  const replaceText = (root, selector, text) => {
    const element = root?.querySelector(selector);
    if (element && element.textContent !== text) {
      element.textContent = text;
    }
  };

  const applyBrandLanguage = () => {
    if (document.title.endsWith("— Portfolio")) {
      document.title = document.title.replace(/— Portfolio$/, "— DefSky Studio");
    }

    const closing = document.querySelector(".detail-closing");
    if (closing) {
      replaceText(closing, ".eyebrow", "Prochain horizon");
      replaceText(closing, "h2", "Chaque ciel plus clair commence par une idée.");
      replaceText(closing, "a", "Explorer la constellation");
    }

    const emptyState = document.querySelector(".projects-empty");
    if (emptyState) {
      replaceText(emptyState, "h2", "Aucune étoile trouvée");
      replaceText(emptyState, "p", "Essayez une autre trajectoire ou réinitialisez la constellation.");
      replaceText(emptyState, "button", "Réinitialiser la trajectoire");
    }

    const notFound = document.querySelector(".project-not-found");
    if (notFound) {
      replaceText(notFound, ".eyebrow", "Signal perdu");
      replaceText(notFound, "h1", "Cette étoile n’est plus dans la constellation.");
      replaceText(notFound, "p:not(.eyebrow)", "Revenez à la carte pour retrouver les concepts disponibles.");
      replaceText(notFound, "a", "Retour à la constellation");
    }
  };

  const start = () => {
    applyBrandLanguage();

    const observer = new MutationObserver(() => applyBrandLanguage());
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
