# BLOOM Rebuild — Staged Implementation Plan

**Objective:** Complete, private, personalised CBSE Class XII (2027) preparation companion for Aastha.  
**Standard:** Evidence-driven autonomous loop engineering; zero generic chapter tasks; full Apple Liquid Glass aesthetic.

---

## Stage 1: Repository Audit, Backup & Environment Foundation
- [x] Inspect existing implementation (`Boards Beast`), live server (`http://127.0.0.1:4173`), and desktop screenshots.
- [x] Establish foundational documentation (`DECISION_LOG.md`, `DEFECT_LOG.md`, `DATA_PROVENANCE.md`, `BUILD_PLAN.md`).
- [x] Build completely from scratch in active workspace (`/Users/devanshpatel/Downloads/JEE`).

## Stage 2: Actionable Learning Activity Schema & Sourced Subject Engines
- [x] Define actionable learning activity data schema (`action`, `scope`, `purpose`, `steps[]`, `resourceRefs[]`, `duration`, `completionEvidence`, `understandingCheck`).
- [x] Build subject-specific templates for all 5 subjects:
  - **Physics (042):** Concept reading, formula derivations, numerical problem solving, circuit/ray diagrams, NCERT in-text & back exercises.
  - **Chemistry (043):** Physical numericals, Organic reaction mechanisms & named reactions, Inorganic trends/equations, NCERT exemplars.
  - **Mathematics (041):** Step-by-step theorem/formula review, solved examples, NCERT exercise problem sets, board working style.
  - **English Core (301):** Reading passages, prose/poetry theme & poetic device analysis, creative writing formats (notices, formal letters, articles).
  - **Physical Education (048):** Unit definitions, classification tables, asanas & contraindications, case-based questions, sports record/viva prep.
- [x] Completely eliminate generic "Prepare [chapter]" strings in `planner-engine.ts`.

## Stage 3: Interactive Study Workspace View
- [x] Build dedicated interactive Study Workspace view accessible when clicking any task in Planner or Today.
- [x] Include task metadata, why-this-is-next reason, learning objective, ordered interactive step checklist.
- [x] Resource links / NCERT section viewer.
- [x] Live distraction-free focus timer with pause, checkpoint preservation, and actual duration logging.
- [x] Embedded Mistake & Doubt capture modal.
- [x] Completion check with learner reflection (Easy / Okay / Difficult rating).

## Stage 4: Premium Pink Apple-Inspired Liquid Glass UI & Responsive Layouts
- [x] Refactor CSS with authentic Apple Liquid Glass tokens:
  - Blush canvas (`#FFF5F8`), warm ivory (`#FFF9FA`), light rose (`#F8BBD0`), deep rose (`#D96C9D`), deep plum text (`#493542`).
  - Translucent frosted glass cards (`rgba(255, 255, 255, 0.72)` + `backdrop-filter: blur(24px)`).
  - Subtle top-edge light reflection border (`border: 1px solid rgba(255, 255, 255, 0.85)`).
  - Soft layered shadows (`0 16px 40px -10px rgba(125, 79, 101, 0.08)`).
- [x] iPad touch-first layout (landscape & portrait) with comfortable 44px+ touch targets and generous breathing room.
- [x] Phone compact bottom-bar navigation and responsive card flow.
- [x] Smooth, restrained motion transitions (respecting `prefers-reduced-motion`).

## Stage 5: Conversational First-Login Onboarding & Personalisation
- [x] Multi-step interactive setup collecting Aastha's real routine (wake/sleep, school/tuition time windows, travel).
- [x] Subject difficulty & focus preferences (Physics difficulty acknowledged without assuming weakness across all topics).
- [x] Starting academic status capture (Not started / Learning / Learned / Needs revision) with skip & bulk options.
- [x] Generate first plan proposal requiring explicit confirmation before saving.

## Stage 6: Availability, Revision, Mistake Journal & Backlog Rescue
- [x] Test & verify independent School (yes/no) & Tuition (yes/no) 4-combination availability matrix.
- [x] Revision scheduling based on shared Easy (7d) / Okay (3d) / Difficult (1d) ratings.
- [x] Mistake Journal with root causes and scheduled retry blocks.
- [x] Backlog rescue proposal engine distributing overdue work without guilt or streak punishment.

## Stage 7: Local Test Planner Import & Verification Testing
- [x] Establish test suite covering actionable activities, availability matrix, revision engine, backlog rescue, and Web Crypto vault security (9/9 passing).
- [ ] End-to-end browser walkthrough and verification.
