const qs = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => [...root.querySelectorAll(s)];

function pathPrefix() {
  return window.location.pathname.includes('/screens/') ? '' : 'screens/';
}

function ensurePanels() {
  const prefix = pathPrefix();
  if (!qs('#mobilePanel')) {
    document.body.insertAdjacentHTML('beforeend', `<div class="mobile-panel" id="mobilePanel"><div class="panel-top"><a class="brand" href="${prefix ? 'index.html' : '../index.html'}"><strong>МЕРТМАКС</strong><span>ЕООД</span></a><button class="icon-btn" data-close-menu aria-label="Затвори меню">×</button></div><nav class="panel-links"><a href="${prefix}home.html">Начало</a><a href="${prefix}supermarket.html">Супермаркет</a><a href="${prefix}industrial.html">Индустриален</a><a href="${prefix}construction.html">Строителство</a><a href="${prefix}restaurant.html">Ресторант</a><a href="${prefix}contact.html">Контакти</a></nav><button class="btn color mobile-search-btn" type="button" data-open-search>Търсене</button></div>`);
  }
  if (!qs('#searchPanel')) {
    document.body.insertAdjacentHTML('beforeend', `<div class="search-panel" id="searchPanel"><div class="panel-top"><strong>Търсене</strong><button class="icon-btn" data-close-search aria-label="Затвори търсене">×</button></div><div class="search-box"><input id="siteSearch" placeholder="Какво търсите?"><div class="search-results"><a href="${prefix}supermarket.html">Хранителни стоки</a><a href="${prefix}construction.html">Строителни материали</a><a href="${prefix}restaurant.html">Ресторант Делиорман</a><a href="${prefix}contact.html">Адрес в Самуил</a></div></div></div>`);
  }
}

function ensureFooter() {
  if (qs('.footer')) return;
  const prefix = pathPrefix();
  document.body.insertAdjacentHTML('beforeend', `<footer class="footer"><div class="footer-grid"><div><h3>МЕРТМАКС</h3><p>Сърцето на Самуил — магазини, услуги и ресторант за местната общност.</p></div><div><a class="dot-link" style="--card-color:#E53E3E" href="${prefix}supermarket.html">Супермаркет</a><a class="dot-link" style="--card-color:#D53F8C" href="${prefix}industrial.html">Индустриален</a><a class="dot-link" style="--card-color:#3182CE" href="${prefix}construction.html">Строителство</a><a class="dot-link" style="--card-color:#C05621" href="${prefix}restaurant.html">Ресторант</a></div><div><p>с. Самуил, област Разград</p><p>Отворено 7 дни в седмицата</p></div></div><div class="footer-bottom"><span>© МЕРТМАКС ЕООД</span><span>Powered by Melih Hyusein</span></div></footer>`);
}

function initChrome() {
  const header = qs('.site-header');
  const menu = qs('#mobilePanel');
  const search = qs('#searchPanel');
  const updateHeader = () => header && header.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  qsa('[data-open-menu]').forEach((btn) => btn.addEventListener('click', () => menu?.classList.add('open')));
  qsa('[data-close-menu]').forEach((btn) => btn.addEventListener('click', () => menu?.classList.remove('open')));
  qsa('[data-open-search]').forEach((btn) => btn.addEventListener('click', () => { menu?.classList.remove('open'); search?.classList.add('open'); qs('#siteSearch')?.focus(); }));
  qsa('[data-close-search]').forEach((btn) => btn.addEventListener('click', () => search?.classList.remove('open')));
}

function initWipe() {
  const wipe = qs('.wipe');
  qsa('a[data-wipe]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const url = link.getAttribute('href');
      if (!url || url.startsWith('#') || event.metaKey || event.ctrlKey) return;
      event.preventDefault();
      wipe?.style.setProperty('--accent', link.dataset.color || '#E53E3E');
      wipe?.classList.add('run');
      setTimeout(() => { window.location.href = url; }, 310);
    });
  });
}

function initCounters() {
  qsa('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 34));
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      el.textContent = `${current}${suffix}`;
      if (current >= target) clearInterval(timer);
    }, 28);
  });
}

function initFilters() {
  qsa('[data-filter-group]').forEach((group) => {
    const cards = qsa('[data-category]');
    qsa('.filter', group).forEach((button) => {
      button.addEventListener('click', () => {
        qsa('.filter', group).forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        const value = button.dataset.filter;
        cards.forEach((card) => { card.style.display = value === 'all' || card.dataset.category === value ? '' : 'none'; });
      });
    });
  });
}

function initForm() {
  const form = qs('#contactForm');
  if (!form) return;
  qsa('input, textarea, select', form).forEach((field) => {
    field.addEventListener('input', () => field.removeAttribute('aria-invalid'));
    field.addEventListener('change', () => field.removeAttribute('aria-invalid'));
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const required = qsa('[required]', form);
    const invalid = required.find((field) => !field.value.trim());
    const message = qs('.form-message', form);
    if (invalid) {
      invalid.setAttribute('aria-invalid', 'true');
      invalid.focus();
      if (message) message.textContent = 'Моля, попълнете задължителните полета.';
      return;
    }
    if (message) message.textContent = 'Съобщението е подготвено за изпращане.';
    form.reset();
  });
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'));
  }, { threshold: 0.12 });
  qsa('.fade-up').forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  ensurePanels();
  ensureFooter();
  initChrome();
  initWipe();
  initCounters();
  initFilters();
  initForm();
  initReveal();
});
