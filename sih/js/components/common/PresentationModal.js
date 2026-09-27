// CAPACITY CONNECT - Interactive SIH Presentation Deck Modal
import { Icons } from '../../utils/helpers.js';

let currentSlideIndex = 0;

export function renderPresentationModal() {
  const slides = [
    {
      title: "1. Problem Statement & Organizational Reality",
      time: "30 Seconds Pitch",
      content: `
        <div class="space-y-4 text-xs sm:text-sm text-slate-700">
          <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
            <h4 class="font-extrabold text-sm mb-1">🚨 The Capacity Building Challenge in Public & Enterprise Sectors:</h4>
            <p class="leading-relaxed">
              Large organizations suffer from fragmented training silos, unmapped trainer skill utilization, unverified course completion credentials, and a complete absence of predictive analytics to bridge skill gaps.
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <span class="text-xl">⚠️</span>
              <h5 class="font-bold text-slate-900 mt-1">Skill Gap Blindness</h5>
              <p class="text-slate-500 text-[11px] mt-0.5">No standardized competency matrix to match trainers to specific departmental needs.</p>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <span class="text-xl">📁</span>
              <h5 class="font-bold text-slate-900 mt-1">Resource Wastage</h5>
              <p class="text-slate-500 text-[11px] mt-0.5">High-quality lectures and study materials are scattered and rarely reused across cohorts.</p>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <span class="text-xl">📄</span>
              <h5 class="font-bold text-slate-900 mt-1">Unverifiable Claims</h5>
              <p class="text-slate-500 text-[11px] mt-0.5">Paper/static certificates lack cryptographic integrity and instant verification.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "2. Proposed Solution & One-Line Pitch",
      time: "1 Minute Pitch",
      content: `
        <div class="space-y-4">
          <blockquote class="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-serif text-sm sm:text-base italic leading-relaxed shadow-lg">
            "CAPACITY CONNECT is a role-based Learning Management System that unifies course delivery, skill assessment, competency mapping, and organizational learning analytics on a single scalable, secure, and device-agnostic platform."
          </blockquote>
          <div class="grid grid-cols-3 gap-3 text-xs">
            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
              <span class="text-2xl">🧑🎓</span>
              <h5 class="font-bold text-blue-950">Trainee Centric</h5>
              <p class="text-[11px] text-blue-700">Self-enrollment, timed assessments, dynamic verifiable certificates.</p>
            </div>
            <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center space-y-1">
              <span class="text-2xl">👨🏫</span>
              <h5 class="font-bold text-indigo-950">Trainer Faculty</h5>
              <p class="text-[11px] text-indigo-700">Course builder, MCQ questionnaires, unified cross-course resource library.</p>
            </div>
            <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-1">
              <span class="text-2xl">🛠️</span>
              <h5 class="font-bold text-rose-950">Superadmin</h5>
              <p class="text-[11px] text-rose-700">Competency Mapping Engine, real-time Chart.js analytics, RBAC user approvals.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "3. High-Level System Architecture",
      time: "30 Seconds Architecture",
      content: `
        <div class="space-y-3 text-xs">
          <div class="p-4 rounded-2xl bg-slate-900 text-white font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner">
            <pre>
┌────────────────────────────────────────────────────────────────────────┐
│             [ Trainee / Trainer / Admin Web & PWA Client ]             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (HTTPS / REST API / PWA Offline Cache)
                        ┌───────────▼───────────┐
                        │   API Gateway & RBAC  │ → JWT Auth, Role Guard
                        └───────────┬───────────┘
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
 ┌──────────▼───────────┐ ┌─────────▼──────────┐ ┌──────────▼───────────┐
 │   Course & Content   │ │  MCQ Assessment    │ │ Competency Mapping   │
 │   Streaming Service  │ │  & Auto-Scoring    │ │ Algorithmic Engine   │
 └──────────┬───────────┘ └─────────┬──────────┘ └──────────┬───────────┘
            │                       │                       │
 ┌──────────▼───────────────────────▼───────────────────────▼───────────┐
 │        PostgreSQL / MongoDB Database State Layer (Master Data)       │
 └──────────────────────────────────┬───────────────────────────────────┘
                                    │
 ┌──────────────────────────────────▼───────────────────────────────────┐
 │       Cloud File Storage (AWS S3 / IPFS): Lectures & Certificates    │
 └──────────────────────────────────────────────────────────────────────┘
            </pre>
          </div>
          <p class="text-slate-500 text-[11px] text-center">Microservices-ready, cloud-native backend decoupling course streaming from assessment scoring.</p>
        </div>
      `
    },
    {
      title: "4. Live Prototype Walkthrough Script (2-3 Min Demo)",
      time: "Live Jury Flow",
      content: `
        <div class="space-y-3 text-xs text-slate-700">
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
            <span class="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
            <div>
              <strong class="text-slate-900">Trainee Flow (Rahul Sharma):</strong>
              <p class="text-slate-500 text-[11px]">Showcase Dashboard streak → Browse catalog → Launch interactive lesson → Take timed MCQ Exam with auto-scoring → View & print verifiable Certificate with QR code.</p>
            </div>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
            <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
            <div>
              <strong class="text-slate-900">Trainer Flow (Dr. Priya Nair):</strong>
              <p class="text-slate-500 text-[11px]">Show authored courses → Create course wizard → Build Questionnaire with pass threshold → Upload asset to Unified Trainer Library → Inspect Trainee Participation Logs.</p>
            </div>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
            <span class="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
            <div>
              <strong class="text-slate-900">Admin Flow (Rajesh Kumar):</strong>
              <p class="text-slate-500 text-[11px]">Inspect Chart.js KPI analytics → Approve pending users in queue → Run Competency Mapping Engine to assign vacant subject based on skill similarity → Broadcast alert.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "5. Key Differentiators for SIH Judges",
      time: "Competitive Edge",
      content: `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
            <span class="text-xs font-bold uppercase text-amber-900">⭐ Differentiator 1</span>
            <h5 class="font-extrabold text-slate-900">Competency Mapping Engine</h5>
            <p class="text-slate-600 text-[11px]">Algorithmic Jaccard skill-tag overlap with experience weighting to eliminate trainer allocation guesswork.</p>
          </div>
          <div class="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
            <span class="text-xs font-bold uppercase text-blue-900">⭐ Differentiator 2</span>
            <h5 class="font-extrabold text-slate-900">Unified Trainer Library</h5>
            <p class="text-slate-600 text-[11px]">Centralized, tagged cross-course study repository maximizing content reuse across departments.</p>
          </div>
          <div class="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
            <span class="text-xs font-bold uppercase text-indigo-900">⭐ Differentiator 3</span>
            <h5 class="font-extrabold text-slate-900">Dynamic Verifiable Certificates</h5>
            <p class="text-slate-600 text-[11px]">Printable certificates with unique ID and verification QR code ensuring fraud prevention.</p>
          </div>
          <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span class="text-xs font-bold uppercase text-emerald-900">⭐ Differentiator 4</span>
            <h5 class="font-extrabold text-slate-900">Device-Agnostic PWA</h5>
            <p class="text-slate-600 text-[11px]">Works seamlessly on low-bandwidth field tablets, mobile devices, and desktops without native app stores.</p>
          </div>
        </div>
      `
    },
    {
      title: "6. Technology Stack & Scalability Roadmap",
      time: "Tech Feasibility",
      content: `
        <div class="space-y-4 text-xs">
          <table class="w-full text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th class="py-2 px-3">Layer</th>
                <th class="py-2 px-3">Technology</th>
                <th class="py-2 px-3">Enterprise Scalability Reason</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600 font-medium">
              <tr>
                <td class="py-2 px-3 font-bold text-slate-900">Frontend</td>
                <td class="py-2 px-3">React / Tailwind / PWA</td>
                <td class="py-2 px-3">Device-agnostic, offline caching, instant load</td>
              </tr>
              <tr>
                <td class="py-2 px-3 font-bold text-slate-900">Backend</td>
                <td class="py-2 px-3">Node.js / Express / Django</td>
                <td class="py-2 px-3">Microservices architecture with REST endpoints</td>
              </tr>
              <tr>
                <td class="py-2 px-3 font-bold text-slate-900">Database</td>
                <td class="py-2 px-3">PostgreSQL / MongoDB</td>
                <td class="py-2 px-3">ACID compliance for exams, flexible schema for tags</td>
              </tr>
              <tr>
                <td class="py-2 px-3 font-bold text-slate-900">Media Storage</td>
                <td class="py-2 px-3">AWS S3 / Firebase Storage</td>
                <td class="py-2 px-3">Scalable CDN video streaming & PDF delivery</td>
              </tr>
            </tbody>
          </table>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 text-center">
            🚀 <strong>Phase 2 Roadmap:</strong> Integration with DigiLocker for automatic certificate syncing & AI Proctoring during MCQ assessments.
          </div>
        </div>
      `
    }
  ];

  const current = slides[currentSlideIndex];

  return `
    <div id="presentation-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-100 overflow-hidden transform transition-all p-6 sm:p-8 space-y-6">
        <!-- Top Bar -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-xl bg-gradient-sih text-white flex items-center justify-center font-bold text-xs shadow-sm">🎤</span>
            <div>
              <h3 class="text-sm sm:text-base font-black text-slate-900">SIH Jury Pitch Deck: CAPACITY CONNECT</h3>
              <p class="text-[11px] text-blue-600 font-bold">${current.time} • Slide ${currentSlideIndex + 1} of ${slides.length}</p>
            </div>
          </div>
          <button id="close-presentation-modal-btn" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
            ${Icons.close}
          </button>
        </div>

        <!-- Slide Body -->
        <div class="space-y-3 min-h-[300px]">
          <h2 class="text-lg font-extrabold text-slate-900 tracking-tight">${current.title}</h2>
          <div id="slide-content-container">
            ${current.content}
          </div>
        </div>

        <!-- Slide Navigation Footer -->
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            ${slides.map((_, idx) => `
              <button data-pres-slide="${idx}" class="pres-slide-dot w-2.5 h-2.5 rounded-full transition-all ${idx === currentSlideIndex ? 'bg-blue-600 w-6' : 'bg-slate-200 hover:bg-slate-300'}"></button>
            `).join('')}
          </div>

          <div class="flex items-center gap-2">
            <button id="prev-slide-btn" class="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all ${currentSlideIndex === 0 ? 'opacity-40 pointer-events-none' : ''}">
              ← Prev
            </button>
            ${currentSlideIndex === slides.length - 1 ? `
              <button id="close-deck-finish-btn" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20">
                Start Live Demo ✓
              </button>
            ` : `
              <button id="next-slide-btn" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20">
                Next →
              </button>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindPresentationModalEvents() {
  const modal = document.getElementById('presentation-modal');
  const closeBtn = document.getElementById('close-presentation-modal-btn');
  const finishBtn = document.getElementById('close-deck-finish-btn');
  const prevBtn = document.getElementById('prev-slide-btn');
  const nextBtn = document.getElementById('next-slide-btn');

  const hide = () => modal && modal.classList.add('hidden');
  if (closeBtn) closeBtn.onclick = hide;
  if (finishBtn) finishBtn.onclick = hide;

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateModal();
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      currentSlideIndex++;
      updateModal();
    };
  }

  document.querySelectorAll('.pres-slide-dot').forEach(dot => {
    dot.onclick = () => {
      currentSlideIndex = parseInt(dot.getAttribute('data-pres-slide'), 10);
      updateModal();
    };
  });

  const updateModal = () => {
    const parent = document.getElementById('presentation-modal-container');
    if (parent) {
      parent.innerHTML = renderPresentationModal();
      bindPresentationModalEvents();
      const m = document.getElementById('presentation-modal');
      if (m) m.classList.remove('hidden');
    }
  };
}
