# BLOOM Rebuild — Test Evidence

**Test Framework:** Node.js native test runner (`node --test tests/*.test.mjs`)  
**Typecheck:** TypeScript 5.9 (`tsc --noEmit`)  
**Bundle & Build:** ESBuild Browser Target ES2022  

---

## Fresh Scratch Rebuild Verification Run (21 November 2026)

- **Architecture:** 100% clean rebuild in this workspace (`/Users/devanshpatel/Downloads/JEE`). Zero legacy code or files reused in place.
- **Academic Scope:** Strictly CBSE Class XII Board Examinations (2027) for Aastha. All JEE material completely excluded.
- **Build & Bundle:** TypeScript (`tsc`) compile + ESBuild browser bundle (`dist/js/app.bundle.js`).
- **Live Server Test:** `http://127.0.0.1:4180` responding with HTTP 200 OK for HTML, bundle, and styles.
- **Unit & Integration Tests:** 9 test suites executed, 9 passed, 0 failed (duration: 146ms).
  - `tests/curriculum.test.mjs`: Verified 5 CBSE board subjects (codes 041, 042, 043, 048, 301), official 2027 board exam dates, and unit-level marks scope (no chapter predictions).
  - `tests/actionable-activities.test.mjs`: Verified all generated tasks are actionable, verb-led, have clear learning objectives, steps, NCERT references, and zero generic "Prepare [chapter]" strings.
  - `tests/availability-matrix.test.mjs`: Verified 4-way independent School/Tuition matrix (960m free, 600m school-only, 720m tuition-only, 360m both) and Sunday tuition-free defaults.
  - `tests/revision-engine.test.mjs`: Verified spaced revision intervals (Easy=7d, Okay=3d, Difficult=1d) and honest academic progress calculation.
  - `tests/backlog-rescue.test.mjs`: Verified non-destructive redistribution of overdue activities over upcoming days.
  - `tests/vault-security.test.mjs`: Verified Web Crypto AES-256-GCM + PBKDF2 encryption/decryption envelope and rejection of invalid passphrases.

