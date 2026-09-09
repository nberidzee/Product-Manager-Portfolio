const root = document.documentElement;
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const navLinks = [...document.querySelectorAll('.desktop-nav a')];

function updatePageState() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
  root.style.setProperty('--progress', progress);
  header?.classList.toggle('scrolled', window.scrollY > 12);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.11 });

document.querySelectorAll('[data-reveal]').forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-25% 0px -60%', threshold: [0.1, 0.35] });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  mobileNav?.classList.toggle('open', !open);
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
  mobileNav?.classList.remove('open');
}));

window.addEventListener('scroll', updatePageState, { passive: true });
updatePageState();
