import { profile, projects, filters } from './data.js';

const projectRoot = document.querySelector('[data-projects]');
const filterRoot = document.querySelector('[data-filters]');

function projectTemplate(project) {
  return `<article class="project-card reveal" data-tags="${project.tags.join(' ')}">
    <button class="project-visual ${project.color}" type="button" data-project-open="${project.number}" aria-label="Decouvrir le projet ${project.title}">
    <span class="project-number">${project.number}</span><span class="project-arrow">-></span>
      <div class="visual-lines"><i></i><i></i><i></i></div><div class="visual-word">${project.title.split(' ')[0]}</div>
    </button><div class="project-meta"><div><p class="project-type">${project.type} / ${project.year} / ${project.status}</p><h3>${project.title}</h3><p>${project.description}</p><p class="project-details">${project.details}</p></div><div class="tag-list">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div>
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

const projectDialog = document.querySelector('[data-project-dialog]');
const dialogTitle = projectDialog.querySelector('[data-dialog-title]');
const dialogType = projectDialog.querySelector('[data-dialog-type]');
const dialogDescription = projectDialog.querySelector('[data-dialog-description]');
const dialogDetails = projectDialog.querySelector('[data-dialog-details]');
const dialogRole = projectDialog.querySelector('[data-dialog-role]');
const dialogChallenge = projectDialog.querySelector('[data-dialog-challenge]');
const dialogOutcome = projectDialog.querySelector('[data-dialog-outcome]');

function openProject(number) {
  const project = projects.find(item => item.number === number);
  if (!project) return;
  dialogTitle.textContent = project.title;
  dialogType.textContent = `${project.type} / ${project.year} / ${project.status}`;
  dialogDescription.textContent = project.description;
  dialogDetails.textContent = project.details;
  dialogRole.textContent = project.role;
  dialogChallenge.textContent = project.challenge;
  dialogOutcome.textContent = project.outcome;
  projectDialog.showModal();
}

projectRoot.addEventListener('click', event => {
  const trigger = event.target.closest('[data-project-open]');
  if (trigger) openProject(trigger.dataset.projectOpen);
});
projectDialog.addEventListener('click', event => { if (event.target === projectDialog) projectDialog.close(); });
projectDialog.querySelector('[data-dialog-close]').addEventListener('click', () => projectDialog.close());

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
document.querySelectorAll('[data-profile-name]').forEach(node => { node.textContent = profile.name; });
document.querySelectorAll('[data-profile-role]').forEach(node => { node.textContent = profile.role; });
document.querySelector('[data-project-count]').textContent = projects.length;
document.querySelector('[data-stack-count]').textContent = new Set(projects.flatMap(project => project.tags)).size;
renderFilters(); renderProjects(); observeReveals();
