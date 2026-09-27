// CAPACITY CONNECT - Course Catalog Component
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

let activeCategory = 'All';
let searchQuery = '';

export function renderCourseCatalog(currentUser) {
  const allCourses = Storage.getCourses();
  const enrolledIds = currentUser.enrolledCourses || [];
  const categories = ['All', ...new Set(allCourses.map(c => c.category))];

  const filtered = allCourses.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchQuery = !q || c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.skillsTaught && c.skillsTaught.some(s => s.toLowerCase().includes(q))) ||
      c.trainerName.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return `
    <div class="space-y-6 pb-12">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Accredited Course Catalog</h2>
          <p class="text-xs sm:text-sm text-slate-500">Government & Enterprise Competency Building Modules</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-slate-500">${filtered.length} Courses Available</span>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative flex-1">
            <span class="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              ${Icons.search}
            </span>
            <input type="text" id="course-search-input" value="${searchQuery}" placeholder="Search by course title, skill, or trainer name..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div class="flex items-center gap-2">
            <button id="clear-search-btn" class="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600">
              Clear
            </button>
          </div>
        </div>

        <!-- Category Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          ${categories.map(cat => `
            <button data-cat="${cat}" class="category-pill-btn flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}">
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Course Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filtered.length === 0 ? `
          <div class="col-span-full p-12 bg-white rounded-3xl border border-slate-200 text-center">
            <p class="text-sm font-bold text-slate-700">No courses found matching your criteria</p>
            <p class="text-xs text-slate-400 mt-1">Try changing category filter or search keywords.</p>
          </div>
        ` : filtered.map(course => {
          const isEnrolled = enrolledIds.includes(course.id);
          return `
            <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm card-hover flex flex-col justify-between">
              <div>
                <!-- Banner Image -->
                <div class="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img src="${course.banner}" alt="${course.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div class="absolute top-3 left-3 flex items-center gap-1.5">
                    <span class="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      ${course.category}
                    </span>
                    <span class="px-2 py-1 rounded-lg bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase">
                      ${course.level}
                    </span>
                  </div>
                  <div class="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold flex items-center gap-1 shadow-sm">
                    <span class="text-amber-500">${Icons.star}</span>
                    <span>${course.rating}</span>
                  </div>
                </div>

                <!-- Body -->
                <div class="p-5 space-y-3">
                  <div class="flex items-center justify-between text-[11px] text-slate-500">
                    <span class="flex items-center gap-1">⏱️ ${course.duration}</span>
                    <span class="flex items-center gap-1">👥 ${course.enrolledCount || 0} enrolled</span>
                  </div>

                  <h3 class="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">${course.title}</h3>
                  <p class="text-xs text-slate-500 line-clamp-2">${course.description}</p>

                  <!-- Skills Tags -->
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    ${(course.skillsTaught || []).slice(0, 3).map(s => `
                      <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                        #${s}
                      </span>
                    `).join('')}
                    ${(course.skillsTaught || []).length > 3 ? `<span class="text-[10px] text-slate-400 font-semibold">+${course.skillsTaught.length - 3}</span>` : ''}
                  </div>

                  <!-- Trainer Row -->
                  <div class="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      ${course.trainerName.split(' ')[0][0]}
                    </div>
                    <div class="text-[11px]">
                      <span class="text-slate-400">Trainer:</span>
                      <span class="font-bold text-slate-700 ml-1">${course.trainerName}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer Actions -->
              <div class="p-5 pt-0 flex items-center gap-2">
                <button data-details-id="${course.id}" class="view-syllabus-btn flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all">
                  Syllabus Details
                </button>
                ${isEnrolled ? `
                  <a href="#my-courses" class="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center shadow-md shadow-emerald-500/20 transition-all">
                    ✓ Enrolled
                  </a>
                ` : `
                  <button data-enroll-id="${course.id}" class="enroll-course-btn flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all">
                    Enroll Now
                  </button>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Course Details / Syllabus Modal -->
      <div id="course-details-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div id="course-modal-content" class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-100 overflow-hidden transform transition-all p-6 sm:p-8">
          <!-- Dynamic Content Injected in bindCourseCatalogEvents -->
        </div>
      </div>
    </div>
  `;
}

export function bindCourseCatalogEvents(currentUser) {
  // Search
  const searchInput = document.getElementById('course-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderCourseCatalog(currentUser);
      bindCourseCatalogEvents(currentUser);
    };
  }

  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) {
    clearBtn.onclick = () => {
      searchQuery = '';
      activeCategory = 'All';
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderCourseCatalog(currentUser);
      bindCourseCatalogEvents(currentUser);
    };
  }

  // Categories
  document.querySelectorAll('.category-pill-btn').forEach(btn => {
    btn.onclick = () => {
      activeCategory = btn.getAttribute('data-cat');
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderCourseCatalog(currentUser);
      bindCourseCatalogEvents(currentUser);
    };
  });

  // Enroll Action
  document.querySelectorAll('.enroll-course-btn').forEach(btn => {
    btn.onclick = () => {
      const courseId = btn.getAttribute('data-enroll-id');
      const success = Storage.enrollCourse(courseId, currentUser.id);
      if (success) {
        showToast('Successfully enrolled! Course modules are now available in My Courses.', 'success');
        const rerender = document.getElementById('main-content');
        if (rerender) rerender.innerHTML = renderCourseCatalog(currentUser);
        bindCourseCatalogEvents(currentUser);
      }
    };
  });

  // Syllabus Modal Open
  const modal = document.getElementById('course-details-modal');
  const modalContent = document.getElementById('course-modal-content');

  document.querySelectorAll('.view-syllabus-btn').forEach(btn => {
    btn.onclick = () => {
      const courseId = btn.getAttribute('data-details-id');
      const course = Storage.getCourse(courseId);
      if (!course || !modal || !modalContent) return;

      const isEnrolled = (currentUser.enrolledCourses || []).includes(course.id);

      modalContent.innerHTML = `
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">${course.category}</span>
            <h3 class="text-lg font-extrabold text-slate-900 mt-1">${course.title}</h3>
          </div>
          <button id="close-syllabus-modal-btn" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
            ${Icons.close}
          </button>
        </div>

        <div class="py-4 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          <p class="text-xs text-slate-600 leading-relaxed">${course.description}</p>

          <div class="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-50 text-center">
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-bold">Duration</span>
              <p class="text-xs font-bold text-slate-800 mt-0.5">${course.duration}</p>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-bold">Level</span>
              <p class="text-xs font-bold text-slate-800 mt-0.5">${course.level}</p>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-bold">Lead Trainer</span>
              <p class="text-xs font-bold text-slate-800 mt-0.5">${course.trainerName}</p>
            </div>
          </div>

          <!-- Modules Syllabus -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Curriculum Modules</h4>
            <div class="space-y-2">
              ${(course.modules || []).map(m => `
                <div class="p-3 rounded-xl border border-slate-100 bg-white flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2.5">
                    <span class="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                      ${m.type === 'video' ? '▶' : '📄'}
                    </span>
                    <span class="font-semibold text-slate-800">${m.title}</span>
                  </div>
                  <span class="text-[11px] text-slate-400 font-medium">${m.duration}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Skills Gained -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Accredited Competency Skills</h4>
            <div class="flex flex-wrap gap-1.5">
              ${(course.skillsTaught || []).map(s => `
                <span class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                  ✓ ${s}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button id="modal-cancel-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
            Close
          </button>
          ${isEnrolled ? `
            <a href="#my-courses" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20">
              Go to My Courses
            </a>
          ` : `
            <button id="modal-enroll-action-btn" data-cid="${course.id}" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20">
              Enroll in this Course
            </button>
          `}
        </div>
      `;

      modal.classList.remove('hidden');

      const closeBtn = document.getElementById('close-syllabus-modal-btn');
      const cancelBtn = document.getElementById('modal-cancel-btn');
      const enrollActionBtn = document.getElementById('modal-enroll-action-btn');

      if (closeBtn) closeBtn.onclick = () => modal.classList.add('hidden');
      if (cancelBtn) cancelBtn.onclick = () => modal.classList.add('hidden');

      if (enrollActionBtn) {
        enrollActionBtn.onclick = () => {
          Storage.enrollCourse(course.id, currentUser.id);
          showToast('Successfully enrolled in ' + course.title, 'success');
          modal.classList.add('hidden');
          const rerender = document.getElementById('main-content');
          if (rerender) rerender.innerHTML = renderCourseCatalog(currentUser);
          bindCourseCatalogEvents(currentUser);
        };
      }
    };
  });
}
