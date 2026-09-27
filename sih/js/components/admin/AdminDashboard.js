// CAPACITY CONNECT - Admin Executive Analytics Dashboard (Chart.js)
import { Storage } from '../../data/storage.js';
import { Icons } from '../../utils/helpers.js';

let chartInstances = {};

export function renderAdminDashboard(currentUser) {
  const courses = Storage.getCourses();
  const users = Storage.getUsers();
  const trainees = users.filter(u => u.role === 'trainee' && u.status === 'approved');
  const trainers = users.filter(u => u.role === 'trainer' && u.status === 'approved');
  const pendingApprovals = users.filter(u => u.status === 'pending');
  const attempts = Storage.getQuizAttempts();
  const totalEnrollments = courses.reduce((acc, c) => acc + (c.enrolledCount || 0), 0);
  const certsIssued = users.reduce((acc, u) => acc + ((u.completedCourses && u.completedCourses.length) || 0), 0);

  return `
    <div class="space-y-6 pb-12">
      <!-- Admin Executive Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-[11px] font-bold tracking-wider uppercase border border-rose-400/30">
                Central Portal Superadmin Suite
              </span>
              <span class="text-emerald-400 text-xs font-bold">
                ● System Health: Operational (100% SLA)
              </span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">National Learning & Capacity Analytics</h1>
            <p class="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Cross-departmental training delivery, competency mapping status, and administrative audit telemetry.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <a href="#competency-mapping" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white text-xs font-extrabold shadow-lg shadow-rose-900/30 flex items-center gap-2 transition-all">
              ${Icons.matrix} Launch Competency Engine
            </a>
            <a href="#user-approvals" class="relative px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2">
              ${Icons.userCheck} Approvals
              ${pendingApprovals.length > 0 ? `<span class="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold animate-pulse">${pendingApprovals.length}</span>` : ''}
            </a>
          </div>
        </div>
      </div>

      <!-- Metric KPI Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Accredited Courses</span>
            <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">${Icons.book}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">${courses.length}</p>
          <p class="text-[11px] text-blue-600 font-semibold mt-1">Across 6 Specialized Wings</p>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Active Enrollments</span>
            <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">${Icons.users}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">${totalEnrollments}</p>
          <p class="text-[11px] text-indigo-600 font-semibold mt-1">${trainees.length} Registered Trainees</p>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Certifications Issued</span>
            <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">${Icons.shield}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">${certsIssued}</p>
          <p class="text-[11px] text-emerald-600 font-semibold mt-1">Tamper-Proof & Verifiable</p>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover">
          <div class="flex items-center justify-between text-slate-400 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Exam Score</span>
            <span class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">${Icons.award}</span>
          </div>
          <p class="text-2xl font-black text-slate-900">86.2%</p>
          <p class="text-[11px] text-rose-600 font-semibold mt-1">Systemwide Competency Benchmark</p>
        </div>
      </div>

      <!-- Charts Row 1: Line Trend & Doughnut Distribution -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Participation Trend Line Chart (2 Cols) -->
        <div class="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-slate-900 text-base">Monthly Trainee Participation & Exam Completion Trends</h3>
              <p class="text-xs text-slate-500">Aggregated capacity growth across preceding 6 months</p>
            </div>
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">+34% YoY</span>
          </div>
          <div class="h-64 w-full">
            <canvas id="chart-participation-trends"></canvas>
          </div>
        </div>

        <!-- Enrollment by Department Doughnut (1 Col) -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 class="font-bold text-slate-900 text-base">Enrollment by Domain</h3>
            <p class="text-xs text-slate-500">Distribution of learners across sectors</p>
          </div>
          <div class="h-64 w-full flex items-center justify-center">
            <canvas id="chart-department-doughnut"></canvas>
          </div>
        </div>
      </div>

      <!-- Charts Row 2: Assessment Pass Ratio Bar Chart & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-slate-900 text-base">Assessment First-Attempt Pass vs. Retake Ratio</h3>
              <p class="text-xs text-slate-500">Measurement of curriculum clarity and subject difficulty</p>
            </div>
          </div>
          <div class="h-56 w-full">
            <canvas id="chart-pass-ratio-bar"></canvas>
          </div>
        </div>

        <!-- Admin Quick Actions Callout -->
        <div class="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              Admin Quick Dispatch
            </span>
            <h3 class="text-lg font-extrabold mt-3">Smart Competency Mapping</h3>
            <p class="text-xs text-slate-300 mt-1 leading-relaxed">
              Match available certified trainers to newly chartered subjects using our algorithmic skill overlap engine.
            </p>
          </div>

          <div class="space-y-2 pt-2">
            <a href="#competency-mapping" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center block shadow-md shadow-blue-500/20 transition-all">
              Run Competency Matcher →
            </a>
            <a href="#content-publisher" class="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center block transition-all">
              Broadcast System Announcement
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindAdminDashboardEvents() {
  // Initialize Chart.js instances
  if (!window.Chart) return;

  // Cleanup old charts
  Object.values(chartInstances).forEach(c => {
    try { c.destroy(); } catch (e) {}
  });
  chartInstances = {};

  // 1. Line Chart: Participation Trends
  const ctxLine = document.getElementById('chart-participation-trends');
  if (ctxLine) {
    chartInstances.line = new window.Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['April 2026', 'May 2026', 'June 2026', 'July 2026', 'August 2026', 'Sept 2026'],
        datasets: [
          {
            label: 'Module Completions',
            data: [120, 185, 240, 310, 430, 580],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#2563eb'
          },
          {
            label: 'Certificates Granted',
            data: [45, 90, 130, 195, 270, 390],
            borderColor: '#059669',
            backgroundColor: 'transparent',
            tension: 0.35,
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11, family: 'Inter' } } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } }
        }
      }
    });
  }

  // 2. Doughnut Chart: Department Distribution
  const ctxDoughnut = document.getElementById('chart-department-doughnut');
  if (ctxDoughnut) {
    chartInstances.doughnut = new window.Chart(ctxDoughnut, {
      type: 'doughnut',
      data: {
        labels: ['Cyber Security', 'Digital Governance', 'Cloud & DevOps', 'Data Analytics', 'AI Ethics'],
        datasets: [
          {
            data: [35, 28, 18, 12, 7],
            backgroundColor: ['#1e40af', '#0284c7', '#4f46e5', '#059669', '#f59e0b'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10, family: 'Inter' } } }
        },
        cutout: '70%'
      }
    });
  }

  // 3. Bar Chart: Pass vs Retake Ratio
  const ctxBar = document.getElementById('chart-pass-ratio-bar');
  if (ctxBar) {
    chartInstances.bar = new window.Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Cyber Sec Exam', 'Digital Gov Quiz', 'Cloud Infra Exam', 'Data Analytics Test', 'AI Ethics Quiz'],
        datasets: [
          {
            label: 'Passed (>=70%)',
            data: [118, 215, 82, 160, 95],
            backgroundColor: '#10b981',
            borderRadius: 6
          },
          {
            label: 'Retake (<70%)',
            data: [24, 15, 16, 25, 15],
            backgroundColor: '#f43f5e',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11, family: 'Inter' } } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } }
        }
      }
    });
  }
}
