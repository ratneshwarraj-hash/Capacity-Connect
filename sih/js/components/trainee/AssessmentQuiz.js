// CAPACITY CONNECT - MCQ Assessment Engine
import { Storage } from '../../data/storage.js';
import { Icons, showToast, launchConfetti } from '../../utils/helpers.js';

let activeQuizId = null;
let currentQuestionIndex = 0;
let userAnswers = {}; // { questionId: selectedIndex }
let timerInterval = null;
let secondsRemaining = 0;
let quizResult = null; // Stored when submitted

export function renderAssessmentQuiz(currentUser) {
  const quizzes = Storage.getQuizzes();
  const attempts = Storage.getQuizAttempts(currentUser.id);

  // If a quiz is actively running
  if (activeQuizId && quizzes[activeQuizId] && !quizResult) {
    const quiz = quizzes[activeQuizId];
    const question = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;

    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    const isUrgent = secondsRemaining < 60;

    return `
      <div class="max-w-3xl mx-auto space-y-6 pb-12">
        <!-- Active Quiz Header & Timer Bar -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Live Timed Assessment
            </span>
            <h2 class="text-lg font-extrabold text-slate-900 mt-1">${quiz.title}</h2>
          </div>

          <!-- Countdown Timer -->
          <div class="flex items-center gap-3">
            <div class="px-4 py-2 rounded-2xl flex items-center gap-2 border font-mono font-bold text-sm shadow-sm transition-colors ${isUrgent ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse' : 'bg-slate-50 text-slate-800 border-slate-200'}">
              ${Icons.clock}
              <span id="quiz-timer-display">${timeFormatted}</span>
            </div>
            <button id="exit-quiz-btn" class="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100" title="Exit Quiz">
              ${Icons.close}
            </button>
          </div>
        </div>

        <!-- Question Navigation Dots -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500">Question ${currentQuestionIndex + 1} of ${totalQuestions}</span>
          <div class="flex items-center gap-2">
            ${quiz.questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;
              let dotStyle = 'bg-slate-100 text-slate-600 border-slate-200';
              if (isAnswered) dotStyle = 'bg-blue-600 text-white border-blue-600';
              if (isCurrent) dotStyle = 'ring-2 ring-blue-500 ring-offset-2 ' + dotStyle;
              return `
                <button data-goto-q="${idx}" class="goto-q-btn w-7 h-7 rounded-lg text-xs font-bold border transition-all ${dotStyle}">
                  ${idx + 1}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Active Question Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span class="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Question ${currentQuestionIndex + 1}</span>
            <h3 class="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
              ${question.question}
            </h3>
          </div>

          <!-- Options -->
          <div class="space-y-3">
            ${question.options.map((option, optIdx) => {
              const isSelected = userAnswers[question.id] === optIdx;
              return `
                <label data-opt-idx="${optIdx}" class="quiz-option-label flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${isSelected ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}">
                  <input type="radio" name="quiz_q_${question.id}" value="${optIdx}" ${isSelected ? 'checked' : ''} class="mt-1 text-blue-600 focus:ring-blue-500" />
                  <span class="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">${option}</span>
                </label>
              `;
            }).join('')}
          </div>

          <!-- Question Footer Navigation -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-100">
            <button id="prev-q-btn" class="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all ${currentQuestionIndex === 0 ? 'opacity-50 pointer-events-none' : ''}">
              ← Previous
            </button>

            ${currentQuestionIndex === totalQuestions - 1 ? `
              <button id="submit-quiz-btn" class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all">
                Submit Assessment ✓
              </button>
            ` : `
              <button id="next-q-btn" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all">
                Next Question →
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // If Quiz Results View is Active
  if (quizResult) {
    const quiz = quizzes[quizResult.quizId];
    const isPassed = quizResult.passed;

    return `
      <div class="max-w-3xl mx-auto space-y-6 pb-12">
        <!-- Results Score Hero Banner -->
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
          <div class="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-black shadow-xl ${isPassed ? 'bg-emerald-100 text-emerald-700 ring-8 ring-emerald-50' : 'bg-rose-100 text-rose-700 ring-8 ring-rose-50'}">
            ${quizResult.score}%
          </div>
          <div>
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
              ${isPassed ? '✓ Competency Assessment Passed' : '✕ Retake Recommended'}
            </span>
            <h2 class="text-xl font-extrabold text-slate-900 mt-2">${quiz.title}</h2>
            <p class="text-xs text-slate-500 mt-1">Passing threshold: ${quiz.passingScorePercent}% • Time spent: ${Math.round(quizResult.timeSpentSeconds)}s</p>
          </div>

          <div class="flex items-center justify-center gap-3 pt-2">
            <button id="close-results-btn" class="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">
              Back to Assessments
            </button>
            ${isPassed ? `
              <button data-cert-course="${quiz.courseId}" class="open-cert-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5">
                ${Icons.shield} View Verifiable Certificate
              </button>
            ` : `
              <button id="retake-quiz-btn" data-qid="${quiz.id}" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20">
                Retake Assessment
              </button>
            `}
          </div>
        </div>

        <!-- Detailed Question Review & Explanations -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 class="font-bold text-slate-900 text-base">Detailed Question-by-Question Review</h3>
            <span class="text-xs font-semibold text-slate-500">${quizResult.correctCount} of ${quiz.questions.length} Correct</span>
          </div>

          <div class="space-y-6">
            ${quiz.questions.map((q, idx) => {
              const userOpt = quizResult.answers[q.id];
              const isCorrect = userOpt === q.correctOptionIndex;

              return `
                <div class="p-5 rounded-2xl border ${isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'} space-y-3">
                  <div class="flex items-start justify-between gap-3">
                    <span class="text-xs font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}">Question ${idx + 1}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                      ${isCorrect ? '✓ Correct' : '✕ Incorrect'}
                    </span>
                  </div>
                  <h4 class="text-sm font-bold text-slate-800">${q.question}</h4>

                  <div class="space-y-1.5 text-xs">
                    ${q.options.map((opt, optIdx) => {
                      let itemClass = 'text-slate-600';
                      let marker = '○';
                      if (optIdx === q.correctOptionIndex) {
                        itemClass = 'font-bold text-emerald-700 bg-emerald-100/60 p-2 rounded-lg';
                        marker = '✓ (Correct Answer)';
                      } else if (optIdx === userOpt && !isCorrect) {
                        itemClass = 'font-bold text-rose-700 bg-rose-100/60 p-2 rounded-lg';
                        marker = '✕ (Your Choice)';
                      }
                      return `
                        <div class="flex items-center justify-between ${itemClass}">
                          <span>${opt}</span>
                          <span class="text-[10px] ml-2">${marker}</span>
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <!-- Educational Explanation -->
                  <div class="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 mt-2">
                    <strong class="text-slate-800">Explanation:</strong> ${q.explanation}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Default Assessment Overview & Catalog View
  return `
    <div class="space-y-6 pb-12">
      <!-- Header -->
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Competency Assessments & Examinations</h2>
        <p class="text-xs sm:text-sm text-slate-500">Timed subject quizzes to validate learning, measure competency gains, and unlock certified credentials</p>
      </div>

      <!-- Available Quizzes Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${Object.values(quizzes).map(quiz => {
          const course = Storage.getCourse(quiz.courseId);
          const pastAttempts = attempts.filter(a => a.quizId === quiz.id);
          const highestScore = pastAttempts.length > 0 ? Math.max(...pastAttempts.map(a => a.score)) : null;

          return `
            <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm card-hover flex flex-col justify-between space-y-4">
              <div>
                <div class="flex items-center justify-between text-xs mb-2">
                  <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold uppercase text-[10px]">
                    ${course ? course.category : 'General'}
                  </span>
                  <span class="text-slate-400 font-medium">Deadline: ${quiz.deadline || 'Open'}</span>
                </div>
                <h3 class="text-base font-extrabold text-slate-900">${quiz.title}</h3>
                <p class="text-xs text-slate-500 mt-1">${course ? course.title : 'Competency Exam'}</p>

                <div class="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 text-center my-4 text-xs">
                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold">Questions</span>
                    <p class="font-bold text-slate-800 mt-0.5">${quiz.questions.length}</p>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold">Time Limit</span>
                    <p class="font-bold text-slate-800 mt-0.5">${quiz.timeLimitMinutes} Mins</p>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold">Passing Mark</span>
                    <p class="font-bold text-slate-800 mt-0.5">${quiz.passingScorePercent}%</p>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                <div class="text-xs">
                  ${highestScore !== null ? `
                    <span class="text-slate-500">Best Score:</span>
                    <span class="font-bold ${highestScore >= quiz.passingScorePercent ? 'text-emerald-600' : 'text-amber-600'}">${highestScore}%</span>
                  ` : `<span class="text-slate-400">Not attempted yet</span>`}
                </div>
                <button data-launch-quiz="${quiz.id}" class="launch-quiz-btn px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all">
                  ${highestScore !== null ? 'Retake Exam' : 'Start Assessment'}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Attempt History Table -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
          ${Icons.award} Your Assessment Attempt History
        </h3>

        ${attempts.length === 0 ? `
          <p class="text-xs text-slate-400 py-4 text-center">No assessments completed yet. Start an exam above to log attempts.</p>
        ` : `
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th class="py-3 px-4">Date & Time</th>
                  <th class="py-3 px-4">Course / Exam</th>
                  <th class="py-3 px-4">Score</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4">Duration</th>
                  <th class="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                ${attempts.map(att => `
                  <tr class="hover:bg-slate-50">
                    <td class="py-3 px-4 text-slate-500">${att.date}</td>
                    <td class="py-3 px-4 font-bold text-slate-900">${att.courseTitle || 'Assessment'}</td>
                    <td class="py-3 px-4 font-extrabold ${att.passed ? 'text-emerald-600' : 'text-rose-600'}">${att.score}%</td>
                    <td class="py-3 px-4">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${att.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                        ${att.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-slate-500">${att.timeSpentSeconds ? Math.round(att.timeSpentSeconds) + 's' : 'N/A'}</td>
                    <td class="py-3 px-4 text-right">
                      ${att.passed ? `
                        <button data-cert-course="${att.courseId}" class="open-cert-btn text-blue-600 font-bold hover:underline">
                          Certificate →
                        </button>
                      ` : `
                        <button data-launch-quiz="${att.quizId}" class="launch-quiz-btn text-amber-600 font-bold hover:underline">
                          Retake
                        </button>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;
}

export function bindAssessmentEvents(currentUser) {
  // Launch Quiz
  document.querySelectorAll('.launch-quiz-btn').forEach(btn => {
    btn.onclick = () => {
      const qId = btn.getAttribute('data-launch-quiz');
      const quiz = Storage.getQuiz(qId);
      if (!quiz) return;

      activeQuizId = qId;
      currentQuestionIndex = 0;
      userAnswers = {};
      quizResult = null;
      secondsRemaining = quiz.timeLimitMinutes * 60;

      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        secondsRemaining--;
        const display = document.getElementById('quiz-timer-display');
        if (display) {
          const mins = Math.floor(secondsRemaining / 60);
          const secs = secondsRemaining % 60;
          display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        if (secondsRemaining <= 0) {
          clearInterval(timerInterval);
          showToast('Time expired! Submitting assessment automatically.', 'warning');
          submitActiveQuiz(currentUser);
        }
      }, 1000);

      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderAssessmentQuiz(currentUser);
      bindAssessmentEvents(currentUser);
    };
  });

  // Exit Quiz
  const exitBtn = document.getElementById('exit-quiz-btn');
  if (exitBtn) {
    exitBtn.onclick = () => {
      if (confirm('Are you sure you want to exit? Your quiz progress will not be saved.')) {
        if (timerInterval) clearInterval(timerInterval);
        activeQuizId = null;
        userAnswers = {};
        const rerender = document.getElementById('main-content');
        if (rerender) rerender.innerHTML = renderAssessmentQuiz(currentUser);
        bindAssessmentEvents(currentUser);
      }
    };
  }

  // Answer selection
  document.querySelectorAll('.quiz-option-label').forEach(label => {
    label.onclick = () => {
      const optIdx = parseInt(label.getAttribute('data-opt-idx'), 10);
      const quiz = Storage.getQuiz(activeQuizId);
      const question = quiz.questions[currentQuestionIndex];
      userAnswers[question.id] = optIdx;

      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderAssessmentQuiz(currentUser);
      bindAssessmentEvents(currentUser);
    };
  });

  // Jump to question dot
  document.querySelectorAll('.goto-q-btn').forEach(btn => {
    btn.onclick = () => {
      currentQuestionIndex = parseInt(btn.getAttribute('data-goto-q'), 10);
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderAssessmentQuiz(currentUser);
      bindAssessmentEvents(currentUser);
    };
  });

  // Prev / Next
  const prevBtn = document.getElementById('prev-q-btn');
  const nextBtn = document.getElementById('next-q-btn');
  if (prevBtn) {
    prevBtn.onclick = () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        const rerender = document.getElementById('main-content');
        if (rerender) rerender.innerHTML = renderAssessmentQuiz(currentUser);
        bindAssessmentEvents(currentUser);
      }
    };
  }
  if (nextBtn) {
    nextBtn.onclick = () => {
      const quiz = Storage.getQuiz(activeQuizId);
      if (currentQuestionIndex < quiz.questions.length - 1) {
        currentQuestionIndex++;
        const rerender = document.getElementById('main-content');
        if (rerender) rerender.innerHTML = renderAssessmentQuiz(currentUser);
        bindAssessmentEvents(currentUser);
      }
    };
  }

  // Submit Quiz
  const submitBtn = document.getElementById('submit-quiz-btn');
  if (submitBtn) {
    submitBtn.onclick = () => {
      if (confirm('Submit this assessment for auto-scoring?')) {
        submitActiveQuiz(currentUser);
      }
    };
  }

  // Close Results
  const closeResultsBtn = document.getElementById('close-results-btn');
  if (closeResultsBtn) {
    closeResultsBtn.onclick = () => {
      quizResult = null;
      activeQuizId = null;
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderAssessmentQuiz(currentUser);
      bindAssessmentEvents(currentUser);
    };
  }

  // Retake
  const retakeBtn = document.getElementById('retake-quiz-btn');
  if (retakeBtn) {
    retakeBtn.onclick = () => {
      const qId = retakeBtn.getAttribute('data-qid');
      quizResult = null;
      activeQuizId = qId;
      currentQuestionIndex = 0;
      userAnswers = {};
      const quiz = Storage.getQuiz(qId);
      secondsRemaining = quiz.timeLimitMinutes * 60;
      const rerender = document.getElementById('main-content');
      if (rerender) rerender.innerHTML = renderAssessmentQuiz(currentUser);
      bindAssessmentEvents(currentUser);
    };
  }

  // Certificate modal
  document.querySelectorAll('.open-cert-btn').forEach(btn => {
    btn.onclick = () => {
      const courseId = btn.getAttribute('data-cert-course');
      if (window.openCertificateModal) {
        window.openCertificateModal(courseId);
      }
    };
  });
}

function submitActiveQuiz(currentUser) {
  if (timerInterval) clearInterval(timerInterval);
  const quiz = Storage.getQuiz(activeQuizId);
  const course = Storage.getCourse(quiz.courseId);

  let correctCount = 0;
  quiz.questions.forEach(q => {
    if (userAnswers[q.id] === q.correctOptionIndex) {
      correctCount++;
    }
  });

  const score = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = score >= quiz.passingScorePercent;
  const timeSpent = (quiz.timeLimitMinutes * 60) - secondsRemaining;

  const attempt = Storage.submitQuizAttempt({
    userId: currentUser.id,
    userName: currentUser.name,
    quizId: quiz.id,
    courseId: quiz.courseId,
    courseTitle: course ? course.title : quiz.title,
    score,
    passed,
    timeSpentSeconds: timeSpent
  });

  quizResult = {
    quizId: quiz.id,
    score,
    passed,
    correctCount,
    timeSpentSeconds: timeSpent,
    answers: { ...userAnswers }
  };

  if (passed) {
    launchConfetti();
    showToast(`🎉 Outstanding! You passed with ${score}%!`, 'success');
  } else {
    showToast(`Score: ${score}%. Minimum passing mark is ${quiz.passingScorePercent}%. You can review explanations and retake.`, 'warning');
  }

  const rerender = document.getElementById('main-content');
  if (rerender) rerender.innerHTML = renderAssessmentQuiz(currentUser);
  bindAssessmentEvents(currentUser);
}
