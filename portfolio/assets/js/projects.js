(() => {
  "use strict";

  const projects = Array.isArray(window.PORTFOLIO_PROJECTS)
    ? window.PORTFOLIO_PROJECTS
    : [];

  const createElement = (tagName, options = {}) => {
    const element = document.createElement(tagName);

    if (options.className) {
      element.className = options.className;
    }

    if (options.text !== undefined) {
      element.textContent = String(options.text);
    }

    Object.entries(options.attributes || {}).forEach(([name, value]) => {
      if (value !== null && value !== undefined) {
        element.setAttribute(name, String(value));
      }
    });

    return element;
  };

  const normalizeText = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");

  const projectUrl = (project) => `project?slug=${encodeURIComponent(project.slug)}`;

  const createTagList = (technologies) => {
    const list = createElement("ul", {
      className: "tag-list",
      attributes: { "aria-label": "Mots-clés du projet" }
    });

    technologies.forEach((technology) => {
      list.append(createElement("li", { text: technology }));
    });

    return list;
  };

  const createProjectVisual = (project, large = false) => {
    const visual = createElement("div", {
      className: `project-visual accent-${project.accent}${large ? " project-visual-large" : ""}`,
      attributes: { "aria-hidden": "true" }
    });

    visual.append(
      createElement("span", { className: "project-number", text: project.number }),
      createElement("span", { className: "project-orbit project-orbit-one" }),
      createElement("span", { className: "project-orbit project-orbit-two" }),
      createElement("span", { className: "project-core" })
    );

    return visual;
  };

  const appendProjectActions = (parent, project) => {
    const actions = createElement("div", { className: "project-actions" });

    if (project.demoUrl) {
      actions.append(
        createElement("a", {
          className: "btn btn-secondary btn-small",
          text: "Voir la démonstration",
          attributes: {
            href: project.demoUrl,
            target: "_blank",
            rel: "noopener noreferrer"
          }
        })
      );
    }

    if (project.repositoryUrl) {
      actions.append(
        createElement("a", {
          className: "btn btn-secondary btn-small",
          text: "Voir la ressource",
          attributes: {
            href: project.repositoryUrl,
            target: "_blank",
            rel: "noopener noreferrer"
          }
        })
      );
    }

    if (actions.childElementCount > 0) {
      parent.append(actions);
    }
  };

  const createProjectCard = (project) => {
    const article = createElement("article", {
      className: "project-card",
      attributes: {
        "data-category": project.category,
        "data-project-slug": project.slug
      }
    });

    const content = createElement("div", { className: "project-card-content" });
    const meta = createElement("div", { className: "project-meta" });
    const titleId = `project-title-${project.slug}`;

    meta.append(
      createElement("span", { className: "project-category", text: project.category }),
      createElement("span", { className: "project-status", text: project.status })
    );

    const heading = createElement("h3", { attributes: { id: titleId } });
    heading.append(
      createElement("a", {
        text: project.title,
        attributes: { href: projectUrl(project) }
      })
    );

    const footer = createElement("div", { className: "project-card-footer" });
    footer.append(
      createElement("a", {
        className: "text-link",
        text: "Voir l’étude de cas",
        attributes: {
          href: projectUrl(project),
          "aria-label": `Voir l’étude de cas ${project.title}`
        }
      }),
      createElement("span", { className: "project-notice", text: project.notice })
    );

    content.append(
      meta,
      heading,
      createElement("p", { className: "project-subtitle", text: project.subtitle }),
      createElement("p", { className: "project-summary", text: project.summary }),
      createTagList(project.technologies),
      footer
    );

    article.append(createProjectVisual(project), content);
    article.setAttribute("aria-labelledby", titleId);

    return article;
  };

  const renderPreview = () => {
    const container = document.querySelector("[data-projects-preview]");
    if (!container) {
      return;
    }

    const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
    container.replaceChildren(...featuredProjects.map(createProjectCard));
  };

  const renderProjectsPage = () => {
    const grid = document.querySelector("[data-projects-grid]");
    const filtersContainer = document.querySelector("[data-project-filters]");
    const searchInput = document.querySelector("[data-project-search]");
    const count = document.querySelector("[data-project-count]");

    if (!grid || !filtersContainer) {
      return;
    }

    const categories = ["Tous", ...new Set(projects.map((project) => project.category))];
    const initialParams = new URLSearchParams(window.location.search);
    const requestedCategory = initialParams.get("category");
    let selectedCategory = categories.includes(requestedCategory) ? requestedCategory : "Tous";
    let searchQuery = initialParams.get("q") || "";

    if (searchInput) {
      searchInput.value = searchQuery;
    }

    const syncUrl = () => {
      if (!("replaceState" in window.history)) {
        return;
      }

      const params = new URLSearchParams();
      if (selectedCategory !== "Tous") {
        params.set("category", selectedCategory);
      }
      if (searchQuery.trim()) {
        params.set("q", searchQuery.trim());
      }

      const query = params.toString();
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
      window.history.replaceState({}, "", nextUrl);
    };

    const updatePressedStates = () => {
      filtersContainer.querySelectorAll("button[data-category]").forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.category === selectedCategory)
        );
      });
    };

    const resetFilters = () => {
      selectedCategory = "Tous";
      searchQuery = "";
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
      }
      updatePressedStates();
      updateGrid();
    };

    const updateGrid = () => {
      const normalizedQuery = normalizeText(searchQuery.trim());
      const visibleProjects = projects.filter((project) => {
        const matchesCategory = selectedCategory === "Tous"
          || project.category === selectedCategory;
        const searchableContent = normalizeText([
          project.title,
          project.subtitle,
          project.category,
          project.status,
          project.summary,
          ...project.technologies
        ].join(" "));
        const matchesSearch = !normalizedQuery || searchableContent.includes(normalizedQuery);

        return matchesCategory && matchesSearch;
      });

      if (visibleProjects.length > 0) {
        grid.replaceChildren(...visibleProjects.map(createProjectCard));
      } else {
        const emptyState = createElement("div", { className: "projects-empty" });
        emptyState.append(
          createElement("span", { className: "empty-symbol", text: "∅" }),
          createElement("h2", { text: "Aucun résultat" }),
          createElement("p", {
            text: "Modifiez la recherche ou réinitialisez les filtres pour afficher les projets de démonstration."
          })
        );

        const resetButton = createElement("button", {
          className: "btn btn-secondary btn-small",
          text: "Réinitialiser",
          attributes: { type: "button" }
        });
        resetButton.addEventListener("click", resetFilters);
        emptyState.append(resetButton);
        grid.replaceChildren(emptyState);
      }

      if (count) {
        const label = visibleProjects.length > 1 ? "résultats" : "résultat";
        count.textContent = `${visibleProjects.length} ${label}`;
      }

      syncUrl();
    };

    categories.forEach((category) => {
      const button = createElement("button", {
        className: "filter-button",
        text: category,
        attributes: {
          type: "button",
          "data-category": category,
          "aria-pressed": String(category === selectedCategory)
        }
      });

      button.addEventListener("click", () => {
        selectedCategory = category;
        updatePressedStates();
        updateGrid();
      });

      filtersContainer.append(button);
    });

    searchInput?.addEventListener("input", (event) => {
      searchQuery = event.target.value;
      updateGrid();
    });

    updateGrid();
  };

  const appendListSection = (parent, number, title, items) => {
    const section = createElement("section", { className: "detail-section" });
    const heading = createElement("div", { className: "detail-section-heading" });

    heading.append(
      createElement("span", { text: number }),
      createElement("h2", { text: title })
    );

    const list = createElement("ul", { className: "detail-list" });
    items.forEach((item) => list.append(createElement("li", { text: item })));

    section.append(heading, list);
    parent.append(section);
  };

  const updateProjectMetadata = (project) => {
    document.title = `${project.title} — Portfolio`;

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", project.summary);
  };

  const renderProjectDetail = () => {
    const container = document.querySelector("[data-project-detail]");
    if (!container) {
      return;
    }

    const slug = new URLSearchParams(window.location.search).get("slug");
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
      const emptyState = createElement("section", { className: "project-not-found" });
      emptyState.append(
        createElement("span", { className: "empty-symbol", text: "404" }),
        createElement("p", { className: "eyebrow", text: "Projet introuvable" }),
        createElement("h1", { text: "Cette étude de cas n’est pas disponible." }),
        createElement("p", {
          text: "Retournez à la sélection pour consulter les projets génériques disponibles."
        }),
        createElement("a", {
          className: "btn btn-primary",
          text: "Voir les projets",
          attributes: { href: "projects" }
        })
      );
      container.replaceChildren(emptyState);
      return;
    }

    updateProjectMetadata(project);

    const article = createElement("article", { className: "project-detail" });
    const hero = createElement("header", { className: "detail-hero" });
    const heroCopy = createElement("div", { className: "detail-hero-copy" });
    const meta = createElement("div", { className: "project-meta" });

    meta.append(
      createElement("span", { className: "project-category", text: project.category }),
      createElement("span", { className: "project-status", text: project.status })
    );

    heroCopy.append(
      createElement("a", {
        className: "back-link",
        text: "← Retour aux projets",
        attributes: { href: "projects" }
      }),
      meta,
      createElement("h1", { text: project.title }),
      createElement("p", { className: "detail-subtitle", text: project.subtitle }),
      createElement("p", { className: "detail-lead", text: project.summary }),
      createTagList(project.technologies),
      createElement("p", { className: "project-notice detail-notice", text: project.notice })
    );

    appendProjectActions(heroCopy, project);
    hero.append(heroCopy, createProjectVisual(project, true));
    article.append(hero);

    const overview = createElement("section", { className: "detail-overview" });
    const overviewHeading = createElement("div", { className: "detail-section-heading" });
    overviewHeading.append(
      createElement("span", { text: "00" }),
      createElement("h2", { text: "Vue d’ensemble" })
    );
    overview.append(overviewHeading);
    project.description.forEach((paragraph) => {
      overview.append(createElement("p", { text: paragraph }));
    });
    article.append(overview);

    const content = createElement("div", { className: "detail-grid" });
    appendListSection(content, "01", "Points clés", project.features);
    appendListSection(content, "02", "Enjeux", project.challenges);
    appendListSection(content, "03", "Résultats attendus", project.outcomes);
    article.append(content);

    const closing = createElement("section", { className: "detail-closing" });
    closing.append(
      createElement("p", { className: "eyebrow", text: "Fin de l’étude" }),
      createElement("h2", { text: "Un contenu neutre, une structure prête à évoluer." }),
      createElement("a", {
        className: "btn btn-primary",
        text: "Découvrir un autre projet",
        attributes: { href: "projects" }
      })
    );
    article.append(closing);

    container.replaceChildren(article);
  };

  const init = () => {
    if (projects.length === 0) {
      document.querySelectorAll("[data-projects-preview], [data-projects-grid]").forEach((container) => {
        container.textContent = "Le contenu de démonstration est temporairement indisponible.";
      });
      return;
    }

    renderPreview();
    renderProjectsPage();
    renderProjectDetail();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
