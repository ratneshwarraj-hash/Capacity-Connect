// CAPACITY CONNECT - My Courses & Module Resource Viewer
import { Storage } from '../../data/storage.js';
import { Icons, showToast, launchConfetti } from '../../utils/helpers.js';

export function renderMyCourses(currentUser) {
  const allCourses = Storage.getCourses();
  const enrolledIds = currentUser.enrolledCourses || [];
  const myCourses = allCourses.filter(c => enrolledIds.includes(c.id));

  return `
    <div class="space-y-6 pb-12">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">My Learning Tracks & Modules</h2>
          <p class="text-xs sm:text-sm text-slate-500">Access curriculum resources, complete modules, and qualify for certification</p>
        </div>
        <a href="#courses" class="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 self-start">
          ${Icons.plus} Explore More Courses
        </a>
      </div>

      <!-- Courses List -->
      ${myCourses.length === 0 ? `
        <div class="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">
            ${Icons.book}
          </div>
          <h3 class="font-bold text-slate-800 text-sm">You haven't enrolled in any courses yet</h3>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">Explore the catalog of accredited government & enterprise courses to start building your competency profile.</p>
          <a href="#courses" class="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20">Browse Catalog</a>
        </div>
      ` : `
        <div class="space-y-6">
          ${myCourses.map(course => {
            const prog = (currentUser.courseProgress && currentUser.courseProgress[course.id]) || { progress: 0, completedModules: [] };
            const completedModules = prog.completedModules || [];
            const isFinished = prog.progress === 100;
            const quiz = Storage.getQuiz(course.quizId);

            return `
              <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-5">
                <!-- Top Course Info -->
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div class="flex items-start gap-4">
                    <img src="${course.banner}" alt="${course.title}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm flex-shrink-0" />
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800">${course.category}</span>
                        <span class="text-xs text-slate-400 font-medium">Trainer: ${course.trainerName}</span>
                      </div>
                      <h3 class="text-base sm:text-lg font-extrabold text-slate-900 mt-1">${course.title}</h3>
                      <p class="text-xs text-slate-500 line-clamp-1 mt-0.5">${course.description}</p>
                    </div>
                  </div>

                  <!-- Progress & Action Bar -->
                  <div class="flex items-center gap-4 lg:self-center">
                    <div class="w-36">
                      <div class="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                        <span>Course Progress</span>
                        <span>${prog.progress}%</span>
                      </div>
                      <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-500 ${isFinished ? 'bg-emerald-500' : 'bg-blue-600'}" style="width: ${prog.progress}%"></div>
                      </div>
                    </div>

                    ${isFinished ? `
                      <button data-cert-course="${course.id}" class="open-cert-btn px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all">
                        ${Icons.shield} View Certificate
                      </button>
                    ` : `
                      <a href="#assessments" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all">
                        ${Icons.quiz} Take Exam
                      </a>
                    `}

                    <button data-feedback-course="${course.id}" class="open-feedback-btn p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold" title="Leave Course Feedback">
                      ${Icons.star}
                    </button>
                  </div>
                </div>

                <!-- Course Modules & Learning Resources -->
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Curriculum Lessons & Resources</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${(course.modules || []).map(module => {
                      const isCompleted = completedModules.includes(module.id);
                      return `
                        <div class="p-4 rounded-2xl border ${isCompleted ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 bg-slate-50/60'} flex items-center justify-between gap-3">
                          <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-xl ${isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'} flex items-center justify-center text-xs font-bold flex-shrink-0">
                              ${module.type === 'video' ? '▶' : '📄'}
                            </div>
                            <div>
                              <h5 class="text-xs font-bold text-slate-800">${module.title}</h5>
                              <span class="text-[10px] text-slate-400 font-medium">${module.duration} • ${module.type.toUpperCase()}</span>
                            </div>
                          </div>

                          <div class="flex items-center gap-2">
                            <button data-preview-module="${course.id}-${module.id}" data-type="${module.type}" data-title="${module.title}" class="preview-resource-btn px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-700 text-[11px] font-bold">
                              Launch
                            </button>
                            ${isCompleted ? `
                              <span class="text-emerald-600 text-xs font-bold px-2 py-1 bg-emerald-100 rounded-lg">✓ Done</span>
                            ` : `
                              <button data-complete-course="${course.id}" data-complete-module="${module.id}" class="complete-module-btn px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-sm">
                                Mark Done
                              </button>
                            `}
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      `}

      <!-- Interactive Resource Viewer Modal -->
      <div id="resource-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-100 overflow-hidden transform transition-all p-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 id="resource-modal-title" class="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2"></h3>
            <button id="close-resource-modal-btn" class="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
              ${Icons.close}
            </button>
          </div>
          <div id="resource-modal-body" class="rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center min-h-[340px] text-white">
            <!-- Simulated player or reader inserted dynamically -->
          </div>
          <div class="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
            <span class="text-xs text-slate-400">Accredited Content Stream • Capacity Building Cloud</span>
            <button id="resource-done-trigger-btn" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
              Mark this Lesson Completed
            </button>
          </div>
        </div>
      </div>

    </div>
  `;
}

export function bindMyCoursesEvents(currentUser) {
  // Mark Module Complete
  document.querySelectorAll('.complete-module-btn').forEach(btn => {
    btn.onclick = () => {
      const courseId = btn.getAttribute('data-complete-course');
      const moduleId = parseInt(btn.getAttribute('data-complete-module'), 10);
      Storage.updateCourseProgress(courseId, moduleId, currentUser.id);
      showToast('Module marked as completed! Progress updated.', 'success');

      // Check if finished
      const updatedUser = Storage.getUser(currentUser.id);
      const prog = updatedUser.courseProgress[courseId];
      if (prog && prog.progress === 100) {
        launchConfetti();
        showToast('🎉 Congratulations! You completed all modules. Assessment unlocked!', 'success');
      }

      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderMyCourses(Storage.getUser(currentUser.id));
      bindMyCoursesEvents(Storage.getUser(currentUser.id));
    };
  });

  // Resource Viewer Modal
  const modal = document.getElementById('resource-modal');
  const closeBtn = document.getElementById('close-resource-modal-btn');
  const modalTitle = document.getElementById('resource-modal-title');
  const modalBody = document.getElementById('resource-modal-body');
  const doneTrigger = document.getElementById('resource-done-trigger-btn');

  let activeCourseId = null;
  let activeModuleId = null;

  document.querySelectorAll('.preview-resource-btn').forEach(btn => {
    btn.onclick = () => {
      const parts = btn.getAttribute('data-preview-module').split('-');
      activeCourseId = parts[0];
      activeModuleId = parseInt(parts[1], 10);
      const type = btn.getAttribute('data-type');
      const title = btn.getAttribute('data-title');

      if (!modal || !modalTitle || !modalBody) return;
      modalTitle.textContent = title;

      if (type === 'video') {
        modalBody.innerHTML = `
          <div class="w-full flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center text-2xl shadow-xl shadow-blue-500/50 cursor-pointer animate-pulse">
              ▶
            </div>
            <div>
              <p class="text-sm font-bold text-white">Interactive Video Lecture Stream</p>
              <p class="text-xs text-slate-400 mt-1">High-Definition Lecture Stream with Dynamic Subtitles & Transcripts</p>
            </div>
            <div class="w-full max-w-md bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div class="bg-blue-500 h-full w-1/3 animate-pulse"></div>
            </div>
          </div>
        `;
      } else {
        modalBody.innerHTML = `
          <div class="w-full bg-white text-slate-800 p-8 text-left space-y-4 max-h-[420px] overflow-y-auto">
            <div class="border-b border-slate-200 pb-3">
              <span class="text-[10px] font-bold text-blue-600 uppercase">National Capacity Building Repository</span>
              <h4 class="text-base font-extrabold text-slate-900 mt-0.5">${title}</h4>
            </div>
            <div class="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p><strong>Section 1: Executive Overview</strong></p>
              <p>This study module details operational governance guidelines and capacity development frameworks adhering to national regulatory standards. Standard Operating Procedures (SOPs) mandate continuous security reviews and role-based privilege access.</p>
              <div class="p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 text-xs">
                💡 Key Competency Takeaway: Always map enterprise data classifications to sensitivity tiers prior to deployment.
              </div>
              <p><strong>Section 2: Practical Implementation Checklist</strong></p>
              <p>Ensure that all cloud workloads maintain encrypted ingress endpoints, zero-trust telemetry feeds, and cross-departmental access audit trails.</p>
            </div>
          </div>
        `;
      }

      modal.classList.remove('hidden');
    };
  });

  if (closeBtn && modal) {
    closeBtn.onclick = () => modal.classList.add('hidden');
  }

  if (doneTrigger) {
    doneTrigger.onclick = () => {
      if (activeCourseId && activeModuleId) {
        Storage.updateCourseProgress(activeCourseId, activeModuleId, currentUser.id);
        showToast('Module marked as completed!', 'success');
        if (modal) modal.classList.add('hidden');
        const rerender = document.getElementById('main-content');
        if (rerender) rerender.innerHTML = renderMyCourses(Storage.getUser(currentUser.id));
        bindMyCoursesEvents(Storage.getUser(currentUser.id));
      }
    };
  }

  // Certificate Modal Open
  document.querySelectorAll('.open-cert-btn').forEach(btn => {
    btn.onclick = () => {
      const courseId = btn.getAttribute('data-cert-course');
      const certModal = document.getElementById('certificate-modal');
      if (certModal && window.openCertificateModal) {
        window.openCertificateModal(courseId);
      }
    };
  });

  // Feedback Modal Open
  document.querySelectorAll('.open-feedback-btn').forEach(btn => {
    btn.onclick = () => {
      const courseId = btn.getAttribute('data-feedback-course');
      if (window.openFeedbackModal) {
        window.openFeedbackModal(courseId);
      }
    };
  });
}
