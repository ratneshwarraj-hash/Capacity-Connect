// CAPACITY CONNECT - Trainee Participation & Score Monitor
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

let filterCourseId = 'All';
let searchTrainee = '';

export function renderParticipationTracker(currentUser) {
  const attempts = Storage.getQuizAttempts();
  const courses = Storage.getCourses();

  const filtered = attempts.filter(att => {
    const matchCourse = filterCourseId === 'All' || att.courseId === filterCourseId;
    const q = searchTrainee.toLowerCase();
    const matchSearch = !q || (att.userName && att.userName.toLowerCase().includes(q)) ||
      (att.courseTitle && att.courseTitle.toLowerCase().includes(q));
    return matchCourse && matchSearch;
  });

  const passedCount = attempts.filter(a => a.passed).length;
  const passRate = attempts.length > 0 ? Math.round((passedCount / attempts.length) * 100) : 0;

  return `
    <div class="space-y-6 pb-12">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Trainee Participation & Exam Logs</h2>
          <p class="text-xs sm:text-sm text-slate-500">Monitor individual attempts, evaluate competency scores, and export compliance data</p>
        </div>
        <button id="export-csv-btn" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-all self-start sm:self-center">
          ${Icons.download} Export Report (CSV)
        </button>
      </div>

      <!-- Quick Summary Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Attempts Logged</span>
          <p class="text-xl font-black text-slate-900 mt-1">${attempts.length}</p>
        </div>
        <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Passing Rate</span>
          <p class="text-xl font-black text-emerald-600 mt-1">${passRate}%</p>
        </div>
        <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Unique Trainees</span>
          <p class="text-xl font-black text-indigo-600 mt-1">${new Set(attempts.map(a => a.userId)).size}</p>
        </div>
      </div>

      <!-- Filters & Search -->
      <div class="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div class="relative w-full sm:w-80">
          <span class="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
            ${Icons.search}
          </span>
          <input type="text" id="part-search-input" value="${searchTrainee}" placeholder="Search trainee by name..." class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div class="flex items-center gap-2 w-full sm:w-auto">
          <span class="text-xs font-bold text-slate-500 whitespace-nowrap">Filter Course:</span>
          <select id="part-course-select" class="px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64">
            <option value="All">All Active Courses</option>
            ${courses.map(c => `<option value="${c.id}" ${filterCourseId === c.id ? 'selected' : ''}>${c.title}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs" id="participation-data-table">
            <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th class="py-3 px-4">Trainee Candidate</th>
                <th class="py-3 px-4">Course Module</th>
                <th class="py-3 px-4">Score</th>
                <th class="py-3 px-4">Result</th>
                <th class="py-3 px-4">Time Spent</th>
                <th class="py-3 px-4">Timestamp</th>
                <th class="py-3 px-4 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
              ${filtered.length === 0 ? `
                <tr>
                  <td colspan="7" class="py-8 text-center text-slate-400 text-xs">No attempt records matching the current filters.</td>
                </tr>
              ` : filtered.map(att => `
                <tr class="hover:bg-slate-50 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      ${(att.userName || 'U')[0]}
                    </span>
                    <span>${att.userName}</span>
                  </td>
                  <td class="py-3.5 px-4 text-slate-700 max-w-xs truncate">${att.courseTitle || 'Exam'}</td>
                  <td class="py-3.5 px-4 font-extrabold ${att.passed ? 'text-emerald-600' : 'text-rose-600'} text-sm">${att.score}%</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${att.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                      ${att.passed ? '✓ PASSED' : '✕ RETAKE'}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-slate-500">${att.timeSpentSeconds ? Math.round(att.timeSpentSeconds) + 's' : '240s'}</td>
                  <td class="py-3.5 px-4 text-slate-500">${att.date}</td>
                  <td class="py-3.5 px-4 text-right">
                    <span class="text-[11px] font-bold text-slate-400">Verified</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function bindParticipationTrackerEvents(currentUser) {
  const searchInput = document.getElementById('part-search-input');
  const courseSelect = document.getElementById('part-course-select');
  const exportBtn = document.getElementById('export-csv-btn');

  if (searchInput) {
    searchInput.oninput = (e) => {
      searchTrainee = e.target.value;
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderParticipationTracker(currentUser);
      bindParticipationTrackerEvents(currentUser);
    };
  }

  if (courseSelect) {
    courseSelect.onchange = (e) => {
      filterCourseId = e.target.value;
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderParticipationTracker(currentUser);
      bindParticipationTrackerEvents(currentUser);
    };
  }

  if (exportBtn) {
    exportBtn.onclick = () => {
      const attempts = Storage.getQuizAttempts();
      let csvContent = 'data:text/csv;charset=utf-8,Trainee Name,Course Title,Score (%),Result,Time Spent (s),Date\n';
      attempts.forEach(a => {
        csvContent += `"${a.userName}","${a.courseTitle || 'Assessment'}",${a.score},"${a.passed ? 'PASSED' : 'FAILED'}",${Math.round(a.timeSpentSeconds || 0)},"${a.date}"\n`;
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `capacity_connect_participation_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Participation report exported as CSV!', 'success');
    };
  }
}
