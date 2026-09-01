import { projects, filters } from './data.js';

const projectRoot = document.querySelector('[data-projects]');
const filterRoot = document.querySelector('[data-filters]');

function projectTemplate(project) {
  return `<article class="project-card reveal" data-tags="${project.tags.join(' ')}">
    <a class="project-visual ${project.color}" href="${project.link}" aria-label="Voir le projet ${project.title}">
    <span class="project-number">${project.number}</span><span class="project-arrow">-></span>
      <div class="visual-lines"><i></i><i></i><i></i></div><div class="visual-word">${project.title.split(' ')[0]}</div>
    </a><div class="project-meta"><div><p class="project-type">${project.type} / ${project.year}</p><h3>${project.title}</h3><p>${project.description}</p></div><div class="tag-list">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div>
  </article>`;
}

function renderProjects(activeFilter = 'Tous') {
  const visible = activeFilter === 'Tous' ? projects : projects.filter(project => project.tags.includes(activeFilter));
  projectRoot.innerHTML = visible.map(projectTemplate).join('');
  observeReveals(projectRoot);
}

function renderFilters() {
  filterRoot.innerHTML = filters.map((filter, index) => `<button class="filter-button${index === 0 ? ' is-active' : ''}" type="button" data-filter="${filter}">${filter}</button>`).join('');
  filterRoot.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filterRoot.querySelector('.is-active').classList.remove('is-active');
    button.classList.add('is-active');
    renderProjects(button.dataset.filter);
  });
}

function observeReveals(scope = document) {
  const items = scope.querySelectorAll('.reveal:not(.is-visible)');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); menuToggle.setAttribute('aria-expanded', open); });
nav.addEventListener('click', event => { if (event.target.matches('a')) nav.classList.remove('is-open'); });

const themeToggle = document.querySelector('[data-theme-toggle]');
themeToggle.addEventListener('click', () => { const light = document.body.classList.toggle('light-theme'); localStorage.setItem('portfolio-theme', light ? 'light' : 'dark'); themeToggle.setAttribute('aria-label', light ? 'Activer le mode sombre' : 'Activer le mode clair'); });
if (localStorage.getItem('portfolio-theme') === 'light') document.body.classList.add('light-theme');
document.querySelector('[data-year]').textContent = new Date().getFullYear();
renderFilters(); renderProjects(); observeReveals();
