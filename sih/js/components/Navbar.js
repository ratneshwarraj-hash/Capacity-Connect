// CAPACITY CONNECT - Top Navigation Bar
import { Storage } from '../data/storage.js';
import { Icons, showToast } from '../utils/helpers.js';

export function renderNavbar(currentUser) {
  const pendingApprovals = Storage.getUsers().filter(u => u.status === 'pending').length;
  const announcements = Storage.getAnnouncements(currentUser.role);
  const unreadCount = announcements.length;

  const roleColors = {
    trainee: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    trainer: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    admin: 'bg-rose-50 text-rose-700 border-rose-200'
  };

  const roleBadges = {
    trainee: '🧑🎓 Trainee',
    trainer: '👨🏫 Trainer',
    admin: '🛠️ Super Admin'
  };

  return `
    <header class="glass-nav sticky top-0 z-40 w-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-sm">
      <!-- Left: Brand & Portal Title -->
      <div class="flex items-center gap-3">
        <button id="mobile-sidebar-toggle" class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div class="flex items-center gap-2.5 cursor-pointer" onclick="window.location.hash='#dashboard'">
          <div class="w-10 h-10 rounded-xl bg-gradient-sih flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            ${Icons.shield}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-extrabold text-base tracking-tight text-slate-900">CAPACITY CONNECT</span>
              <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">SIH 2026</span>
            </div>
            <p class="text-xs text-slate-500 font-medium hidden sm:block">Digital Capacity Building & LMS Portal</p>
          </div>
        </div>
      </div>

      <!-- Center: Quick SIH Presentation Persona Switcher -->
      <div class="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
        <span class="text-xs font-semibold text-slate-400 px-2 uppercase tracking-wider">Demo Switcher:</span>
        <button id="switch-trainee-btn" class="demo-role-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${currentUser.role === 'trainee' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
          🧑🎓 Trainee (Rahul)
        </button>
        <button id="switch-trainer-btn" class="demo-role-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${currentUser.role === 'trainer' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
          👨🏫 Trainer (Dr. Priya)
        </button>
        <button id="switch-admin-btn" class="demo-role-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${currentUser.role === 'admin' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
          🛠️ Admin (Rajesh)
          ${pendingApprovals > 0 ? `<span class="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">${pendingApprovals}</span>` : ''}
        </button>
      </div>

      <!-- Right: Action Icons & Profile -->
      <div class="flex items-center gap-3">
        <!-- Presentation Deck Launcher -->
        <button id="open-presentation-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all transform active:scale-95">
          ${Icons.presentation}
          <span class="hidden sm:inline">SIH Pitch Deck</span>
        </button>

        <!-- Notification Bell -->
        <div class="relative">
          <button id="notif-toggle-btn" class="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
            ${Icons.bell}
            ${unreadCount > 0 ? `<span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse"></span>` : ''}
          </button>
          
          <!-- Notification Dropdown -->
          <div id="notif-dropdown" class="hidden absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-100 p-4 z-50">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                ${Icons.bell} Notifications & Announcements
              </h4>
              <span class="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold">${announcements.length} New</span>
            </div>
            <div class="max-h-80 overflow-y-auto divide-y divide-slate-50 mt-2">
              ${announcements.length === 0 ? `<p class="text-xs text-slate-400 py-4 text-center">No recent announcements</p>` : announcements.map(a => `
                <div class="py-2.5 px-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${a.priority === 'urgent' ? 'bg-rose-100 text-rose-700' : (a.priority === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700')}">${a.priority}</span>
                    <span class="text-[11px] text-slate-400">${a.date.split(' ')[0]}</span>
                  </div>
                  <h5 class="text-xs font-semibold text-slate-800 line-clamp-1">${a.title}</h5>
                  <p class="text-[11px] text-slate-500 line-clamp-2 mt-0.5">${a.content}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- User Profile Pill -->
        <div class="relative">
          <button id="user-menu-btn" class="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all shadow-sm">
            <img src="${currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" alt="${currentUser.name}" class="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/20" />
            <div class="text-left hidden md:block">
              <p class="text-xs font-bold text-slate-800 leading-tight">${currentUser.name}</p>
              <span class="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded border ${roleColors[currentUser.role]}">${roleBadges[currentUser.role]}</span>
            </div>
            <svg class="w-4 h-4 text-slate-400 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>

          <!-- User Menu Dropdown -->
          <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-slate-100 p-3 z-50">
            <div class="p-2 border-b border-slate-100 mb-2">
              <p class="text-xs font-bold text-slate-900">${currentUser.name}</p>
              <p class="text-[11px] text-slate-500 truncate">${currentUser.email}</p>
              <p class="text-[10px] text-blue-600 font-medium mt-0.5">${currentUser.department}</p>
            </div>
            <div class="space-y-1">
              <button onclick="window.location.hash='#profile'" class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                ${Icons.users} View Profile
              </button>
              <button id="open-auth-modal-btn" class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                ${Icons.shield} Switch / Log In Persona
              </button>
              <button id="reset-data-btn" class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                ${Icons.refresh} Reset Demo Data
              </button>
            </div>
          </div>
        </div>

      </div>
    </header>
  `;
}

export function bindNavbarEvents(currentUser) {
  // Demo Role Quick-Switchers
  const traineeBtn = document.getElementById('switch-trainee-btn');
  const trainerBtn = document.getElementById('switch-trainer-btn');
  const adminBtn = document.getElementById('switch-admin-btn');

  if (traineeBtn) {
    traineeBtn.onclick = () => {
      Storage.switchRole('trainee');
      showToast('Switched persona to Trainee (Rahul Sharma)', 'info');
      window.location.hash = '#trainee-dashboard';
    };
  }
  if (trainerBtn) {
    trainerBtn.onclick = () => {
      Storage.switchRole('trainer');
      showToast('Switched persona to Trainer (Dr. Priya Nair)', 'info');
      window.location.hash = '#trainer-dashboard';
    };
  }
  if (adminBtn) {
    adminBtn.onclick = () => {
      Storage.switchRole('admin');
      showToast('Switched persona to Super Admin (Rajesh Kumar)', 'info');
      window.location.hash = '#admin-dashboard';
    };
  }

  // Dropdown toggles
  const notifBtn = document.getElementById('notif-toggle-btn');
  const notifDrop = document.getElementById('notif-dropdown');
  if (notifBtn && notifDrop) {
    notifBtn.onclick = (e) => {
      e.stopPropagation();
      notifDrop.classList.toggle('hidden');
      const userDrop = document.getElementById('user-dropdown');
      if (userDrop) userDrop.classList.add('hidden');
    };
  }

  const userBtn = document.getElementById('user-menu-btn');
  const userDrop = document.getElementById('user-dropdown');
  if (userBtn && userDrop) {
    userBtn.onclick = (e) => {
      e.stopPropagation();
      userDrop.classList.toggle('hidden');
      if (notifDrop) notifDrop.classList.add('hidden');
    };
  }

  document.addEventListener('click', () => {
    if (notifDrop) notifDrop.classList.add('hidden');
    if (userDrop) userDrop.classList.add('hidden');
  });

  // Presentation modal button
  const presBtn = document.getElementById('open-presentation-btn');
  if (presBtn) {
    presBtn.onclick = () => {
      const modal = document.getElementById('presentation-modal');
      if (modal) modal.classList.remove('hidden');
    };
  }

  // Reset data button
  const resetBtn = document.getElementById('reset-data-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm('Reset prototype state to default demonstration data?')) {
        Storage.resetToInitial();
        showToast('Demo data reset to clean initial state', 'success');
        window.location.reload();
      }
    };
  }

  // Mobile sidebar toggle
  const mobileToggle = document.getElementById('mobile-sidebar-toggle');
  if (mobileToggle) {
    mobileToggle.onclick = () => {
      const sidebar = document.getElementById('sidebar-container');
      if (sidebar) sidebar.classList.toggle('hidden');
    };
  }
}
