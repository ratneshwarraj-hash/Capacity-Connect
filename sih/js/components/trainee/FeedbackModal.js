// CAPACITY CONNECT - Course & Trainer Feedback Modal
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

let activeCourseIdForFeedback = null;
let selectedRating = 5;

export function renderFeedbackModal() {
  return `
    <div id="feedback-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-100 overflow-hidden p-6 sm:p-8 space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 class="text-base font-extrabold text-slate-900">Course & Trainer Feedback</h3>
            <p class="text-xs text-slate-500" id="feedback-course-subtitle">Digital Governance</p>
          </div>
          <button id="close-feedback-modal-btn" class="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
            ${Icons.close}
          </button>
        </div>

        <!-- Star Rating -->
        <div class="text-center space-y-2 py-2">
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Overall Training Experience</label>
          <div class="flex items-center justify-center gap-2 text-3xl cursor-pointer" id="stars-container">
            <span data-star="1" class="star-item text-amber-400">★</span>
            <span data-star="2" class="star-item text-amber-400">★</span>
            <span data-star="3" class="star-item text-amber-400">★</span>
            <span data-star="4" class="star-item text-amber-400">★</span>
            <span data-star="5" class="star-item text-amber-400">★</span>
          </div>
          <p class="text-xs font-semibold text-slate-500" id="rating-text">5.0 - Outstanding Delivery</p>
        </div>

        <!-- Feedback Comments -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Written Feedback & Suggestions</label>
            <textarea id="feedback-comment" rows="3" placeholder="Share your experience regarding syllabus clarity, practical relevance, and trainer interaction..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-2 flex items-center justify-end gap-2">
          <button id="cancel-feedback-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button id="submit-feedback-btn" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20">
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  `;
}

export function bindFeedbackModalEvents() {
  const modal = document.getElementById('feedback-modal');
  const closeBtn = document.getElementById('close-feedback-modal-btn');
  const cancelBtn = document.getElementById('cancel-feedback-btn');
  const submitBtn = document.getElementById('submit-feedback-btn');

  const hide = () => modal && modal.classList.add('hidden');
  if (closeBtn) closeBtn.onclick = hide;
  if (cancelBtn) cancelBtn.onclick = hide;

  // Star Clicks
  const stars = document.querySelectorAll('.star-item');
  const ratingText = document.getElementById('rating-text');
  const ratingLabels = {
    1: '1.0 - Needs Significant Improvement',
    2: '2.0 - Below Expectations',
    3: '3.0 - Satisfactory / Average',
    4: '4.0 - Very Good & Informative',
    5: '5.0 - Outstanding Delivery'
  };

  stars.forEach(s => {
    s.onclick = () => {
      selectedRating = parseInt(s.getAttribute('data-star'), 10);
      stars.forEach((star, i) => {
        if (i < selectedRating) {
          star.className = 'star-item text-amber-400 transition-transform scale-110';
        } else {
          star.className = 'star-item text-slate-200 transition-transform';
        }
      });
      if (ratingText) ratingText.textContent = ratingLabels[selectedRating];
    };
  });

  if (submitBtn) {
    submitBtn.onclick = () => {
      const comment = document.getElementById('feedback-comment').value.trim();
      const course = Storage.getCourse(activeCourseIdForFeedback);
      const user = Storage.getCurrentUser();

      Storage.submitFeedback({
        courseId: activeCourseIdForFeedback,
        courseTitle: course ? course.title : 'Course',
        userId: user.id,
        userName: user.name,
        trainerName: course ? course.trainerName : 'Trainer',
        rating: selectedRating,
        comment: comment || 'Course content was well-structured and provided valuable practical capacity development.'
      });

      showToast('Thank you! Your feedback has been recorded.', 'success');
      hide();
    };
  }

  window.openFeedbackModal = (courseId) => {
    activeCourseIdForFeedback = courseId;
    const course = Storage.getCourse(courseId);
    if (modal && course) {
      document.getElementById('feedback-course-subtitle').textContent = course.title;
      modal.classList.remove('hidden');
    }
  };
}
