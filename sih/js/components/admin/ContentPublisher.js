// CAPACITY CONNECT - Content Publisher & Announcements Broadcaster
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

export function renderContentPublisher(currentUser) {
  const announcements = Storage.getAnnouncements();

  return `
    <div class="max-w-4xl mx-auto space-y-6 pb-12">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Broadcast Content Publisher</h2>
          <p class="text-xs sm:text-sm text-slate-500">Publish urgent notices, national capacity cohorts, policy updates, and banners</p>
        </div>
        <a href="#admin-dashboard" class="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all">
          ← Back to Overview
        </a>
      </div>

      <!-- Publish Form Card -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
          ${Icons.bell} Compose System Broadcast Notice
        </h3>

        <form id="publish-announcement-form" class="space-y-4 text-xs">
          <div>
            <label class="block text-slate-700 font-bold mb-1">Broadcast Title *</label>
            <input type="text" id="ann-title" required placeholder="e.g. Mandatory Cyber Defense Certification Cohort Starting Oct 1" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-slate-700 font-bold mb-1">Target Audience *</label>
              <select id="ann-target" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">🌐 Universal (All Roles)</option>
                <option value="trainee">🧑🎓 Trainees Only</option>
                <option value="trainer">👨🏫 Trainers Only</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-700 font-bold mb-1">Alert Priority *</label>
              <select id="ann-priority" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500">
                <option value="medium">Normal Announcement</option>
                <option value="high" selected>High Priority</option>
                <option value="urgent">Urgent Compliance Notice</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-700 font-bold mb-1">Notice Type</label>
              <select id="ann-type" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500">
                <option value="announcement">General Announcement</option>
                <option value="alert">Deadline Alert</option>
                <option value="update">Policy Update</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-slate-700 font-bold mb-1">Broadcast Message Body *</label>
            <textarea id="ann-content" required rows="3" placeholder="Provide full details, regulatory reference numbers, and instructions for trainees/trainers..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2">
              ${Icons.bell} Broadcast Immediately
            </button>
          </div>
        </form>
      </div>

      <!-- Published Announcements List -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 class="font-bold text-slate-900 text-base">Published Broadcast Feed</h3>

        <div class="space-y-3">
          ${announcements.map(ann => `
            <div class="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.2 rounded text-[10px] font-bold uppercase ${ann.priority === 'urgent' ? 'bg-rose-100 text-rose-800' : (ann.priority === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800')}">${ann.priority}</span>
                  <span class="text-[11px] text-slate-400">Target: <strong>${ann.targetRole.toUpperCase()}</strong> • ${ann.date}</span>
                </div>
                <h4 class="text-sm font-bold text-slate-900">${ann.title}</h4>
                <p class="text-xs text-slate-500 max-w-2xl">${ann.content}</p>
              </div>

              <div class="text-right text-xs">
                <span class="text-[10px] text-slate-400 font-semibold block">Author</span>
                <span class="font-bold text-slate-700">${ann.author}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function bindContentPublisherEvents(currentUser) {
  const form = document.getElementById('publish-announcement-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('ann-title').value.trim();
      const targetRole = document.getElementById('ann-target').value;
      const priority = document.getElementById('ann-priority').value;
      const type = document.getElementById('ann-type').value;
      const content = document.getElementById('ann-content').value.trim();

      Storage.publishAnnouncement({
        title,
        content,
        targetRole,
        priority,
        type,
        author: `${currentUser.name} (${currentUser.role})`
      });

      showToast(`Broadcast notice "${title}" has been published to the portal!`, 'success');
      form.reset();

      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderContentPublisher(currentUser);
      bindContentPublisherEvents(currentUser);
    };
  }
}
