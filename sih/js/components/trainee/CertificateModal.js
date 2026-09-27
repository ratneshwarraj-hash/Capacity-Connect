// CAPACITY CONNECT - Verifiable Certificate of Completion Modal
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

export function renderCertificateModal() {
  return `
    <div id="certificate-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden transform transition-all p-6 sm:p-8">
        <!-- Close & Print Bar -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 no-print">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs font-bold text-slate-700">Digitally Verified Accreditation Document</span>
          </div>
          <div class="flex items-center gap-3">
            <button id="print-certificate-btn" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all">
              ${Icons.download} Print / Download PDF
            </button>
            <button id="close-certificate-modal-btn" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
              ${Icons.close}
            </button>
          </div>
        </div>

        <!-- Printable Certificate Canvas -->
        <div id="certificate-printable" class="certificate-frame mt-4 p-8 sm:p-12 bg-gradient-to-b from-amber-50/20 via-white to-amber-50/20 text-center rounded-2xl relative overflow-hidden">
          <!-- Watermark Background -->
          <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <svg class="w-96 h-96" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>

          <!-- Header -->
          <div class="space-y-1 mb-6">
            <div class="flex items-center justify-center gap-2">
              <span class="text-2xl">🏛️</span>
              <span class="text-xs font-extrabold tracking-widest text-slate-800 uppercase">Capacity Building Commission</span>
            </div>
            <p class="text-[10px] uppercase tracking-widest text-blue-800 font-bold">Digital India • National Competency Framework</p>
            <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-2 font-serif">Certificate of Competency</h1>
            <p class="text-xs text-slate-500 italic">This is officially accredited and recorded on the National Learning Ledger</p>
          </div>

          <!-- Recipient -->
          <div class="my-6 space-y-2">
            <p class="text-xs text-slate-500 uppercase tracking-wider">This credential is proudly awarded to</p>
            <h2 id="cert-student-name" class="text-2xl sm:text-3xl font-extrabold text-blue-900 font-serif underline decoration-amber-400 decoration-2 underline-offset-8">
              Rahul Sharma
            </h2>
            <p id="cert-student-dept" class="text-xs text-slate-600 pt-2 font-medium">
              Dept. of Information Technology
            </p>
          </div>

          <!-- Accomplishment Statement -->
          <div class="my-6 max-w-xl mx-auto space-y-1">
            <p class="text-xs text-slate-600">for successfully completing the rigorous capacity building curriculum and passing the accredited competency assessment in</p>
            <h3 id="cert-course-title" class="text-lg sm:text-xl font-bold text-slate-900 font-serif pt-1">
              Digital Governance & Citizen Service Delivery
            </h3>
          </div>

          <!-- Signatures & Verification Row -->
          <div class="pt-8 mt-6 border-t border-slate-200 grid grid-cols-3 items-end text-center text-xs">
            <!-- Left Signature -->
            <div>
              <div class="font-serif italic font-bold text-slate-800 text-sm">Sunita Deshmukh</div>
              <div class="w-32 border-b border-slate-300 mx-auto my-1"></div>
              <p class="text-[10px] text-slate-500 font-semibold uppercase">Program Lead Trainer</p>
            </div>

            <!-- Center QR Code & Seal -->
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 p-1.5 rounded-lg border-2 border-slate-300 bg-white shadow-inner flex items-center justify-center mb-1">
                <!-- SVG QR Code Simulator -->
                <svg class="w-full h-full text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm0 4h4v2h-4v-2zm-4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm-2-4h2v6h-2v-6zm6-6h2v4h-2V8zm-4 0h2v2h-2V8z"/>
                </svg>
              </div>
              <span id="cert-verify-id" class="text-[10px] font-mono font-bold text-slate-700">CERT-GOV-2026-8941</span>
              <span class="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">✓ Digitally Signed</span>
            </div>

            <!-- Right Signature -->
            <div>
              <div class="font-serif italic font-bold text-slate-800 text-sm">Rajesh Kumar</div>
              <div class="w-32 border-b border-slate-300 mx-auto my-1"></div>
              <p class="text-[10px] text-slate-500 font-semibold uppercase">Chief Capacity Officer</p>
            </div>
          </div>

          <!-- Bottom Verification Hash -->
          <div class="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span id="cert-date-issued">Date of Issue: 2026-09-05</span>
            <span class="font-mono">SHA256: 8f4e2...a19c</span>
            <span>Accredited Portal System</span>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function bindCertificateModalEvents() {
  const modal = document.getElementById('certificate-modal');
  const closeBtn = document.getElementById('close-certificate-modal-btn');
  const printBtn = document.getElementById('print-certificate-btn');

  if (closeBtn && modal) {
    closeBtn.onclick = () => modal.classList.add('hidden');
  }

  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }

  // Global trigger helper
  window.openCertificateModal = (courseId) => {
    const course = Storage.getCourse(courseId) || Storage.getCourses()[0];
    const currentUser = Storage.getCurrentUser();
    const modalEl = document.getElementById('certificate-modal');
    if (!modalEl) return;

    document.getElementById('cert-student-name').textContent = currentUser.name;
    document.getElementById('cert-student-dept').textContent = currentUser.department;
    document.getElementById('cert-course-title').textContent = course.title;

    const prog = currentUser.courseProgress && currentUser.courseProgress[course.id];
    const certId = (prog && prog.certificateId) || `CERT-GOV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const issueDate = (prog && prog.completedDate) || new Date().toISOString().split('T')[0];

    document.getElementById('cert-verify-id').textContent = certId;
    document.getElementById('cert-date-issued').textContent = `Date of Issue: ${issueDate}`;

    modalEl.classList.remove('hidden');
  };
}
