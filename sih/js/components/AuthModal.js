// CAPACITY CONNECT - Authentication & Role Modal
import { Storage } from '../data/storage.js';
import { showToast } from '../utils/helpers.js';

export function renderAuthModal() {
  return `
    <div id="auth-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-100 overflow-hidden transform transition-all p-6 sm:p-8">
        <!-- Close Button -->
        <button id="close-auth-modal-btn" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <!-- Header -->
        <div class="text-center mb-6">
          <div class="w-12 h-12 rounded-2xl bg-gradient-sih mx-auto flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20 mb-3">
            🛡️
          </div>
          <h3 class="text-xl font-extrabold text-slate-900">Sign in to CAPACITY CONNECT</h3>
          <p class="text-xs text-slate-500 mt-1">Role-Based Access Control • Trainee • Trainer • Admin</p>
        </div>

        <!-- Quick SIH 1-Click Demo Buttons -->
        <div class="mb-6 p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
          <p class="text-[11px] font-bold uppercase tracking-wider text-blue-800 mb-2 text-center">⚡ 1-Click SIH Presentation Logins</p>
          <div class="grid grid-cols-3 gap-2">
            <button data-quick-user="usr_trainee_1" class="quick-login-btn p-2 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold border border-blue-200 transition-all shadow-sm flex flex-col items-center gap-1">
              <span class="text-base">🧑🎓</span>
              <span>Trainee</span>
            </button>
            <button data-quick-user="usr_trainer_1" class="quick-login-btn p-2 rounded-xl bg-white hover:bg-indigo-600 hover:text-white text-slate-700 text-xs font-bold border border-indigo-200 transition-all shadow-sm flex flex-col items-center gap-1">
              <span class="text-base">👨🏫</span>
              <span>Trainer</span>
            </button>
            <button data-quick-user="usr_admin_1" class="quick-login-btn p-2 rounded-xl bg-white hover:bg-rose-600 hover:text-white text-slate-700 text-xs font-bold border border-rose-200 transition-all shadow-sm flex flex-col items-center gap-1">
              <span class="text-base">🛠️</span>
              <span>Admin</span>
            </button>
          </div>
        </div>

        <!-- Tabs: Login vs Register -->
        <div class="flex border-b border-slate-200 mb-5">
          <button id="tab-login" class="flex-1 pb-2.5 text-xs font-bold text-blue-600 border-b-2 border-blue-600">Standard Login</button>
          <button id="tab-register" class="flex-1 pb-2.5 text-xs font-bold text-slate-400 hover:text-slate-600">Apply for Account</button>
        </div>

        <!-- Form: Login -->
        <form id="login-form" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Official Email Address</label>
            <input type="email" id="login-email" required placeholder="user@org.gov.in" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input type="password" id="login-password" required value="capacity2026" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <button type="submit" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all">
            Sign In with RBAC
          </button>
        </form>

        <!-- Form: Register (Application) -->
        <form id="register-form" class="hidden space-y-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input type="text" id="reg-name" required placeholder="e.g. Ananya Verma" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
            <input type="email" id="reg-email" required placeholder="name@org.gov.in" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Requested Role</label>
              <select id="reg-role" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500">
                <option value="trainee">🧑🎓 Trainee</option>
                <option value="trainer">👨🏫 Trainer</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Department</label>
              <select id="reg-dept" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Dept. of Information Technology">Information Tech</option>
                <option value="Center for Cloud Systems">Cloud & Systems</option>
                <option value="Public Policy & Analytics">Public Policy</option>
                <option value="Governance & Reforms">Governance</option>
                <option value="Revenue & Commercial Taxes">Revenue</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Competency Skills (Comma separated)</label>
            <input type="text" id="reg-skills" placeholder="e.g. Python, Network Defense, Linux" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
            ⚠️ <strong>Admin Approval Required</strong>: New registrations enter the Admin Approval Workflow before full system access is granted.
          </div>
          <button type="submit" class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all">
            Submit Application for Approval
          </button>
        </form>

      </div>
    </div>
  `;
}

export function bindAuthModalEvents() {
  const modal = document.getElementById('auth-modal');
  const closeBtn = document.getElementById('close-auth-modal-btn');
  const openBtns = document.querySelectorAll('#open-auth-modal-btn');

  const showModal = () => modal && modal.classList.remove('hidden');
  const hideModal = () => modal && modal.classList.add('hidden');

  openBtns.forEach(btn => btn.onclick = showModal);
  if (closeBtn) closeBtn.onclick = hideModal;

  // Tabs
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (tabLogin && tabRegister) {
    tabLogin.onclick = () => {
      tabLogin.className = 'flex-1 pb-2.5 text-xs font-bold text-blue-600 border-b-2 border-blue-600';
      tabRegister.className = 'flex-1 pb-2.5 text-xs font-bold text-slate-400 hover:text-slate-600';
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
    };
    tabRegister.onclick = () => {
      tabRegister.className = 'flex-1 pb-2.5 text-xs font-bold text-blue-600 border-b-2 border-blue-600';
      tabLogin.className = 'flex-1 pb-2.5 text-xs font-bold text-slate-400 hover:text-slate-600';
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    };
  }

  // Quick 1-Click Buttons
  document.querySelectorAll('.quick-login-btn').forEach(btn => {
    btn.onclick = () => {
      const uId = btn.getAttribute('data-quick-user');
      Storage.setSession(uId);
      const user = Storage.getUser(uId);
      showToast(`Logged in as ${user.name} (${user.role})`, 'success');
      hideModal();
      window.location.hash = `#${user.role}-dashboard`;
    };
  });

  // Standard Login submit
  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const user = Storage.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        if (user.status === 'pending') {
          showToast('This account is still awaiting Admin approval.', 'warning');
          return;
        }
        Storage.setSession(user.id);
        showToast(`Welcome back, ${user.name}!`, 'success');
        hideModal();
        window.location.hash = `#${user.role}-dashboard`;
      } else {
        // Mock fallback to default persona
        showToast('Email not recognized. Logging in with Demo Trainee account.', 'info');
        Storage.setSession('usr_trainee_1');
        hideModal();
        window.location.hash = '#trainee-dashboard';
      }
    };
  }

  // Application Register submit
  if (registerForm) {
    registerForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const role = document.getElementById('reg-role').value;
      const department = document.getElementById('reg-dept').value;
      const skillsStr = document.getElementById('reg-skills').value;
      const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);

      const newUser = Storage.registerUser({
        name,
        email,
        role,
        department,
        skills,
        qualification: 'Professional Trainee / Specialist',
        experience: '2+ Years'
      });

      showToast(`Application submitted for ${name}! Please switch to Super Admin to approve this account.`, 'success');
      hideModal();
    };
  }
}
