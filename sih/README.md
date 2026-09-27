# CAPACITY CONNECT — Digital Capacity Building & Learning Management Portal
> **Smart India Hackathon (SIH 2026) Working Prototype**
>
> *"A role-based Learning Management System that unifies course delivery, skill assessment, competency mapping, and organizational learning analytics on a single scalable, secure, and device-agnostic platform."*

---

## 🏛️ Executive Summary

Modern enterprise and government departments face severe skill gaps, training fragmentation, and unmapped faculty allocation. **CAPACITY CONNECT** bridges this gap by unifying:
1. **Trainee Empowerment**: Seamless course discovery, progress tracking, interactive multimedia lessons, timed MCQ competency exams with auto-scoring, and verifiable certificates.
2. **Trainer Productivity**: Rapid course & syllabus authoring, MCQ assessment builder with explanations, cross-course reusable **Unified Trainer Library**, and cohort participation monitoring.
3. **Superadmin Oversight & Innovation**: Real-time Chart.js organizational analytics, role approvals workflow (RBAC), and our proprietary **Competency Mapping Engine** that algorithmically matches best-fit trainers to subjects based on skill-tag similarity and experience weighting.

---

## 🚀 How to Run the Prototype

No Node/npm installations or external compilation steps are required. The prototype is completely self-contained.

### Option A: 1-Click Launch via Python Server (Recommended)
Double-click `start.bat` or run in terminal:
```powershell
python run_server.py
```
This starts an HTTP server at `http://localhost:8000` and automatically opens your default browser.

### Option B: Direct Browser Launch
Simply double-click `index.html` to open directly in Chrome, Edge, Brave, or Firefox.

---

## 🏆 SIH Jury Presentation Walkthrough (3-Minute Script)

During evaluation rounds, use the built-in **Demo Switcher** at the top of the interface:

### 1. The Hook & Problem (30 Seconds)
- Open the built-in **SIH Pitch Deck** by clicking the **"🎤 SIH Pitch Deck"** button on the navbar.
- Present Slide 1 & 2: Explain how public departments lack unified competency tracking and how trainer skills are under-utilized.

### 2. Trainee Perspective — Rahul Sharma (60 Seconds)
- Switch to **🧑🎓 Trainee** persona.
- Show the **Dashboard**: Learning streak, gamified badges (e.g. "Assessment Ace"), enrolled modules.
- Navigate to **Course Catalog**: Filter by domain, inspect syllabus modal, click **Enroll Now**.
- Navigate to **My Learning**: Launch interactive video lecture/handbook, click **Mark Lesson Done** (progress bar updates to 100%).
- Navigate to **MCQ Assessments**: Launch timed examination. Answer questions, inspect live countdown timer, submit for **instant scoring & explanation breakdown**.
- Click **View Verifiable Certificate**: Showcase the high-resolution certificate with student name, course title, verification ID (`CERT-GOV-2026-8941`), and digital QR code. Click **Print / Save as PDF**.

### 3. Trainer Perspective — Dr. Priya Nair (45 Seconds)
- Switch to **👨🏫 Trainer** persona.
- Show **Trainer Overview**: Mentored learners count, course pass rates, assigned subjects.
- Click **Create Course**: Showcase the rapid course authoring wizard with dynamic curriculum modules.
- Click **Trainer Resource Library**: Showcase the **Unified Trainer Library** — tagged lectures and PDFs reusable across courses. Upload an asset via drag-and-drop simulation.
- Click **Trainee Participation Logs**: Search attempt records and click **Export Report (CSV)**.

### 4. Super Admin Perspective — Rajesh Kumar (45 Seconds)
- Switch to **🛠️ Super Admin** persona.
- Showcase **Analytics & KPIs**: Dynamic Chart.js visualizations (Monthly Participation Trends, Department Enrollment Share, Assessment Pass Rates).
- Navigate to **User Approvals**: Approve pending candidate applications with 1 click.
- Navigate to **Competency Mapping Engine (Key Differentiator)**:
  - Select an unassigned subject (e.g. `Applied AI Ethics & Algorithmic Governance`).
  - Demonstrate the algorithmic matching: Jaccard similarity score (`92% Match`), matching skills in green, missing skills in red.
  - Click **⚡ Assign to Lead Subject** — watch the system immediately assign the trainer and log the event to the **Audit Trail**.
- Navigate to **Publish Announcements**: Broadcast a system alert to all trainees.

---

## 🏗️ High-Level System Architecture

```
[ Trainee / Trainer / Admin Web & PWA Client ]
                    │
            (HTTPS / REST API / PWA Offline Cache)
                    │
         ┌──────────▼───────────┐
         │   API Gateway & RBAC │ → JWT Auth, Role-Based Route Guard
         └──────────┬───────────┘
                    │
   ┌────────────────┼────────────────┐
   │                │                │
┌──▼───────────┐ ┌──▼───────────┐ ┌──▼────────────┐
│ Course &     │ │ MCQ          │ │ Competency    │
│ Streaming    │ │ Assessment   │ │ Mapping       │
│ Service      │ │ Engine       │ │ Engine        │
└──┬───────────┘ └──┬───────────┘ └──┬────────────┘
   │                │                │
   └────────────────┼────────────────┘
                    │
         ┌──────────▼───────────┐
         │ PostgreSQL / MongoDB │ (Master Data, Attempts, Roster)
         └──────────┬───────────┘
                    │
         ┌──────────▼───────────┐
         │ Cloud Storage S3     │ (Lectures, PDFs, Certificates)
         └──────────────────────┘
```

---

## 🌟 Key Differentiators for Hackathon Judges

1. **Competency Mapping Engine**: Auto-matches certified faculty to syllabus requirements using:
   $$\text{Score} = \left(\frac{|\text{Trainer Skills} \cap \text{Required Skills}|}{|\text{Required Skills}|} \times 85\%\right) + (\text{Experience Factor} \times 15\%)$$
2. **Unified Trainer Library**: Eliminates resource duplication by allowing trainers to curate and tag media reusable across multiple departmental courses.
3. **Verifiable Certificates with Anti-Fraud QR**: Generates print-ready official certificates with unique alphanumeric codes and verification hashes.
4. **Interactive Timed MCQ Engine**: Real-time timer countdown, auto-submission on timeout, and question-by-question educational rationale.
5. **Device-Agnostic PWA**: Installable on tablets, smartphones, and low-bandwidth government terminals without app store dependencies.

---

## 🛠️ Tech Stack Specification

| Component | Technology | Enterprise Advantage |
|---|---|---|
| **Frontend UI** | Modern Modular ES6 / React Architecture | Zero build-dependency friction, instant rendering |
| **Styling** | Tailwind CSS + Custom Design Tokens | Polished government/enterprise corporate aesthetic |
| **Visual Analytics** | Chart.js 4.x | Interactive trend lines, doughnut distributions, pass rate bars |
| **State Persistence** | Reactive LocalStorage Pub-Sub | Real-time cross-persona state synchronization |
| **Special FX** | Canvas Confetti Engine | Gamified celebrations upon passing assessments |
| **Offline / PWA** | Web App Manifest & Service Worker | Operates on low-connectivity networks |
| **Runtime** | Python HTTP Server / Static HTTP | 100% portable on any workstation |

---

## 👥 Master Demonstration Personas

| Role | Persona Name | Designation & Credentials | Key Tasks to Showcase |
|---|---|---|---|
| **🧑🎓 Trainee** | Rahul Sharma | Systems Analyst, Dept. of IT | Course enrollment, video lessons, timed quiz, certificate download |
| **👨🏫 Trainer** | Dr. Priya Nair | Ph.D., Principal Cloud Faculty | Course authoring, questionnaire builder, unified library upload |
| **🛠️ Admin** | Rajesh Kumar | Chief Capacity Development Officer | Chart.js analytics, user approvals, competency mapping engine |
