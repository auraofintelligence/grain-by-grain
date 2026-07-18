/*
 * Grain by Grain: shared page behaviour + the hero animation.
 *
 * Progressive enhancement only: every page is complete without this file.
 * Pattern inherited from the aura / right-place cinema family, extended here
 * with a data-driven ladder SEQUENCE so prev/next stays correct as the site
 * grows toward hundreds of pages: add a rung to SEQUENCE, every page updates.
 */
(() => {
  document.documentElement.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* The linear climb. Sitemap and future deep pages sit outside this rail. */
  const SEQUENCE = [
    { slug: 'home', file: 'index.html', label: 'Home' },
    { slug: 'people', file: 'people.html', label: 'People and trust' },
    { slug: 'capital', file: 'capital.html', label: 'Patient capital' },
    { slug: 'care', file: 'care.html', label: 'The care' },
    { slug: 'genesis', file: 'genesis.html', label: 'The Aura Geode' },
    { slug: 'bench', file: 'bench.html', label: 'The bench' },
    { slug: 'materials', file: 'materials.html', label: 'What the island is made of' },
    { slug: 'reclaim', file: 'reclaim.html', label: 'The tip loop' },
    { slug: 'ages', file: 'ages.html', label: 'The wasteful age' },
    { slug: 'tunnels', file: 'tunnels.html', label: 'Tunnels' },
    { slug: 'corridor', file: 'corridor.html', label: 'The line on the ground' },
    { slug: 'alchemy', file: 'alchemy.html', label: 'Full-spectrum alchemy' },
    { slug: 'energy', file: 'energy.html', label: 'Energy' },
    { slug: 'solar', file: 'solar.html', label: 'Solar on structures' },
    { slug: 'waves', file: 'waves.html', label: 'Ocean energy' },
    { slug: 'wind', file: 'wind.html', label: 'Bladeless wind' },
    { slug: 'storage', file: 'storage.html', label: 'Storing power' },
    { slug: 'thermal', file: 'thermal.html', label: 'The breath of the city' },
    { slug: 'imagination', file: 'imagination.html', label: 'The drawing board' },
    { slug: 'walls', file: 'walls.html', label: 'The walls' },
    { slug: 'threats', file: 'threats.html', label: 'The threats' },
    { slug: 'watchtower', file: 'watchtower.html', label: 'The watchtower' },
    { slug: 'country', file: 'country.html', label: 'Country' },
    { slug: 'method', file: 'method.html', label: 'How to read this site' },
  ];

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Kintsugi seams draw themselves in gold on approach ---------- */
  const seams = document.querySelectorAll('.kintsugi-seam');
  if (seams.length && 'IntersectionObserver' in window && !reduced) {
    const seamObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add('is-drawn');
        seamObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    seams.forEach((el) => seamObserver.observe(el));
  } else {
    seams.forEach((el) => el.classList.add('is-drawn'));
  }

  /* ---------- Mark the current page in the nav ---------- */
  const normalise = (value) => {
    const url = new URL(value, location.href);
    return url.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  };
  const here = normalise(location.href);
  document.querySelectorAll('.site-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) { return; }
    if (normalise(href) === here) { link.setAttribute('aria-current', 'page'); }
  });

  /* ---------- Prev / next rail, injected before the footer ---------- */
  const page = document.body.getAttribute('data-page');
  const footer = document.querySelector('.site-footer');
  const idx = SEQUENCE.findIndex((s) => s.slug === page);
  if (footer && idx !== -1) {
    const prev = SEQUENCE[idx - 1];
    const next = SEQUENCE[idx + 1];
    const rail = document.createElement('nav');
    rail.className = 'rung-nav';
    rail.setAttribute('aria-label', 'Ladder navigation');
    const left = prev
      ? `<a href="${prev.file}">&larr; ${prev.label}</a>`
      : `<span></span>`;
    const right = next
      ? `<a href="${next.file}">${next.label} &rarr;</a>`
      : `<a href="sitemap.html">See the whole map &rarr;</a>`;
    rail.innerHTML = left + right;
    footer.insertAdjacentElement('beforebegin', rail);
  }

  /* ---------- Site map link into the footer, everywhere ---------- */
  const footerLinks = document.querySelector('.footer-links');
  if (footerLinks && !footerLinks.querySelector('[data-map-link]')) {
    const map = document.createElement('a');
    map.href = 'sitemap.html';
    map.textContent = 'Site map';
    map.setAttribute('data-map-link', '');
    footerLinks.insertBefore(map, footerLinks.firstChild);
  }

  /* ---------- To-top button ---------- */
  const toTop = document.createElement('button');
  toTop.type = 'button';
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<span aria-hidden="true">&uarr;</span>';
  document.body.appendChild(toTop);
  const toggleTop = () => toTop.classList.toggle('is-visible', window.scrollY > 640);
  toggleTop();
  window.addEventListener('scroll', toggleTop, { passive: true });
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    const target = document.getElementById('main') || document.body;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  /* ---------- Condensing header ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-condensed', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Hero canvas: windblown sand ---------- */
  const canvas = document.querySelector('[data-sand-canvas]');
  if (!canvas || !canvas.getContext) { return; }
  const ctx = canvas.getContext('2d');

  const GOLD = [255, 207, 110];
  const BAY = [43, 227, 194];
  const DUSK = [177, 151, 252];

  let w = 0, h = 0;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();

  const COUNT = 220;
  const grains = [];
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < COUNT; i++) {
    const tint = rand();
    grains.push({
      x: rand(), y: rand(),
      r: 0.6 + rand() * 1.7,
      speed: 0.00016 + rand() * 0.00042,
      sway: 0.4 + rand() * 1.4,
      phase: rand() * Math.PI * 2,
      col: tint < 0.62 ? GOLD : (tint < 0.86 ? BAY : DUSK),
      alpha: 0.14 + rand() * 0.5,
    });
  }

  const strata = [0.86, 0.91, 0.955];

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    strata.forEach((f, i) => {
      const lift = Math.sin(t * 0.0007 + i * 1.7) * 4;
      ctx.strokeStyle = `rgba(255, 207, 110, ${0.10 - i * 0.02})`;
      ctx.beginPath();
      ctx.moveTo(-40, h * f + lift);
      ctx.quadraticCurveTo(w * (0.3 + i * 0.18), h * f - 34 - i * 10 + lift, w + 40, h * (f - 0.015) + lift);
      ctx.stroke();
    });
    grains.forEach((g) => {
      const gx = ((g.x - t * g.speed) % 1 + 1) % 1;
      const drift = Math.sin(t * 0.0011 * g.sway + g.phase) * 0.012;
      const gy = Math.min(0.985, g.y + drift + (1 - gx) * 0.05);
      const [r, gr, b] = g.col;
      ctx.globalAlpha = g.alpha * (0.55 + 0.45 * Math.sin(t * 0.002 + g.phase));
      ctx.fillStyle = `rgb(${r}, ${gr}, ${b})`;
      ctx.beginPath();
      ctx.arc(gx * w, gy * h, g.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  let t = 400;
  frame(t);
  if (reduced) { return; }

  let visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true;
    }).observe(canvas);
  }
  window.addEventListener('resize', () => { resize(); frame(t); }, { passive: true });

  const loop = () => {
    requestAnimationFrame(loop);
    if (!visible) { return; }
    if (canvas.clientWidth !== w || canvas.clientHeight !== h) { resize(); }
    t += 1;
    frame(t);
  };
  requestAnimationFrame(loop);
})();
