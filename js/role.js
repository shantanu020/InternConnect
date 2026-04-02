/* Role Page JS */

function handleApply() {
  const modal = document.getElementById('applyModal');
  if (modal) modal.style.display = 'flex';
  lucide.createIcons();
}

function closeApply() {
  const modal = document.getElementById('applyModal');
  if (modal) modal.style.display = 'none';
}

function submitApplication() {
  closeApply();
  showToast('Application submitted! 🎉 Good luck!');
  document.querySelector('[onclick="handleApply()"]').innerHTML = '<i data-lucide="check-circle"></i> Applied!';
  document.querySelector('[onclick="handleApply()"]').style.background = '#4ade80';
  document.querySelector('[onclick="handleApply()"]').style.color = '#0a0a0f';
  lucide.createIcons();
}

// Similar roles
const similar = [
  { title:'UI Designer Intern', company:'Swiggy', color:'#f97316', logo:'SW', stipend:'₹20k' },
  { title:'UX Research Intern', company:'PhonePe', color:'#06b6d4', logo:'PP', stipend:'₹22k' },
  { title:'Product Design', company:'Meesho', color:'#f59e0b', logo:'ME', stipend:'₹18k' },
];
const sr = document.getElementById('similarRoles');
if (sr) {
  sr.innerHTML = similar.map(r => `
    <a href="role.html" style="display:flex;align-items:center;gap:12px;text-decoration:none">
      <div class="avatar" style="background:${r.color};width:36px;height:36px;font-size:0.8rem">${r.logo}</div>
      <div style="flex:1">
        <div style="font-size:0.85rem;font-weight:500;color:var(--text-primary)">${r.title}</div>
        <div style="font-size:0.78rem;color:var(--text-muted)">${r.company}</div>
      </div>
      <span style="font-size:0.82rem;color:var(--accent-2);font-weight:600">${r.stipend}/mo</span>
    </a>
  `).join('');
}

// Close modal on overlay click
document.getElementById('applyModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeApply();
});
