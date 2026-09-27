// CAPACITY CONNECT - Trainer Overview Dashboard
import { Storage } from '../../data/storage.js';
import { Icons } from '../../utils/helpers.js';

export function renderTrainerDashboard(currentUser) {
  const allCourses = Storage.getCourses();
  const myCourses = allCourses.filter(c => c.trainerId === currentUser.id || c.trainerName === currentUser.name);
  const totalLearners = myCourses.reduce((acc, c) => acc + (c.enrolledCount || 0), 0);
  const library = Storage.getLibrary().filter(l => l.uploaderId === currentUser.id || l.uploaderName === currentUser.name);
  const attempts = Storage.getQuizAttempts();
  const subjects = Storage.getSubjects().filter(s => s.assignedTrainerId === currentUser.id);

  return `
    <div class="space-y-6 pb-12">
      <!-- Welcome Hero Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-indigo-900 to-blue-900 text-white p-6 sm:p-8 shadow-xl">
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[11px] font-bold tracking-wider uppercase border border-indigo-400/30">
                Principal Faculty & Instructor Suite
              </span>
              <span class="text-amber-300 text-xs font-bold">
                ⭐ ${currentUser.rating || 4.9} Instructor Rating
              </span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome, ${currentUser.name}</h1>
            <p class="text-indigo-200 text-xs sm:text-sm mt-1 max-w-xl">
              ${currentUser.designation} • ${currentUser.department}. Author new courses, build questionnaires, upload learning media, and monitor cohort progression.
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-wrap items-center gap-2.5">
            <a href="#create-course" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-950 text-xs font-bold shadow-md shadow-black/10 flex items-center gap-1.5 transition-all">
              ${Icons.plus} New Course
            </a>
            <a href="#create-quiz" class="px-4 py-2.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white text-xs font-bold border border-indigo-400/30 flex items-center gap-1.5 transition-all">
              ${Icons.quiz} New Questionnaire
            </a>
            <a href="#trainer-library" class="px-4 py-2.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white text-xs font-bold border border-indigo-400/30 flex items-center gap-1.5 transition-all">
              ${Icons.upload} Upload Asset
            </a>
          </div>
        </div>
      </div>

      <!-- Metric Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Authored Courses</span>
            <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">${Icons.book}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">${myCourses.length}</p>
          <p class="text-[11px] text-indigo-600 font-semibold mt-1">Live in National Catalog</p>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Active Learners</span>
            <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">${Icons.users}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">${totalLearners}</p>
          <p class="text-[11px] text-blue-600 font-semibold mt-1">Total Enrolled Trainees</p>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Library Resources</span>
            <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">${Icons.folder}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">${library.length}</p>
          <p class="text-[11px] text-emerald-600 font-semibold mt-1">Lectures, PDFs & Decks</p>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Cohort Exam Pass Rate</span>
            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">${Icons.award}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">89.4%</p>
          <p class="text-[11px] text-amber-600 font-semibold mt-1">First-Attempt Mastery</p>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Authored Courses List (2 Cols) -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-bold text-slate-900 text-base">Courses Instructed by You</h3>
                <p class="text-xs text-slate-500">Curriculum status, enrollment capacity, and ratings</p>
              </div>
              <a href="#create-course" class="text-xs font-bold text-indigo-600 hover:text-indigo-800">+ Add New Course</a>
            </div>

            <div class="space-y-3">
              ${myCourses.map(course => `
                <div class="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-indigo-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex items-center gap-3.5">
                    <img src="${course.banner}" alt="${course.title}" class="w-14 h-14 rounded-xl object-cover shadow-sm flex-shrink-0" />
                    <div>
                      <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">${course.category}</span>
                      <h4 class="text-sm font-bold text-slate-900 mt-1">${course.title}</h4>
                      <div class="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                        <span>👥 ${course.enrolledCount || 0} Enrolled</span>
                        <span>⭐ ${course.rating} Rating</span>
                        <span>⏱️ ${course.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 self-end sm:self-center">
                    <a href="#participation" class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold">
                      View Logs
                    </a>
                    <a href="#create-quiz" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm">
                      Questionnaire
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Recent Trainee Exam Attempts -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-slate-900 text-base">Recent Trainee Exam Attempts</h3>
              <a href="#participation" class="text-xs font-bold text-indigo-600 hover:text-indigo-800">All Participation Logs →</a>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
                  <tr>
                    <th class="py-2.5 px-3">Trainee Name</th>
                    <th class="py-2.5 px-3">Course / Exam</th>
                    <th class="py-2.5 px-3">Score</th>
                    <th class="py-2.5 px-3">Status</th>
                    <th class="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                  ${attempts.slice(0, 5).map(att => `
                    <tr>
                      <td class="py-2.5 px-3 font-bold text-slate-900">${att.userName}</td>
                      <td class="py-2.5 px-3 text-slate-600">${att.courseTitle || 'Assessment'}</td>
                      <td class="py-2.5 px-3 font-bold ${att.passed ? 'text-emerald-600' : 'text-rose-600'}">${att.score}%</td>
                      <td class="py-2.5 px-3">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${att.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                          ${att.passed ? 'PASSED' : 'RETAKE'}
                        </span>
                      </td>
                      <td class="py-2.5 px-3 text-slate-400">${att.date.split(' ')[0]}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right Column: Competency Assignments & Credentials (1 Col) -->
        <div class="space-y-6">
          <!-- Competency Mapped Subjects Widget -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                ${Icons.matrix} Competency Assignments
              </h3>
              <span class="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Engine Mapped</span>
            </div>
            <p class="text-xs text-slate-500">Subjects assigned to you by the Central Admin based on algorithmic skill similarity matching.</p>

            <div class="space-y-3">
              ${subjects.map(s => `
                <div class="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-indigo-900">${s.name}</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-200 text-indigo-900 font-bold">${s.code}</span>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    ${(s.requiredSkills || []).slice(0, 3).map(sk => `
                      <span class="text-[9px] px-2 py-0.5 rounded bg-white text-indigo-800 font-semibold border border-indigo-100">
                        ✓ ${sk}
                      </span>
                    `).join('')}
                  </div>
                  <div class="text-[10px] text-slate-500 flex justify-between pt-1">
                    <span>Dept: ${s.department}</span>
                    <span class="font-bold text-emerald-600">Active Faculty</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Trainer Credentials Box -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              ${Icons.shield} Technical Credentials
            </h3>
            <div class="space-y-2 text-xs">
              <div>
                <span class="text-slate-400 font-semibold">Qualification:</span>
                <p class="font-bold text-slate-800">${currentUser.qualification || 'Doctorate in Network Security'}</p>
              </div>
              <div>
                <span class="text-slate-400 font-semibold">Experience:</span>
                <p class="font-bold text-slate-800">${currentUser.experience || '11 Years'}</p>
              </div>
              <div>
                <span class="text-slate-400 font-semibold">Verified Skill Tags:</span>
                <div class="flex flex-wrap gap-1 mt-1">
                  ${(currentUser.skills || []).map(sk => `
                    <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                      ${sk}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}
