// CAPACITY CONNECT - Trainee Profile & Competency Builder
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

export function renderTraineeProfile(currentUser) {
  const skills = currentUser.skills || [];
  const interests = currentUser.interests || [];
  const certs = currentUser.certificates || [];

  return `
    <div class="max-w-4xl mx-auto space-y-6 pb-12">
      <!-- Header Banner -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div class="flex items-center gap-5">
          <div class="relative">
            <img src="${currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" alt="${currentUser.name}" class="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-md" />
            <span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center text-white text-[10px]">✓</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-xl font-extrabold text-slate-900">${currentUser.name}</h2>
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                Accredited Trainee
              </span>
            </div>
            <p class="text-xs font-semibold text-blue-600 mt-0.5">${currentUser.designation}</p>
            <p class="text-xs text-slate-500">${currentUser.department} • ${currentUser.email}</p>
          </div>
        </div>

        <button id="save-profile-btn" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all self-start sm:self-center">
          Save Profile Updates
        </button>
      </div>

      <!-- Qualifications & Experience Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Education & Qualifications -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            ${Icons.cap} Educational Qualifications
          </h3>
          <div class="space-y-3 text-xs">
            <div>
              <label class="block text-slate-500 font-semibold mb-1">Highest Degree / Specialization</label>
              <input type="text" id="prof-qualification" value="${currentUser.qualification || ''}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-slate-500 font-semibold mb-1">Total Professional Experience</label>
              <input type="text" id="prof-experience" value="${currentUser.experience || ''}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <!-- Domain Interests -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            ${Icons.award} Growth Domains & Target Interests
          </h3>
          <div class="flex flex-wrap gap-2" id="interests-tags-container">
            ${interests.map(i => `
              <span class="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold flex items-center gap-1.5">
                <span>🎯 ${i}</span>
              </span>
            `).join('')}
          </div>
          <p class="text-[11px] text-slate-400">Our recommendation algorithm prioritizes courses matching these interest areas.</p>
        </div>
      </div>

      <!-- Interactive Skill Tag Competency Builder -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
              ${Icons.shield} Verified Competency Skills
            </h3>
            <p class="text-xs text-slate-500">Skills are used by the Competency Mapping Engine to match trainings & certifications</p>
          </div>
          <span class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">${skills.length} Skills Registered</span>
        </div>

        <!-- Current Skills Chips -->
        <div class="flex flex-wrap gap-2 min-h-[50px] p-4 rounded-2xl bg-slate-50 border border-slate-200" id="skills-chips-wrapper">
          ${skills.map((skill, idx) => `
            <span class="skill-chip px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-800 text-xs font-bold shadow-sm flex items-center gap-2 group">
              <span>${skill}</span>
              <button data-remove-skill-idx="${idx}" class="remove-skill-btn text-slate-400 hover:text-rose-600 font-black text-sm">
                ×
              </button>
            </span>
          `).join('')}
        </div>

        <!-- Add Skill Input -->
        <div class="flex gap-2">
          <input type="text" id="new-skill-input" placeholder="Type a new skill (e.g. Kubernetes, ISO 27001, Data Visualization)..." class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
          <button id="add-skill-btn" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20">
            Add Skill
          </button>
        </div>

        <!-- Suggested Quick Skills -->
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Trending Capacity Skills:</span>
          <div class="flex flex-wrap gap-1.5 mt-2">
            ${['Cloud Architecture', 'DevOps', 'Penetration Testing', 'Machine Learning', 'e-Office Automation', 'Digital Public Infrastructure'].map(s => `
              <button data-quick-skill="${s}" class="quick-add-skill-btn px-2.5 py-1 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-700 text-[11px] font-medium transition-all">
                + ${s}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Uploaded External Certifications -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            ${Icons.award} Uploaded External Certifications & Credentials
          </h3>
          <button id="simulate-upload-cert-btn" class="px-3.5 py-1.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5">
            ${Icons.upload} Upload Certificate (PDF/IMG)
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="uploaded-certs-list">
          ${certs.map(c => `
            <div class="p-3.5 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-2xl">📜</span>
                <div>
                  <h5 class="text-xs font-bold text-slate-800">${c.name}</h5>
                  <p class="text-[10px] text-slate-500">Issuer: ${c.issuer} • ${c.date}</p>
                </div>
              </div>
              <span class="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded">Verified</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function bindTraineeProfileEvents(currentUser) {
  let activeSkills = [...(currentUser.skills || [])];

  const updateChips = () => {
    const wrapper = document.getElementById('skills-chips-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = activeSkills.map((skill, idx) => `
      <span class="skill-chip px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-800 text-xs font-bold shadow-sm flex items-center gap-2 group">
        <span>${skill}</span>
        <button data-remove-skill-idx="${idx}" class="remove-skill-btn text-slate-400 hover:text-rose-600 font-black text-sm">
          ×
        </button>
      </span>
    `).join('');
    bindRemoveBtns();
  };

  const bindRemoveBtns = () => {
    document.querySelectorAll('.remove-skill-btn').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-remove-skill-idx'), 10);
        activeSkills.splice(idx, 1);
        updateChips();
      };
    });
  };

  bindRemoveBtns();

  // Add Skill
  const addSkillBtn = document.getElementById('add-skill-btn');
  const skillInput = document.getElementById('new-skill-input');

  const addSkill = (skillText) => {
    const trimmed = skillText.trim();
    if (trimmed && !activeSkills.includes(trimmed)) {
      activeSkills.push(trimmed);
      updateChips();
      if (skillInput) skillInput.value = '';
    }
  };

  if (addSkillBtn && skillInput) {
    addSkillBtn.onclick = () => addSkill(skillInput.value);
    skillInput.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addSkill(skillInput.value);
      }
    };
  }

  // Quick Suggestion buttons
  document.querySelectorAll('.quick-add-skill-btn').forEach(btn => {
    btn.onclick = () => {
      const s = btn.getAttribute('data-quick-skill');
      addSkill(s);
    };
  });

  // Save Profile
  const saveBtn = document.getElementById('save-profile-btn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      const qual = document.getElementById('prof-qualification').value;
      const exp = document.getElementById('prof-experience').value;

      Storage.updateUserProfile(currentUser.id, {
        skills: activeSkills,
        qualification: qual,
        experience: exp
      });

      showToast('Profile and competency skills updated successfully!', 'success');
    };
  }

  // Simulate upload certificate
  const uploadCertBtn = document.getElementById('simulate-upload-cert-btn');
  if (uploadCertBtn) {
    uploadCertBtn.onclick = () => {
      const certName = prompt('Enter Certificate / Credential Title:', 'AWS Certified Security - Specialty');
      if (certName) {
        const issuer = prompt('Issuing Organization:', 'Amazon Web Services');
        const newCert = {
          name: certName,
          issuer: issuer || 'Accredited Authority',
          date: new Date().toISOString().split('T')[0]
        };
        const currentCerts = currentUser.certificates || [];
        currentCerts.push(newCert);
        Storage.updateUserProfile(currentUser.id, { certificates: currentCerts });
        showToast('Certificate uploaded and registered to profile!', 'success');

        const rerender = document.getElementById('main-content');
        if (rerender) rerender.innerHTML = renderTraineeProfile(Storage.getUser(currentUser.id));
        bindTraineeProfileEvents(Storage.getUser(currentUser.id));
      }
    };
  }
}
