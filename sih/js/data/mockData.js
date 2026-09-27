// CAPACITY CONNECT - Master Mock Data Store

export const INITIAL_DATA = {
  // Master Users
  users: [
    {
      id: "usr_trainee_1",
      name: "Rahul Sharma",
      email: "rahul.sharma@org.gov.in",
      role: "trainee",
      status: "approved",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      department: "Dept. of Information Technology",
      designation: "Systems Analyst & Trainee",
      qualification: "B.Tech in Computer Science & Engineering",
      experience: "2 Years in Enterprise IT Infrastructure",
      skills: ["Cyber Security", "Network Defense", "Incident Response", "Python", "Linux System Administration"],
      interests: ["Cloud Security", "Ethical Hacking", "AI Governance"],
      certificates: [
        { name: "Certified Ethical Hacker (CEH v12)", issuer: "EC-Council", date: "2024-03-15" },
        { name: "CompTIA Security+ Certification", issuer: "CompTIA", date: "2023-11-20" }
      ],
      enrolledCourses: ["crs_1", "crs_2"],
      completedCourses: ["crs_2"],
      courseProgress: {
        "crs_1": { completedModules: [1, 2], progress: 50, lastAccessed: "2026-09-08" },
        "crs_2": { completedModules: [1, 2, 3, 4], progress: 100, lastAccessed: "2026-09-04", completedDate: "2026-09-05", certificateId: "CERT-GOV-2026-8941" }
      },
      badges: [
        { id: "b1", title: "Early Adopter", icon: "🚀", desc: "Enrolled in inaugural capacity cohort" },
        { id: "b2", title: "Assessment Ace", icon: "🏆", desc: "Scored 90%+ on Digital Governance Quiz" },
        { id: "b3", title: "Streak Master", icon: "🔥", desc: "7 consecutive days of active learning" }
      ]
    },
    {
      id: "usr_trainer_1",
      name: "Dr. Priya Nair",
      email: "priya.nair@org.gov.in",
      role: "trainer",
      status: "approved",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      department: "Center for Cloud & Information Systems",
      designation: "Principal Technical Trainer & Cloud Architect",
      qualification: "Ph.D. in Network Security, IIT Bombay",
      experience: "11 Years",
      skills: ["Cloud Infrastructure", "AWS", "Kubernetes", "Cyber Security", "DevOps", "Microservices", "Distributed Systems"],
      handledSubjects: ["Multi-Cloud Governance & Security", "Cyber Threat Intelligence & Incident Response"],
      coursesAuthored: ["crs_1", "crs_3"],
      rating: 4.9,
      learnersMentored: 340
    },
    {
      id: "usr_trainer_2",
      name: "Amitav Sen",
      email: "amitav.sen@org.gov.in",
      role: "trainer",
      status: "approved",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      department: "Public Policy & Analytics Wing",
      designation: "Senior Data Scientist & Capacity Consultant",
      qualification: "M.Stat, Indian Statistical Institute",
      experience: "8 Years",
      skills: ["Data Analytics", "Python", "Machine Learning", "Public Policy", "Tableau", "Statistical Modeling"],
      handledSubjects: ["Big Data & Predictive Policy Modeling"],
      coursesAuthored: ["crs_4"],
      rating: 4.8,
      learnersMentored: 285
    },
    {
      id: "usr_trainer_3",
      name: "Sunita Deshmukh",
      email: "sunita.deshmukh@org.gov.in",
      role: "trainer",
      status: "approved",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      department: "Governance & Administrative Reforms",
      designation: "Director of Capacity Building Programs",
      qualification: "Master of Public Administration, Harvard Kennedy School",
      experience: "15 Years",
      skills: ["Digital Governance", "Citizen Service Delivery", "e-Office", "RTI Compliance", "Public Administration", "Policy Drafting"],
      handledSubjects: ["Next-Gen Citizen e-Services & e-Office"],
      coursesAuthored: ["crs_2", "crs_5"],
      rating: 4.95,
      learnersMentored: 520
    },
    {
      id: "usr_admin_1",
      name: "Rajesh Kumar",
      email: "admin@capacityconnect.gov.in",
      role: "admin",
      status: "approved",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      department: "Central Human Resource & Capacity Development",
      designation: "Chief Capacity Development Officer & Portal Superadmin",
      qualification: "IAS (Retd.), M.Tech & MBA",
      experience: "22 Years in Administrative Systems"
    },
    // Pending approvals to showcase Admin User Approval Workflow
    {
      id: "usr_pending_1",
      name: "Ananya Verma",
      email: "ananya.verma@gov.in",
      role: "trainer",
      status: "pending",
      department: "Cyber Defense Group",
      appliedDate: "2026-09-09",
      designation: "Lead Security Auditor",
      qualification: "M.Tech Cybersecurity",
      experience: "6 Years",
      skills: ["Penetration Testing", "Incident Response", "Network Forensics", "Zero Trust Architecture"]
    },
    {
      id: "usr_pending_2",
      name: "Vikramaditya Rathore",
      email: "v.rathore@revenue.gov.in",
      role: "trainee",
      status: "pending",
      department: "Revenue & Commercial Taxes",
      appliedDate: "2026-09-10",
      designation: "Commercial Tax Officer",
      qualification: "B.Com, Chartered Accountant",
      experience: "3 Years",
      skills: ["Financial Audit", "SAP ERP", "Tax Analytics", "Excel Advanced"]
    }
  ],

  // Course Catalog
  courses: [
    {
      id: "crs_1",
      title: "Enterprise Cyber Security & Threat Mitigation",
      trainerId: "usr_trainer_1",
      trainerName: "Dr. Priya Nair",
      category: "Cyber Security",
      department: "Information Technology",
      level: "Intermediate",
      duration: "24 Hours (4 Weeks)",
      rating: 4.9,
      reviewsCount: 84,
      enrolledCount: 142,
      banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
      description: "Master modern enterprise defenses against cyber attacks, threat vectors, zero-trust architectures, and incident response standard operating procedures for public and private sector IT operations.",
      skillsTaught: ["Network Defense", "Threat Hunting", "Incident Response", "SIEM Tools", "Zero Trust Architecture"],
      modules: [
        { id: 1, title: "1. Enterprise Threat Landscape & Attack Vectors", type: "video", duration: "45 mins", mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
        { id: 2, title: "2. Zero Trust Architecture Implementation Framework", type: "pdf", duration: "30 mins", mediaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { id: 3, title: "3. SIEM Log Analysis & Threat Intelligence Gathering", type: "slides", duration: "60 mins", mediaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { id: 4, title: "4. Incident Containment, Forensic Triage & Recovery", type: "video", duration: "50 mins", mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
      ],
      quizId: "q_crs_1"
    },
    {
      id: "crs_2",
      title: "Digital Governance & Citizen Service Delivery",
      trainerId: "usr_trainer_3",
      trainerName: "Sunita Deshmukh",
      category: "Governance",
      department: "Administrative Reforms",
      level: "Beginner",
      duration: "18 Hours (3 Weeks)",
      rating: 4.95,
      reviewsCount: 120,
      enrolledCount: 230,
      banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      description: "Designed for civil servants, administrators, and tech staff to implement streamlined digital delivery systems, e-Office workflows, citizen grievance redressal, and transparent digital public infrastructure.",
      skillsTaught: ["Digital Governance", "Citizen Service Delivery", "e-Office", "Public Administration", "Process Re-engineering"],
      modules: [
        { id: 1, title: "1. Principles of Digital Public Infrastructure (DPI)", type: "video", duration: "40 mins" },
        { id: 2, title: "2. e-Office Automation & File Tracking Mechanics", type: "pdf", duration: "35 mins" },
        { id: 3, title: "3. Citizen Grievance Redressal Mechanisms (CPGRAMS model)", type: "slides", duration: "45 mins" },
        { id: 4, title: "4. Data Privacy, RTI Compliance & Ethical Digital Governance", type: "video", duration: "55 mins" }
      ],
      quizId: "q_crs_2"
    },
    {
      id: "crs_3",
      title: "Cloud Infrastructure & Microservices Architecture",
      trainerId: "usr_trainer_1",
      trainerName: "Dr. Priya Nair",
      category: "Cloud & DevOps",
      department: "Information Technology",
      level: "Advanced",
      duration: "32 Hours (5 Weeks)",
      rating: 4.92,
      reviewsCount: 62,
      enrolledCount: 98,
      banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      description: "In-depth hands-on course covering resilient cloud architecture, containerization with Docker & Kubernetes, CI/CD pipeline automation, and high-availability cloud governance.",
      skillsTaught: ["Cloud Infrastructure", "AWS", "Kubernetes", "DevOps", "Microservices"],
      modules: [
        { id: 1, title: "1. Cloud Foundations & Multi-Tier Architecture", type: "video", duration: "50 mins" },
        { id: 2, title: "2. Containerization with Docker & Orchestration with K8s", type: "video", duration: "75 mins" },
        { id: 3, title: "3. Service Meshes, API Gateways & Secure Ingress", type: "slides", duration: "45 mins" },
        { id: 4, title: "4. Cloud Cost Optimization & Disaster Recovery Planning", type: "pdf", duration: "40 mins" }
      ],
      quizId: "q_crs_3"
    },
    {
      id: "crs_4",
      title: "Data Analytics for Public Policy & Decision Support",
      trainerId: "usr_trainer_2",
      trainerName: "Amitav Sen",
      category: "Data & AI",
      department: "Public Policy",
      level: "Intermediate",
      duration: "20 Hours (3 Weeks)",
      rating: 4.78,
      reviewsCount: 95,
      enrolledCount: 185,
      banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      description: "Empower decision-makers with practical data science: statistical forecasting, public expenditure evaluation, spatial GIS mapping, and executive dashboard communication.",
      skillsTaught: ["Data Analytics", "Python", "Statistical Modeling", "Tableau", "Public Policy"],
      modules: [
        { id: 1, title: "1. Data-Driven Governance: Frameworks & Real Cases", type: "video", duration: "45 mins" },
        { id: 2, title: "2. Exploratory Data Analysis & Descriptive Statistics", type: "pdf", duration: "50 mins" },
        { id: 3, title: "3. Visualizing Policy Impact with Interactive Dashboards", type: "slides", duration: "40 mins" },
        { id: 4, title: "4. Predictive Modeling for Scheme Budget Allocation", type: "video", duration: "60 mins" }
      ],
      quizId: "q_crs_4"
    },
    {
      id: "crs_5",
      title: "AI & Automation in Public Administration",
      trainerId: "usr_trainer_3",
      trainerName: "Sunita Deshmukh",
      category: "Data & AI",
      department: "Administrative Reforms",
      level: "Beginner",
      duration: "16 Hours (2 Weeks)",
      rating: 4.85,
      reviewsCount: 40,
      enrolledCount: 110,
      banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      description: "Demystify Generative AI, chatbots for citizen inquiries, automated document summarization, and ethical compliance guidelines under the National AI Strategy.",
      skillsTaught: ["AI Governance", "Public Administration", "Automation", "Ethics in AI"],
      modules: [
        { id: 1, title: "1. Demystifying Artificial Intelligence & Large Language Models", type: "video", duration: "45 mins" },
        { id: 2, title: "2. Citizen Service Chatbots & Voice Assistants", type: "pdf", duration: "30 mins" },
        { id: 3, title: "3. Robotic Process Automation (RPA) in Government Departments", type: "slides", duration: "45 mins" }
      ],
      quizId: "q_crs_5"
    }
  ],

  // Subjects requiring Competency Mapping (For Admin Engine)
  subjects: [
    {
      id: "subj_1",
      code: "SEC-401",
      name: "Cyber Threat Intelligence & Incident Response",
      department: "Information Technology",
      assignedTrainerId: "usr_trainer_1",
      requiredSkills: ["Cyber Security", "Network Defense", "Incident Response", "Penetration Testing", "Network Forensics"],
      minExperienceYears: 5,
      annualTargetBatches: 6,
      currentEnrolledTrainees: 85
    },
    {
      id: "subj_2",
      code: "CLD-502",
      name: "Multi-Cloud Governance & Security",
      department: "Information Technology",
      assignedTrainerId: "usr_trainer_1",
      requiredSkills: ["Cloud Infrastructure", "AWS", "Kubernetes", "Cyber Security", "DevOps"],
      minExperienceYears: 6,
      annualTargetBatches: 4,
      currentEnrolledTrainees: 62
    },
    {
      id: "subj_3",
      code: "DAT-303",
      name: "Big Data & Predictive Policy Modeling",
      department: "Public Policy & Analytics",
      assignedTrainerId: "usr_trainer_2",
      requiredSkills: ["Data Analytics", "Python", "Machine Learning", "Statistical Modeling", "Tableau"],
      minExperienceYears: 4,
      annualTargetBatches: 5,
      currentEnrolledTrainees: 110
    },
    {
      id: "subj_4",
      code: "GOV-104",
      name: "Next-Gen Citizen e-Services & e-Office",
      department: "Administrative Reforms",
      assignedTrainerId: "usr_trainer_3",
      requiredSkills: ["Digital Governance", "Citizen Service Delivery", "e-Office", "Public Administration", "Process Re-engineering"],
      minExperienceYears: 7,
      annualTargetBatches: 10,
      currentEnrolledTrainees: 215
    },
    {
      id: "subj_5",
      code: "AI-605",
      name: "Applied AI Ethics & Algorithmic Governance",
      department: "Administrative Reforms",
      assignedTrainerId: null, // UNASSIGNED: Perfect for live SIH demonstration of competency engine!
      requiredSkills: ["AI Governance", "Public Administration", "Machine Learning", "Public Policy", "Ethics in AI"],
      minExperienceYears: 5,
      annualTargetBatches: 3,
      currentEnrolledTrainees: 0
    }
  ],

  // Questionnaires / Quizzes
  quizzes: {
    "q_crs_1": {
      id: "q_crs_1",
      courseId: "crs_1",
      title: "Enterprise Cyber Security Competency Exam",
      timeLimitMinutes: 10,
      passingScorePercent: 70,
      deadline: "2026-09-30",
      questions: [
        {
          id: 1,
          question: "Which of the following best defines the core principle of Zero Trust Architecture?",
          options: [
            "Trust internal network users while verifying external traffic",
            "Never trust, always verify every access request regardless of location",
            "Encrypt only databases containing personally identifiable information",
            "Allow unrestricted access once authenticated via username and password"
          ],
          correctOptionIndex: 1,
          explanation: "Zero Trust treats every user, device, and packet as untrusted and verifies access context continuously before granting access."
        },
        {
          id: 2,
          question: "What is the primary operational role of a Security Information and Event Management (SIEM) system?",
          options: [
            "Automatically compile executable software programs",
            "Centralize, aggregate, and correlate security event logs for threat detection",
            "Generate employee monthly attendance reports",
            "Replace standard network firewall hardware"
          ],
          correctOptionIndex: 1,
          explanation: "SIEM aggregates telemetry and log records from servers, switches, and endpoints to surface anomalous threat patterns."
        },
        {
          id: 3,
          question: "In the cyber attack kill chain, which phase directly follows 'Weaponization'?",
          options: [
            "Reconnaissance",
            "Actions on Objectives",
            "Delivery",
            "Command and Control"
          ],
          correctOptionIndex: 2,
          explanation: "The Lockheed Martin Cyber Kill Chain order is: Reconnaissance -> Weaponization -> Delivery -> Exploitation -> Installation -> C2 -> Actions."
        },
        {
          id: 4,
          question: "What is the immediate priority during the 'Containment' phase of a ransomware incident?",
          options: [
            "Pay the demanded cryptocurrency immediately to prevent disclosure",
            "Isolate infected endpoints from the local network to stop lateral spread",
            "Power off the data center without creating forensic memory dumps",
            "Issue a public press release before confirming incident scope"
          ],
          correctOptionIndex: 1,
          explanation: "Containment focuses on isolating compromised systems from network segments to halt lateral infection propagation."
        },
        {
          id: 5,
          question: "Which hash algorithm provides the strongest collision resistance for cryptographic file integrity verification?",
          options: [
            "MD5",
            "SHA-1",
            "SHA-256",
            "CRC32"
          ],
          correctOptionIndex: 2,
          explanation: "SHA-256 is part of the SHA-2 family and currently resists known collision attacks unlike MD5 and SHA-1."
        }
      ]
    },
    "q_crs_2": {
      id: "q_crs_2",
      courseId: "crs_2",
      title: "Digital Governance & e-Office Certification Quiz",
      timeLimitMinutes: 8,
      passingScorePercent: 70,
      deadline: "2026-09-25",
      questions: [
        {
          id: 1,
          question: "What is the primary benefit of deploying digital e-Office systems over physical file management in government wings?",
          options: [
            "Elimination of all human administrative roles",
            "Auditability, transparent file tracking, and reduced turnaround time",
            "Increased physical paper procurement budgets",
            "Disabling citizen access to public documents"
          ],
          correctOptionIndex: 1,
          explanation: "e-Office enables digital timestamps, movement logs, and paperless processing, accelerating citizen services."
        },
        {
          id: 2,
          question: "Under standard digital citizen service architectures, what does 'Single Sign-On' (SSO) facilitate?",
          options: [
            "Users must log in separately for every government portal",
            "One centralized identity allows access to multiple interrelated civic portals",
            "Citizens can only access services between 9 AM and 5 PM",
            "Data must be re-entered on every government form"
          ],
          correctOptionIndex: 1,
          explanation: "SSO provides a unified credential layer across state and central public service portals."
        },
        {
          id: 3,
          question: "Which indicator is most critical when measuring public grievance redressal efficacy?",
          options: [
            "Number of complaints deleted per week",
            "Average Resolution Time (ART) and Citizen Satisfaction Score",
            "Total bytes of data stored on server hard disks",
            "Number of printed letters mailed"
          ],
          correctOptionIndex: 1,
          explanation: "Resolution velocity and citizen satisfaction reflect genuine administrative responsiveness."
        },
        {
          id: 4,
          question: "What role does Digital Public Infrastructure (DPI) play in inclusive governance?",
          options: [
            "Restricts public services to metropolitan cities only",
            "Provides open, interoperable modular rails (Identity, Payments, Data Exchange) for equitable access",
            "Monopolizes all technological innovations under one foreign vendor",
            "Replaces the Constitution of India with software algorithms"
          ],
          correctOptionIndex: 1,
          explanation: "DPI like Aadhaar, UPI, and DigiLocker forms the foundational digital foundation for public benefit delivery."
        }
      ]
    }
  },

  // Quiz Attempts by Trainees
  quizAttempts: [
    {
      id: "att_1",
      userId: "usr_trainee_1",
      userName: "Rahul Sharma",
      quizId: "q_crs_2",
      courseId: "crs_2",
      courseTitle: "Digital Governance & Citizen Service Delivery",
      score: 100,
      passed: true,
      date: "2026-09-04 14:32",
      timeSpentSeconds: 245
    }
  ],

  // Trainer Unified Resource Library
  library: [
    {
      id: "lib_1",
      title: "Zero Trust Architecture Implementation Playbook (DoE Guidelines)",
      uploaderId: "usr_trainer_1",
      uploaderName: "Dr. Priya Nair",
      type: "pdf",
      size: "4.8 MB",
      date: "2026-08-20",
      tags: ["Cyber Security", "Zero Trust", "Standard Operating Procedure"],
      courseId: "crs_1",
      downloads: 148
    },
    {
      id: "lib_2",
      title: "Recorded Lecture: Mitigating Advanced Persistent Threats (APTs)",
      uploaderId: "usr_trainer_1",
      uploaderName: "Dr. Priya Nair",
      type: "video",
      size: "340 MB",
      date: "2026-08-24",
      tags: ["Cyber Security", "Lecture", "Threat Hunting"],
      courseId: "crs_1",
      downloads: 210
    },
    {
      id: "lib_3",
      title: "e-Office Administrative Manual & Best Practices 2026",
      uploaderId: "usr_trainer_3",
      uploaderName: "Sunita Deshmukh",
      type: "pdf",
      size: "2.1 MB",
      date: "2026-08-15",
      tags: ["Digital Governance", "e-Office", "Manual"],
      courseId: "crs_2",
      downloads: 395
    },
    {
      id: "lib_4",
      title: "Citizen Redressal CPGRAMS Process Flow Deck (PPT)",
      uploaderId: "usr_trainer_3",
      uploaderName: "Sunita Deshmukh",
      type: "slides",
      size: "8.4 MB",
      date: "2026-08-18",
      tags: ["Public Administration", "Grievances", "Presentation"],
      courseId: "crs_2",
      downloads: 270
    },
    {
      id: "lib_5",
      title: "Kubernetes Cluster Hardening & Helm Chart Deployment Guide",
      uploaderId: "usr_trainer_1",
      uploaderName: "Dr. Priya Nair",
      type: "pdf",
      size: "5.6 MB",
      date: "2026-08-28",
      tags: ["Cloud Infrastructure", "Kubernetes", "DevOps"],
      courseId: "crs_3",
      downloads: 88
    },
    {
      id: "lib_6",
      title: "Public Finance Exploratory Data Analysis Template (Jupyter & CSV)",
      uploaderId: "usr_trainer_2",
      uploaderName: "Amitav Sen",
      type: "code",
      size: "3.2 MB",
      date: "2026-09-01",
      tags: ["Data Analytics", "Python", "Public Policy"],
      courseId: "crs_4",
      downloads: 132
    }
  ],

  // Announcements & Notifications
  announcements: [
    {
      id: "ann_1",
      title: "National Digital Capacity Cohort 2026 Registration Now Open",
      content: "All administrative officers and technical staff across state wings are invited to enroll in the newly accredited Cyber Security and Digital Governance modules.",
      priority: "high",
      type: "announcement",
      targetRole: "all",
      date: "2026-09-08 10:00",
      author: "Rajesh Kumar (Admin)"
    },
    {
      id: "ann_2",
      title: "Mandatory Cyber Threat Assessment Deadline: Sept 30",
      content: "Trainees enrolled in Enterprise Cyber Security must complete the Module 4 assessment by September 30 to receive the accredited competency certificate.",
      priority: "urgent",
      type: "alert",
      targetRole: "trainee",
      date: "2026-09-07 16:30",
      author: "Dr. Priya Nair (Trainer)"
    },
    {
      id: "ann_3",
      title: "Trainer Competency Framework V2.4 Released",
      content: "New skill taxonomy mapping now active in the portal. Trainers are requested to verify their updated technical credentials in their profile.",
      priority: "medium",
      type: "update",
      targetRole: "trainer",
      date: "2026-09-05 11:15",
      author: "Rajesh Kumar (Admin)"
    }
  ],

  // Course Feedback
  feedback: [
    {
      id: "fb_1",
      courseId: "crs_2",
      courseTitle: "Digital Governance & Citizen Service Delivery",
      userId: "usr_trainee_1",
      userName: "Rahul Sharma",
      trainerName: "Sunita Deshmukh",
      rating: 5,
      comment: "Incredibly insightful course! The practical breakdown of e-Office file mechanics and DPI principles provided immediate value for our department's ongoing digital transformation.",
      date: "2026-09-05"
    }
  ],

  // Master Categories and Departments
  categories: ["Cyber Security", "Governance", "Cloud & DevOps", "Data & AI", "Public Policy", "Administrative Reforms"],
  departments: [
    "Dept. of Information Technology",
    "Center for Cloud & Information Systems",
    "Public Policy & Analytics Wing",
    "Governance & Administrative Reforms",
    "Central Human Resource & Capacity Development",
    "Revenue & Commercial Taxes"
  ],

  // System Audit Trail
  auditLogs: [
    { id: "log_1", timestamp: "2026-09-10 11:45:12", user: "Rajesh Kumar", role: "admin", action: "User Role Updated", details: "Assigned Trainer role to Dr. Priya Nair", ip: "10.0.12.4" },
    { id: "log_2", timestamp: "2026-09-10 10:20:05", user: "Rahul Sharma", role: "trainee", action: "Quiz Completed", details: "Completed Digital Governance Quiz with 100% Score", ip: "192.168.1.105" },
    { id: "log_3", timestamp: "2026-09-09 16:14:30", user: "Dr. Priya Nair", role: "trainer", action: "Resource Uploaded", details: "Uploaded Zero Trust Architecture Playbook to Trainer Library", ip: "10.0.4.19" },
    { id: "log_4", timestamp: "2026-09-09 09:30:00", user: "Ananya Verma", role: "guest", action: "User Registration", details: "New trainer registration pending administrator approval", ip: "172.16.8.22" },
    { id: "log_5", timestamp: "2026-09-08 14:10:45", user: "Rajesh Kumar", role: "admin", action: "Broadcast Published", details: "Published National Digital Capacity Cohort Announcement", ip: "10.0.12.4" }
  ]
};
