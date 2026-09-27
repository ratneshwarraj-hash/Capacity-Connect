// CAPACITY CONNECT - Storage & Reactive State Manager
import { INITIAL_DATA } from './mockData.js';

const STORAGE_KEY = 'capacity_connect_db_v1';
const SESSION_KEY = 'capacity_connect_session_v1';

class StorageManager {
  constructor() {
    this.listeners = [];
    this.init();
  }

  init() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
        this.save();
      } else {
        this.data = JSON.parse(existing);
      }

      // Ensure active user session exists
      const sessionUser = localStorage.getItem(SESSION_KEY);
      if (!sessionUser || !this.getUser(sessionUser)) {
        this.setSession('usr_trainee_1'); // Default to Demo Trainee
      }
    } catch (err) {
      console.warn('LocalStorage error, using memory fallback:', err);
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => {
      try { cb(this.data); } catch (e) { console.error('Listener callback error', e); }
    });
  }

  // Session Management
  getCurrentUserId() {
    return localStorage.getItem(SESSION_KEY) || 'usr_trainee_1';
  }

  getCurrentUser() {
    const id = this.getCurrentUserId();
    return this.getUser(id) || this.data.users[0];
  }

  setSession(userId) {
    localStorage.setItem(SESSION_KEY, userId);
    this.notify();
  }

  switchRole(role) {
    // Quick-switch between standard demo personas
    let target = this.data.users.find(u => u.role === role && u.status === 'approved');
    if (!target) {
      if (role === 'trainee') target = this.data.users[0];
      else if (role === 'trainer') target = this.data.users.find(u => u.role === 'trainer');
      else if (role === 'admin') target = this.data.users.find(u => u.role === 'admin');
    }
    if (target) {
      this.setSession(target.id);
      this.logAudit(target.name, target.role, 'Role Session Switch', `Switched active demo persona to ${target.name} (${role})`);
    }
  }

  // Users
  getUsers() {
    return this.data.users;
  }

  getUser(userId) {
    return this.data.users.find(u => u.id === userId);
  }

  registerUser(userData) {
    const newUser = {
      id: 'usr_' + Date.now(),
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
      enrolledCourses: [],
      completedCourses: [],
      courseProgress: {},
      badges: [{ id: 'b_new', title: 'New Member', icon: '🌟', desc: 'Registered on Capacity Connect' }],
      ...userData
    };
    this.data.users.push(newUser);
    this.logAudit(newUser.name, 'guest', 'New User Registration', `Registered as ${newUser.role}, awaiting admin approval`);
    this.save();
    return newUser;
  }

  approveUser(userId, roleOverride = null) {
    const user = this.getUser(userId);
    if (user) {
      user.status = 'approved';
      if (roleOverride) user.role = roleOverride;
      this.logAudit('Admin (Rajesh Kumar)', 'admin', 'User Approved', `Approved account for ${user.name} as ${user.role}`);
      this.save();
    }
  }

  rejectUser(userId) {
    const idx = this.data.users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      const userName = this.data.users[idx].name;
      this.data.users.splice(idx, 1);
      this.logAudit('Admin (Rajesh Kumar)', 'admin', 'User Rejected', `Rejected and removed application for ${userName}`);
      this.save();
    }
  }

  updateUserProfile(userId, profileData) {
    const user = this.getUser(userId);
    if (user) {
      Object.assign(user, profileData);
      this.logAudit(user.name, user.role, 'Profile Updated', `Updated competency skills and qualifications`);
      this.save();
    }
  }

  // Courses
  getCourses() {
    return this.data.courses;
  }

  getCourse(courseId) {
    return this.data.courses.find(c => c.id === courseId);
  }

  enrollCourse(courseId, userId = null) {
    const uId = userId || this.getCurrentUserId();
    const user = this.getUser(uId);
    const course = this.getCourse(courseId);
    if (!user || !course) return false;

    if (!user.enrolledCourses) user.enrolledCourses = [];
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      if (!user.courseProgress) user.courseProgress = {};
      user.courseProgress[courseId] = {
        completedModules: [],
        progress: 0,
        lastAccessed: new Date().toISOString().split('T')[0]
      };
      course.enrolledCount = (course.enrolledCount || 0) + 1;
      this.logAudit(user.name, user.role, 'Course Enrollment', `Enrolled in "${course.title}"`);
      this.save();
      return true;
    }
    return false;
  }

  updateCourseProgress(courseId, moduleId, userId = null) {
    const uId = userId || this.getCurrentUserId();
    const user = this.getUser(uId);
    const course = this.getCourse(courseId);
    if (!user || !course) return;

    if (!user.courseProgress) user.courseProgress = {};
    if (!user.courseProgress[courseId]) {
      user.courseProgress[courseId] = { completedModules: [], progress: 0 };
    }

    const cp = user.courseProgress[courseId];
    if (!cp.completedModules.includes(moduleId)) {
      cp.completedModules.push(moduleId);
      const totalModules = (course.modules && course.modules.length) || 4;
      cp.progress = Math.min(100, Math.round((cp.completedModules.length / totalModules) * 100));
      cp.lastAccessed = new Date().toISOString().split('T')[0];

      if (cp.progress === 100 && (!user.completedCourses || !user.completedCourses.includes(courseId))) {
        if (!user.completedCourses) user.completedCourses = [];
        user.completedCourses.push(courseId);
        cp.completedDate = new Date().toISOString().split('T')[0];
        cp.certificateId = `CERT-${course.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
        this.logAudit(user.name, user.role, 'Course Completed', `Completed all modules for "${course.title}"`);
      }
      this.save();
    }
  }

  createCourse(courseData) {
    const newCourse = {
      id: 'crs_' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      enrolledCount: 0,
      modules: [
        { id: 1, title: '1. Foundation Principles & Overview', type: 'video', duration: '35 mins' },
        { id: 2, title: '2. Implementation Guide & Frameworks', type: 'pdf', duration: '40 mins' },
        { id: 3, title: '3. Real-world Case Studies', type: 'slides', duration: '45 mins' }
      ],
      ...courseData
    };
    this.data.courses.unshift(newCourse);
    this.logAudit(newCourse.trainerName, 'trainer', 'Course Created', `Published new course "${newCourse.title}"`);
    this.save();
    return newCourse;
  }

  // Quizzes & Assessments
  getQuizzes() {
    return this.data.quizzes;
  }

  getQuiz(quizId) {
    return this.data.quizzes[quizId];
  }

  createQuiz(quizData) {
    const id = 'q_' + (quizData.courseId || ('custom_' + Date.now()));
    this.data.quizzes[id] = {
      id,
      ...quizData
    };
    // Link to course if exists
    const course = this.getCourse(quizData.courseId);
    if (course) {
      course.quizId = id;
    }
    this.logAudit(this.getCurrentUser().name, 'trainer', 'Assessment Created', `Created assessment "${quizData.title}"`);
    this.save();
    return this.data.quizzes[id];
  }

  submitQuizAttempt(attemptData) {
    const attempt = {
      id: 'att_' + Date.now(),
      date: new Date().toLocaleString(),
      ...attemptData
    };
    this.data.quizAttempts.unshift(attempt);

    // If passed, grant Course completion / badge if not already
    const user = this.getUser(attempt.userId);
    const course = this.getCourse(attempt.courseId);
    if (user && attempt.passed) {
      if (!user.completedCourses) user.completedCourses = [];
      if (!user.completedCourses.includes(attempt.courseId)) {
        user.completedCourses.push(attempt.courseId);
      }
      if (!user.courseProgress) user.courseProgress = {};
      if (!user.courseProgress[attempt.courseId]) {
        user.courseProgress[attempt.courseId] = { completedModules: [1, 2, 3, 4], progress: 100 };
      } else {
        user.courseProgress[attempt.courseId].progress = 100;
      }
      user.courseProgress[attempt.courseId].certificateId = `CERT-GOV-${Date.now().toString().slice(-6)}`;
      user.courseProgress[attempt.courseId].completedDate = new Date().toISOString().split('T')[0];
    }

    this.logAudit(attempt.userName, 'trainee', 'Assessment Submitted', `Scored ${attempt.score}% on ${attempt.courseTitle || 'Assessment'}`);
    this.save();
    return attempt;
  }

  getQuizAttempts(userId = null) {
    if (userId) {
      return this.data.quizAttempts.filter(a => a.userId === userId);
    }
    return this.data.quizAttempts;
  }

  // Trainer Library
  getLibrary() {
    return this.data.library;
  }

  addLibraryItem(item) {
    const newItem = {
      id: 'lib_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      downloads: 0,
      ...item
    };
    this.data.library.unshift(newItem);
    this.logAudit(newItem.uploaderName, 'trainer', 'Library Asset Uploaded', `Added "${newItem.title}" (${newItem.type}) to Trainer Library`);
    this.save();
    return newItem;
  }

  // Subjects & Competency Mapping
  getSubjects() {
    return this.data.subjects;
  }

  assignTrainerToSubject(subjectId, trainerId) {
    const subject = this.data.subjects.find(s => s.id === subjectId);
    const trainer = this.getUser(trainerId);
    if (subject && trainer) {
      subject.assignedTrainerId = trainerId;
      if (!trainer.handledSubjects) trainer.handledSubjects = [];
      if (!trainer.handledSubjects.includes(subject.name)) {
        trainer.handledSubjects.push(subject.name);
      }
      this.logAudit('Admin (Rajesh Kumar)', 'admin', 'Competency Mapping Assignment', `Assigned ${trainer.name} to lead subject "${subject.name}" based on skill match`);
      this.save();
      return true;
    }
    return false;
  }

  // Announcements
  getAnnouncements(targetRole = null) {
    const all = this.data.announcements;
    if (!targetRole || targetRole === 'all') return all;
    return all.filter(a => a.targetRole === 'all' || a.targetRole === targetRole);
  }

  publishAnnouncement(announcement) {
    const newAnn = {
      id: 'ann_' + Date.now(),
      date: new Date().toLocaleString(),
      ...announcement
    };
    this.data.announcements.unshift(newAnn);
    this.logAudit(newAnn.author, 'admin', 'Announcement Published', `Published: "${newAnn.title}" for audience: ${newAnn.targetRole}`);
    this.save();
    return newAnn;
  }

  // Feedback
  submitFeedback(feedback) {
    const newFb = {
      id: 'fb_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...feedback
    };
    this.data.feedback.unshift(newFb);
    this.logAudit(newFb.userName, 'trainee', 'Course Feedback Submitted', `Rated ${newFb.courseTitle} ${newFb.rating} Stars`);
    this.save();
    return newFb;
  }

  getFeedback() {
    return this.data.feedback;
  }

  // Audit Logs
  logAudit(user, role, action, details) {
    const newLog = {
      id: 'log_' + Date.now(),
      timestamp: new Date().toLocaleString(),
      user: user || 'System',
      role: role || 'system',
      action: action,
      details: details,
      ip: '10.0.' + Math.floor(Math.random() * 20) + '.' + Math.floor(Math.random() * 250)
    };
    this.data.auditLogs.unshift(newLog);
    if (this.data.auditLogs.length > 60) this.data.auditLogs.pop();
  }

  getAuditLogs() {
    return this.data.auditLogs;
  }

  // Reset demo state
  resetToInitial() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.setSession('usr_trainee_1');
    this.save();
  }
}

export const Storage = new StorageManager();
