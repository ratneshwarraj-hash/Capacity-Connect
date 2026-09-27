// CAPACITY CONNECT - Course Creation Wizard Component
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

export function renderCourseCreator(currentUser) {
  const departments = Storage.data.departments || [];
  const categories = Storage.data.categories || [];

  return `
    <div class="max-w-4xl mx-auto space-y-6 pb-12">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Create & Publish New Course</h2>
          <p class="text-xs sm:text-sm text-slate-500">Design accredited capacity building modules for national and organizational cohorts</p>
        </div>
        <a href="#trainer-dashboard" class="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all">
          ← Back to Overview
        </a>
      </div>

      <!-- Course Creation Form -->
      <form id="create-course-form" class="space-y-6">
        <!-- Section 1: Basic Information -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
            ${Icons.book} Course Details & Classification
          </h3>

          <div class="space-y-4 text-xs">
            <div>
              <label class="block text-slate-700 font-bold mb-1">Course Title *</label>
              <input type="text" id="course-title" required placeholder="e.g. AI-Powered Citizen Assistance Systems" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-slate-700 font-bold mb-1">Category Domain *</label>
                <select id="course-category" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500">
                  ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block text-slate-700 font-bold mb-1">Host Department *</label>
                <select id="course-department" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500">
                  ${departments.map(dept => `<option value="${dept}">${dept}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block text-slate-700 font-bold mb-1">Competency Level</label>
                <select id="course-level" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="Beginner">Beginner (Foundational)</option>
                  <option value="Intermediate" selected>Intermediate (Operational)</option>
                  <option value="Advanced">Advanced (Expert / Leadership)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-700 font-bold mb-1">Estimated Duration</label>
                <input type="text" id="course-duration" value="20 Hours (3 Weeks)" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label class="block text-slate-700 font-bold mb-1">Cover Banner URL (Unsplash or CDN)</label>
                <input type="text" id="course-banner" value="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-[11px]" />
              </div>
            </div>

            <div>
              <label class="block text-slate-700 font-bold mb-1">Course Description & Outcomes *</label>
              <textarea id="course-desc" required rows="3" placeholder="Describe the practical skills, frameworks, and administrative competencies trainees will achieve..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>

            <div>
              <label class="block text-slate-700 font-bold mb-1">Competency Skills Taught (Comma Separated)</label>
              <input type="text" id="course-skills" placeholder="e.g. Threat Modeling, SIEM Analysis, Incident Response" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        <!-- Section 2: Dynamic Curriculum Modules -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                ${Icons.folder} Curriculum Modules & Learning Media
              </h3>
              <p class="text-xs text-slate-500">Add lessons, presentations, or recorded video streams</p>
            </div>
            <button type="button" id="add-module-row-btn" class="px-3.5 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 transition-all">
              ${Icons.plus} Add Module
            </button>
          </div>

          <!-- Modules Container -->
          <div class="space-y-3" id="modules-list-container">
            <div class="module-row p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center gap-3">
              <span class="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
              <input type="text" placeholder="Module Title (e.g. Architectural Foundations)" required value="1. Foundation Principles & Overview" class="module-title-input flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs outline-none" />
              <select class="module-type-select px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs outline-none">
                <option value="video">Video Lecture (▶)</option>
                <option value="pdf">PDF Handbook (📄)</option>
                <option value="slides">Presentation Slides (📊)</option>
              </select>
              <input type="text" placeholder="Duration (e.g. 45 mins)" value="45 mins" class="module-duration-input w-28 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs outline-none" />
            </div>
          </div>
        </div>

        <!-- Submit Bar -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <a href="#trainer-dashboard" class="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </a>
          <button type="submit" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2">
            ${Icons.check} Publish Course to Portal
          </button>
        </div>
      </form>
    </div>
  `;
}

export function bindCourseCreatorEvents(currentUser) {
  const form = document.getElementById('create-course-form');
  const addModuleBtn = document.getElementById('add-module-row-btn');
  const modulesContainer = document.getElementById('modules-list-container');

  if (addModuleBtn && modulesContainer) {
    addModuleBtn.onclick = () => {
      const currentCount = modulesContainer.querySelectorAll('.module-row').length + 1;
      const row = document.createElement('div');
      row.className = 'module-row p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center gap-3';
      row.innerHTML = `
        <span class="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0">${currentCount}</span>
        <input type="text" placeholder="Module Title" required value="${currentCount}. Specialized Practical Application" class="module-title-input flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs outline-none" />
        <select class="module-type-select px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs outline-none">
          <option value="video">Video Lecture (▶)</option>
          <option value="pdf">PDF Handbook (📄)</option>
          <option value="slides">Presentation Slides (📊)</option>
        </select>
        <input type="text" placeholder="Duration" value="40 mins" class="module-duration-input w-28 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs outline-none" />
        <button type="button" class="remove-row-btn p-1.5 text-slate-400 hover:text-rose-600 font-bold">×</button>
      `;
      modulesContainer.appendChild(row);
      row.querySelector('.remove-row-btn').onclick = () => row.remove();
    };
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('course-title').value.trim();
      const category = document.getElementById('course-category').value;
      const department = document.getElementById('course-department').value;
      const level = document.getElementById('course-level').value;
      const duration = document.getElementById('course-duration').value.trim();
      const banner = document.getElementById('course-banner').value.trim();
      const description = document.getElementById('course-desc').value.trim();
      const skillsStr = document.getElementById('course-skills').value;
      const skillsTaught = skillsStr.split(',').map(s => s.trim()).filter(Boolean);

      // Collect modules
      const moduleRows = document.querySelectorAll('.module-row');
      const modules = Array.from(moduleRows).map((row, idx) => ({
        id: idx + 1,
        title: row.querySelector('.module-title-input').value,
        type: row.querySelector('.module-type-select').value,
        duration: row.querySelector('.module-duration-input').value
      }));

      const newCourse = Storage.createCourse({
        title,
        trainerId: currentUser.id,
        trainerName: currentUser.name,
        category,
        department,
        level,
        duration,
        banner,
        description,
        skillsTaught: skillsTaught.length ? skillsTaught : ['Core Competency', 'Practical Governance'],
        modules: modules.length ? modules : [
          { id: 1, title: '1. Foundation Principles & Overview', type: 'video', duration: '35 mins' }
        ]
      });

      showToast(`Course "${title}" has been published and is now live in the catalog!`, 'success');
      window.location.hash = '#courses';
    };
  }
}
