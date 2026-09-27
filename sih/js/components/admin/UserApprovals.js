// CAPACITY CONNECT - User Approval Workflow & Role Management
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

export function renderUserApprovals(currentUser) {
  const users = Storage.getUsers();
  const pendingUsers = users.filter(u => u.status === 'pending');
  const approvedUsers = users.filter(u => u.status === 'approved');

  return `
    <div class="space-y-6 pb-12">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">User Approvals & Role-Based Access (RBAC)</h2>
          <p class="text-xs sm:text-sm text-slate-500">Review pending account applications, assign administrative privileges, and manage user rosters</p>
        </div>
        <span class="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-2 self-start sm:self-center">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          ${pendingUsers.length} Pending Approval${pendingUsers.length === 1 ? '' : 's'}
        </span>
      </div>

      <!-- Pending Approvals Queue -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-slate-900 text-base">Pending Applications Queue</h3>
            <p class="text-xs text-slate-500">Users requesting Trainee or Trainer access requiring security clearance</p>
          </div>
        </div>

        ${pendingUsers.length === 0 ? `
          <div class="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100">
            <p class="text-xs font-bold text-slate-700">✓ All user registration requests have been cleared!</p>
            <p class="text-[11px] text-slate-400 mt-0.5">New signups from the portal login modal will appear here.</p>
          </div>
        ` : `
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th class="py-3 px-4">Applicant</th>
                  <th class="py-3 px-4">Requested Role</th>
                  <th class="py-3 px-4">Department</th>
                  <th class="py-3 px-4">Claimed Competencies</th>
                  <th class="py-3 px-4">Applied Date</th>
                  <th class="py-3 px-4 text-right">Approval Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                ${pendingUsers.map(user => `
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="py-3.5 px-4">
                      <p class="font-bold text-slate-900">${user.name}</p>
                      <p class="text-[11px] text-slate-500">${user.email}</p>
                    </td>
                    <td class="py-3.5 px-4">
                      <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${user.role === 'trainer' ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'}">
                        ${user.role}
                      </span>
                    </td>
                    <td class="py-3.5 px-4 text-slate-600">${user.department || 'Unassigned'}</td>
                    <td class="py-3.5 px-4 max-w-xs">
                      <div class="flex flex-wrap gap-1">
                        ${(user.skills || []).map(s => `
                          <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">${s}</span>
                        `).join('')}
                      </div>
                    </td>
                    <td class="py-3.5 px-4 text-slate-400">${user.appliedDate || 'Today'}</td>
                    <td class="py-3.5 px-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button data-approve-user="${user.id}" data-role="${user.role}" class="approve-user-btn px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all">
                          Approve
                        </button>
                        <button data-reject-user="${user.id}" class="reject-user-btn px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold transition-all">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <!-- Approved Users Roster -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-slate-900 text-base">Active Registered Users Roster</h3>
            <p class="text-xs text-slate-500">${approvedUsers.length} verified accounts in database</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th class="py-3 px-4">User</th>
                <th class="py-3 px-4">System Role</th>
                <th class="py-3 px-4">Department</th>
                <th class="py-3 px-4">Experience / Qual</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Session Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
              ${approvedUsers.map(u => `
                <tr class="hover:bg-slate-50 transition-colors">
                  <td class="py-3 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                    <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" alt="${u.name}" class="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200" />
                    <div>
                      <p>${u.name}</p>
                      <p class="text-[10px] text-slate-400 font-normal">${u.email}</p>
                    </div>
                  </td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-rose-100 text-rose-800' : (u.role === 'trainer' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800')}">
                      ${u.role}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-slate-600">${u.department || 'Central'}</td>
                  <td class="py-3 px-4 text-slate-500">${u.experience || '2+ Years'}</td>
                  <td class="py-3 px-4">
                    <span class="text-emerald-600 font-bold text-xs">● Active</span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <button data-switch-to-user="${u.id}" class="switch-to-user-btn text-blue-600 font-bold hover:underline">
                      Log in as User →
                    </button>
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

export function bindUserApprovalsEvents(currentUser) {
  // Approve User
  document.querySelectorAll('.approve-user-btn').forEach(btn => {
    btn.onclick = () => {
      const uId = btn.getAttribute('data-approve-user');
      const role = btn.getAttribute('data-role');
      Storage.approveUser(uId, role);
      const user = Storage.getUser(uId);
      showToast(`Approved ${user.name} as ${role}! They can now log in.`, 'success');

      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderUserApprovals(currentUser);
      bindUserApprovalsEvents(currentUser);
    };
  });

  // Reject User
  document.querySelectorAll('.reject-user-btn').forEach(btn => {
    btn.onclick = () => {
      const uId = btn.getAttribute('data-reject-user');
      if (confirm('Reject and delete this registration request?')) {
        Storage.rejectUser(uId);
        showToast('Application rejected.', 'info');
        const rerender = document.getElementById('main-content');
        if (rerender) rerender.innerHTML = renderUserApprovals(currentUser);
        bindUserApprovalsEvents(currentUser);
      }
    };
  });

  // Switch to User session
  document.querySelectorAll('.switch-to-user-btn').forEach(btn => {
    btn.onclick = () => {
      const uId = btn.getAttribute('data-switch-to-user');
      Storage.setSession(uId);
      const user = Storage.getUser(uId);
      showToast(`Switched active session to ${user.name} (${user.role})`, 'success');
      window.location.hash = `#${user.role}-dashboard`;
    };
  });
}
