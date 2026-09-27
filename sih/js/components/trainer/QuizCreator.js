// CAPACITY CONNECT - Questionnaire & MCQ Assessment Creator
import { Storage } from '../../data/storage.js';
import { Icons, showToast } from '../../utils/helpers.js';

export function renderQuizCreator(currentUser) {
  const myCourses = Storage.getCourses().filter(c => c.trainerId === currentUser.id || c.trainerName === currentUser.name);

  return `
    <div class="max-w-4xl mx-auto space-y-6 pb-12">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Build Questionnaire & Exam</h2>
          <p class="text-xs sm:text-sm text-slate-500">Configure timed competency quizzes, passing cutoffs, and answer explanations</p>
        </div>
        <a href="#trainer-dashboard" class="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all">
          ← Back to Overview
        </a>
      </div>

      <!-- Quiz Form -->
      <form id="create-quiz-form" class="space-y-6">
        <!-- Settings Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
            ${Icons.quiz} Assessment Parameters & Deadlines
          </h3>

          <div class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-700 font-bold mb-1">Assessment Title *</label>
                <input type="text" id="quiz-title" required placeholder="e.g. Cloud Security & Microservices Examination" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium" />
              </div>

              <div>
                <label class="block text-slate-700 font-bold mb-1">Associate with Course *</label>
                <select id="quiz-course-select" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500">
                  ${myCourses.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-slate-700 font-bold mb-1">Timer Limit (Minutes) *</label>
                <input type="number" id="quiz-time-limit" min="1" max="180" value="10" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div>
                <label class="block text-slate-700 font-bold mb-1">Passing Threshold (%) *</label>
                <input type="number" id="quiz-pass-score" min="10" max="100" value="70" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div>
                <label class="block text-slate-700 font-bold mb-1">Submission Deadline *</label>
                <input type="date" id="quiz-deadline" value="2026-10-15" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
        </div>

        <!-- Questions Container -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
              ${Icons.award} Multiple Choice Questions (MCQs)
            </h3>
            <button type="button" id="add-question-card-btn" class="px-3.5 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 transition-all">
              ${Icons.plus} Add Question
            </button>
          </div>

          <div id="questions-builder-container" class="space-y-4">
            <!-- Question 1 Default -->
            <div class="question-card bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Question 1</span>
              </div>

              <div>
                <label class="block text-slate-700 font-bold text-xs mb-1">Question Prompt *</label>
                <input type="text" required value="What is the foundational requirement for establishing zero trust network architecture?" class="q-prompt-input w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div class="space-y-2">
                <label class="block text-slate-500 font-bold text-[11px] uppercase tracking-wider">Answer Choices (Select radio button for the correct option)</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50">
                    <input type="radio" name="correct_q_1" value="0" class="q-correct-radio" />
                    <input type="text" required value="Trust all endpoints inside the perimeter" class="q-opt-input flex-1 bg-transparent text-xs outline-none" />
                  </div>
                  <div class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50">
                    <input type="radio" name="correct_q_1" value="1" checked class="q-correct-radio" />
                    <input type="text" required value="Continuous context-based verification of every request" class="q-opt-input flex-1 bg-transparent text-xs outline-none font-bold text-emerald-700" />
                  </div>
                  <div class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50">
                    <input type="radio" name="correct_q_1" value="2" class="q-correct-radio" />
                    <input type="text" required value="Use only legacy IP filtering firewalls" class="q-opt-input flex-1 bg-transparent text-xs outline-none" />
                  </div>
                  <div class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50">
                    <input type="radio" name="correct_q_1" value="3" class="q-correct-radio" />
                    <input type="text" required value="Disable log retention across servers" class="q-opt-input flex-1 bg-transparent text-xs outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-slate-700 font-bold text-xs mb-1">Educational Explanation for Review *</label>
                <input type="text" required value="Zero trust assumes breach and continuously evaluates identity, device health, and telemetry before granting granular access." class="q-explanation-input w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Bar -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <a href="#trainer-dashboard" class="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </a>
          <button type="submit" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2">
            ${Icons.check} Save & Publish Questionnaire
          </button>
        </div>
      </form>
    </div>
  `;
}

export function bindQuizCreatorEvents(currentUser) {
  const form = document.getElementById('create-quiz-form');
  const addBtn = document.getElementById('add-question-card-btn');
  const container = document.getElementById('questions-builder-container');

  if (addBtn && container) {
    addBtn.onclick = () => {
      const qNum = container.querySelectorAll('.question-card').length + 1;
      const card = document.createElement('div');
      card.className = 'question-card bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4';
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Question ${qNum}</span>
          <button type="button" class="remove-q-btn text-xs font-bold text-rose-600 hover:underline">Remove</button>
        </div>
        <div>
          <label class="block text-slate-700 font-bold text-xs mb-1">Question Prompt *</label>
          <input type="text" required placeholder="Enter question statement..." class="q-prompt-input w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div class="space-y-2">
          <label class="block text-slate-500 font-bold text-[11px] uppercase tracking-wider">Answer Choices (Select radio button for the correct option)</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50">
              <input type="radio" name="correct_q_${qNum}" value="0" checked class="q-correct-radio" />
              <input type="text" required placeholder="Option 1" class="q-opt-input flex-1 bg-transparent text-xs outline-none" />
            </div>
            <div class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50">
              <input type="radio" name="correct_q_${qNum}" value="1" class="q-correct-radio" />
              <input type="text" required placeholder="Option 2" class="q-opt-input flex-1 bg-transparent text-xs outline-none" />
            </div>
            <div class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50">
              <input type="radio" name="correct_q_${qNum}" value="2" class="q-correct-radio" />
              <input type="text" required placeholder="Option 3" class="q-opt-input flex-1 bg-transparent text-xs outline-none" />
            </div>
            <div class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50">
              <input type="radio" name="correct_q_${qNum}" value="3" class="q-correct-radio" />
              <input type="text" required placeholder="Option 4" class="q-opt-input flex-1 bg-transparent text-xs outline-none" />
            </div>
          </div>
        </div>
        <div>
          <label class="block text-slate-700 font-bold text-xs mb-1">Educational Explanation for Review *</label>
          <input type="text" required placeholder="Explain why the chosen option is correct..." class="q-explanation-input w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      `;
      container.appendChild(card);
      card.querySelector('.remove-q-btn').onclick = () => card.remove();
    };
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('quiz-title').value.trim();
      const courseId = document.getElementById('quiz-course-select').value;
      const timeLimitMinutes = parseInt(document.getElementById('quiz-time-limit').value, 10);
      const passingScorePercent = parseInt(document.getElementById('quiz-pass-score').value, 10);
      const deadline = document.getElementById('quiz-deadline').value;

      const questionCards = container.querySelectorAll('.question-card');
      const questions = Array.from(questionCards).map((card, idx) => {
        const questionPrompt = card.querySelector('.q-prompt-input').value.trim();
        const optInputs = card.querySelectorAll('.q-opt-input');
        const options = Array.from(optInputs).map(inp => inp.value.trim());

        const radioGroup = card.querySelectorAll('.q-correct-radio');
        let correctOptionIndex = 0;
        radioGroup.forEach((r, rIdx) => {
          if (r.checked) correctOptionIndex = rIdx;
        });

        const explanation = card.querySelector('.q-explanation-input').value.trim();

        return {
          id: idx + 1,
          question: questionPrompt,
          options,
          correctOptionIndex,
          explanation
        };
      });

      const newQuiz = Storage.createQuiz({
        courseId,
        title,
        timeLimitMinutes,
        passingScorePercent,
        deadline,
        questions
      });

      showToast(`Questionnaire "${title}" successfully published! Trainees can now attempt this exam.`, 'success');
      window.location.hash = '#assessments';
    };
  }
}
