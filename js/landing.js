/* InternConnect — Landing Page JS */

const ROLES = [
  { id: 1, title: 'Product Design Intern', company: 'Razorpay', logo: 'RP', color: '#6366f1', type: 'Full-time', location: 'Bangalore', stipend: '₹30k/mo', tags: ['UI/UX', 'Figma', 'Research'], deadline: '15 Jan', match: 92 },
  { id: 2, title: 'Software Engineering Intern', company: 'CRED', logo: 'CR', color: '#14b8a6', type: 'Micro', location: 'Remote', stipend: '₹25k/mo', tags: ['React', 'Node.js', 'API'], deadline: '20 Jan', match: 88 },
  { id: 3, title: 'Growth Marketing Intern', company: 'Meesho', logo: 'ME', color: '#f59e0b', type: 'Part-time', location: 'Bangalore', stipend: '₹15k/mo', tags: ['Analytics', 'SEO', 'Content'], deadline: '18 Jan', match: 81 },
  { id: 4, title: 'Data Science Intern', company: 'Groww', logo: 'GR', color: '#ec4899', type: 'Full-time', location: 'Mumbai', stipend: '₹28k/mo', tags: ['Python', 'ML', 'SQL'], deadline: '25 Jan', match: 79 },
  { id: 5, title: 'Business Development Intern', company: 'Zepto', logo: 'ZE', color: '#8b5cf6', type: 'Micro', location: 'Delhi', stipend: '₹12k/mo', tags: ['Sales', 'B2B', 'Strategy'], deadline: '22 Jan', match: 75 },
  { id: 6, title: 'DevOps Intern', company: 'PhonePe', logo: 'PP', color: '#06b6d4', type: 'Full-time', location: 'Bangalore', stipend: '₹22k/mo', tags: ['AWS', 'Docker', 'CI/CD'], deadline: '28 Jan', match: 85 },
];

function getTypeBadge(type) {
  const map = { 'Full-time': 'badge-purple', 'Micro': 'badge-teal', 'Part-time': 'badge-orange' };
  return map[type] || 'badge-purple';
}

function renderRoles() {
  const container = document.getElementById('rolesPreview');
  if (!container) return;
  container.innerHTML = ROLES.map(r => `
    <a href="role.html?id=${r.id}" class="role-card" data-aos="fade-up">
      <div class="role-card-header">
        <div class="role-company-logo" style="background:${r.color}">${r.logo}</div>
        <div>
          <div class="role-title">${r.title}</div>
          <div class="role-company">${r.company} · ${r.location}</div>
        </div>
        <button onclick="event.preventDefault(); toggleSave(this, ${r.id})" style="margin-left:auto;background:none;border:none;color:var(--text-muted);cursor:pointer;padding:4px;">
          <i data-lucide="bookmark" style="width:18px;height:18px"></i>
        </button>
      </div>
      <div class="role-tags">
        <span class="badge ${getTypeBadge(r.type)}">${r.type}</span>
        ${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="role-footer">
        <span class="role-stipend">${r.stipend}</span>
        <span class="role-deadline"><i data-lucide="clock" style="width:13px;height:13px"></i> Closes ${r.deadline}</span>
      </div>
    </a>
  `).join('');
  lucide.createIcons();
}

renderRoles();
