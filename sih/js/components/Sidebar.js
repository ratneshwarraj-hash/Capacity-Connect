// CAPACITY CONNECT - Sidebar Navigation Component
import { Storage } from '../data/storage.js';
import { Icons } from '../utils/helpers.js';

export function renderSidebar(currentUser, currentRoute) {
  const pendingApprovals = Storage.getUsers().filter(u => u.status === 'pending').length;

  const traineeLinks = [
    { id: 'trainee-dashboard', label: 'Learner Dashboard', icon: Icons.chart },
    { id: 'courses', label: 'Course Catalog', icon: Icons.book },
    { id: 'my-courses', label: 'My Courses & Modules', icon: Icons.cap },
    { id: 'assessments', label: 'MCQ Assessments', icon: Icons.quiz },
    { id: 'profile', label: 'Competency Profile', icon: Icons.award }
  ];

  const trainerLinks = [
    { id: 'trainer-dashboard', label: 'Trainer Overview', icon: Icons.chart },
    { id: 'create-course', label: 'Create Course', icon: Icons.plus },
    { id: 'create-quiz', label: 'Build Questionnaire', icon: Icons.quiz },
    { id: 'trainer-library', label: 'Trainer Resource Library', icon: Icons.folder },
    { id: 'participation', label: 'Trainee Participation', icon: Icons.users }
  ];

  const adminLinks = [
    { id: 'admin-dashboard', label: 'Analytics & KPIs', icon: Icons.chart },
    { id: 'user-approvals', label: 'User Approvals & RBAC', icon: Icons.userCheck, badge: pendingApprovals > 0 ? pendingApprovals : null },
    { id: 'competency-mapping', label: 'Competency Mapping Engine', icon: Icons.matrix, highlight: 'SIH Star' },
    { id: 'content-publisher', label: 'Publish Announcements', icon: Icons.bell },
    { id: 'audit-logs', label: 'Audit Logs & Reporting', icon: Icons.shield }
  ];

  let activeLinks = traineeLinks;
  if (currentUser.role === 'trainer') activeLinks = trainerLinks;
  if (currentUser.role === 'admin') activeLinks = adminLinks;

  return `
    <aside id="sidebar-container" class="w-64 flex-shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-65px)] flex flex-col justify-between p-4 shadow-sm z-30 transition-all">
      <div class="space-y-6">
        <!-- Role Badge Header -->
        <div class="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            ${currentUser.role === 'trainee' ? '🧑🎓' : (currentUser.role === 'trainer' ? '👨🏫' : '🛠️')}
          </div>
          <div class="overflow-hidden">
            <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Perspective</span>
            <h4 class="text-xs font-bold text-slate-800 capitalize truncate">${currentUser.role} Workspace</h4>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="space-y-1">
          <p class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Main Navigation</p>
          ${activeLinks.map(link => {
            const isActive = currentRoute === link.id || (currentRoute === 'dashboard' && link.id.includes('dashboard'));
            return `
              <a href="#${link.id}" class="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}">
                <div class="flex items-center gap-3">
                  <span class="${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}">
                    ${link.icon}
                  </span>
                  <span>${link.label}</span>
                </div>
                ${link.badge ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white text-blue-700' : 'bg-rose-500 text-white animate-pulse'}">${link.badge}</span>` : ''}
                ${link.highlight ? `<span class="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${isActive ? 'bg-amber-300 text-slate-900' : 'bg-amber-100 text-amber-800'}">${link.highlight}</span>` : ''}
              </a>
            `;
          }).join('')}
        </nav>
      </div>

      <!-- Bottom Widget: SIH Hackathon Meta & System Health -->
      <div class="space-y-3 pt-4 border-t border-slate-100">
        <div class="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-md">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-bold uppercase text-blue-300 tracking-wider">SIH 2026 Prototype</span>
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <p class="text-xs font-semibold text-slate-200">Device Agnostic PWA</p>
          <p class="text-[11px] text-slate-400 mt-0.5">RBAC • S3 Ready • REST Ready</p>
        </div>

        <button id="quick-reset-sidebar-btn" class="w-full text-center py-2 text-[11px] text-slate-400 hover:text-rose-600 transition-colors">
          Reset Data for Fresh Jury Rehearsal
        </button>
      </div>
    </aside>
  `;
}

export function bindSidebarEvents() {
  const resetBtn = document.getElementById('quick-reset-sidebar-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm('Reset prototype state to initial demonstration seed data?')) {
        Storage.resetToInitial();
        window.location.reload();
      }
    };
  }
}
