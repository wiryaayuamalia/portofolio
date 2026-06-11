/* NAV scroll shadow */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* Burger menu */
const burger = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navMobile.classList.toggle('open');
});
function closeMenu() {
  burger.classList.remove('open');
  navMobile.classList.remove('open');
}

/* Scroll reveal */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i % 4) * .08 + 's';
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: .08 });
document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

/* ── Upload preview + localStorage ── */
function applyPhoto(id, dataUrl) {
  const zone = document.getElementById(id);
  if (!zone) return;
  const old = zone.querySelector('img.preview'); if (old) old.remove();
  const icon = zone.querySelector('.ph-icon');
  const text = zone.querySelector('.ph-text');
  if (icon) icon.style.display = 'none';
  if (text) text.style.display = 'none';
  const img = document.createElement('img');
  img.className = 'preview'; img.src = dataUrl;
  zone.appendChild(img);
}

function previewUpload(e, id) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    applyPhoto(id, ev.target.result);
    try { localStorage.setItem('photo_' + id, ev.target.result); } catch(err) {}
  };
  reader.readAsDataURL(file);
}

/* Load saved photos on page load */
window.addEventListener('DOMContentLoaded', () => {
  const photoIds = ['heroPhoto'];
  photoIds.forEach(id => {
    try {
      const saved = localStorage.getItem('photo_' + id);
      if (saved) applyPhoto(id, saved);
    } catch(err) {}
  });
});

/* Phone tabs */
const tabData = {
  ig: { h: '📸 Instagram', hint: 'Upload your Instagram screenshot' },
  tt: { h: '🎵 TikTok',    hint: 'Upload your TikTok screenshot' },
  ot: { h: '🌐 Other',     hint: 'Upload a screenshot here' },
};
function switchTab(btn, tab) {
  document.querySelectorAll('.ph-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const imgs = { ig: 'instagram.PNG', tt: 'tiktok.PNG', tw: 'twitter.PNG' };
  const links = { 
    ig: 'https://instagram.com/wirya07_', 
    tt: 'https://tiktok.com/@tw0jly', 
    tw: 'https://x.com/tw0jly' 
  };
  document.getElementById('phImg').src = imgs[tab];
  document.getElementById('phLink').href = links[tab];
  document.getElementById('phHeader').textContent = btn.textContent;
}
function prevPhone(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const slot = document.getElementById('phSlot');
    let img = slot.querySelector('img');
    if (!img) { img = document.createElement('img'); slot.appendChild(img); }
    img.src = ev.target.result;
    document.getElementById('phPH').style.display = 'none';
    try { localStorage.setItem('photo_phSlot', ev.target.result); } catch(err) {}
  };
  reader.readAsDataURL(file);
}

/* Load phone slot photo */
window.addEventListener('DOMContentLoaded', () => {
  try {
    const saved = localStorage.getItem('photo_phSlot');
    if (saved) {
      const slot = document.getElementById('phSlot');
      if (slot) {
        let img = slot.querySelector('img');
        if (!img) { img = document.createElement('img'); slot.appendChild(img); }
        img.src = saved;
        const ph = document.getElementById('phPH');
        if (ph) ph.style.display = 'none';
      }
    }
  } catch(err) {}
});

/* Active nav highlight on scroll */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--red)' : '';
  });
}, { passive: true });
