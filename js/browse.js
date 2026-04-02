/* InternConnect — Browse JS */

const ALL_ROLES = [
  { id:1,  title:'Product Design Intern',       company:'Razorpay',   logo:'RP', color:'#6366f1', type:'Full-time', domain:'Design',       location:'Bangalore', remote:false, stipend:30000, tags:['UI/UX','Figma','Research'],    duration:'3-6 months', deadline:'15 Jan', match:92, date:new Date('2025-01-02') },
  { id:2,  title:'Software Engineering Intern',  company:'CRED',       logo:'CR', color:'#14b8a6', type:'Micro',     domain:'Engineering',  location:'Remote',    remote:true,  stipend:25000, tags:['React','Node.js','API'],        duration:'2-4 weeks',  deadline:'20 Jan', match:88, date:new Date('2025-01-03') },
  { id:3,  title:'Growth Marketing Intern',      company:'Meesho',     logo:'ME', color:'#f59e0b', type:'Part-time', domain:'Marketing',    location:'Bangalore', remote:false, stipend:15000, tags:['Analytics','SEO','Content'],    duration:'3-6 months', deadline:'18 Jan', match:81, date:new Date('2025-01-01') },
  { id:4,  title:'Data Science Intern',          company:'Groww',      logo:'GR', color:'#ec4899', type:'Full-time', domain:'Data Science', location:'Mumbai',    remote:false, stipend:28000, tags:['Python','ML','SQL'],            duration:'3-6 months', deadline:'25 Jan', match:79, date:new Date('2025-01-04') },
  { id:5,  title:'Business Development Intern',  company:'Zepto',      logo:'ZE', color:'#8b5cf6', type:'Micro',     domain:'Business',     location:'Delhi',     remote:false, stipend:12000, tags:['Sales','B2B','Strategy'],       duration:'2-4 weeks',  deadline:'22 Jan', match:75, date:new Date('2025-01-02') },
  { id:6,  title:'DevOps Intern',                company:'PhonePe',    logo:'PP', color:'#06b6d4', type:'Full-time', domain:'Engineering',  location:'Bangalore', remote:false, stipend:22000, tags:['AWS','Docker','CI/CD'],         duration:'1-2 months', deadline:'28 Jan', match:85, date:new Date('2025-01-05') },
  { id:7,  title:'UI/UX Research Intern',        company:'Swiggy',     logo:'SW', color:'#f97316', type:'Full-time', domain:'Design',       location:'Bangalore', remote:false, stipend:20000, tags:['User Research','Figma','UX'],   duration:'3-6 months', deadline:'30 Jan', match:77, date:new Date('2025-01-03') },
  { id:8,  title:'Finance Analyst Intern',       company:'Zerodha',    logo:'ZD', color:'#10b981', type:'Full-time', domain:'Finance',      location:'Bangalore', remote:false, stipend:18000, tags:['Excel','Finance','Analysis'],   duration:'3-6 months', deadline:'14 Jan', match:72, date:new Date('2025-01-01') },
  { id:9,  title:'Full Stack Dev Intern',        company:'Freshworks', logo:'FW', color:'#3b82f6', type:'Part-time', domain:'Engineering',  location:'Remote',    remote:true,  stipend:20000, tags:['React','Python','PostgreSQL'], duration:'1-2 months', deadline:'2 Feb',  match:90, date:new Date('2025-01-06') },
  { id:10, title:'Content Strategy Intern',      company:'Nykaa',      logo:'NK', color:'#d946ef', type:'Micro',     domain:'Marketing',    location:'Mumbai',    remote:false, stipend:10000, tags:['Writing','SEO','Social Media'], duration:'2-4 weeks',  deadline:'5 Feb',  match:68, date:new Date('2025-01-06') },
  { id:11, title:'ML Research Intern',           company:'Juspay',     logo:'JP', color:'#6366f1', type:'Full-time', domain:'Data Science', location:'Bangalore', remote:false, stipend:35000, tags:['Python','TensorFlow','NLP'],   duration:'3-6 months', deadline:'10 Feb', match:83, date:new Date('2025-01-07') },
  { id:12, title:'Product Management Intern',    company:'Urban Company',logo:'UC',color:'#f59e0b',type:'Full-time', domain:'Business',     location:'Gurugram',  remote:false, stipend:25000, tags:['Analytics','Roadmap','SQL'],   duration:'3-6 months', deadline:'12 Feb', match:76, date:new Date('2025-01-07') },
];

const PAGE_SIZE = 6;
let currentPage = 1;
let filteredRoles = [...ALL_ROLES];

function getTypeBadgeClass(type) {
  const map = { 'Full-time':'badge-purple','Micro':'badge-teal','Part-time':'badge-orange','Remote':'badge-green' };
  return map[type] || 'badge-purple';
}

function filterRoles() {
  const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const location = (document.getElementById('locationInput')?.value || '').toLowerCase();
  const checkedTypes = [...document.querySelectorAll('input[type=checkbox][value="Full-time"], input[type=checkbox][value="Part-time"], input[type=checkbox][value="Micro"], input[type=checkbox][value="Remote"]')].filter(c=>c.checked).map(c=>c.value);
  const checkedDomains = [...document.querySelectorAll('input[type=checkbox][value="Engineering"], input[type=checkbox][value="Design"], input[type=checkbox][value="Marketing"], input[type=checkbox][value="Finance"], input[type=checkbox][value="Data Science"], input[type=checkbox][value="Business"]')].filter(c=>c.checked).map(c=>c.value);

  filteredRoles = ALL_ROLES.filter(r => {
    if (search && !r.title.toLowerCase().includes(search) && !r.company.toLowerCase().includes(search) && !r.tags.some(t=>t.toLowerCase().includes(search))) return false;
    if (location && !r.location.toLowerCase().includes(location)) return false;
    if (checkedTypes.length) {
      const hasType = checkedTypes.some(t => t === 'Remote' ? r.remote : r.type === t);
      if (!hasType) return false;
    }
    if (checkedDomains.length && !checkedDomains.includes(r.domain)) return false;
    return true;
  });

  const sort = document.getElementById('sortSelect')?.value || 'match';
  filteredRoles.sort((a,b) => {
    if (sort === 'match')   return b.match - a.match;
    if (sort === 'newest')  return b.date - a.date;
    if (sort === 'stipend') return b.stipend - a.stipend;
    if (sort === 'deadline') return new Date('2025 ' + a.deadline) - new Date('2025 ' + b.deadline);
    return 0;
  });

  currentPage = 1;
  renderList();
}

function renderList() {
  const list = document.getElementById('rolesList');
  const count = document.getElementById('rolesCount');
  const total = filteredRoles.length;
  if (count) count.textContent = `${total} roles found`;

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRoles = filteredRoles.slice(start, start + PAGE_SIZE);

  if (!list) return;
  if (pageRoles.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:60px;color:var(--text-muted)"><i data-lucide="search-x" style="width:40px;height:40px;margin-bottom:16px;display:block;margin:0 auto 16px"></i><p>No roles match your filters. Try adjusting them.</p></div>`;
    lucide.createIcons();
    return;
  }

  list.innerHTML = pageRoles.map(r => `
    <a href="role.html?id=${r.id}" class="role-list-card" data-aos="fade-up">
      <div class="rlc-logo" style="background:${r.color}">${r.logo}</div>
      <div class="rlc-body">
        <div class="rlc-top">
          <div>
            <div class="rlc-title">${r.title}</div>
            <div class="rlc-company">${r.company}</div>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <span class="rlc-stipend">₹${(r.stipend/1000).toFixed(0)}k/mo</span>
            <button onclick="event.preventDefault();toggleSave(this,${r.id})" style="background:none;border:none;color:var(--text-muted);cursor:pointer;padding:4px">
              <i data-lucide="bookmark" style="width:18px;height:18px"></i>
            </button>
          </div>
        </div>
        <div class="rlc-tags">
          <span class="badge ${getTypeBadgeClass(r.type)}">${r.type}</span>
          ${r.remote ? '<span class="badge badge-green">Remote</span>' : ''}
          ${r.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="rlc-meta">
          <span class="rlc-meta-item"><i data-lucide="map-pin"></i> ${r.location}</span>
          <span class="rlc-meta-item"><i data-lucide="clock"></i> ${r.duration}</span>
          <span class="rlc-meta-item"><i data-lucide="calendar"></i> Closes ${r.deadline}</span>
          <span class="rlc-meta-item" style="color:var(--accent);margin-left:auto"><i data-lucide="zap"></i> ${r.match}% match</span>
        </div>
      </div>
    </a>
  `).join('');

  lucide.createIcons();
  renderPagination(total);
}

function renderPagination(total) {
  const pages = Math.ceil(total / PAGE_SIZE);
  const pg = document.getElementById('pagination');
  if (!pg || pages <= 1) { if(pg) pg.innerHTML=''; return; }
  let html = '';
  if (currentPage > 1) html += `<button class="page-btn" onclick="goPage(${currentPage-1})"><i data-lucide="chevron-left" style="width:16px;height:16px"></i></button>`;
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - currentPage) <= 1) {
      html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="goPage(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 2) {
      html += `<span style="color:var(--text-muted);padding:0 4px">…</span>`;
    }
  }
  if (currentPage < pages) html += `<button class="page-btn" onclick="goPage(${currentPage+1})"><i data-lucide="chevron-right" style="width:16px;height:16px"></i></button>`;
  pg.innerHTML = html;
  lucide.createIcons();
}

function goPage(p) {
  currentPage = p;
  renderList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearFilters() {
  document.querySelectorAll('input[type=checkbox]').forEach(c => c.checked = false);
  document.getElementById('searchInput').value = '';
  document.getElementById('locationInput').value = '';
  filterRoles();
}

// Init
filterRoles();

// Check URL params
const params = new URLSearchParams(window.location.search);
if (params.get('q')) {
  document.getElementById('searchInput').value = params.get('q');
  filterRoles();
}
