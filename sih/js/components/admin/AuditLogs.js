// CAPACITY CONNECT - Master Data & System Audit Logs
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

let auditSearch = '';

export function renderAuditLogs(currentUser) {
  const logs = Storage.getAuditLogs();
  const departments = Storage.data.departments || [];
  const categories = Storage.data.categories || [];

  const filteredLogs = logs.filter(l => {
    const q = auditSearch.toLowerCase();
    return !q || l.user.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      l.details.toLowerCase().includes(q) ||
      l.role.toLowerCase().includes(q);
  });

  return `
    <div class="space-y-6 pb-12">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Master Data & Audit Telemetry</h2>
          <p class="text-xs sm:text-sm text-slate-500">Immutable security logs, administrative changes, and organizational domain taxonomies</p>
        </div>
        <button id="export-audit-csv-btn" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md shadow-black/10 flex items-center gap-2 transition-all self-start sm:self-center">
          ${Icons.download} Export Audit CSV
        </button>
      </div>

      <!-- Master Data Summary Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Departments -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-slate-900 text-sm">Active Departments</h3>
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">${departments.length} Wings</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${departments.map(d => `
              <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                🏛️ ${d}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Categories -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-slate-900 text-sm">Course Competency Domains</h3>
            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">${categories.length} Domains</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${categories.map(c => `
              <span class="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 text-xs font-semibold">
                🏷️ ${c}
              </span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- System Audit Trail Table -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 class="font-bold text-slate-900 text-base">Administrative Audit Trail</h3>
            <p class="text-xs text-slate-500">Chronological telemetry of session logins, role changes, course creations, and exam attempts</p>
          </div>
          <div class="relative w-full sm:w-72">
            <span class="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              ${Icons.search}
            </span>
            <input type="text" id="audit-search-input" value="${auditSearch}" placeholder="Filter audit records..." class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th class="py-3 px-4">Timestamp</th>
                <th class="py-3 px-4">User</th>
                <th class="py-3 px-4">Role</th>
                <th class="py-3 px-4">Action Event</th>
                <th class="py-3 px-4">Context Details</th>
                <th class="py-3 px-4 text-right">IP Telemetry</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
              ${filteredLogs.map(l => `
                <tr class="hover:bg-slate-50 transition-colors">
                  <td class="py-3 px-4 text-slate-400 font-mono text-[11px]">${l.timestamp}</td>
                  <td class="py-3 px-4 font-bold text-slate-900">${l.user}</td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-0.2 rounded text-[10px] font-bold uppercase ${l.role === 'admin' ? 'bg-rose-100 text-rose-800' : (l.role === 'trainer' ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800')}">
                      ${l.role}
                    </span>
                  </td>
                  <td class="py-3 px-4 font-bold text-slate-800">${l.action}</td>
                  <td class="py-3 px-4 text-slate-600 max-w-sm truncate">${l.details}</td>
                  <td class="py-3 px-4 text-right font-mono text-[11px] text-slate-400">${l.ip || '10.0.1.1'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function bindAuditLogsEvents(currentUser) {
  const search = document.getElementById('audit-search-input');
  const exportBtn = document.getElementById('export-audit-csv-btn');

  if (search) {
    search.oninput = (e) => {
      auditSearch = e.target.value;
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderAuditLogs(currentUser);
      bindAuditLogsEvents(currentUser);
    };
  }

  if (exportBtn) {
    exportBtn.onclick = () => {
      const logs = Storage.getAuditLogs();
      let csvContent = 'data:text/csv;charset=utf-8,Timestamp,User,Role,Action,Details,IP\n';
      logs.forEach(l => {
        csvContent += `"${l.timestamp}","${l.user}","${l.role}","${l.action}","${l.details}","${l.ip}"\n`;
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `capacity_connect_audit_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Audit logs exported successfully as CSV!', 'success');
    };
  }
}
