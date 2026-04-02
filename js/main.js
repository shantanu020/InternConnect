document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  if (window.AOS) AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });

  const navbar = document.getElementById('navbar');
  if (navbar) window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 40); }, { passive: true });

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobileMenu.classList.remove('open'); hamburger.innerHTML = '<i data-lucide="menu"></i>'; lucide.createIcons(); }));
  }

  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', ((e.clientX - rect.left) / rect.width * 100) + '%');
      card.style.setProperty('--y', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  const roleBtns = document.querySelectorAll('.role-btn');
  if (roleBtns.length) {
    roleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        roleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const role = btn.dataset.role;
        const extraFields = document.getElementById('extraFields');
        if (extraFields) {
          extraFields.innerHTML = role === 'company'
            ? '<div class="form-group"><label class="form-label">Company Name</label><input class="form-input" type="text" placeholder="Acme Corp"></div><div class="form-group"><label class="form-label">Company Size</label><select class="form-select"><option>1-10</option><option>11-50</option><option>51-200</option><option>200+</option></select></div>'
            : '<div class="form-group"><label class="form-label">University / College</label><input class="form-input" type="text" placeholder="IIT Bombay"></div><div class="form-group"><label class="form-label">Field of Study</label><input class="form-input" type="text" placeholder="Computer Science"></div>';
          lucide.createIcons();
        }
      });
    });
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    if (roleParam) { const t = document.querySelector(`.role-btn[data-role="${roleParam}"]`); if (t) t.click(); }
  }

  document.querySelectorAll('.filter-option input').forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = Array.from(document.querySelectorAll('.filter-option input:checked')).map(c => c.value.toLowerCase());
      document.querySelectorAll('.job-card').forEach(card => {
        if (!checked.length) { card.style.display = ''; return; }
        const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
        card.style.display = checked.some(f => tags.some(t => t.includes(f))) ? '' : 'none';
      });
    });
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let timer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('.job-card').forEach(card => { card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none'; });
      }, 250);
    });
  }

  document.querySelectorAll('.btn-save').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('saved');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('saved')) { icon.setAttribute('data-lucide','bookmark-check'); btn.style.color='var(--accent-light)'; btn.style.borderColor='var(--accent)'; }
      else { icon.setAttribute('data-lucide','bookmark'); btn.style.color=''; btn.style.borderColor=''; }
      lucide.createIcons();
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-submit');
      btn.textContent = 'Sending...'; btn.disabled = true;
      setTimeout(() => { btn.textContent = '✓ Message Sent!'; btn.style.background='var(--accent-3)'; setTimeout(() => { btn.textContent='Send Message'; btn.style.background=''; btn.disabled=false; contactForm.reset(); }, 3000); }, 1200);
    });
  }

  const authForm = document.getElementById('authForm');
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = authForm.querySelector('.btn-submit');
      btn.textContent = 'Please wait...'; btn.disabled = true;
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
    });
  }

  const counters = document.querySelectorAll('.stat strong');
  if (counters.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const match = text.match(/[\d,]+/);
          if (!match) return;
          const end = parseInt(match[0].replace(/,/g,''));
          const suffix = text.replace(/[\d,]+/,'');
          let start = 0;
          const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start)/1800, 1);
            el.textContent = Math.floor((1-Math.pow(1-p,3))*end).toLocaleString() + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  }
});

function toggleBilling() {
  const annual = document.getElementById('billingToggle').checked;
  const s = document.getElementById('startupPrice');
  const en = document.getElementById('enterprisePrice');
  if (s) s.textContent = annual ? '₹3,999' : '₹4,999';
  if (en) en.textContent = annual ? '₹11,999' : '₹14,999';
}
