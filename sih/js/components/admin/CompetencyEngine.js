// CAPACITY CONNECT - Competency Mapping Engine (Key SIH Differentiator)
import { Storage } from '../../data/storage.js';
import { rankTrainersForSubject, generateCompetencyMatrix } from '../../utils/competency.js';
import { Icons, showToast, launchConfetti } from '../../utils/helpers.js';

let selectedSubjectId = 'subj_5'; // Default to the unassigned AI Ethics subject for live SIH demonstration!

export function renderCompetencyEngine(currentUser) {
  const subjects = Storage.getSubjects();
  const trainers = Storage.getUsers().filter(u => u.role === 'trainer' && u.status === 'approved');
  const matrix = generateCompetencyMatrix(subjects, trainers);

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  const rankings = rankTrainersForSubject(selectedSubject, trainers);
  const topCandidate = rankings[0] || null;

  return `
    <div class="space-y-6 pb-12">
      <!-- Engine Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300">
              ⚡ SIH Core Differentiator
            </span>
            <span class="text-xs text-slate-400 font-semibold">• Jaccard Similarity & Experience Weighted</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Competency Mapping Engine</h2>
          <p class="text-xs sm:text-sm text-slate-500">Auto-suggests and matches best-fit certified trainers to subjects using skill-tag overlap matrices</p>
        </div>

        <!-- Subject Switcher Dropdown -->
        <div class="flex items-center gap-2">
          <label class="text-xs font-bold text-slate-600 whitespace-nowrap">Select Subject:</label>
          <select id="engine-subject-select" class="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
            ${subjects.map(s => `
              <option value="${s.id}" ${s.id === selectedSubject.id ? 'selected' : ''}>
                ${s.code} - ${s.name} ${!s.assignedTrainerId ? '⚠️ [UNASSIGNED]' : ''}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Active Subject Requirement Specification Card -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-slate-100 text-slate-700">${selectedSubject.code}</span>
              <span class="text-xs text-slate-400 font-semibold">${selectedSubject.department}</span>
            </div>
            <h3 class="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">${selectedSubject.name}</h3>
          </div>

          <!-- Current Assignment Status Pill -->
          <div>
            ${selectedSubject.assignedTrainerId ? `
              <div class="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">✓</span>
                <div class="text-xs">
                  <span class="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Assigned Faculty</span>
                  <p class="font-extrabold text-emerald-950">${Storage.getUser(selectedSubject.assignedTrainerId)?.name || 'Trainer'}</p>
                </div>
              </div>
            ` : `
              <div class="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 animate-pulse">
                <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">⚠️</span>
                <div class="text-xs">
                  <span class="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Status: Vacant Subject</span>
                  <p class="font-extrabold text-amber-950">No Lead Trainer Assigned Yet</p>
                </div>
              </div>
            `}
          </div>
        </div>

        <!-- Required Skills & Thresholds -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Mandatory Competency Skills:</span>
            <div class="flex flex-wrap gap-1.5 mt-2">
              ${(selectedSubject.requiredSkills || []).map(sk => `
                <span class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold">
                  #${sk}
                </span>
              `).join('')}
            </div>
          </div>
          <div class="flex items-center gap-6 sm:justify-end text-xs">
            <div>
              <span class="text-slate-400 font-semibold uppercase text-[10px]">Min. Experience</span>
              <p class="font-extrabold text-slate-800 text-sm mt-0.5">${selectedSubject.minExperienceYears || 3} Years</p>
            </div>
            <div>
              <span class="text-slate-400 font-semibold uppercase text-[10px]">Annual Batches</span>
              <p class="font-extrabold text-slate-800 text-sm mt-0.5">${selectedSubject.annualTargetBatches || 4} Cohorts</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Algorithmic Recommendation Rankings Table -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-slate-900 text-base">Algorithmic Best-Fit Trainer Recommendations</h3>
            <p class="text-xs text-slate-500">Calculated via: (Matched Skills / Required Skills × 85%) + (Experience Factor × 15%)</p>
          </div>
          <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">${rankings.length} Candidate Profiles Evaluated</span>
        </div>

        <div class="space-y-4 pt-2">
          ${rankings.map((fit, idx) => {
            const isTop = idx === 0;
            const isAssigned = fit.isCurrentlyAssigned;

            return `
              <div class="p-5 rounded-2xl border transition-all ${isAssigned ? 'border-emerald-300 bg-emerald-50/30' : (isTop ? 'border-blue-300 bg-blue-50/20 shadow-sm' : 'border-slate-200 bg-slate-50/40')} flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <!-- Left: Rank & Trainer Profile -->
                <div class="flex items-center gap-4">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${isTop ? 'bg-amber-400 text-amber-950 shadow-md shadow-amber-400/30' : 'bg-slate-200 text-slate-600'}">
                    #${idx + 1}
                  </div>
                  <img src="${fit.trainerAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}" alt="${fit.trainerName}" class="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-200" />
                  <div>
                    <div class="flex items-center gap-2">
                      <h4 class="text-sm font-extrabold text-slate-900">${fit.trainerName}</h4>
                      ${isTop ? `<span class="px-2 py-0.2 rounded-md bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase">Top Algorithmic Match</span>` : ''}
                    </div>
                    <p class="text-xs text-slate-500">${fit.trainerDepartment} • Experience: <strong>${fit.trainerExperience}</strong></p>
                  </div>
                </div>

                <!-- Center: Skills Tag Overlap Breakdown -->
                <div class="space-y-2 lg:max-w-md w-full">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-slate-700">Skill Overlap Matrix (${fit.matchedCount} of ${fit.totalRequired})</span>
                    <span class="font-extrabold text-sm ${fit.score >= 80 ? 'text-emerald-600' : (fit.score >= 50 ? 'text-amber-600' : 'text-slate-500')}">${fit.score}% Match</span>
                  </div>

                  <!-- Progress Bar -->
                  <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-700 ${fit.score >= 80 ? 'bg-emerald-500' : (fit.score >= 50 ? 'bg-amber-500' : 'bg-slate-400')}" style="width: ${fit.score}%"></div>
                  </div>

                  <!-- Skills Tags Badges -->
                  <div class="flex flex-wrap gap-1 pt-1">
                    ${fit.matchedSkills.map(s => `
                      <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                        ✓ ${s}
                      </span>
                    `).join('')}
                    ${fit.missingSkills.map(s => `
                      <span class="px-2 py-0.5 rounded bg-slate-200 text-slate-500 text-[10px] font-medium">
                        ✕ ${s}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <!-- Right: Action Button -->
                <div class="flex items-center gap-2 self-end lg:self-center">
                  ${isAssigned ? `
                    <span class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm flex items-center gap-1.5">
                      ${Icons.check} Currently Assigned
                    </span>
                  ` : `
                    <button data-assign-subject="${selectedSubject.id}" data-assign-trainer="${fit.trainerId}" class="assign-trainer-btn px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all">
                      ⚡ Assign to Lead Subject
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Organizational Competency Coverage Matrix -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-slate-900 text-base">Organizational Subject Competency Roster</h3>
            <p class="text-xs text-slate-500">Live overview of all subjects, assigned trainers, and coverage gaps</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th class="py-3 px-4">Subject Code & Name</th>
                <th class="py-3 px-4">Department</th>
                <th class="py-3 px-4">Assigned Faculty</th>
                <th class="py-3 px-4">Top AI Suggested Trainer</th>
                <th class="py-3 px-4">Fit Score</th>
                <th class="py-3 px-4 text-right">Coverage Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
              ${matrix.map(m => `
                <tr class="hover:bg-slate-50 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-slate-900">${m.subject.code}: ${m.subject.name}</td>
                  <td class="py-3.5 px-4 text-slate-500">${m.subject.department}</td>
                  <td class="py-3.5 px-4 font-semibold text-slate-800">
                    ${m.currentTrainer ? m.currentTrainer.name : `<span class="text-amber-600 font-bold">Unassigned</span>`}
                  </td>
                  <td class="py-3.5 px-4 text-indigo-700 font-bold">
                    ${m.topSuggestion ? m.topSuggestion.trainerName : 'N/A'}
                  </td>
                  <td class="py-3.5 px-4 font-extrabold ${m.topSuggestion && m.topSuggestion.score >= 80 ? 'text-emerald-600' : 'text-amber-600'}">
                    ${m.topSuggestion ? m.topSuggestion.score + '%' : 'N/A'}
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${m.coverageGap ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-emerald-100 text-emerald-800'}">
                      ${m.coverageGap ? '⚠️ Coverage Gap' : '✓ Full Coverage'}
                    </span>
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

export function bindCompetencyEngineEvents(currentUser) {
  // Subject dropdown switch
  const select = document.getElementById('engine-subject-select');
  if (select) {
    select.onchange = (e) => {
      selectedSubjectId = e.target.value;
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderCompetencyEngine(currentUser);
      bindCompetencyEngineEvents(currentUser);
    };
  }

  // 1-Click Trainer Assignment
  document.querySelectorAll('.assign-trainer-btn').forEach(btn => {
    btn.onclick = () => {
      const subjectId = btn.getAttribute('data-assign-subject');
      const trainerId = btn.getAttribute('data-assign-trainer');

      const success = Storage.assignTrainerToSubject(subjectId, trainerId);
      if (success) {
        launchConfetti();
        const trainer = Storage.getUser(trainerId);
        const subject = Storage.getSubjects().find(s => s.id === subjectId);
        showToast(`⚡ Competency Engine: Assigned ${trainer.name} to lead "${subject.name}" based on algorithmic match!`, 'success');

        const rerender = document.getElementById('main-content');
        if (rerender) rerender.innerHTML = renderCompetencyEngine(currentUser);
        bindCompetencyEngineEvents(currentUser);
      }
    };
  });
}
