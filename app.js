'use strict';

const projects = {
  byvit: {
    title: 'BYVIT', type: 'ONLINE STORE / COMMERCIAL PROJECT',
    lead: 'Sales experience turned into business logic for a sports nutrition store.',
    description: ['The store’s business logic draws on my sales experience and understanding of customer needs. Some components were first designed in Figma, then implemented in code.', 'The interface adapts to different screen sizes, and all key user journeys were tested manually. The project runs on a VPS with Docker, a custom domain and HTTPS, with backups and an update process that supports rollbacks.'],
    done: ['Responsive catalog, search and filters', 'Shopping cart, promotions, discount codes and blog', 'Custom admin panel', 'MoySklad: price and stock synchronization', 'Order and comment transfer with duplicate protection', 'VPS deployment, Docker and HTTPS'],
    tech: ['Figma', 'HTML', 'CSS', 'JavaScript', 'Node.js', 'REST API', 'Docker', 'VPS', 'MoySklad'],
    url: 'https://byvit.by/',
    images: [['byvit-hero', 'Homepage / Desktop', 'wide'], ['byvit-catalog', 'Product catalog / Desktop', 'wide'], ['byvit-mobile', 'Homepage / Mobile', 'mobile'], ['byvit-catalog-mobile', 'Catalog / Mobile', 'mobile'], ['byvit-admin', 'Custom admin panel sign-in', 'wide']]
  },
  steel: {
    title: 'Era Stali', type: 'MANUFACTURING WEBSITE / COMMERCIAL PROJECT',
    lead: '“We need a manufacturing website” — from the first request to launch.',
    description: ['Built from scratch, from the initial idea and market research to a finished website. I researched what customers in this industry need to know and used those findings to shape the structure and content.', 'Development and visuals were created with Codex and Google Flow. I added inquiries through a Telegram bot, deployed the site, completed basic SEO setup and arranged indexing in Google and Yandex.'],
    done: ['Market research and site structure', 'Concept and visual presentation of the manufacturing business', 'Responsive website built from scratch', 'Telegram bot for inquiries', 'Hosting deployment', 'Basic SEO and search indexing'],
    tech: ['Codex AI', 'Google Flow', 'Responsive development', 'Telegram', 'SEO'], url: 'https://erastali.by/',
    images: [['steel-hero', 'Hero section / Desktop', 'wide'], ['steel-services', 'Manufacturing capabilities', 'wide'], ['steel-pricing', 'Materials and processing costs', 'wide'], ['steel-result', 'Showcasing the finished product / Desktop', 'wide'], ['steel-mobile', 'Responsive version / Mobile', 'mobile'], ['steel-contacts-mobile', 'Contact and manufacturing information / Mobile', 'mobile']]
  },
  guitar: {
    title: 'Guitar Vibe', type: 'GUITAR STUDIO WEBSITE / COMMERCIAL PROJECT',
    lead: 'Turning a supplied Figma design into a working lesson booking website.',
    description: ['My role was to implement the supplied Figma design, build the button interactions and connect a Telegram bot to receive booking requests.', 'I deployed the website, completed basic SEO setup and arranged indexing in Google and Yandex. The visual design was provided to me as a finished Figma file.'],
    done: ['Implementation of a supplied Figma design', 'Mobile interface adaptation', 'Button interactions', 'Telegram bot for booking requests', 'Hosting deployment', 'Basic SEO and search indexing'],
    tech: ['Figma to code', 'Responsive development', 'Telegram', 'SEO'], url: 'https://guitarvibe.by/',
    images: [['guitar-desktop', 'Homepage / Desktop', 'wide'], ['guitar-mobile', 'Hero section and lesson formats / Mobile', 'mobile'], ['guitar-about-mobile', 'About the studio and learning process / Mobile', 'mobile']]
  },
  math: {
    title: 'Mathematics', type: 'EDUCATION / PERSONAL PROJECT',
    lead: 'A personal experiment: a mathematics website with the atmosphere of an animated film.',
    description: ['The idea was to create a Pixar-inspired website with an expressive 3D character, warm lighting and a friendly introduction to a challenging subject.', 'Built with Codex and Google Flow as a personal project to practice development and explore AI-generated visuals.'],
    done: ['Idea and visual concept', 'AI visuals created with Google Flow', 'Website implementation with Codex', 'Responsive version', 'GitHub Pages deployment'],
    tech: ['Codex AI', 'Google Flow', 'Responsive development', 'GitHub Pages'], url: 'https://mihed1991.github.io/math/',
    images: [['math-hero', 'Hero section / Desktop', 'wide'], ['math-approach', 'Teaching approach section', 'wide'], ['math-mobile', 'Frequently asked questions / Mobile', 'mobile'], ['math-admin-mobile', 'Admin panel sign-in / Mobile', 'mobile']]
  }
};

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia('(min-width: 760px)').addEventListener('change', closeMenu);

const dialog = document.querySelector('.case-dialog');
const content = document.querySelector('#case-content');
let lastProjectButton;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function externalLink(label, url, className) {
  const link = element('a', className, label);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `${label} — opens in a new tab`);
  return link;
}
function openProject(key, trigger) {
  const project = projects[key];
  if (!project) return;
  lastProjectButton = trigger;
  content.replaceChildren();
  content.append(element('p', 'case-eyebrow', project.type));
  const title = element('h2', '', project.title);
  title.id = 'case-title';
  content.append(title, element('p', 'case-lead', project.lead));
  const actions = element('div', 'case-actions');
  actions.append(externalLink('Visit website', project.url, 'button button-light'));
  content.append(actions);
  const description = element('div', 'case-description');
  const story = element('div');
  story.append(element('h3', '', 'About the project & my role'));
  project.description.forEach(text => story.append(element('p', '', text)));
  const done = element('div');
  done.append(element('h3', '', 'What I built'));
  const list = element('ul');
  project.done.forEach(text => list.append(element('li', '', text)));
  done.append(list);
  description.append(story, done);
  content.append(description);
  const tech = element('div', 'tags case-tech');
  project.tech.forEach(text => tech.append(element('span', '', text)));
  content.append(tech);
  const gallery = element('div', 'case-gallery');
  project.images.forEach(([name, caption, layout], index) => {
    const figure = element('figure', layout);
    const img = element('img');
    img.src = `assets/${name}.webp`;
    img.alt = `${project.title}: ${caption}`;
    img.loading = index === 0 ? 'eager' : 'lazy';
    figure.append(img, element('figcaption', '', caption));
    gallery.append(figure);
  });
  content.append(gallery);
  const end = element('div', 'case-end');
  end.append(element('p', '', 'Have a project in mind?'), externalLink('Message me on Telegram', 'https://t.me/mihed_1991', 'button button-light'));
  content.append(end);
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('modal-open');
}

document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => openProject(button.dataset.project, button));
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastProjectButton?.focus({ preventScroll: true });
});
