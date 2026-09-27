// CAPACITY CONNECT - Master Application Controller & Reactive Router
import { Storage } from './data/storage.js';
import { renderNavbar, bindNavbarEvents } from './components/Navbar.js';
import { renderSidebar, bindSidebarEvents } from './components/Sidebar.js';
import { renderAuthModal, bindAuthModalEvents } from './components/AuthModal.js';

// Trainee Components
import { renderTraineeDashboard } from './components/trainee/TraineeDashboard.js';
import { renderCourseCatalog, bindCourseCatalogEvents } from './components/trainee/CourseCatalog.js';
import { renderMyCourses, bindMyCoursesEvents } from './components/trainee/MyCourses.js';
import { renderAssessmentQuiz, bindAssessmentEvents } from './components/trainee/AssessmentQuiz.js';
import { renderTraineeProfile, bindTraineeProfileEvents } from './components/trainee/TraineeProfile.js';
import { renderCertificateModal, bindCertificateModalEvents } from './components/trainee/CertificateModal.js';
import { renderFeedbackModal, bindFeedbackModalEvents } from './components/trainee/FeedbackModal.js';

// Trainer Components
import { renderTrainerDashboard } from './components/trainer/TrainerDashboard.js';
import { renderCourseCreator, bindCourseCreatorEvents } from './components/trainer/CourseCreator.js';
import { renderQuizCreator, bindQuizCreatorEvents } from './components/trainer/QuizCreator.js';
import { renderTrainerLibrary, bindTrainerLibraryEvents } from './components/trainer/TrainerLibrary.js';
import { renderParticipationTracker, bindParticipationTrackerEvents } from './components/trainer/ParticipationTracker.js';

// Admin Components
import { renderAdminDashboard, bindAdminDashboardEvents } from './components/admin/AdminDashboard.js';
import { renderUserApprovals, bindUserApprovalsEvents } from './components/admin/UserApprovals.js';
import { renderCompetencyEngine, bindCompetencyEngineEvents } from './components/admin/CompetencyEngine.js';
import { renderContentPublisher, bindContentPublisherEvents } from './components/admin/ContentPublisher.js';
import { renderAuditLogs, bindAuditLogsEvents } from './components/admin/AuditLogs.js';

// Presentation Deck
import { renderPresentationModal, bindPresentationModalEvents } from './components/common/PresentationModal.js';

function getActiveRoute() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  return hash;
}

export function renderApp() {
  const currentUser = Storage.getCurrentUser();
  let route = getActiveRoute();

  // Normalize dashboard route based on user role
  if (route === 'dashboard') {
    route = `${currentUser.role}-dashboard`;
  }

  // 1. Render Shell: Navbar, Modals
  const navContainer = document.getElementById('navbar-container');
  if (navContainer) {
    navContainer.innerHTML = renderNavbar(currentUser);
    bindNavbarEvents(currentUser);
  }

  const sidebarContainer = document.getElementById('sidebar-wrapper');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = renderSidebar(currentUser, route);
    bindSidebarEvents();
  }

  // 2. Render Main Route Content
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  switch (route) {
    // Trainee Routes
    case 'trainee-dashboard':
      mainContent.innerHTML = renderTraineeDashboard(currentUser);
      break;
    case 'courses':
      mainContent.innerHTML = renderCourseCatalog(currentUser);
      bindCourseCatalogEvents(currentUser);
      break;
    case 'my-courses':
      mainContent.innerHTML = renderMyCourses(currentUser);
      bindMyCoursesEvents(currentUser);
      break;
    case 'assessments':
      mainContent.innerHTML = renderAssessmentQuiz(currentUser);
      bindAssessmentEvents(currentUser);
      break;
    case 'profile':
      mainContent.innerHTML = renderTraineeProfile(currentUser);
      bindTraineeProfileEvents(currentUser);
      break;

    // Trainer Routes
    case 'trainer-dashboard':
      mainContent.innerHTML = renderTrainerDashboard(currentUser);
      break;
    case 'create-course':
      mainContent.innerHTML = renderCourseCreator(currentUser);
      bindCourseCreatorEvents(currentUser);
      break;
    case 'create-quiz':
      mainContent.innerHTML = renderQuizCreator(currentUser);
      bindQuizCreatorEvents(currentUser);
      break;
    case 'trainer-library':
      mainContent.innerHTML = renderTrainerLibrary(currentUser);
      bindTrainerLibraryEvents(currentUser);
      break;
    case 'participation':
      mainContent.innerHTML = renderParticipationTracker(currentUser);
      bindParticipationTrackerEvents(currentUser);
      break;

    // Admin Routes
    case 'admin-dashboard':
      mainContent.innerHTML = renderAdminDashboard(currentUser);
      bindAdminDashboardEvents();
      break;
    case 'user-approvals':
      mainContent.innerHTML = renderUserApprovals(currentUser);
      bindUserApprovalsEvents(currentUser);
      break;
    case 'competency-mapping':
      mainContent.innerHTML = renderCompetencyEngine(currentUser);
      bindCompetencyEngineEvents(currentUser);
      break;
    case 'content-publisher':
      mainContent.innerHTML = renderContentPublisher(currentUser);
      bindContentPublisherEvents(currentUser);
      break;
    case 'audit-logs':
      mainContent.innerHTML = renderAuditLogs(currentUser);
      bindAuditLogsEvents(currentUser);
      break;

    default:
      mainContent.innerHTML = renderTraineeDashboard(currentUser);
      break;
  }

  // 3. Render Persistent Modals
  const authModalContainer = document.getElementById('auth-modal-container');
  if (authModalContainer) {
    authModalContainer.innerHTML = renderAuthModal();
    bindAuthModalEvents();
  }

  const certModalContainer = document.getElementById('certificate-modal-container');
  if (certModalContainer) {
    certModalContainer.innerHTML = renderCertificateModal();
    bindCertificateModalEvents();
  }

  const feedbackModalContainer = document.getElementById('feedback-modal-container');
  if (feedbackModalContainer) {
    feedbackModalContainer.innerHTML = renderFeedbackModal();
    bindFeedbackModalEvents();
  }

  const presModalContainer = document.getElementById('presentation-modal-container');
  if (presModalContainer) {
    presModalContainer.innerHTML = renderPresentationModal();
    bindPresentationModalEvents();
  }

  // Scroll to top of main on route transition
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initial Boot & Event Subscriptions
window.addEventListener('DOMContentLoaded', () => {
  renderApp();

  // Reactive state change listener
  Storage.subscribe(() => {
    renderApp();
  });

  // Route hash change listener
  window.addEventListener('hashchange', () => {
    renderApp();
  });
});
