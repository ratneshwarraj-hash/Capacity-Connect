// CAPACITY CONNECT - Unified Trainer Library Component
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

let activeLibraryType = 'All';
let librarySearch = '';

export function renderTrainerLibrary(currentUser) {
  const library = Storage.getLibrary();
  const courses = Storage.getCourses();

  const filtered = library.filter(item => {
    const matchType = activeLibraryType === 'All' || item.type.toLowerCase() === activeLibraryType.toLowerCase();
    const q = librarySearch.toLowerCase();
    const matchQuery = !q || item.title.toLowerCase().includes(q) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(q))) ||
      item.uploaderName.toLowerCase().includes(q);
    return matchType && matchQuery;
  });

  return `
    <div class="space-y-6 pb-12">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800">
              SIH Differentiator
            </span>
            <span class="text-xs text-slate-400 font-semibold">• Cross-Course Reusable Repository</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Unified Trainer Library</h2>
          <p class="text-xs sm:text-sm text-slate-500">Centralized repository of verified lecture streams, policy manuals, slides, and code templates</p>
        </div>
        <button id="open-upload-widget-btn" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-all self-start sm:self-center">
          ${Icons.upload} Upload New Asset
        </button>
      </div>

      <!-- Search & Type Filter Bar -->
      <div class="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative flex-1">
            <span class="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              ${Icons.search}
            </span>
            <input type="text" id="lib-search-input" value="${librarySearch}" placeholder="Search library by resource title, tag, or uploader..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div class="flex items-center gap-2">
            <button id="lib-clear-btn" class="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600">
              Reset
            </button>
          </div>
        </div>

        <!-- Filter Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          ${['All', 'PDF', 'Video', 'Slides', 'Code'].map(t => `
            <button data-lib-type="${t}" class="lib-type-btn flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${activeLibraryType.toLowerCase() === t.toLowerCase() ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}">
              ${t === 'All' ? '📂 All Resources' : (t === 'PDF' ? '📄 PDF Documents' : (t === 'Video' ? '▶ Video Lectures' : (t === 'Slides' ? '📊 Presentations' : '💻 Code Templates')))}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Library Grid / Table -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filtered.length === 0 ? `
          <div class="col-span-full p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-2">
            <p class="text-sm font-bold text-slate-700">No matching library assets found</p>
            <p class="text-xs text-slate-400">Try adjusting your search keywords or upload a new file above.</p>
          </div>
        ` : filtered.map(item => {
          const typeIcons = {
            pdf: '📄',
            video: '▶',
            slides: '📊',
            code: '💻'
          };
          const typeColors = {
            pdf: 'bg-rose-50 text-rose-700 border-rose-200',
            video: 'bg-blue-50 text-blue-700 border-blue-200',
            slides: 'bg-amber-50 text-amber-700 border-amber-200',
            code: 'bg-emerald-50 text-emerald-700 border-emerald-200'
          };

          return `
            <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm card-hover flex flex-col justify-between space-y-4">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${typeColors[item.type] || 'bg-slate-50 text-slate-700'}">
                    ${typeIcons[item.type] || '📁'} ${item.type.toUpperCase()}
                  </span>
                  <span class="text-[11px] font-medium text-slate-400">${item.size} • ${item.date}</span>
                </div>

                <h3 class="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2">${item.title}</h3>
                <p class="text-[11px] text-slate-500 mt-1">Uploaded by: <strong>${item.uploaderName}</strong></p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-1.5 pt-3">
                  ${(item.tags || []).map(t => `
                    <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                      #${t}
                    </span>
                  `).join('')}
                </div>
              </div>

              <!-- Action Bar -->
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="text-[11px] text-slate-400 font-medium">📥 ${item.downloads || 42} accesses</span>
                <div class="flex items-center gap-2">
                  <button data-download-lib="${item.id}" class="download-lib-btn px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-all">
                    Download
                  </button>
                  <button data-preview-lib="${item.id}" class="preview-lib-btn px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-sm transition-all">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Upload Modal Widget -->
      <div id="upload-lib-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-100 p-6 sm:p-8 space-y-5">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-base font-extrabold text-slate-900">Upload to Unified Trainer Library</h3>
              <p class="text-xs text-slate-500">Asset will be instantly accessible across courses</p>
            </div>
            <button id="close-upload-lib-modal-btn" class="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
              ${Icons.close}
            </button>
          </div>

          <form id="upload-lib-form" class="space-y-4 text-xs">
            <div>
              <label class="block text-slate-700 font-bold mb-1">Resource Title *</label>
              <input type="text" id="lib-file-title" required placeholder="e.g. Zero Trust Architecture Hands-on Workbook" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-700 font-bold mb-1">Media Type *</label>
                <select id="lib-file-type" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="pdf">📄 PDF Document</option>
                  <option value="video">▶ Video Lecture</option>
                  <option value="slides">📊 Presentation Slides</option>
                  <option value="code">💻 Code / Script Template</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-700 font-bold mb-1">Linked Course</label>
                <select id="lib-file-course" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">(Universal / Cross-Course)</option>
                  ${courses.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}
                </select>
              </div>
            </div>

            <div>
              <label class="block text-slate-700 font-bold mb-1">Search Tags (Comma separated) *</label>
              <input type="text" id="lib-file-tags" required placeholder="e.g. Cyber Security, Zero Trust, SOP, Guidelines" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <!-- Drag & Drop Simulator -->
            <div class="p-6 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 text-center space-y-2 cursor-pointer hover:bg-indigo-50/60 transition-colors">
              <span class="text-3xl">☁️</span>
              <p class="text-xs font-bold text-indigo-950">Drag & drop files here, or browse local disk</p>
              <p class="text-[10px] text-slate-400">Supports PDF, MP4, PPTX, ZIP, DOCX up to 500MB</p>
            </div>

            <div class="pt-2 flex items-center justify-end gap-2">
              <button type="button" id="cancel-upload-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20">
                Confirm & Upload Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function bindTrainerLibraryEvents(currentUser) {
  // Search
  const searchInput = document.getElementById('lib-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      librarySearch = e.target.value;
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderTrainerLibrary(currentUser);
      bindTrainerLibraryEvents(currentUser);
    };
  }

  const clearBtn = document.getElementById('lib-clear-btn');
  if (clearBtn) {
    clearBtn.onclick = () => {
      librarySearch = '';
      activeLibraryType = 'All';
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderTrainerLibrary(currentUser);
      bindTrainerLibraryEvents(currentUser);
    };
  }

  // Type Pills
  document.querySelectorAll('.lib-type-btn').forEach(btn => {
    btn.onclick = () => {
      activeLibraryType = btn.getAttribute('data-lib-type');
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderTrainerLibrary(currentUser);
      bindTrainerLibraryEvents(currentUser);
    };
  });

  // Modal controls
  const modal = document.getElementById('upload-lib-modal');
  const openBtn = document.getElementById('open-upload-widget-btn');
  const closeBtn = document.getElementById('close-upload-lib-modal-btn');
  const cancelBtn = document.getElementById('cancel-upload-btn');
  const form = document.getElementById('upload-lib-form');

  const show = () => modal && modal.classList.remove('hidden');
  const hide = () => modal && modal.classList.add('hidden');

  if (openBtn) openBtn.onclick = show;
  if (closeBtn) closeBtn.onclick = hide;
  if (cancelBtn) cancelBtn.onclick = hide;

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('lib-file-title').value.trim();
      const type = document.getElementById('lib-file-type').value;
      const courseId = document.getElementById('lib-file-course').value;
      const tagsStr = document.getElementById('lib-file-tags').value;
      const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

      Storage.addLibraryItem({
        title,
        type,
        courseId,
        tags,
        uploaderId: currentUser.id,
        uploaderName: currentUser.name,
        size: (Math.random() * 8 + 2).toFixed(1) + ' MB'
      });

      showToast(`Asset "${title}" added to Unified Trainer Library!`, 'success');
      hide();
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderTrainerLibrary(currentUser);
      bindTrainerLibraryEvents(currentUser);
    };
  }

  // Download / Preview simulated buttons
  document.querySelectorAll('.download-lib-btn').forEach(btn => {
    btn.onclick = () => {
      showToast('Downloading library resource from cloud storage...', 'info');
    };
  });

  document.querySelectorAll('.preview-lib-btn').forEach(btn => {
    btn.onclick = () => {
      const libId = btn.getAttribute('data-preview-lib');
      const item = Storage.getLibrary().find(l => l.id === libId);
      if (item) {
        showToast(`Opening preview for "${item.title}"`, 'info');
      }
    };
  });
}
