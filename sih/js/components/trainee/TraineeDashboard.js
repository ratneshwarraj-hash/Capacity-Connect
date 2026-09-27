// CAPACITY CONNECT - Trainee Dashboard Component
import { Storage } from '../../data/storage.js';
import { Icons } from '../../utils/helpers.js';

export function renderTraineeDashboard(currentUser) {
  const courses = Storage.getCourses();
  const enrolledIds = currentUser.enrolledCourses || [];
  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id));
  const completedCount = (currentUser.completedCourses || []).length;
  const announcements = Storage.getAnnouncements('trainee');
  const attempts = Storage.getQuizAttempts(currentUser.id);
  const avgScore = attempts.length > 0 ? Math.round(attempts.reduce((acc, a) => acc + a.score, 0) / attempts.length) : 0;

  return `
    <div class="space-y-6 pb-12">
      <!-- Welcome Hero Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-xl">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[11px] font-bold tracking-wider uppercase border border-blue-400/30">
                Trainee Capacity Portal
              </span>
              <span class="flex items-center gap-1 text-amber-300 text-xs font-bold">
                🔥 7-Day Active Streak
              </span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome back, ${currentUser.name}!</h1>
            <p class="text-blue-200 text-xs sm:text-sm mt-1 max-w-xl">
              ${currentUser.designation} • ${currentUser.department}. Advance your competencies with accredited modules and verifiable certifications.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <a href="#courses" class="px-5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-900 text-xs font-bold shadow-lg shadow-black/10 transition-all flex items-center gap-2">
              ${Icons.search} Browse Course Catalog
            </a>
            <a href="#profile" class="px-4 py-2.5 rounded-xl bg-blue-700/50 hover:bg-blue-700 text-white text-xs font-bold border border-blue-400/30 transition-all">
              Update Skills
            </a>
          </div>
        </div>
      </div>

      <!-- Metric Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Enrolled Courses -->
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Enrolled Courses</span>
            <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">${Icons.book}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">${enrolledIds.length}</p>
          <p class="text-[11px] text-blue-600 font-semibold mt-1">Across 2 Departments</p>
        </div>

        <!-- Completed Courses -->
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Completed</span>
            <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">${Icons.check}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">${completedCount}</p>
          <p class="text-[11px] text-emerald-600 font-semibold mt-1">100% Modules Finished</p>
        </div>

        <!-- Assessment Avg -->
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Exam Score</span>
            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">${Icons.award}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">${avgScore}%</p>
          <p class="text-[11px] text-amber-600 font-semibold mt-1">Top 5% Cohort Tier</p>
        </div>

        <!-- Verifiable Certificates -->
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Certificates</span>
            <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">${Icons.shield}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">${completedCount}</p>
          <p class="text-[11px] text-indigo-600 font-semibold mt-1">Accredited & Verifiable</p>
        </div>
      </div>

      <!-- Main Columns -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Continue Learning & Active Courses (2 Cols) -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-bold text-slate-900 text-base">Active Enrolled Modules</h3>
                <p class="text-xs text-slate-500">Resume your competency building track</p>
              </div>
              <a href="#my-courses" class="text-xs font-bold text-blue-600 hover:text-blue-800">View All Modules →</a>
            </div>

            <div class="space-y-4">
              ${enrolledCourses.map(course => {
                const prog = (currentUser.courseProgress && currentUser.courseProgress[course.id]) || { progress: 0, completedModules: [] };
                return `
                  <div class="p-4 rounded-2xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                      <img src="${course.banner}" alt="${course.title}" class="w-16 h-16 rounded-xl object-cover shadow-sm flex-shrink-0" />
                      <div>
                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">${course.category}</span>
                        <h4 class="text-sm font-bold text-slate-900 mt-1">${course.title}</h4>
                        <p class="text-xs text-slate-500">Instructor: ${course.trainerName}</p>
                      </div>
                    </div>
                    <div class="flex sm:flex-col items-center sm:items-end justify-between gap-2 min-w-[140px]">
                      <div class="w-full">
                        <div class="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                          <span>Progress</span>
                          <span>${prog.progress}%</span>
                        </div>
                        <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" style="width: ${prog.progress}%"></div>
                        </div>
                      </div>
                      <a href="#my-courses" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm">
                        ${prog.progress === 100 ? 'Review / Cert' : 'Continue'}
                      </a>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Gamified Achievements & Badges -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-bold text-slate-900 text-base">Gamified Capacity Badges</h3>
                <p class="text-xs text-slate-500">Earned through milestones, punctuality & high quiz scores</p>
              </div>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">3 Unlocked</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              ${(currentUser.badges || []).map(b => `
                <div class="p-3.5 rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 flex items-center gap-3">
                  <span class="text-2xl">${b.icon}</span>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900">${b.title}</h5>
                    <p class="text-[10px] text-slate-500 leading-tight">${b.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right Column: Deadlines & Announcements (1 Col) -->
        <div class="space-y-6">
          <!-- Upcoming MCQ Assessment Deadlines -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                ${Icons.clock} Assessment Deadlines
              </h3>
            </div>

            <div class="space-y-3">
              <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="font-bold text-amber-900">Cyber Security Exam</span>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">Sept 30</span>
                </div>
                <p class="text-[11px] text-amber-700">Enterprise Cyber Security & Threat Mitigation</p>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-[10px] text-amber-800 font-semibold">5 Questions • 10 Mins</span>
                  <a href="#assessments" class="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-sm">
                    Start Quiz
                  </a>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="font-bold text-slate-700">Digital Governance Quiz</span>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Completed</span>
                </div>
                <p class="text-[11px] text-slate-500">Score: 100% (Passed)</p>
              </div>
            </div>
          </div>

          <!-- Official Broadcast Announcements -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 class="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              ${Icons.bell} Official Broadcasts
            </h3>
            <div class="space-y-3">
              ${announcements.slice(0, 3).map(a => `
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 transition-colors">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${a.priority === 'urgent' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}">${a.priority}</span>
                    <span class="text-[10px] text-slate-400">${a.date.split(' ')[0]}</span>
                  </div>
                  <h5 class="text-xs font-bold text-slate-800">${a.title}</h5>
                  <p class="text-[11px] text-slate-500 mt-0.5 line-clamp-2">${a.content}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
