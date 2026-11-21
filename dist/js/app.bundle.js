// src/crypto-vault.ts
var activePassphrase = null;
var getVaultPassphrase = () => activePassphrase;
function isVaultEnvelope(value) {
  if (!value || typeof value !== "object") return false;
  const env = value;
  return env.format === "bloom-vault-v1" && typeof env.salt === "string" && typeof env.iv === "string" && typeof env.ciphertext === "string";
}
function bufferToBase64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function base64ToBuffer(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 25e4,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
async function sealVault(payload, passphrase) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt.buffer);
  const jsonStr = JSON.stringify(payload);
  const enc = new TextEncoder();
  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(jsonStr)
  );
  return {
    format: "bloom-vault-v1",
    salt: bufferToBase64(salt.buffer),
    iv: bufferToBase64(iv.buffer),
    ciphertext: bufferToBase64(ciphertextBuffer)
  };
}
async function unsealVault(envelope, passphrase) {
  const salt = base64ToBuffer(envelope.salt);
  const iv = base64ToBuffer(envelope.iv);
  const ciphertext = base64ToBuffer(envelope.ciphertext);
  const key = await deriveKey(passphrase, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(iv) },
    key,
    ciphertext
  );
  const dec = new TextDecoder();
  return JSON.parse(dec.decode(decrypted));
}

// src/storage.ts
var DB_NAME = "bloom-cbse-vault";
var DB_VERSION = 1;
var STORE_NAME = "learner_data";
var STATE_KEY = "bloom_state_v1";
var defaultProfile = () => ({
  name: "Aastha",
  medium: "English",
  wakeTime: "07:00",
  sleepTime: "23:00",
  schoolStart: "08:00",
  schoolEnd: "14:00",
  tuitionStart: "17:00",
  tuitionEnd: "21:00",
  travelMinutes: 20,
  sessionMinutes: 25,
  breakMinutes: 5,
  preferredPeriods: ["afternoon", "evening"],
  difficultSubjects: ["physics"],
  confidentSubjects: ["english"],
  onboardingComplete: false
});
var initialAppState = () => ({
  profile: defaultProfile(),
  chapterProgress: {},
  dayOverrides: {},
  tasks: [],
  mistakes: [],
  tests: [],
  focusSessions: [],
  practicals: [],
  garden: {
    level: 1,
    bloomsEarned: 0,
    growthPoints: 0,
    plantType: "Rose"
  },
  reviews: [],
  reduceMotion: false,
  darkMode: false,
  vaultPassphraseSet: false
});
var dbPromise = null;
function getDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      return reject(new Error("IndexedDB not supported in this environment."));
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}
async function loadAppState() {
  try {
    const db = await getDb();
    const raw = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(STATE_KEY);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    if (!raw) {
      return initialAppState();
    }
    if (isVaultEnvelope(raw)) {
      const pass = getVaultPassphrase();
      if (!pass) {
        throw new Error("VAULT_LOCKED");
      }
      const decrypted = await unsealVault(raw, pass);
      return { ...initialAppState(), ...decrypted };
    }
    if (typeof raw === "object") {
      return { ...initialAppState(), ...raw };
    }
    return initialAppState();
  } catch (err) {
    if (err?.message === "VAULT_LOCKED") throw err;
    console.warn("Could not load existing state from IndexedDB, using clean defaults:", err);
    return initialAppState();
  }
}
async function saveAppState(state) {
  try {
    const db = await getDb();
    const pass = getVaultPassphrase();
    const payload = pass ? await sealVault(state, pass) : state;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
      tx.objectStore(STORE_NAME).put(payload, STATE_KEY);
    });
  } catch (err) {
    console.error("Failed to save app state to IndexedDB:", err);
    throw err;
  }
}

// src/curriculum.ts
var CBSE_SUBJECTS = [
  {
    id: "physics",
    code: "042",
    title: "Physics",
    theoryMarks: 70,
    internalMarks: 30,
    examDate: "2027-02-16",
    examTime: "10:30 AM \u2013 1:30 PM IST",
    syllabusUrl: "https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Physics_SecP2_2026-27.pdf#page=12",
    officialNote: "Theory marks are published at grouped-unit scope (e.g. Electrostatics + Current Electricity = 16 marks)."
  },
  {
    id: "pe",
    code: "048",
    title: "Physical Education",
    theoryMarks: 70,
    internalMarks: 30,
    examDate: "2027-02-18",
    examTime: "10:30 AM \u2013 1:30 PM IST",
    syllabusUrl: "https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/PhysicalEducation_SecP2_2026-27.pdf#page=13",
    officialNote: "Units include b* concept question markers. Yoga is Unit 3 of Physical Education, not a separate 6th subject."
  },
  {
    id: "chemistry",
    code: "043",
    title: "Chemistry",
    theoryMarks: 70,
    internalMarks: 30,
    examDate: "2027-02-27",
    examTime: "10:30 AM \u2013 1:30 PM IST",
    syllabusUrl: "https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Chemistry_SecP2_2026-27.pdf#page=8",
    officialNote: "Course structure provides unit marks; paper design notes no guaranteed chapter weightage."
  },
  {
    id: "english",
    code: "301",
    title: "English Core",
    theoryMarks: 80,
    internalMarks: 20,
    examDate: "2027-03-05",
    examTime: "10:30 AM \u2013 1:30 PM IST",
    syllabusUrl: "https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_core_SecP2_2026-27.pdf#page=10",
    officialNote: "Section allocations: Reading (22), Creative Writing (18), Literature (40)."
  },
  {
    id: "math",
    code: "041",
    title: "Mathematics",
    theoryMarks: 80,
    internalMarks: 20,
    examDate: "2027-03-09",
    examTime: "10:30 AM \u2013 1:30 PM IST",
    syllabusUrl: "https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf#page=7",
    officialNote: "CBSE syllabus explicitly states no chapter-wise weightage; covers all chapters."
  }
];
var CBSE_CHAPTERS = [
  // ==================== PHYSICS (042) ====================
  {
    id: "phy-1",
    subjectId: "physics",
    unitGroup: "Units I\u2013II: Electrostatics & Current Electricity (16 Marks)",
    unitMarks: 16,
    title: "Electric Charges and Fields",
    ncertRef: "NCERT Physics Part 1, Chapter 1",
    topics: [
      {
        id: "phy-1-coulomb",
        chapterId: "phy-1",
        title: "Coulomb's Law & Superposition Principle",
        ncertRef: "NCERT Physics Part 1, Section 1.6 & 1.7",
        coreConcepts: ["Quantization of charge", "Coulomb's law in vector form", "Dielectric constant", "Equilibrium of multiple charges"],
        keyDerivations: ["Vector form of Coulomb's Law"],
        keyFormulas: ["F = (1 / 4\u03C0\u03B5\u2080) * (q\u2081q\u2082 / r\xB2)", "F_vector = (1 / 4\u03C0\u03B5\u2080) * (q\u2081q\u2082 / |r|\xB3) * r_vec"],
        boardQuestionTypes: ["1-mark Assertion-Reason on charge quantization", "2-mark vector force at triangle vertex", "3-mark null point calculation"]
      },
      {
        id: "phy-1-dipole",
        chapterId: "phy-1",
        title: "Electric Field & Dipole Torques",
        ncertRef: "NCERT Physics Part 1, Section 1.8 - 1.11",
        coreConcepts: ["Electric field lines and properties", "Dipole moment definition", "Field at axial and equatorial points", "Torque and potential energy in uniform field"],
        keyDerivations: ["Electric field on axial line of dipole", "Electric field on equatorial line of dipole", "Torque \u03C4 = p \xD7 E and work done W = pE(cos \u03B8\u2081 - cos \u03B8\u2082)"],
        keyFormulas: ["E_axial = (1 / 4\u03C0\u03B5\u2080) * (2pr / (r\xB2 - a\xB2)\xB2)", "E_equatorial = (1 / 4\u03C0\u03B5\u2080) * (p / (r\xB2 + a\xB2)^(3/2))", "\u03C4 = pE sin \u03B8"],
        boardQuestionTypes: ["3-mark dipole axial/equatorial field derivation", "2-mark work done in rotating dipole from 0\xB0 to 180\xB0"]
      },
      {
        id: "phy-1-gauss",
        chapterId: "phy-1",
        title: "Gauss's Law and Symmetrical Applications",
        ncertRef: "NCERT Physics Part 1, Section 1.14 & 1.15",
        coreConcepts: ["Electric flux definition", "Gauss's law statement", "Field of infinitely long straight wire", "Field of uniformly charged infinite plane sheet", "Field of thin spherical shell"],
        keyDerivations: ["Field of infinitely long wire E = \u03BB / (2\u03C0\u03B5\u2080r)", "Field of infinite plane sheet E = \u03C3 / (2\u03B5\u2080)", "Field of spherical shell (r > R, r = R, r < R)"],
        keyFormulas: ["\u03A6 = \u222E E \xB7 dA = q_enclosed / \u03B5\u2080", "E_wire = \u03BB / (2\u03C0\u03B5\u2080r)", "E_sheet = \u03C3 / (2\u03B5\u2080)"],
        boardQuestionTypes: ["5-mark Gauss law proof + infinite plane sheet derivation + numerical", "3-mark electric flux through cube face"]
      }
    ]
  },
  {
    id: "phy-2",
    subjectId: "physics",
    unitGroup: "Units I\u2013II: Electrostatics & Current Electricity (16 Marks)",
    unitMarks: 16,
    title: "Electrostatic Potential and Capacitance",
    ncertRef: "NCERT Physics Part 1, Chapter 2",
    topics: [
      {
        id: "phy-2-potential",
        chapterId: "phy-2",
        title: "Electric Potential & Equipotential Surfaces",
        ncertRef: "NCERT Physics Part 1, Section 2.1 - 2.6",
        coreConcepts: ["Potential due to point charge & system of charges", "Relation E = -dV/dr", "Equipotential surfaces characteristics", "Potential energy of dipole in external field"],
        keyDerivations: ["Potential at point r due to dipole: V = (1 / 4\u03C0\u03B5\u2080) * (p cos \u03B8 / r\xB2)", "Relation E = -dV/dr"],
        keyFormulas: ["V = (1 / 4\u03C0\u03B5\u2080) * (q / r)", "U = (1 / 4\u03C0\u03B5\u2080) * (q\u2081q\u2082 / r\u2081\u2082)"],
        boardQuestionTypes: ["2-mark equipotential surface sketches for positive charge and dipole", "3-mark potential calculation at midpoint"]
      },
      {
        id: "phy-2-capacitor",
        chapterId: "phy-2",
        title: "Parallel Plate Capacitor & Dielectrics",
        ncertRef: "NCERT Physics Part 1, Section 2.7 - 2.16",
        coreConcepts: ["Capacitance definition and units", "Parallel plate capacitor formula", "Dielectric slab insertion (battery connected vs disconnected)", "Energy stored and energy loss on sharing charge"],
        keyDerivations: ["Capacitance C\u2080 = \u03B5\u2080A/d", "Capacitance with dielectric slab of thickness t", "Energy stored U = (1/2)CV\xB2 and energy density u = (1/2)\u03B5\u2080E\xB2"],
        keyFormulas: ["C = \u03B5\u2080A / (d - t + t/K)", "U = (1/2) Q\xB2 / C = (1/2) CV\xB2", "u = (1/2) \u03B5\u2080 E\xB2"],
        boardQuestionTypes: ["3-mark effect of dielectric slab on V, Q, C, E, U with battery removed", "5-mark energy stored derivation + combination circuit numerical"]
      }
    ]
  },
  {
    id: "phy-3",
    subjectId: "physics",
    unitGroup: "Units I\u2013II: Electrostatics & Current Electricity (16 Marks)",
    unitMarks: 16,
    title: "Current Electricity",
    ncertRef: "NCERT Physics Part 1, Chapter 3",
    topics: [
      {
        id: "phy-3-drift",
        chapterId: "phy-3",
        title: "Drift Velocity, Ohm\u2019s Law & Resistivity",
        ncertRef: "NCERT Physics Part 1, Section 3.1 - 3.7",
        coreConcepts: ["Electric current and current density", "Drift velocity and relaxation time relation", "Deduction of Ohm\u2019s law from electron drift", "Resistivity temperature coefficient for metals vs semiconductors"],
        keyDerivations: ["Drift velocity v_d = -eE\u03C4 / m", "Current I = n e A v_d", "Resistivity \u03C1 = m / (n e\xB2 \u03C4)"],
        keyFormulas: ["I = n e A v_d", "j = \u03C3 E", "R_T = R\u2080(1 + \u03B1 \u0394T)"],
        boardQuestionTypes: ["3-mark drift velocity and Ohm law deduction", "2-mark graph of resistivity vs temperature for copper and nichrome"]
      },
      {
        id: "phy-3-kirchhoff",
        chapterId: "phy-3",
        title: "EMF, Cells Combination & Kirchhoff\u2019s Rules",
        ncertRef: "NCERT Physics Part 1, Section 3.8 - 3.12",
        coreConcepts: ["EMF, terminal voltage V = E - Ir", "Series and parallel combination of cells", "Kirchhoff\u2019s first rule (junction) and second rule (loop)", "Wheatstone bridge balance condition"],
        keyDerivations: ["Equivalent EMF of parallel cells: E_eq/r_eq = E\u2081/r\u2081 + E\u2082/r\u2082", "Wheatstone bridge condition P/Q = R/S using Kirchhoff\u2019s rules"],
        keyFormulas: ["V = E - I r", "E_eq = (E\u2081 r\u2082 + E\u2082 r\u2081) / (r\u2081 + r\u2082)", "P/Q = R/S"],
        boardQuestionTypes: ["3-mark Kirchhoff loop rule multi-battery network numerical", "5-mark cells in parallel derivation + terminal voltage analysis"]
      }
    ]
  },
  {
    id: "phy-4",
    subjectId: "physics",
    unitGroup: "Units III\u2013IV: Magnetism & Induction (17 Marks)",
    unitMarks: 17,
    title: "Moving Charges and Magnetism",
    ncertRef: "NCERT Physics Part 1, Chapter 4",
    topics: [
      {
        id: "phy-4-biot",
        chapterId: "phy-4",
        title: "Biot-Savart Law and Circular Coil Axis",
        ncertRef: "NCERT Physics Part 1, Section 4.1 - 4.6",
        coreConcepts: ["Magnetic force F = q(v \xD7 B)", "Biot-Savart law statement", "Field on axis of circular current loop", "Ampere circuital law and long solenoid"],
        keyDerivations: ["Field on axis of circular loop: B = \u03BC\u2080 I R\xB2 / (2(R\xB2 + x\xB2)^(3/2))", "Field inside long solenoid B = \u03BC\u2080 n I"],
        keyFormulas: ["dB = (\u03BC\u2080 / 4\u03C0) * (I dl \xD7 r\u0302 / r\xB2)", "B_axis = \u03BC\u2080 I R\xB2 / (2(R\xB2 + x\xB2)^(3/2))", "B_solenoid = \u03BC\u2080 n I"],
        boardQuestionTypes: ["3-mark circular loop derivation", "3-mark Ampere law application to coaxial cable"]
      },
      {
        id: "phy-4-galvo",
        chapterId: "phy-4",
        title: "Parallel Currents & Moving Coil Galvanometer",
        ncertRef: "NCERT Physics Part 1, Section 4.7 - 4.11",
        coreConcepts: ["Force on current wire F = I(L \xD7 B)", "Force between parallel current wires & 1 Ampere definition", "Torque on magnetic dipole \u03C4 = M \xD7 B", "Moving coil galvanometer principle, radial field, conversion to ammeter/voltmeter"],
        keyDerivations: ["Force per unit length between parallel wires: F/L = \u03BC\u2080 I\u2081 I\u2082 / (2\u03C0d)", "Galvanometer current deflection I = (C / NAB) \u03B8", "Shunt resistance for ammeter S = I_g G / (I - I_g)"],
        keyFormulas: ["F/L = \u03BC\u2080 I\u2081 I\u2082 / (2\u03C0d)", "\u03C4 = NIAB sin \u03B8", "S = I_g G / (I - I_g)", "R_series = V / I_g - G"],
        boardQuestionTypes: ["5-mark Galvanometer construction, role of radial magnetic field, conversion to voltmeter with numerical", "2-mark definition of standard 1 Ampere"]
      }
    ]
  },
  {
    id: "phy-9",
    subjectId: "physics",
    unitGroup: "Units V\u2013VI: Optics & EM Waves (18 Marks)",
    unitMarks: 18,
    title: "Ray Optics and Optical Instruments",
    ncertRef: "NCERT Physics Part 2, Chapter 9",
    topics: [
      {
        id: "phy-9-lensmaker",
        chapterId: "phy-9",
        title: "Spherical Refraction & Lens Maker\u2019s Formula",
        ncertRef: "NCERT Physics Part 2, Section 9.1 - 9.5",
        coreConcepts: ["Total internal reflection and optical fiber", "Refraction at single spherical surface", "Lens Maker's formula and combination of thin lenses", "Power of lens combination"],
        keyDerivations: ["Refraction at spherical surface: n\u2082/v - n\u2081/u = (n\u2082 - n\u2081)/R", "Lens Maker's Formula: 1/f = (n - 1)(1/R\u2081 - 1/R\u2082)", "Focal length of lenses in contact: 1/F = 1/f\u2081 + 1/f\u2082"],
        keyFormulas: ["sin i_c = 1 / n", "1/f = (n - 1)(1/R\u2081 - 1/R\u2082)", "P = P\u2081 + P\u2082"],
        boardQuestionTypes: ["5-mark Lens Maker formula derivation + change of focal length when immersed in water numerical", "3-mark total internal reflection applications"]
      },
      {
        id: "phy-9-instruments",
        chapterId: "phy-9",
        title: "Prism Formula & Optical Instruments",
        ncertRef: "NCERT Physics Part 2, Section 9.6 - 9.9",
        coreConcepts: ["Prism refraction and angle of minimum deviation", "Compound microscope ray diagram & magnification for normal adjustment and D", "Astronomical telescope (refracting and Cassegrain reflecting)"],
        keyDerivations: ["Prism formula: n = sin((A + D_m)/2) / sin(A/2)", "Magnifying power of compound microscope: m = -(L / f_o)(1 + D / f_e)", "Magnifying power of astronomical telescope: m = -f_o / f_e"],
        keyFormulas: ["n = sin((A + D_m)/2) / sin(A/2)", "m_microscope = -(L / f_o)(1 + D / f_e)", "m_telescope = -f_o / f_e"],
        boardQuestionTypes: ["5-mark Compound microscope ray diagram at near point + derivation + numerical", "3-mark Reflecting telescope advantages over refracting telescope"]
      }
    ]
  },
  // ==================== CHEMISTRY (043) ====================
  {
    id: "chem-1",
    subjectId: "chemistry",
    unitGroup: "Solutions (7 Marks)",
    unitMarks: 7,
    title: "Solutions",
    ncertRef: "NCERT Chemistry Part 1, Chapter 1",
    topics: [
      {
        id: "chem-1-raoult",
        chapterId: "chem-1",
        title: "Raoult's Law & Colligative Properties",
        ncertRef: "NCERT Chemistry Part 1, Section 1.1 - 1.6",
        coreConcepts: ["Henry's law", "Raoult's law for volatile solutes", "Ideal vs Non-ideal solutions (positive & negative deviations)", "Boiling point elevation and freezing point depression", "Osmotic pressure and reverse osmosis"],
        keyFormulas: ["p\u2081 = x\u2081 p\u2081\xB0", "\u0394T_b = K_b * m", "\u0394T_f = K_f * m", "\u03C0 = CRT"],
        boardQuestionTypes: ["3-mark numerical calculating molar mass from freezing point depression", "2-mark Azeotrope definition and ethanol-water positive deviation reasoning"]
      },
      {
        id: "chem-1-vant",
        chapterId: "chem-1",
        title: "Van 't Hoff Factor & Electrolyte Colligative Properties",
        ncertRef: "NCERT Chemistry Part 1, Section 1.7",
        coreConcepts: ["Van 't Hoff factor i definition", "Degree of dissociation \u03B1 and degree of association", "Abnormal molar mass calculations"],
        keyFormulas: ["i = normal molar mass / abnormal molar mass", "i = 1 + (n - 1)\u03B1 (dissociation)", "\u0394T_f = i K_f m"],
        boardQuestionTypes: ["3-mark numerical finding degree of dissociation of calcium nitrate from freezing point", "2-mark ranking solutions by osmotic pressure"]
      }
    ]
  },
  {
    id: "chem-2",
    subjectId: "chemistry",
    unitGroup: "Electrochemistry (9 Marks)",
    unitMarks: 9,
    title: "Electrochemistry",
    ncertRef: "NCERT Chemistry Part 1, Chapter 2",
    topics: [
      {
        id: "chem-2-nernst",
        chapterId: "chem-2",
        title: "Nernst Equation & Cell Potential",
        ncertRef: "NCERT Chemistry Part 1, Section 2.1 - 2.3",
        coreConcepts: ["Standard reduction potentials", "Nernst equation for half-cell and full cell", "Equilibrium constant K_c from cell EMF", "Gibbs free energy change \u0394G\xB0 = -nFE\xB0"],
        keyFormulas: ["E_cell = E\xB0_cell - (0.0591 / n) * log Q", "log K_c = n E\xB0_cell / 0.0591", "\u0394G\xB0 = -n F E\xB0_cell"],
        boardQuestionTypes: ["3-mark EMF and \u0394G\xB0 numerical for Daniel cell variant", "2-mark predicting feasibility of redox reaction"]
      },
      {
        id: "chem-2-kohlrausch",
        chapterId: "chem-2",
        title: "Kohlrausch's Law & Conductance",
        ncertRef: "NCERT Chemistry Part 1, Section 2.4 - 2.6",
        coreConcepts: ["Conductivity \u03BA and molar conductivity \u039B_m", "Variation of conductivity with concentration", "Kohlrausch's law of independent ion migration", "Degree of dissociation \u03B1 = \u039B_m / \u039B\xB0_m and K_a"],
        keyFormulas: ["\u039B_m = (\u03BA * 1000) / C", "\u039B\xB0_m = \u03BD\u208A \u03BB\xB0\u208A + \u03BD\u208B \u03BB\xB0\u208B", "\u03B1 = \u039B_m / \u039B\xB0_m", "K_a = C \u03B1\xB2 / (1 - \u03B1)"],
        boardQuestionTypes: ["3-mark Kohlrausch law calculation of \u039B\xB0_m for acetic acid", "2-mark reason why \u03BA decreases with dilution while \u039B_m increases"]
      }
    ]
  },
  // ==================== MATHEMATICS (041) ====================
  {
    id: "math-1",
    subjectId: "math",
    unitGroup: "Calculus (35 Marks)",
    unitMarks: 35,
    title: "Continuity and Differentiability",
    ncertRef: "NCERT Mathematics Part 1, Chapter 5",
    topics: [
      {
        id: "math-1-continuity",
        chapterId: "math-1",
        title: "Continuity of Piecewise & Trigonometric Functions",
        ncertRef: "NCERT Mathematics Part 1, Section 5.1",
        coreConcepts: ["Definition: lim x->c f(x) = f(c)", "Left hand limit and Right hand limit evaluation", "Finding unknown constants a, b for continuous functions"],
        boardQuestionTypes: ["4-mark finding values of a and b for piecewise function continuous at x=3 and x=5", "2-mark checking continuity of |x| / x at x=0"]
      },
      {
        id: "math-1-derivatives",
        chapterId: "math-1",
        title: "Logarithmic & Second Order Differentiation",
        ncertRef: "NCERT Mathematics Part 1, Section 5.5 - 5.7",
        coreConcepts: ["Logarithmic differentiation for variable base & exponent u(x)^v(x)", "Parametric differentiation", "Second order derivative proving problems"],
        keyFormulas: ["dy/dx = (dy/dt) / (dx/dt)", "d\xB2y/dx\xB2 = [d/dt(dy/dx)] / (dx/dt)"],
        boardQuestionTypes: ["4-mark proving differential equation from y = (sin\u207B\xB9 x)\xB2", "3-mark parametric second derivative at \u03B8 = \u03C0/4"]
      }
    ]
  },
  {
    id: "math-3",
    subjectId: "math",
    unitGroup: "Calculus (35 Marks)",
    unitMarks: 35,
    title: "Integrals",
    ncertRef: "NCERT Mathematics Part 2, Chapter 7",
    topics: [
      {
        id: "math-3-indefinite",
        chapterId: "math-3",
        title: "Integration by Substitution, Partial Fractions & Parts",
        ncertRef: "NCERT Mathematics Part 2, Section 7.1 - 7.6",
        coreConcepts: ["Standard substitution methods", "Partial fractions for linear and quadratic irreducible factors", "Integration by parts (ILATE rule)", "Special integral \u222B e^x [f(x) + f'(x)] dx = e^x f(x) + C"],
        boardQuestionTypes: ["3-mark partial fraction integral", "3-mark integration by parts with inverse trigonometric function"]
      },
      {
        id: "math-3-definite",
        chapterId: "math-3",
        title: "Definite Integrals & Kings Property",
        ncertRef: "NCERT Mathematics Part 2, Section 7.7 - 7.11",
        coreConcepts: ["Fundamental theorem of calculus", "Kings property: \u222B\u2080\u1D43 f(x) dx = \u222B\u2080\u1D43 f(a-x) dx", "Even and odd function integrals", "Piecewise absolute value integrals"],
        keyFormulas: ["\u222B\u2080\u1D43 f(x) dx = \u222B\u2080\u1D43 f(a - x) dx", "\u222B_{-a}\u1D43 f(x) dx = 2 \u222B\u2080\u1D43 f(x) dx if even, 0 if odd"],
        boardQuestionTypes: ["5-mark evaluation of \u222B\u2080^{\u03C0/2} (sin^n x / (sin^n x + cos^n x)) dx", "4-mark integral of |x - 1| + |x - 2| + |x - 3| from 1 to 4"]
      }
    ]
  },
  // ==================== ENGLISH CORE (301) ====================
  {
    id: "eng-1",
    subjectId: "english",
    unitGroup: "Section B: Creative Writing Skills (18 Marks)",
    unitMarks: 18,
    title: "Notice Writing",
    ncertRef: "CBSE Creative Writing Guidelines",
    topics: [
      {
        id: "eng-1-notice",
        chapterId: "eng-1",
        title: "Official Notice Writing Format & Body Structure",
        ncertRef: "CBSE Curriculum Section B (4 marks)",
        coreConcepts: ["Box enclosure", "Issuing institution header in center", "Word NOTICE in bold block letters", "Date on left", "Descriptive heading", "Content answering 5 Ws: What, When, Where, Who, Contact person", "Designation of signatory", "Strict 50-word adherence"],
        boardQuestionTypes: ["4-mark notice for inter-school debate, lost item, or donation camp"]
      }
    ]
  },
  {
    id: "eng-2",
    subjectId: "english",
    unitGroup: "Section C: Literature (40 Marks)",
    unitMarks: 40,
    title: "The Last Lesson",
    ncertRef: "Flamingo Prose, Chapter 1",
    topics: [
      {
        id: "eng-2-lesson",
        chapterId: "eng-2",
        title: "The Last Lesson (Alphonse Daudet) \u2014 Themes & RTC Analysis",
        ncertRef: "Flamingo Prose, pp. 1-9",
        coreConcepts: ["Franco-Prussian war background", "Order from Berlin banning French in Alsace-Lorraine", "Franz's regret over missed learning", "M. Hamel's patriotic message on French language", "Blackboard phrase: Vive La France!", "Themes: Linguistic chauvinism, procrastination, identity"],
        boardQuestionTypes: ["1-mark reference-to-context questions", "2-mark short answer on villagers sitting on back benches", "5-mark theme essay on love for mother tongue"]
      }
    ]
  },
  // ==================== PHYSICAL EDUCATION (048) ====================
  {
    id: "pe-1",
    subjectId: "pe",
    unitGroup: "Unit 1: Management of Sporting Events (5 + 4b* Marks)",
    unitMarks: 9,
    title: "Management of Sporting Events",
    ncertRef: "PE Class 12, Unit 1",
    topics: [
      {
        id: "pe-1-tournaments",
        chapterId: "pe-1",
        title: "Knock-Out Fixtures, Byes Calculation & Committees",
        ncertRef: "PE Class 12, Unit 1 Section 1.1 - 1.4",
        coreConcepts: ["Pre, during and post tournament committees and duties", "Knock-out tournament rules", "Total matches formula: N - 1", "Byes calculation: Next power of 2 minus N", "Bye distribution rules (lower half bottom, upper half top, etc.)"],
        keyFormulas: ["Total matches in knock-out = N - 1", "Byes = 2^n - N", "Matches in single league = N(N - 1) / 2"],
        boardQuestionTypes: ["5-mark drawing knock-out fixture for 19 teams with step-by-step bye distribution", "3-mark responsibilities of Technical and Boarding committees"]
      }
    ]
  },
  {
    id: "pe-3",
    subjectId: "pe",
    unitGroup: "Unit 3: Yoga as Preventive Measure for Lifestyle Disease (6 + 1b* Marks)",
    unitMarks: 7,
    title: "Yoga as Preventive Measure for Lifestyle Disease",
    ncertRef: "PE Class 12, Unit 3",
    topics: [
      {
        id: "pe-3-asanas",
        chapterId: "pe-3",
        title: "Asanas, Benefits & Contraindications for Lifestyle Diseases",
        ncertRef: "PE Class 12, Unit 3 Section 3.1 - 3.4",
        coreConcepts: ["Obesity asanas: Tadasana, Katichakrasana, Pavanmuktasana, Matsyasana, Halasana, Paschimottanasana", "Diabetes asanas: Bhujangasana, Shalabhasana, Dhanurasana, Supta Vajrasana", "Asthma asanas: Gomukhasana, Uttan Mandukasana", "Hypertension asanas: Shavasana, Sarala Matsyasana", "Contraindications for spinal and cardiac patients"],
        boardQuestionTypes: ["5-mark procedure, benefits and contraindications of any two asanas for Diabetes or Asthma", "1-mark identifying asana from diagram"]
      }
    ]
  }
];
var getSubject = (id) => CBSE_SUBJECTS.find((s) => s.id === id);
var getChapter = (id) => CBSE_CHAPTERS.find((c) => c.id === id);

// src/academic-engine.ts
function buildActionableActivity(topic, chapter, mode) {
  const isScienceMath = ["physics", "chemistry", "math"].includes(chapter.subjectId);
  if (mode === "learning") {
    return {
      title: `Master ${topic.title}`,
      activityType: "concept",
      learningObjective: `Understand the core theoretical foundation of ${topic.title} and derive principal equations step-by-step.`,
      steps: [
        `Read official verified section: ${topic.ncertRef}.`,
        `Study key principles: ${topic.coreConcepts.slice(0, 3).join(", ")}.`,
        topic.keyDerivations?.length ? `Work through derivation on paper: ${topic.keyDerivations[0]}.` : `Analyze the main textbook worked illustration and note steps.`,
        `Summarize definitions and formulas in your notes.`,
        `Reflect on your confidence: rate as Easy, Okay, or Difficult.`
      ],
      resourceRefs: [topic.ncertRef, chapter.ncertRef],
      completionEvidence: "Handwritten concept notes, derivation/illustration steps reviewed, reflection rating logged.",
      expectedMinutes: 30
    };
  }
  if (mode === "practice") {
    const actType = isScienceMath ? "numerical" : "board_practice";
    const verb = isScienceMath ? "Solve Board Numericals on" : "Practice Board Questions on";
    return {
      title: `${verb} ${topic.title}`,
      activityType: actType,
      learningObjective: `Apply formulas and definitions from ${topic.title} to solve board-pattern questions with proper step presentation.`,
      steps: [
        `Recall key formulas from memory: ${topic.keyFormulas?.slice(0, 2).join(", ") || "core principles"}.`,
        `Solve 2 representative questions without looking at worked solutions.`,
        `Self-check solution steps against CBSE marking criteria (formula, substitution, units).`,
        `If any step was incorrect, log the root cause in the Mistake Journal for retry.`
      ],
      resourceRefs: [topic.ncertRef],
      completionEvidence: "Independent problem solutions on paper; any calculation or concept doubts logged in Mistake Journal.",
      expectedMinutes: 25
    };
  }
  if (mode === "retry") {
    return {
      title: `Re-solve Mistake on ${topic.title}`,
      activityType: "mistake_retry",
      learningObjective: `Overcome recorded mistake root-cause by re-solving the problem cleanly from blank paper.`,
      steps: [
        `Review the recorded mistake note and why the error occurred.`,
        `Identify the exact failure point (formula recall, algebra slip, question misread).`,
        `Re-solve the complete question on blank paper without looking at hints.`,
        `Verify final answer and mark mistake entry as resolved if confident.`
      ],
      resourceRefs: [topic.ncertRef],
      completionEvidence: "Clean handwritten working from blank paper; mistake status updated.",
      expectedMinutes: 15
    };
  }
  return {
    title: `Active Recall on ${topic.title}`,
    activityType: "recall",
    learningObjective: `Reinforce spaced retention through active recall of formulas, definitions, and board question patterns.`,
    steps: [
      `Without checking notes, write down key equations: ${topic.keyFormulas?.join(", ") || topic.coreConcepts.slice(0, 2).join(", ")}.`,
      `Review typical board question angles: ${topic.boardQuestionTypes.slice(0, 2).join("; ")}.`,
      `Verify accuracy against ${topic.ncertRef}.`,
      `Log your shared understanding rating (Easy = 7d, Okay = 3d, Difficult = 1d).`
    ],
    resourceRefs: [topic.ncertRef],
    completionEvidence: "Formula sheet recalled from memory; next revision interval calculated.",
    expectedMinutes: 20
  };
}
function computeAcademicProgress(state) {
  const totalChapters = CBSE_CHAPTERS.length;
  let markedCount = 0;
  let learnedCount = 0;
  let learningCount = 0;
  let notStartedCount = 0;
  let needsRevisionCount = 0;
  let difficultCount = 0;
  const subjectStats = {
    physics: { total: 0, marked: 0, learned: 0, percent: 0 },
    pe: { total: 0, marked: 0, learned: 0, percent: 0 },
    chemistry: { total: 0, marked: 0, learned: 0, percent: 0 },
    english: { total: 0, marked: 0, learned: 0, percent: 0 },
    math: { total: 0, marked: 0, learned: 0, percent: 0 }
  };
  for (const c of CBSE_CHAPTERS) {
    subjectStats[c.subjectId].total++;
    const p = state.chapterProgress[c.id];
    if (p && p.status) {
      markedCount++;
      subjectStats[c.subjectId].marked++;
      if (["Learned", "Practising", "Exam ready", "Needs revision"].includes(p.status)) {
        learnedCount++;
        subjectStats[c.subjectId].learned++;
      } else if (p.status === "Learning") {
        learningCount++;
      } else if (p.status === "Not started") {
        notStartedCount++;
      }
      if (p.status === "Needs revision") {
        needsRevisionCount++;
      }
      if (p.rating === "Difficult") {
        difficultCount++;
      }
    }
  }
  for (const s of CBSE_SUBJECTS) {
    const item = subjectStats[s.id];
    item.percent = item.total > 0 ? Math.round(item.learned / item.total * 100) : 0;
  }
  const overallPercent = totalChapters > 0 ? Math.round(learnedCount / totalChapters * 100) : 0;
  const unknownCount = totalChapters - markedCount;
  return {
    totalChapters,
    markedCount,
    unknownCount,
    learnedCount,
    learningCount,
    notStartedCount,
    needsRevisionCount,
    difficultCount,
    overallPercent,
    subjectStats
  };
}

// src/planner-engine.ts
var timeToMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};
var minutesToTime = (m) => {
  const norm = Math.max(0, Math.min(1439, Math.floor(m)));
  const hh = String(Math.floor(norm / 60)).padStart(2, "0");
  const mm = String(norm % 60).padStart(2, "0");
  return `${hh}:${mm}`;
};
var getIsoDate = (d = /* @__PURE__ */ new Date()) => {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
};
var addDays = (dateStr, days) => {
  const d = /* @__PURE__ */ new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
var daysDifference = (dateA, dateB) => {
  const a = Date.parse(dateA + "T00:00:00Z");
  const b = Date.parse(dateB + "T00:00:00Z");
  return Math.round((b - a) / 864e5);
};
var getRevisionIntervalDays = (rating) => {
  switch (rating) {
    case "Difficult":
      return 1;
    case "Okay":
      return 3;
    case "Easy":
      return 7;
  }
};
function calculateAvailability(state, dateStr, profileOverride) {
  const profile = profileOverride || state.profile;
  const override = state.dayOverrides[dateStr];
  const dateObj = /* @__PURE__ */ new Date(dateStr + "T12:00:00Z");
  const dayOfWeek = dateObj.getUTCDay();
  const school = override ? override.school : false;
  const tuition = override ? override.tuition : dayOfWeek === 0 ? false : true;
  const wake = timeToMinutes(profile.wakeTime || "07:00");
  const sleep = timeToMinutes(profile.sleepTime || "23:00");
  const wakingWindow = { start: wake, end: sleep > wake ? sleep : 1440 };
  const commitments = [];
  const blockedIntervals = [];
  const travel = Math.max(0, profile.travelMinutes || 0);
  if (school) {
    const sStart = timeToMinutes(profile.schoolStart || "08:00");
    const sEnd = timeToMinutes(profile.schoolEnd || "14:00");
    commitments.push({ start: profile.schoolStart || "08:00", end: profile.schoolEnd || "14:00", label: "School" });
    blockedIntervals.push({
      start: Math.max(wakingWindow.start, sStart - travel),
      end: Math.min(wakingWindow.end, sEnd + travel)
    });
  }
  if (tuition) {
    const tStart = timeToMinutes(profile.tuitionStart || "17:00");
    const tEnd = timeToMinutes(profile.tuitionEnd || "21:00");
    commitments.push({ start: profile.tuitionStart || "17:00", end: profile.tuitionEnd || "21:00", label: "Tuition" });
    blockedIntervals.push({
      start: Math.max(wakingWindow.start, tStart - travel),
      end: Math.min(wakingWindow.end, tEnd + travel)
    });
  }
  blockedIntervals.sort((a, b) => a.start - b.start);
  const mergedBlocked = [];
  for (const b of blockedIntervals) {
    const last = mergedBlocked[mergedBlocked.length - 1];
    if (last && last.end >= b.start) {
      last.end = Math.max(last.end, b.end);
    } else {
      mergedBlocked.push({ ...b });
    }
  }
  let usable = [{ ...wakingWindow }];
  for (const block of mergedBlocked) {
    usable = usable.flatMap((w) => {
      if (block.end <= w.start || block.start >= w.end) return [w];
      const res = [];
      if (w.start < block.start) res.push({ start: w.start, end: block.start });
      if (w.end > block.end) res.push({ start: block.end, end: w.end });
      return res;
    });
  }
  const availableMinutes = usable.reduce((sum, w) => sum + (w.end - w.start), 0);
  return {
    school,
    tuition,
    wakingWindow,
    usableWindows: usable,
    availableMinutes,
    commitments,
    conflicts: []
  };
}
function getRankedStudyIdeas(state, dateStr) {
  const profile = state.profile;
  const existingDayTasks = state.tasks.filter((t) => t.day === dateStr);
  const scheduledChapterIds = new Set(existingDayTasks.map((t) => t.chapterId));
  const activeTests = [
    ...state.tests.filter((t) => t.confirmedByLearner && daysDifference(dateStr, t.day) >= 0),
    ...CBSE_SUBJECTS.map((s) => ({
      id: `board-${s.id}`,
      title: `${s.title} Board Exam`,
      day: s.examDate,
      subjectId: s.id,
      coverageChapterIds: CBSE_CHAPTERS.filter((c) => c.subjectId === s.id).map((c) => c.id),
      maxMarks: s.theoryMarks,
      isTotalOnly: false,
      confirmedByLearner: true
    }))
  ].sort((a, b) => a.day.localeCompare(b.day));
  const ideas = [];
  for (const chapter of CBSE_CHAPTERS) {
    if (scheduledChapterIds.has(chapter.id)) continue;
    const prog = state.chapterProgress[chapter.id];
    const status = prog?.status || "Not started";
    const rating = prog?.rating;
    const isRevisionDue = Boolean(prog?.nextReview && prog.nextReview <= dateStr) || status === "Needs revision";
    const isLearning = status === "Not started" || status === "Learning";
    const matchingTest = activeTests.find((t) => t.coverageChapterIds.includes(chapter.id));
    const testDaysAway = matchingTest ? daysDifference(dateStr, matchingTest.day) : null;
    const hasUrgentTest = testDaysAway !== null && testDaysAway <= 14;
    if (!hasUrgentTest && !isRevisionDue && !isLearning && rating !== "Difficult") {
      continue;
    }
    const mode = isLearning ? "learning" : isRevisionDue ? "revision" : rating === "Difficult" ? "practice" : "revision";
    const topic = chapter.topics[0];
    const act = buildActionableActivity(topic, chapter, mode);
    const reasons = [];
    if (matchingTest) {
      reasons.push(`${matchingTest.title} (${testDaysAway === 0 ? "Today" : testDaysAway + "d away"})`);
    }
    if (isRevisionDue) {
      reasons.push(prog?.nextReview === dateStr ? "Revision due today" : "Revision overdue");
    }
    if (isLearning) {
      reasons.push(status === "Learning" ? "Active learning in progress" : "Syllabus chapter not started");
    }
    if (rating === "Difficult") {
      reasons.push("Rated Difficult by you");
    }
    if (profile.difficultSubjects.includes(chapter.subjectId)) {
      reasons.push("In your focus subject");
    }
    let score = 0;
    if (hasUrgentTest && testDaysAway !== null) score += (20 - testDaysAway) * 100;
    score += (chapter.unitMarks || 0) * 10;
    if (isRevisionDue) score += 50;
    if (rating === "Difficult") score += 30;
    if (profile.difficultSubjects.includes(chapter.subjectId)) score += 20;
    ideas.push({
      chapterId: chapter.id,
      topicId: topic.id,
      subjectId: chapter.subjectId,
      title: act.title,
      objective: act.learningObjective,
      steps: act.steps,
      resourceRefs: act.resourceRefs,
      completionEvidence: act.completionEvidence,
      activityType: act.activityType,
      minutes: profile.sessionMinutes || 25,
      reason: reasons.join(" \xB7 "),
      priorityScore: score,
      testId: matchingTest?.id,
      dueRevision: isRevisionDue
    });
  }
  ideas.sort((a, b) => b.priorityScore - a.priorityScore || a.chapterId.localeCompare(b.chapterId));
  if (ideas.length >= 2 && ideas[0].testId) {
    const firstSubject = ideas[0].subjectId;
    const altSubjectIdx = ideas.findIndex((i) => i.subjectId !== firstSubject);
    if (altSubjectIdx > 1) {
      const altIdea = ideas.splice(altSubjectIdx, 1)[0];
      ideas.splice(1, 0, altIdea);
    }
  }
  return ideas;
}
function generatePlanProposal(state, dateStr, targetMinutesRequested) {
  const availability = calculateAvailability(state, dateStr);
  const ideas = getRankedStudyIdeas(state, dateStr);
  const profile = state.profile;
  const sessionMin = profile.sessionMinutes || 25;
  const breakMin = profile.breakMinutes || 5;
  const targetMinutes = targetMinutesRequested ?? Math.min(
    profile.sessionMinutes * 4,
    Math.floor(availability.availableMinutes * 0.45 / 5) * 5
  );
  const existingTasks = state.tasks.filter((t) => t.day === dateStr);
  const currentPlannedMinutes = existingTasks.reduce((sum, t) => sum + t.minutes, 0);
  let remainingBudget = Math.max(0, targetMinutes - currentPlannedMinutes);
  const blocks = [];
  const breaks = [];
  const notes = [];
  let windows = [...availability.usableWindows].filter((w) => w.end - w.start >= sessionMin);
  for (const idea of ideas) {
    if (remainingBudget < 15 || windows.length === 0) break;
    const desiredMin = Math.min(idea.minutes, remainingBudget);
    const winIdx = windows.findIndex((w) => w.end - w.start >= desiredMin);
    if (winIdx === -1) continue;
    const win = windows[winIdx];
    const taskStart = win.start;
    const taskEnd = taskStart + desiredMin;
    const block = {
      id: `task-${dateStr}-${idea.chapterId}-${Date.now().toString(36)}`,
      title: idea.title,
      day: dateStr,
      time: minutesToTime(taskStart),
      minutes: desiredMin,
      subjectId: idea.subjectId,
      chapterId: idea.chapterId,
      topicId: idea.topicId,
      activityType: idea.activityType,
      learningObjective: idea.objective,
      steps: idea.steps,
      completedStepIndices: [],
      resourceRefs: idea.resourceRefs,
      completionEvidence: idea.completionEvidence,
      recommendationReason: idea.reason,
      priority: idea.testId ? "High" : "Normal",
      done: false,
      origin: "generated"
    };
    blocks.push(block);
    remainingBudget -= desiredMin;
    const breakEnd = taskEnd + breakMin;
    if (breakEnd <= win.end) {
      breaks.push({
        start: minutesToTime(taskEnd),
        end: minutesToTime(breakEnd),
        label: "Mindful Rest & Reset"
      });
      win.start = breakEnd;
    } else {
      win.start = taskEnd;
    }
    if (win.start >= win.end) {
      windows.splice(winIdx, 1);
    }
  }
  if (blocks.length === 0) {
    notes.push("No new activities generated. Update chapter statuses or availability to create more blocks.");
  }
  return {
    day: dateStr,
    targetMinutes,
    plannedMinutes: currentPlannedMinutes + blocks.reduce((sum, b) => sum + b.minutes, 0),
    blocks,
    breaks,
    availability,
    notes,
    conflicts: []
  };
}
function rescueBacklogTasks(state, fromDate) {
  const missedTasks = state.tasks.filter((t) => t.day < fromDate && !t.done);
  if (missedTasks.length === 0) return [];
  const rescheduled = [];
  let dayOffset = 0;
  for (const task of missedTasks) {
    const targetDay = addDays(fromDate, dayOffset % 7);
    rescheduled.push({
      ...task,
      id: `rescue-${task.id}`,
      day: targetDay,
      recommendationReason: `Backlog rescue from ${task.day}`,
      origin: "generated"
    });
    dayOffset++;
  }
  return rescheduled;
}

// src/ui/icons.ts
var icons = {
  "sun": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  "calendar": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>`,
  "calendar-days": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>`,
  "book-open": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,
  "clipboard-list": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
  "clipboard-check": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`,
  "settings": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>`,
  "arrow-right": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  "arrow-left": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>`,
  "arrow-up-right": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
  "plus": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  "chevron-left": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`,
  "chevron-right": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`,
  "check": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`,
  "clock-3": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6h4"/></svg>`,
  "x": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  "pencil": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`,
  "edit": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`,
  "trash-2": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  "trash": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  "grip-vertical": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>`,
  "image-plus": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 5h6"/><path d="M19 2v6"/><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><circle cx="9" cy="9" r="2"/></svg>`,
  "chevron-down": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`,
  "leaf": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  "list": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg>`,
  "calendar-range": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M17 14h-6"/><path d="M13 18H7"/><path d="M7 14h.01"/><path d="M17 18h.01"/></svg>`,
  "circle-check": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
  "flower": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/></svg>`,
  "sparkles": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>`,
  "sparkle": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>`,
  "play": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
  "pause": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  "rotate-ccw": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
  "timer": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>`,
  "lock": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  "unlock": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  "shield-check": `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`
};
function icon(name, _size, _className) {
  return icons[name] || icons["leaf"] || `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`;
}

// src/ui/today-view.ts
function renderTodayView(state) {
  const todayStr = getIsoDate();
  const learnerName = state.profile.name || "Aastha";
  const availability = calculateAvailability(state, todayStr);
  const progress = computeAcademicProgress(state);
  const todayTasks = state.tasks.filter((t) => t.day === todayStr);
  const nextPendingTask = todayTasks.find((t) => !t.done);
  let heroTask = nextPendingTask || null;
  if (!heroTask && todayTasks.length === 0) {
    const ideas = getRankedStudyIdeas(state, todayStr);
    if (ideas.length > 0) {
      const topIdea = ideas[0];
      heroTask = {
        id: `hero-${topIdea.chapterId}`,
        title: topIdea.title,
        day: todayStr,
        minutes: topIdea.minutes,
        subjectId: topIdea.subjectId,
        chapterId: topIdea.chapterId,
        topicId: topIdea.topicId,
        activityType: topIdea.activityType,
        learningObjective: topIdea.objective,
        steps: topIdea.steps,
        completedStepIndices: [],
        resourceRefs: topIdea.resourceRefs,
        completionEvidence: topIdea.completionEvidence,
        recommendationReason: topIdea.reason,
        priority: "High",
        done: false,
        origin: "generated"
      };
    }
  }
  const todaySessions = state.focusSessions.filter((s) => s.day === todayStr);
  const actualSeconds = todaySessions.reduce((acc, s) => acc + s.seconds, 0);
  const actualMinutes = Math.floor(actualSeconds / 60);
  const plannedMinutes = todayTasks.reduce((acc, t) => acc + t.minutes, 0);
  const targetMinutes = Math.round(availability.availableMinutes * 0.7);
  const completedTasksCount = todayTasks.filter((t) => t.done).length;
  const remainingTasksCount = todayTasks.length - completedTasksCount;
  const progressPercent = targetMinutes > 0 ? Math.min(100, Math.round(actualMinutes / targetMinutes * 100)) : 0;
  const nextExamDate = /* @__PURE__ */ new Date("2027-02-16T10:30:00+05:30");
  const now = /* @__PURE__ */ new Date();
  const diffTime = nextExamDate.getTime() - now.getTime();
  const daysAway = Math.max(0, Math.ceil(diffTime / (1e3 * 60 * 60 * 24)));
  const heroSubject = heroTask ? getSubject(heroTask.subjectId) : null;
  const flowerCount = state.garden.bloomsEarned || 1;
  const availHours = (availability.availableMinutes / 60).toFixed(1);
  return `
    <div class="page today-page">
      <div class="dashboard-greeting">
        <div>
          <p class="eyebrow">YOUR BOARD PREPARATION, A LITTLE CLEARER</p>
          <h1>Hello, ${learnerName}.</h1>
          <p>One thoughtful step at a time.</p>
        </div>
        <a class="dashboard-garden" href="#tools" data-nav="tools">
          ${icon("leaf")} <span>${flowerCount} ${flowerCount === 1 ? "flower" : "flowers"} in bloom</span>
        </a>
      </div>

      ${heroTask ? `
        <section class="focus-band" aria-label="Suggested next step">
          <div class="focus-content">
            <p class="eyebrow">YOUR NEXT STUDY STEP</p>
            <div class="subject subject-${heroTask.subjectId}">${heroSubject?.title || heroTask.subjectId}</div>
            <h2>${heroTask.title}</h2>
            <p>${heroTask.recommendationReason || heroTask.learningObjective}</p>
            <div>
              <button type="button" class="button primary" data-action="open-study-workspace" data-task-id="${heroTask.id}">
                ${icon("play")} Start studying
              </button>
            </div>
          </div>
          <div class="focus-art" aria-hidden="true">
            <img src="./art/cosmos.webp" alt="Cosmos bloom">
            <i></i><i></i><i></i>
          </div>
        </section>
      ` : `
        <section class="focus-band" aria-label="Schedule is clear">
          <div class="focus-content">
            <p class="eyebrow">TODAY\u2019S SCHEDULE IS CLEAR</p>
            <h2>No pending tasks for today</h2>
            <p>Generate a balanced plan based on your current CBSE preparation and available hours.</p>
            <div>
              <button type="button" class="button primary" data-action="propose-plan" data-day="${todayStr}">
                ${icon("leaf")} Propose Today\u2019s Plan
              </button>
            </div>
          </div>
          <div class="focus-art" aria-hidden="true">
            <img src="./art/cosmos.webp" alt="Cosmos bloom">
            <i></i><i></i><i></i>
          </div>
        </section>
      `}

      <section class="day-pulse" aria-label="Today\u2019s actual study activity">
        <div class="pulse-main">
          <div class="pulse-ring" style="--progress: ${progressPercent};" role="img" aria-label="${progressPercent}% of study target">
            <span>${progressPercent}%<small>of target</small></span>
          </div>
          <div>
            <p class="eyebrow">TODAY, AT YOUR PACE</p>
            <h2>${actualMinutes}m <span>studied</span></h2>
            <p>${targetMinutes > 0 ? `${targetMinutes}m suggested target` : "Set your availability"} \xB7 ${plannedMinutes}m planned</p>
          </div>
        </div>
        <div class="pulse-detail">
          <strong>${completedTasksCount}<span> / ${todayTasks.length}</span></strong>
          <span>activities complete</span>
          <small>${remainingTasksCount} remaining</small>
        </div>
        <div class="pulse-detail">
          <strong>${todaySessions.length}</strong>
          <span>focus sessions saved</span>
          <small>${Math.max(0, targetMinutes - actualMinutes)}m to target</small>
        </div>
      </section>

      <div class="dashboard-columns">
        <section class="today-plan">
          <div class="section-head">
            <div>
              <h2>Your day, considered.</h2>
              <p>${availHours}h available before study breaks and rest</p>
            </div>
            <a href="#planner" class="button quiet">Open planner ${icon("arrow-right")}</a>
          </div>

          <div class="daily-commitments">
            <label class="switch" style="display:inline-flex; align-items:center; gap:8px;">
              <input type="checkbox" data-action="toggle-school" data-day="${todayStr}" ${availability.school ? "checked" : ""}>
              <span></span>
              <span style="font-size:12px; font-weight:600;">School today</span>
            </label>
            <label class="switch" style="display:inline-flex; align-items:center; gap:8px; margin-left:14px;">
              <input type="checkbox" data-action="toggle-tuition" data-day="${todayStr}" ${availability.tuition ? "checked" : ""}>
              <span></span>
              <span style="font-size:12px; font-weight:600;">Tuition today</span>
            </label>
          </div>

          ${todayTasks.length > 0 ? `
            <div class="rows">
              ${todayTasks.slice(0, 4).map((task) => `
                <article class="task-row ${task.done ? "done" : ""}">
                  <input type="checkbox" class="task-check" data-action="quick-toggle-task" data-task-id="${task.id}" ${task.done ? "checked" : ""} aria-label="Mark task done">
                  <div class="row-main">
                    <span class="subject subject-${task.subjectId}">${getSubject(task.subjectId)?.title || task.subjectId}</span>
                    <strong>${task.title}</strong>
                    <small>${task.recommendationReason || task.learningObjective}</small>
                  </div>
                  <span class="row-time">${task.minutes} min</span>
                  <button type="button" class="tool" data-action="open-study-workspace" data-task-id="${task.id}" title="Open study workspace">
                    ${icon("play")}
                  </button>
                </article>
              `).join("")}
            </div>
          ` : `
            <div class="companion-empty" style="padding:28px 16px; text-align:center; background:#fff8; border-radius:12px; margin-top:14px;">
              <p style="color:var(--soft); margin-bottom:12px;">Your time is ready.<br>Let\u2019s give it a useful shape.</p>
              <button type="button" class="button outline" data-action="propose-plan" data-day="${todayStr}">
                ${icon("leaf")} Suggest today\u2019s plan
              </button>
            </div>
          `}
        </section>

        <section class="academic-glance">
          <div class="section-head">
            <h2>The bigger picture</h2>
            <a href="#academics" class="button quiet">Academics ${icon("arrow-right")}</a>
          </div>
          <p class="academic-number" style="font-size:36px; font-family:var(--display); color:var(--ink);">${progress.learnedCount}<span> / ${progress.totalChapters}</span></p>
          <p style="color:var(--soft); font-size:13px; margin:4px 0 12px;">chapters learned, based on your own status</p>
          <div class="progress-track" role="progressbar" aria-label="Chapters learned" aria-valuenow="${progress.learnedCount}" aria-valuemax="${progress.totalChapters}">
            <span class="progress-fill" style="transform: scaleX(${progress.overallPercent / 100});"></span>
          </div>
          <div class="academic-attention" style="display:flex; gap:12px; margin-top:14px; font-size:12px; color:var(--soft);">
            <span><strong style="color:var(--ink);">${progress.learningCount}</strong> learning</span>
            <span><strong style="color:var(--ink);">${progress.needsRevisionCount}</strong> reviews due</span>
            <span><strong style="color:var(--ink);">${progress.unknownCount}</strong> unmarked</span>
          </div>
          <small style="display:block; margin-top:12px; color:var(--soft); font-size:11px;">Unmarked means unknown. School coverage never counts as your learning.</small>
        </section>
      </div>

      <section class="exam-strip" aria-label="Next board exam">
        <div class="exam-icon">${icon("leaf")}</div>
        <div>
          <p class="eyebrow">NEXT BOARD EXAM</p>
          <h2>Physics</h2>
          <p>Monday, 16 February 2027 \xB7 ${daysAway} days away</p>
        </div>
        <a href="#academics/physics" class="button outline">Physics syllabus</a>
      </section>

      <footer class="page-foot">
        <span>Make room for learning.</span>
        <a href="#tools" data-nav="tools">See your real progress ${icon("arrow-right")}</a>
      </footer>
    </div>
  `;
}

// src/ui/planner-view.ts
function renderPlannerView(state, selectedDate, mode = "list") {
  const activeDate = selectedDate || getIsoDate();
  const availability = calculateAvailability(state, activeDate);
  const tasks = state.tasks.filter((t) => t.day === activeDate);
  const ideas = getRankedStudyIdeas(state, activeDate).slice(0, 8);
  const prevDate = addDays(activeDate, -1);
  const nextDate = addDays(activeDate, 1);
  const doneCount = tasks.filter((t) => t.done).length;
  const plannedMinutes = tasks.reduce((acc, t) => acc + t.minutes, 0);
  const targetMinutes = Math.round(availability.availableMinutes * 0.7);
  const studiedMinutes = Math.floor(
    state.focusSessions.filter((s) => s.day === activeDate).reduce((acc, s) => acc + s.seconds, 0) / 60
  );
  const dateHeading = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(/* @__PURE__ */ new Date(activeDate + "T12:00:00Z"));
  const availHours = (availability.availableMinutes / 60).toFixed(1);
  return `
    <div class="page planner-page">
      <div class="section-head intro">
        <div>
          <p class="eyebrow">YOUR STUDY PLAN</p>
          <h1>Planner</h1>
        </div>
        <div class="toolbar">
          <button type="button" class="button outline" data-action="propose-plan" data-day="${activeDate}">
            ${icon("leaf")} Suggest a plan
          </button>
          <button type="button" class="button primary" data-action="open-add-custom-task" data-day="${activeDate}">
            ${icon("plus")} Add task
          </button>
        </div>
      </div>

      <div class="toolbar" style="margin-bottom: 20px;">
        <div class="date-tools">
          <button type="button" class="tool" data-action="change-date" data-day="${prevDate}" title="Previous day">
            ${icon("chevron-left")}
          </button>
          <input type="date" id="planner-date-input" value="${activeDate}" data-action="select-date">
          <button type="button" class="tool" data-action="change-date" data-day="${nextDate}" title="Next day">
            ${icon("chevron-right")}
          </button>
        </div>

        <div class="segments" aria-label="Plan view">
          <button type="button" data-action="planner-mode" data-value="list" aria-pressed="${mode === "list"}">
            ${icon("list")} Checklist
          </button>
          <button type="button" data-action="planner-mode" data-value="time" aria-pressed="${mode === "time"}">
            ${icon("calendar-range")} Timetable
          </button>
        </div>
      </div>

      <section class="planner-availability" style="padding: 22px; background: #fff8; border-radius: 12px; border: 1px solid var(--line); margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <p class="eyebrow">${dateHeading}</p>
          <h2 style="font-size: 26px; margin: 4px 0;">${targetMinutes}m <span style="font-size: 15px; color: var(--soft); font-weight: normal;">suggested study</span></h2>
          <p style="color: var(--soft); font-size: 13px;">${availHours}h available \xB7 ${plannedMinutes}m planned \xB7 ${studiedMinutes}m studied</p>
        </div>

        <div class="attendance-controls" style="display: flex; gap: 14px; align-items: center;">
          <label class="switch" style="display:inline-flex; align-items:center; gap:8px;">
            <input type="checkbox" data-action="toggle-school" data-day="${activeDate}" ${availability.school ? "checked" : ""}>
            <span></span>
            <span style="font-size:12px; font-weight:600;">School today</span>
          </label>
          <label class="switch" style="display:inline-flex; align-items:center; gap:8px;">
            <input type="checkbox" data-action="toggle-tuition" data-day="${activeDate}" ${availability.tuition ? "checked" : ""}>
            <span></span>
            <span style="font-size:12px; font-weight:600;">Tuition today</span>
          </label>
          <button type="button" class="button quiet" data-action="rescue-backlog" data-day="${activeDate}" title="Rescue past due items into today">
            ${icon("rotate-ccw")} Rescue Backlog
          </button>
        </div>
      </section>

      <p class="planning-explanation" style="color:var(--soft); font-size:13px; margin: 0 0 24px;">
        Study blocks follow your chapter progress, tests and session rhythm, with breaks between them. Changes stay a proposal until you approve.
      </p>

      <div class="planner-grid">
        <section>
          <div class="section-head">
            <h2>${mode === "time" ? "Timetable" : "Tasks"}</h2>
            <span class="muted">${doneCount} / ${tasks.length} done</span>
          </div>

          <div class="rows">
            ${tasks.length > 0 ? tasks.map((task) => `
              <article class="task-row ${task.done ? "done" : ""}" data-task-id="${task.id}">
                <input type="checkbox" class="task-check" data-action="quick-toggle-task" data-task-id="${task.id}" ${task.done ? "checked" : ""} aria-label="Mark task done">
                <div class="row-main">
                  <span class="subject subject-${task.subjectId}">${getSubject(task.subjectId)?.title || task.subjectId}</span>
                  <strong>${task.title}</strong>
                  <small>${task.recommendationReason || task.learningObjective}</small>
                </div>
                <span class="row-time">${task.minutes} min</span>
                <button type="button" class="tool" data-action="open-study-workspace" data-task-id="${task.id}" title="Open study workspace">
                  ${icon("play")}
                </button>
                <button type="button" class="tool" data-action="delete-task" data-task-id="${task.id}" title="Delete task">
                  ${icon("trash")}
                </button>
              </article>
            `).join("") : `
              <div class="empty-line" style="padding: 24px; text-align: center; color: var(--soft);">
                No tasks scheduled for this day. Click "Suggest a plan" or add an activity from the suggestions rail.
              </div>
            `}
          </div>
        </section>

        <section>
          <div class="section-head">
            <h2>Suggested study</h2>
          </div>

          <div class="rows">
            ${ideas.length > 0 ? ideas.map((idea) => `
              <article class="idea" style="display: flex; gap: 12px; align-items: center; padding: 12px 6px; border-bottom: 1px solid var(--line);">
                <div class="row-main" style="flex: 1; min-width: 0;">
                  <span class="subject subject-${idea.subjectId}">${getSubject(idea.subjectId)?.title || idea.subjectId}</span>
                  <strong>${idea.title}</strong>
                  <small style="color: var(--soft);">${idea.reason} \xB7 ${idea.minutes} min</small>
                </div>
                <button type="button" class="tool" data-action="add-idea-task" data-chapter-id="${idea.chapterId}" data-subject-id="${idea.subjectId}" title="Add to today's plan">
                  ${icon("plus")}
                </button>
              </article>
            `).join("") : `
              <div class="empty-line" style="padding: 24px; text-align: center; color: var(--soft);">
                No study suggestions found. Update your syllabus topic statuses to receive tailored activities.
              </div>
            `}
          </div>
        </section>
      </div>
    </div>
  `;
}

// src/ui/academics-view.ts
function renderAcademicsView(state, activeSubjectId = "physics", selectedChapterId) {
  const currentSubject = getSubject(activeSubjectId) || CBSE_SUBJECTS[0];
  const chapters = CBSE_CHAPTERS.filter((c) => c.subjectId === currentSubject.id);
  const activeChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];
  const progress = computeAcademicProgress(state);
  const activeChapProgress = state.chapterProgress[activeChapter.id];
  const activeStatus = activeChapProgress?.status || "Not started";
  return `
    <div class="page academics-page">
      <div class="section-head intro">
        <div>
          <p class="eyebrow">CBSE CLASS XII \xB7 2026\u201327</p>
          <h1>Your academic world</h1>
          <p class="muted">Choose a chapter to see its verified scope and recorded learning.</p>
        </div>
      </div>

      <div class="subject-tabs" aria-label="Subjects">
        ${CBSE_SUBJECTS.map((s) => `
          <button type="button" class="button outline" data-action="switch-subject" data-subject-id="${s.id}" aria-pressed="${currentSubject.id === s.id}">
            ${s.title}
          </button>
        `).join("")}
      </div>

      <div class="academic-two-column">
        <aside class="academic-chapters">
          <div class="section-head">
            <div>
              <h2>${currentSubject.title}</h2>
              <p class="muted">${chapters.length} syllabus chapters</p>
            </div>
          </div>
          ${chapters.map((c) => {
    const p = state.chapterProgress[c.id];
    const isMarked = p && p.status !== "Not started";
    return `
              <button type="button" class="academic-chapter ${c.id === activeChapter.id ? "selected" : ""}" data-action="select-chapter" data-chapter-id="${c.id}">
                <strong>${c.title}</strong>
                <small>${c.unitGroup} \xB7 ${isMarked ? p.status : "Unmarked"}</small>
              </button>
            `;
  }).join("")}
        </aside>

        <div class="academic-chapter-content">
          <section class="academic-hierarchy">
            <div class="section-head">
              <div>
                <p class="eyebrow">${activeChapter.unitGroup}</p>
                <h2>${activeChapter.title}</h2>
                <p class="muted">${activeChapter.ncertRef} \xB7 ${currentSubject.title}</p>
              </div>
              <span class="verification-badge" style="display:inline-flex; align-items:center; gap:6px; background:var(--sage); color:var(--green); border-radius:99px; padding:6px 12px; font-size:11px; font-weight:700;">
                ${icon("check")} CBSE 2026\u201327 verified
              </span>
            </div>

            <!-- Chapter Status Picker -->
            <div style="background:#fff8; border:1px solid var(--line); border-radius:14px; padding:18px 20px; margin: 16px 0 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div>
                <strong style="font-size:14px; display:block;">Your Chapter Status</strong>
                <small style="color:var(--soft);">Unmarked means unknown until you set it.</small>
              </div>
              <div style="display:flex; gap:10px; align-items:center;">
                <select class="status-select" data-action="update-chapter-status" data-chapter-id="${activeChapter.id}" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 12px; font-size:13px; background:var(--white);">
                  <option value="Not started" ${activeStatus === "Not started" ? "selected" : ""}>Not started</option>
                  <option value="Learning" ${activeStatus === "Learning" ? "selected" : ""}>Learning</option>
                  <option value="Learned" ${activeStatus === "Learned" ? "selected" : ""}>Learned</option>
                  <option value="Practising" ${activeStatus === "Practising" ? "selected" : ""}>Practising</option>
                  <option value="Needs revision" ${activeStatus === "Needs revision" ? "selected" : ""}>Needs revision</option>
                  <option value="Exam ready" ${activeStatus === "Exam ready" ? "selected" : ""}>Exam ready</option>
                </select>
                ${activeChapProgress?.rating ? `
                  <span class="status marked">${activeChapProgress.rating}</span>
                ` : ""}
              </div>
            </div>

            <p class="academic-note" style="color:var(--soft); font-size:12px; line-height:1.6; margin: 0 0 20px;">
              Topic titles and core concepts below come from the current Class XII ${currentSubject.title} syllabus.
            </p>

            <div class="topic-list">
              ${activeChapter.topics.map((topic) => {
    const learnAct = buildActionableActivity(topic, activeChapter, "learning");
    const practiceAct = buildActionableActivity(topic, activeChapter, "practice");
    return `
                  <article class="topic-card" data-topic-id="${topic.id}">
                    <div class="topic-card-head">
                      <div>
                        <p class="eyebrow">VERIFIED TOPIC</p>
                        <h3 style="font-size: 18px; margin: 4px 0;">${topic.title}</h3>
                      </div>
                      <span class="status marked">${topic.ncertRef}</span>
                    </div>

                    <div style="margin: 10px 0; font-size: 13px; color: var(--soft); line-height: 1.6;">
                      <strong>Core Principles:</strong> ${topic.coreConcepts.join(" \xB7 ")}
                      ${topic.keyDerivations?.length ? `<br><strong>Key Derivations:</strong> ${topic.keyDerivations.join(", ")}` : ""}
                      ${topic.keyFormulas?.length ? `<br><strong>Key Formulas:</strong> ${topic.keyFormulas.join(", ")}` : ""}
                    </div>

                    <div class="next-activity-card" style="margin-top: 14px;">
                      <div>
                        <p class="eyebrow">NEXT ACTIVITY \xB7 CONCEPT LEARNING</p>
                        <h4>${learnAct.title}</h4>
                        <p>${learnAct.learningObjective}</p>
                        <small>${learnAct.expectedMinutes} min \xB7 Verified NCERT Activity</small>
                      </div>
                      <button type="button" class="button primary" data-action="launch-topic-activity" data-topic-id="${topic.id}" data-chapter-id="${activeChapter.id}" data-mode="learning">
                        ${icon("play")} Learn Concepts
                      </button>
                    </div>

                    <div class="next-activity-card" style="margin-top: 10px; background: linear-gradient(135deg, #eaf2eb9c, #fff9 75%); border-color: #49634f35;">
                      <div>
                        <p class="eyebrow" style="color: var(--green);">PRACTICE & NUMERICALS</p>
                        <h4>${practiceAct.title}</h4>
                        <p>${practiceAct.learningObjective}</p>
                        <small>${practiceAct.expectedMinutes} min \xB7 Board-Pattern Questions</small>
                      </div>
                      <button type="button" class="button outline" data-action="launch-topic-activity" data-topic-id="${topic.id}" data-chapter-id="${activeChapter.id}" data-mode="practice">
                        ${icon("play")} Practice Questions
                      </button>
                    </div>
                  </article>
                `;
  }).join("")}
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}

// src/ui/tests-view.ts
function renderTestsView(state) {
  const todayStr = getIsoDate();
  const sortedSchoolTests = [...state.tests].sort((a, b) => a.day.localeCompare(b.day));
  return `
    <div class="page tests-page">
      <div class="section-head intro">
        <div>
          <p class="eyebrow">DATES & COVERAGE</p>
          <h1>Tests</h1>
        </div>
        <button type="button" class="button outline" data-action="open-add-test-modal">
          ${icon("plus")} Add test
        </button>
      </div>

      <section class="import-banner" style="background:#f2e4e9; border: 1px solid var(--line); border-radius:14px; padding:24px 28px; margin-bottom:28px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <p class="eyebrow">YOUR SCHOOL PLANNER</p>
          <h2 style="font-size:24px; margin:4px 0;">Record your upcoming school tests</h2>
          <p style="color:var(--soft); font-size:13px;">Add your pre-board or unit test dates and chapters to prioritize study recommendations.</p>
        </div>
        <button type="button" class="button primary" data-action="open-add-test-modal">
          ${icon("plus")} Add school test
        </button>
      </section>

      <section style="margin-bottom: 36px;">
        <div class="section-head">
          <h2>School tests</h2>
          <span class="muted">${sortedSchoolTests.length} recorded</span>
        </div>

        <div class="rows">
          ${sortedSchoolTests.length > 0 ? sortedSchoolTests.map((test) => {
    const daysAway = daysDifference(todayStr, test.day);
    const sub = getSubject(test.subjectId);
    return `
              <article class="test-row">
                <div class="row-main">
                  <span class="subject subject-${test.subjectId}">${sub?.title || test.subjectId}</span>
                  <strong>${test.title}</strong>
                  <small>${test.coverageChapterIds?.length || 0} confirmed chapters \xB7 ${daysAway >= 0 ? `${daysAway} days away` : "Completed"}</small>
                </div>
                <span class="row-time">${test.day}</span>
                <button type="button" class="tool" data-action="delete-test" data-test-id="${test.id}" title="Delete test">
                  ${icon("trash")}
                </button>
              </article>
            `;
  }).join("") : `
            <div class="empty-line" style="padding: 24px; text-align: center; color: var(--soft);">
              No upcoming school tests added. Add one above to tailor your study plan.
            </div>
          `}
        </div>
      </section>

      <section class="board-list">
        <div class="section-head">
          <div>
            <h2>Official Board Examinations</h2>
            <p>CBSE Class XII \xB7 2027 \xB7 10:30 am\u20131:30 pm IST</p>
          </div>
          <a class="button outline" href="https://www.cbse.gov.in" target="_blank" rel="noreferrer">
            Official dates ${icon("arrow-up-right")}
          </a>
        </div>

        <div class="rows">
          ${CBSE_SUBJECTS.map((subject) => {
    const daysAway = daysDifference(todayStr, subject.examDate);
    const dateStr = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(/* @__PURE__ */ new Date(subject.examDate + "T10:30:00Z"));
    return `
              <article class="test-row">
                <div class="row-main">
                  <strong>${subject.title}</strong>
                  <small>Subject Code: ${subject.code} \xB7 ${subject.theoryMarks} Theory + ${subject.internalMarks} Internal</small>
                </div>
                <div style="text-align: right;">
                  <span class="row-time" style="font-weight: 600; color: var(--ink);">${dateStr}</span>
                  <small style="display: block; color: var(--green); font-size: 11px;">${daysAway > 0 ? `${daysAway} days away` : "Today"}</small>
                </div>
              </article>
            `;
  }).join("")}
        </div>
      </section>
    </div>
  `;
}

// src/ui/tools-view.ts
function renderToolsView(state) {
  const mistakes = state.mistakes;
  const garden = state.garden;
  const learner = state.profile;
  return `
    <div class="page tools-page">
      <div class="section-head intro">
        <div>
          <p class="eyebrow">PERSONAL STUDY SPACE & VAULT</p>
          <h1>Your Space</h1>
          <p class="muted">All your study tools, mistake journal, and privacy controls in one place.</p>
        </div>
      </div>

      <section class="profile-top" style="display:flex; align-items:center; gap:16px; margin-bottom:28px; padding:20px; background:#fff8; border-radius:14px; border:1px solid var(--line);">
        <span class="avatar" style="width:64px; height:64px; font-size:24px; border-radius:50%; display:grid; place-items:center; background:var(--blush); color:var(--rose-dark); font-weight:700;">
          ${learner.name[0] || "A"}
        </span>
        <div style="flex:1;">
          <h2 style="font-size:24px; margin:0;">${learner.name}</h2>
          <p class="muted" style="margin:2px 0 0; font-size:13px;">CBSE Class XII \xB7 2027 \xB7 Private Local Vault</p>
        </div>
        <button type="button" class="button outline" data-action="open-onboarding" title="Update settings">
          ${icon("pencil")} Routine & Settings
        </button>
      </section>

      <div class="planner-grid" style="grid-template-columns: 1fr 1fr; gap: 24px;">
        <!-- Mistake Journal -->
        <section style="background:#fff8; border-radius:14px; border:1px solid var(--line); padding:24px;">
          <div class="section-head">
            <div>
              <h2>Mistake Journal</h2>
              <p class="muted">${mistakes.length} error logs \xB7 scheduled retry for root causes</p>
            </div>
            <button type="button" class="button outline" data-action="open-new-mistake-modal">
              ${icon("plus")} Log mistake
            </button>
          </div>

          <div class="rows">
            ${mistakes.length > 0 ? mistakes.map((m) => {
    const sub = getSubject(m.subjectId);
    return `
                <article class="task-row ${m.resolved ? "done" : ""}">
                  <div class="row-main">
                    <span class="subject subject-${m.subjectId}">${sub?.title || m.subjectId}</span>
                    <strong>${m.questionDesc}</strong>
                    <small>Cause: ${m.rootCause.replace("_", " ")} \xB7 ${m.studentNotes}</small>
                  </div>
                  <div style="display:flex; gap:6px;">
                    ${!m.resolved ? `
                      <button type="button" class="button quiet" data-action="schedule-mistake-retry" data-mistake-id="${m.id}" title="Schedule retry">
                        ${icon("rotate-ccw")}
                      </button>
                    ` : `
                      <span class="status marked">${icon("check")} Mastered</span>
                    `}
                  </div>
                </article>
              `;
  }).join("") : `
              <div class="empty-line" style="padding:20px; text-align:center; color:var(--soft);">
                No mistakes logged yet. When you get stuck on a question or numerical, log it here to automatically schedule a spaced retry.
              </div>
            `}
          </div>
        </section>

        <!-- Bloom Garden -->
        <section style="background:#fff8; border-radius:14px; border:1px solid var(--line); padding:24px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="section-head">
              <div>
                <h2>Bloom Garden</h2>
                <p class="muted">Reflects your genuine study focus. Never withers.</p>
              </div>
            </div>

            <div style="text-align:center; padding:30px 10px;">
              <div style="font-size:64px; margin-bottom:12px;">\u{1F338}</div>
              <h3 style="font-size:20px; margin:0 0 6px;">${garden.plantType} \xB7 Level ${garden.level}</h3>
              <p class="muted" style="font-size:13px; font-style:italic;">"True understanding grows with steady, calm steps."</p>
              <div style="margin-top:16px; display:inline-flex; align-items:center; gap:8px; padding:6px 14px; background:var(--sage); color:var(--green); border-radius:99px; font-size:12px; font-weight:600;">
                ${garden.growthPoints} growth points \xB7 ${garden.bloomsEarned} blooms earned
              </div>
            </div>
          </div>

          <div style="border-top:1px solid var(--line); padding-top:16px; font-size:12px; color:var(--soft);">
            Flowers bloom when focus sessions are completed and rated honestly.
          </div>
        </section>
      </div>

      <!-- Privacy & Vault Section -->
      <section style="margin-top:28px; background:#fff8; border-radius:14px; border:1px solid var(--line); padding:24px;">
        <div class="section-head">
          <div>
            <h2>Privacy & Vault Security</h2>
            <p class="muted">Aastha is the sole student. Zero third-party cloud trackers. AES-256-GCM encrypted local storage.</p>
          </div>
          <span style="display:inline-flex; align-items:center; gap:6px; color:var(--green); font-size:12px; font-weight:700;">
            ${icon("shield-check")} AES-256 Encrypted
          </span>
        </div>

        <div class="rows">
          <div class="settings-row" style="display:flex; justify-content:space-between; align-items:center; padding:14px 0; border-bottom:1px solid var(--line);">
            <div>
              <strong>Encryption Status</strong>
              <small style="display:block; color:var(--soft);">Web Crypto PBKDF2 (250,000 iterations) + AES-GCM-256</small>
            </div>
            <span class="status marked">Secured</span>
          </div>

          <div class="settings-row" style="display:flex; justify-content:space-between; align-items:center; padding:14px 0; border-bottom:1px solid var(--line);">
            <div>
              <strong>Target Examination</strong>
              <small style="display:block; color:var(--soft);">Exclusively CBSE Class XII 2027 (No JEE, No external syllabi)</small>
            </div>
            <span class="status marked">CBSE XII Only</span>
          </div>

          <div class="settings-row" style="display:flex; justify-content:space-between; align-items:center; padding:14px 0;">
            <div>
              <strong>Local Backup & Reset</strong>
              <small style="display:block; color:var(--soft);">Export your study record or reset to clean state.</small>
            </div>
            <div style="display:flex; gap:8px;">
              <button type="button" class="button outline" data-action="export-state">Export JSON</button>
              <button type="button" class="button quiet" data-action="reset-state" style="color:#923a43;">Reset Data</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

// src/ui/study-workspace-view.ts
function renderStudyWorkspace(task, state) {
  const chapter = getChapter(task.chapterId);
  const subject = getSubject(task.subjectId);
  const steps = task.steps || [
    "Review the fundamental concepts in your textbook.",
    "Work through a representative problem or illustration.",
    "Reflect on your level of clarity and log doubts."
  ];
  const completedIndices = new Set(task.completedStepIndices || []);
  return `
    <div class="workspace-backdrop" data-workspace-id="${task.id}" style="position:fixed; inset:0; z-index:50; background:rgba(41,27,39,0.65); backdrop-filter:blur(8px); display:grid; place-items:center; padding:20px; overflow-y:auto;">
      <div class="activity-workspace" style="width:min(860px,100%); background:var(--paper); border:1px solid var(--line); border-radius:24px; box-shadow:0 24px 70px rgba(0,0,0,0.25); max-height:92vh; overflow-y:auto; padding:clamp(20px,3.5vw,36px);">
        
        <div class="activity-nav" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <button type="button" class="button quiet" data-action="close-workspace">
            ${icon("arrow-left")} Close Workspace
          </button>
          <span style="font-size:12px; font-weight:700; color:var(--rose-dark); letter-spacing:.08em;">
            ${subject?.title || task.subjectId} \xB7 ${task.minutes} MIN
          </span>
        </div>

        <div class="section-head intro" style="margin-bottom:20px;">
          <div>
            <p class="eyebrow">${subject?.title || task.subjectId} \xB7 ${chapter?.title || "CHAPTER"}</p>
            <h1 style="font-size:32px; font-family:var(--display);">${task.title}</h1>
            <p class="muted">${chapter?.unitGroup || ""} \xB7 ${chapter?.ncertRef || ""}</p>
          </div>
        </div>

        <!-- Focus Timer Card -->
        <div style="background:#fff8; border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <p class="eyebrow" style="margin:0 0 4px;">FOCUS SESSION</p>
            <div id="workspace-timer-display" style="font-size:38px; font-family:var(--display); font-weight:700; color:var(--rose-dark); letter-spacing:1px;">
              25:00
            </div>
          </div>
          <div style="display:flex; gap:10px;">
            <button type="button" class="button primary" id="timer-start-pause" data-action="timer-toggle">
              ${icon("play")} <span id="timer-btn-label">Start Focus</span>
            </button>
            <button type="button" class="button outline" data-action="timer-reset">
              ${icon("rotate-ccw")} Reset
            </button>
          </div>
        </div>

        <!-- Learning Objective -->
        <div class="activity-reason" style="background:#fff8; border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:20px;">
          <strong style="display:block; font-size:15px; margin-bottom:6px;">Your learning objective</strong>
          <p style="margin:0; font-size:14px; line-height:1.6; color:var(--ink);">${task.learningObjective || "Master core concepts and verify independent understanding through practice."}</p>
          ${task.recommendationReason ? `<p class="muted" style="font-size:12px; margin-top:8px;">${task.recommendationReason}</p>` : ""}
        </div>

        <!-- Step-by-step checklist -->
        <section class="activity-steps" style="background:#fff8; border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:20px;">
          <div class="section-head" style="margin-bottom:14px;">
            <div>
              <p class="eyebrow">STEP-BY-STEP CHECKLIST</p>
              <h2 style="font-size:20px;">What to do</h2>
            </div>
            <small style="color:var(--soft); font-size:11px;">Complete each step before reflection</small>
          </div>

          <div style="display:grid; gap:8px;">
            ${steps.map((step, idx) => {
    const isDone = completedIndices.has(idx);
    return `
                <label style="display:grid; grid-template-columns:22px 1fr; align-items:start; gap:12px; padding:12px; border-radius:10px; background:${isDone ? "var(--sage)" : "var(--white)"}; border:1px solid ${isDone ? "var(--green)" : "var(--line)"}; cursor:pointer;">
                  <input type="checkbox" data-action="toggle-step" data-task-id="${task.id}" data-step-index="${idx}" ${isDone ? "checked" : ""} style="margin-top:3px; accent-color:var(--rose);">
                  <div>
                    <small style="display:block; color:var(--rose-dark); font-size:10px; font-weight:700;">STEP ${idx + 1}</small>
                    <span style="font-size:13px; line-height:1.5; ${isDone ? "text-decoration:line-through; color:var(--green);" : ""}">${step}</span>
                  </div>
                </label>
              `;
  }).join("")}
          </div>
        </section>

        <!-- Doubt / Mistake Logger Drawer trigger -->
        <div style="background:#fff8; border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:14px; display:block;">Got stuck or made an error?</strong>
            <p class="muted" style="margin:2px 0 0; font-size:12px;">Log it to your Mistake Journal to schedule a focused retry session.</p>
          </div>
          <button type="button" class="button outline" data-action="open-new-mistake-modal" data-task-id="${task.id}" data-chapter-id="${task.chapterId}">
            ${icon("plus")} Log Doubt / Mistake
          </button>
        </div>

        <!-- Reflection / Understanding Rating -->
        <fieldset class="activity-reflection" style="border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:24px; background:#fff8;">
          <legend style="padding:0 8px; font-size:13px; font-weight:700; color:var(--ink);">How did this session feel?</legend>
          <div style="display:flex; gap:12px; margin-top:8px;">
            <label style="flex:1; cursor:pointer;">
              <input type="radio" name="reflection-rating" value="Easy" style="position:absolute; opacity:0;">
              <span class="button outline" style="width:100%; border-radius:10px; text-align:center;">
                \u{1F60A} Easy
              </span>
            </label>
            <label style="flex:1; cursor:pointer;">
              <input type="radio" name="reflection-rating" value="Okay" checked style="position:absolute; opacity:0;">
              <span class="button outline" style="width:100%; border-radius:10px; text-align:center; background:var(--blush); border-color:var(--rose);">
                \u{1F610} Okay
              </span>
            </label>
            <label style="flex:1; cursor:pointer;">
              <input type="radio" name="reflection-rating" value="Difficult" style="position:absolute; opacity:0;">
              <span class="button outline" style="width:100%; border-radius:10px; text-align:center;">
                \u{1F914} Difficult
              </span>
            </label>
          </div>
        </fieldset>

        <!-- Workspace Footer Actions -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; border-top:1px solid var(--line); padding-top:20px;">
          <button type="button" class="button outline" data-action="close-workspace">
            Save and continue later
          </button>
          <button type="button" class="button primary" data-action="finish-workspace-task" data-task-id="${task.id}">
            ${icon("check")} Complete this activity
          </button>
        </div>

      </div>
    </div>
  `;
}

// src/ui/onboarding-view.ts
function renderOnboardingModal(state, currentStep = 1) {
  const p = state.profile;
  return `
    <div class="modal-backdrop" id="onboarding-modal">
      <div class="onboarding-card liquid-glass-panel">
        <header class="onboarding-header">
          <div class="onboarding-progress-dots">
            ${[1, 2, 3, 4, 5].map((step) => `
              <span class="step-dot ${step === currentStep ? "active" : step < currentStep ? "completed" : ""}">${step}</span>
            `).join("")}
          </div>
          <span class="step-counter-text">Step ${currentStep} of 5</span>
        </header>

        <div class="onboarding-body">
          ${currentStep === 1 ? `
            <div class="onboarding-step-content">
              <span class="onboarding-eyebrow">WELCOME TO BLOOM</span>
              <h2 class="onboarding-title">Let\u2019s tailor your CBSE preparation, Aastha.</h2>
              <p class="onboarding-desc">BLOOM is your private Class XII companion. Exactly five board subjects, zero JEE distraction, and no fake history.</p>

              <div class="subject-confirmation-box glass-subcard">
                <strong>Your Five Confirmed Board Subjects (2027):</strong>
                <ul class="onboarding-subject-list">
                  ${CBSE_SUBJECTS.map((s) => `
                    <li><span class="subject-tag subject-${s.id}">${s.code} \xB7 ${s.title}</span></li>
                  `).join("")}
                </ul>
                <small class="onboarding-hint">Yoga is part of Physical Education (Unit 3), not a separate board subject.</small>
              </div>

              <div class="onboarding-actions">
                <button type="button" class="btn primary" data-action="onboarding-next" data-step="2">
                  Continue ${icon("arrow-right", 16)}
                </button>
              </div>
            </div>
          ` : currentStep === 2 ? `
            <div class="onboarding-step-content">
              <span class="onboarding-eyebrow">DAILY COMMITMENTS</span>
              <h2 class="onboarding-title">When do you usually wake and attend commitments?</h2>
              <p class="onboarding-desc">School and tuition are independent. You can override any individual date later with one click.</p>

              <div class="onboarding-form-grid">
                <label class="form-field">
                  <span>Wake-up time</span>
                  <input type="time" class="glass-input" id="ob-wake" value="${p.wakeTime || "07:00"}">
                </label>

                <label class="form-field">
                  <span>Sleep time</span>
                  <input type="time" class="glass-input" id="ob-sleep" value="${p.sleepTime || "23:00"}">
                </label>

                <label class="form-field">
                  <span>School hours</span>
                  <div class="time-range-row">
                    <input type="time" class="glass-input" id="ob-school-start" value="${p.schoolStart || "08:00"}">
                    <span>to</span>
                    <input type="time" class="glass-input" id="ob-school-end" value="${p.schoolEnd || "14:00"}">
                  </div>
                </label>

                <label class="form-field">
                  <span>Tuition hours</span>
                  <div class="time-range-row">
                    <input type="time" class="glass-input" id="ob-tuition-start" value="${p.tuitionStart || "17:00"}">
                    <span>to</span>
                    <input type="time" class="glass-input" id="ob-tuition-end" value="${p.tuitionEnd || "21:00"}">
                  </div>
                </label>

                <label class="form-field">
                  <span>Travel buffer (minutes each way)</span>
                  <input type="number" class="glass-input" id="ob-travel" min="0" max="60" value="${p.travelMinutes || 20}">
                </label>
              </div>

              <div class="onboarding-actions">
                <button type="button" class="btn quiet" data-action="onboarding-prev" data-step="1">Back</button>
                <button type="button" class="btn primary" data-action="save-ob-step-2" data-step="3">
                  Next ${icon("arrow-right", 16)}
                </button>
              </div>
            </div>
          ` : currentStep === 3 ? `
            <div class="onboarding-step-content">
              <span class="onboarding-eyebrow">STUDY RHYTHM</span>
              <h2 class="onboarding-title">How do you prefer to study?</h2>
              <p class="onboarding-desc">Select your preferred focus block length and rest intervals.</p>

              <div class="onboarding-form-grid">
                <div class="form-field">
                  <span>Preferred study session length</span>
                  <div class="pill-options-row">
                    ${[25, 45, 60].map((mins) => `
                      <button type="button" class="pill-choice ${p.sessionMinutes === mins ? "selected" : ""}" data-action="choose-session-len" data-mins="${mins}">
                        ${mins} min blocks
                      </button>
                    `).join("")}
                  </div>
                </div>

                <div class="form-field">
                  <span>Rest break between blocks</span>
                  <div class="pill-options-row">
                    ${[5, 10, 15].map((mins) => `
                      <button type="button" class="pill-choice ${p.breakMinutes === mins ? "selected" : ""}" data-action="choose-break-len" data-mins="${mins}">
                        ${mins} min rest
                      </button>
                    `).join("")}
                  </div>
                </div>
              </div>

              <div class="onboarding-actions">
                <button type="button" class="btn quiet" data-action="onboarding-prev" data-step="2">Back</button>
                <button type="button" class="btn primary" data-action="onboarding-next" data-step="4">
                  Next ${icon("arrow-right", 16)}
                </button>
              </div>
            </div>
          ` : currentStep === 4 ? `
            <div class="onboarding-step-content">
              <span class="onboarding-eyebrow">ACADEMIC EMPHASIS</span>
              <h2 class="onboarding-title">Which subjects do you want more help with?</h2>
              <p class="onboarding-desc">Physics is noted as your most demanding subject, but other subjects can also receive focused time.</p>

              <div class="subject-difficulty-selector">
                ${CBSE_SUBJECTS.map((s) => {
    const isDiff = p.difficultSubjects.includes(s.id);
    return `
                    <label class="subject-diff-choice glass-subcard ${isDiff ? "checked" : ""}">
                      <input type="checkbox" data-action="toggle-diff-subject" data-subject-id="${s.id}" ${isDiff ? "checked" : ""}>
                      <span class="subject-tag subject-${s.id}">${s.code} \xB7 ${s.title}</span>
                      <span class="diff-tag">${isDiff ? "Needs focus & help" : "Standard balance"}</span>
                    </label>
                  `;
  }).join("")}
              </div>

              <div class="onboarding-actions">
                <button type="button" class="btn quiet" data-action="onboarding-prev" data-step="3">Back</button>
                <button type="button" class="btn primary" data-action="onboarding-next" data-step="5">
                  Review & Confirm ${icon("arrow-right", 16)}
                </button>
              </div>
            </div>
          ` : `
            <div class="onboarding-step-content">
              <span class="onboarding-eyebrow">ALL SET</span>
              <h2 class="onboarding-title">Your personalised companion is ready, Aastha.</h2>
              <p class="onboarding-desc">Click below to generate your proposed first study schedule. BLOOM will propose balanced sessions and wait for your approval.</p>

              <div class="summary-review-card glass-subcard">
                <p><strong>Learner:</strong> ${p.name || "Aastha"} (CBSE Class XII 2027)</p>
                <p><strong>Routine:</strong> Wake ${p.wakeTime || "07:00"}, Sleep ${p.sleepTime || "23:00"}</p>
                <p><strong>Study rhythm:</strong> ${p.sessionMinutes || 25}m sessions with ${p.breakMinutes || 5}m mindful breaks</p>
                <p><strong>Priority subjects:</strong> ${p.difficultSubjects.join(", ") || "Physics"}</p>
              </div>

              <div class="onboarding-actions">
                <button type="button" class="btn quiet" data-action="onboarding-prev" data-step="4">Back</button>
                <button type="button" class="btn primary btn-lg" data-action="complete-onboarding">
                  ${icon("sparkles", 18)} Finish Setup & Open BLOOM
                </button>
              </div>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

// src/app.ts
var BloomApp = class {
  state = initialAppState();
  currentRoute = "today";
  activeSubjectId = "physics";
  selectedChapterId = "phy-1";
  selectedPlannerDate = getIsoDate();
  plannerMode = "list";
  activeWorkspaceTask = null;
  onboardingStep = 1;
  // Focus Timer State
  timerSeconds = 25 * 60;
  timerTotalAllocated = 25 * 60;
  timerInterval = null;
  timerRunning = false;
  timerSessionElapsed = 0;
  async init() {
    this.state = await loadAppState();
    this.setupRoutes();
    this.setupGlobalEvents();
    this.render();
    if (!this.state.profile.onboardingComplete) {
      this.showOnboarding();
    }
  }
  setupRoutes() {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, "") || "today";
      const [route, param, subParam] = hash.split("/");
      this.currentRoute = route || "today";
      if (route === "academics") {
        if (param) this.activeSubjectId = param;
        if (subParam) this.selectedChapterId = subParam;
      }
      this.render();
    };
    window.addEventListener("hashchange", handleHash);
    handleHash();
  }
  async persist() {
    await saveAppState(this.state);
  }
  render() {
    const appEl = document.getElementById("app");
    if (!appEl) return;
    let contentHtml = "";
    switch (this.currentRoute) {
      case "today":
        contentHtml = renderTodayView(this.state);
        break;
      case "planner":
        contentHtml = renderPlannerView(this.state, this.selectedPlannerDate, this.plannerMode);
        break;
      case "academics":
      case "syllabus":
        contentHtml = renderAcademicsView(this.state, this.activeSubjectId, this.selectedChapterId);
        break;
      case "tests":
        contentHtml = renderTestsView(this.state);
        break;
      case "tools":
      case "more":
      case "profile":
        contentHtml = renderToolsView(this.state);
        break;
      default:
        contentHtml = renderTodayView(this.state);
    }
    const learnerName = this.state.profile.name || "Aastha";
    const todayDateFormatted = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }).format(/* @__PURE__ */ new Date());
    appEl.innerHTML = `
      <div class="layout">
        <aside class="sidebar" aria-label="Sidebar navigation">
          <a href="#today" class="wordmark">
            <img src="./art/mark.svg" alt="BLOOM emblem">
            <span>BLOOM</span>
          </a>
          <p class="sidebar-label eyebrow">STUDY SPACE</p>
          <nav aria-label="Main navigation">
            <a href="#today" data-nav="today" ${this.currentRoute === "today" ? 'aria-current="page"' : ""}>
              ${icon("sun")}
              <span>Today</span>
            </a>
            <a href="#planner" data-nav="planner" ${this.currentRoute === "planner" ? 'aria-current="page"' : ""}>
              ${icon("calendar")}
              <span>Planner</span>
            </a>
            <a href="#academics" data-nav="academics" ${this.currentRoute === "academics" || this.currentRoute === "syllabus" ? 'aria-current="page"' : ""}>
              ${icon("book-open")}
              <span>Syllabus</span>
            </a>
            <a href="#tests" data-nav="tests" ${this.currentRoute === "tests" ? 'aria-current="page"' : ""}>
              ${icon("clipboard-list")}
              <span>Tests</span>
            </a>
            <a href="#tools" data-nav="tools" ${this.currentRoute === "tools" || this.currentRoute === "more" || this.currentRoute === "profile" ? 'aria-current="page"' : ""}>
              ${icon("flower")}
              <span>Your Space</span>
            </a>
          </nav>
          <button type="button" class="profile-button" data-action="open-tools">
            <span class="avatar">${learnerName[0] || "A"}</span>
            <span>
              <strong>${learnerName}</strong>
              <small>CBSE XII \xB7 2027</small>
            </span>
          </button>
        </aside>

        <div class="workspace">
          <header class="topbar">
            <div>${todayDateFormatted}</div>
            <div class="session">CBSE XII \xB7 2027</div>
          </header>
          <main class="page-content" id="content">
            ${contentHtml}
          </main>
        </div>
      </div>
      <div id="modal-container"></div>
    `;
    if (this.activeWorkspaceTask) {
      this.renderActiveWorkspace();
    }
  }
  renderActiveWorkspace() {
    const modalContainer = document.getElementById("modal-container");
    if (!modalContainer || !this.activeWorkspaceTask) return;
    modalContainer.innerHTML = renderStudyWorkspace(this.activeWorkspaceTask, this.state);
    this.updateTimerDisplay();
  }
  setupGlobalEvents() {
    document.addEventListener("click", async (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;
      const action = target.getAttribute("data-action");
      const day = target.getAttribute("data-day") || getIsoDate();
      switch (action) {
        // Toggle School commitment independently
        case "toggle-school": {
          const isChecked = target.checked;
          this.state.dayOverrides[day] = {
            ...this.state.dayOverrides[day] || { school: false, tuition: true },
            school: isChecked
          };
          await this.persist();
          this.render();
          break;
        }
        // Toggle Tuition commitment independently
        case "toggle-tuition": {
          const isChecked = target.checked;
          this.state.dayOverrides[day] = {
            ...this.state.dayOverrides[day] || { school: false, tuition: true },
            tuition: isChecked
          };
          await this.persist();
          this.render();
          break;
        }
        // Switch Academics Subject
        case "switch-subject": {
          const subId = target.getAttribute("data-subject-id");
          if (subId) {
            this.activeSubjectId = subId;
            const chaps = CBSE_CHAPTERS.filter((c) => c.subjectId === subId);
            if (chaps.length > 0) this.selectedChapterId = chaps[0].id;
            window.location.hash = `#academics/${subId}`;
          }
          break;
        }
        // Select Chapter in Academics
        case "select-chapter": {
          const chapId = target.getAttribute("data-chapter-id");
          if (chapId) {
            this.selectedChapterId = chapId;
            this.render();
          }
          break;
        }
        // Change Date in Planner
        case "change-date": {
          const newDay = target.getAttribute("data-day");
          if (newDay) {
            this.selectedPlannerDate = newDay;
            this.render();
          }
          break;
        }
        // Switch Planner Mode (Checklist / Timetable)
        case "planner-mode": {
          const mode = target.getAttribute("data-value");
          if (mode) {
            this.plannerMode = mode;
            this.render();
          }
          break;
        }
        // Open Study Workspace for a task
        case "open-study-workspace": {
          const taskId = target.getAttribute("data-task-id");
          const task = this.state.tasks.find((t) => t.id === taskId);
          if (task) {
            this.activeWorkspaceTask = task;
            this.initTimerForTask(task);
            this.renderActiveWorkspace();
          } else {
            const ideas = generatePlanProposal(this.state, getIsoDate());
            if (ideas.blocks.length > 0) {
              const proposed = ideas.blocks[0];
              this.state.tasks.push(proposed);
              this.activeWorkspaceTask = proposed;
              this.initTimerForTask(proposed);
              await this.persist();
              this.render();
            }
          }
          break;
        }
        // Launch Topic Activity directly from Academics
        case "launch-topic-activity": {
          const chapId = target.getAttribute("data-chapter-id") || "";
          const topId = target.getAttribute("data-topic-id") || "";
          const mode = target.getAttribute("data-mode") || "learning";
          const chap = getChapter(chapId);
          const top = chap?.topics.find((t) => t.id === topId);
          if (chap && top) {
            const act = buildActionableActivity(top, chap, mode);
            const task = {
              id: `direct-${Date.now()}`,
              title: act.title,
              day: getIsoDate(),
              minutes: act.expectedMinutes,
              subjectId: chap.subjectId,
              chapterId: chap.id,
              topicId: top.id,
              activityType: act.activityType,
              learningObjective: act.learningObjective,
              steps: act.steps,
              completedStepIndices: [],
              resourceRefs: act.resourceRefs,
              completionEvidence: act.completionEvidence,
              recommendationReason: `Direct launch from Syllabus \xB7 ${mode} mode`,
              priority: "Normal",
              done: false,
              origin: "student"
            };
            this.state.tasks.push(task);
            this.activeWorkspaceTask = task;
            this.initTimerForTask(task);
            await this.persist();
            this.render();
          }
          break;
        }
        // Close Study Workspace
        case "close-workspace": {
          this.stopTimer();
          this.activeWorkspaceTask = null;
          const modalContainer = document.getElementById("modal-container");
          if (modalContainer) modalContainer.innerHTML = "";
          this.render();
          break;
        }
        // Complete Activity from Study Workspace
        case "finish-workspace-task": {
          const taskId = target.getAttribute("data-task-id");
          if (taskId && this.activeWorkspaceTask && this.activeWorkspaceTask.id === taskId) {
            const ratingInput = document.querySelector('input[name="reflection-rating"]:checked');
            const rating = ratingInput?.value || "Okay";
            this.activeWorkspaceTask.done = true;
            this.activeWorkspaceTask.completedAt = (/* @__PURE__ */ new Date()).toISOString();
            this.activeWorkspaceTask.understandingRating = rating;
            const sessionSecs = this.timerSessionElapsed > 0 ? this.timerSessionElapsed : this.activeWorkspaceTask.minutes * 60;
            this.state.focusSessions.push({
              id: `focus-${Date.now()}`,
              taskId: this.activeWorkspaceTask.id,
              subjectId: this.activeWorkspaceTask.subjectId,
              chapterId: this.activeWorkspaceTask.chapterId,
              topicId: this.activeWorkspaceTask.topicId,
              day: this.activeWorkspaceTask.day,
              seconds: sessionSecs,
              completedAt: (/* @__PURE__ */ new Date()).toISOString()
            });
            const chapterId = this.activeWorkspaceTask.chapterId;
            const revDays = getRevisionIntervalDays(rating);
            this.state.chapterProgress[chapterId] = {
              status: "Learned",
              rating,
              lastStudied: getIsoDate(),
              nextReview: addDays(getIsoDate(), revDays)
            };
            this.state.reviews.push({
              chapterId,
              date: getIsoDate(),
              rating
            });
            this.state.garden.growthPoints += 15;
            if (this.state.garden.growthPoints >= 50 * this.state.garden.level) {
              this.state.garden.level++;
              this.state.garden.bloomsEarned++;
            }
            this.stopTimer();
            this.activeWorkspaceTask = null;
            await this.persist();
            this.render();
          }
          break;
        }
        // Toggle Step in Workspace
        case "toggle-step": {
          const stepIdx = Number(target.getAttribute("data-step-index"));
          if (this.activeWorkspaceTask) {
            const current = new Set(this.activeWorkspaceTask.completedStepIndices || []);
            if (current.has(stepIdx)) current.delete(stepIdx);
            else current.add(stepIdx);
            this.activeWorkspaceTask.completedStepIndices = Array.from(current);
            await this.persist();
            this.renderActiveWorkspace();
          }
          break;
        }
        // Toggle Quick Task Done Checkbox
        case "quick-toggle-task":
        case "toggle-task": {
          const taskId = target.getAttribute("data-task-id");
          const task = this.state.tasks.find((t) => t.id === taskId);
          if (task) {
            task.done = !task.done;
            if (task.done) {
              task.completedAt = (/* @__PURE__ */ new Date()).toISOString();
              this.state.garden.growthPoints += 5;
            }
            await this.persist();
            this.render();
          }
          break;
        }
        // Delete Task
        case "delete-task": {
          const taskId = target.getAttribute("data-task-id");
          if (taskId) {
            this.state.tasks = this.state.tasks.filter((t) => t.id !== taskId);
            await this.persist();
            this.render();
          }
          break;
        }
        // Add Idea Task from Planner Suggestion Rail
        case "add-idea-task": {
          const chapId = target.getAttribute("data-chapter-id");
          const subId = target.getAttribute("data-subject-id");
          const chap = getChapter(chapId || "");
          if (chap && chap.topics.length > 0) {
            const top = chap.topics[0];
            const act = buildActionableActivity(top, chap, "learning");
            this.state.tasks.push({
              id: `task-${this.selectedPlannerDate}-${chap.id}-${Date.now().toString(36)}`,
              title: act.title,
              day: this.selectedPlannerDate,
              minutes: act.expectedMinutes,
              subjectId: subId || chap.subjectId,
              chapterId: chap.id,
              topicId: top.id,
              activityType: act.activityType,
              learningObjective: act.learningObjective,
              steps: act.steps,
              completedStepIndices: [],
              resourceRefs: act.resourceRefs,
              completionEvidence: act.completionEvidence,
              recommendationReason: `Recommended preparation for ${chap.title}`,
              priority: "Normal",
              done: false,
              origin: "student"
            });
            await this.persist();
            this.render();
          }
          break;
        }
        // Propose Plan & Show Modal
        case "propose-plan": {
          const planDay = target.getAttribute("data-day") || getIsoDate();
          const proposal = generatePlanProposal(this.state, planDay);
          this.showPlanProposalModal(proposal);
          break;
        }
        // Approve and Save Plan Proposal
        case "approve-plan-proposal": {
          const jsonStr = target.getAttribute("data-proposal-blocks");
          if (jsonStr) {
            const blocks = JSON.parse(jsonStr);
            this.state.tasks.push(...blocks);
            await this.persist();
            this.closeModal();
            this.render();
          }
          break;
        }
        // Rescue Backlog
        case "rescue-backlog": {
          const fromDay = target.getAttribute("data-day") || getIsoDate();
          const rescued = rescueBacklogTasks(this.state, fromDay);
          if (rescued.length > 0) {
            this.state.tasks.push(...rescued);
            await this.persist();
            alert(`Rescued ${rescued.length} tasks and distributed them over the next week!`);
            this.render();
          } else {
            alert("No overdue or missed tasks found to rescue.");
          }
          break;
        }
        // Timer Controls
        case "timer-toggle": {
          this.toggleTimer();
          break;
        }
        case "timer-reset": {
          this.resetTimer();
          break;
        }
        // Modals
        case "open-add-custom-task": {
          this.showAddCustomTaskModal(target.getAttribute("data-day") || getIsoDate());
          break;
        }
        case "save-custom-task": {
          const title = document.getElementById("task-title-input")?.value;
          const mins = Number(document.getElementById("task-mins-input")?.value) || 25;
          const chapId = document.getElementById("task-chap-select")?.value || "phy-1";
          const chap = getChapter(chapId);
          if (title && chap) {
            this.state.tasks.push({
              id: `custom-${Date.now()}`,
              title,
              day: this.selectedPlannerDate,
              minutes: mins,
              subjectId: chap.subjectId,
              chapterId: chap.id,
              activityType: "concept",
              learningObjective: `Independent study of ${title}`,
              steps: [
                "Read and understand the core concept.",
                "Practice questions on blank paper.",
                "Reflect on clarity and rate confidence."
              ],
              completedStepIndices: [],
              resourceRefs: [chap.ncertRef],
              completionEvidence: "Completed independent practice.",
              recommendationReason: "Custom student task",
              priority: "Normal",
              done: false,
              origin: "student"
            });
            await this.persist();
            this.closeModal();
            this.render();
          }
          break;
        }
        case "open-new-mistake-modal": {
          const chapId = target.getAttribute("data-chapter-id") || "";
          this.showMistakeModal(chapId);
          break;
        }
        case "save-mistake-entry": {
          const desc = document.getElementById("m-desc")?.value;
          const notes = document.getElementById("m-notes")?.value;
          const correction = document.getElementById("m-correction")?.value;
          const cause = document.getElementById("m-cause")?.value || "conceptual";
          const chapId = document.getElementById("m-chap")?.value || "phy-1";
          const chap = getChapter(chapId);
          if (desc && chap) {
            this.state.mistakes.push({
              id: `mistake-${Date.now()}`,
              date: getIsoDate(),
              subjectId: chap.subjectId,
              chapterId: chap.id,
              questionDesc: desc,
              rootCause: cause,
              studentNotes: notes || "",
              correctApproach: correction || "",
              resolved: false
            });
            await this.persist();
            this.closeModal();
            this.render();
          }
          break;
        }
        case "schedule-mistake-retry": {
          const mistakeId = target.getAttribute("data-mistake-id");
          const m = this.state.mistakes.find((item) => item.id === mistakeId);
          if (m) {
            const chap = getChapter(m.chapterId);
            const retryTask = {
              id: `retry-${m.id}`,
              title: `Re-solve: ${m.questionDesc}`,
              day: getIsoDate(),
              minutes: 15,
              subjectId: m.subjectId,
              chapterId: m.chapterId,
              activityType: "mistake_retry",
              learningObjective: `Overcome ${m.rootCause.replace("_", " ")}: ${m.studentNotes}`,
              steps: [
                "Review previous mistake notes and where logic failed.",
                "Re-solve full problem on blank paper without looking at hints.",
                "Verify steps and mark mistake as resolved."
              ],
              completedStepIndices: [],
              resourceRefs: chap ? [chap.ncertRef] : [],
              completionEvidence: "Re-solved cleanly on paper with correct working.",
              recommendationReason: `Mistake Journal retry (${m.rootCause})`,
              priority: "High",
              done: false,
              origin: "student"
            };
            this.state.tasks.push(retryTask);
            await this.persist();
            alert("Retry activity added to today\u2019s study plan!");
            this.render();
          }
          break;
        }
        case "open-add-test-modal": {
          this.showAddTestModal();
          break;
        }
        case "save-school-test": {
          const title = document.getElementById("test-title")?.value;
          const day2 = document.getElementById("test-date")?.value;
          const subId = document.getElementById("test-sub")?.value;
          const maxMarks = Number(document.getElementById("test-max")?.value) || 70;
          if (title && day2 && subId) {
            this.state.tests.push({
              id: `test-${Date.now()}`,
              title,
              day: day2,
              subjectId: subId,
              coverageChapterIds: getChapter(subId) ? [subId] : [],
              maxMarks,
              isTotalOnly: true,
              confirmedByLearner: true
            });
            await this.persist();
            this.closeModal();
            this.render();
          }
          break;
        }
        case "delete-test": {
          const testId = target.getAttribute("data-test-id");
          if (testId) {
            this.state.tests = this.state.tests.filter((t) => t.id !== testId);
            await this.persist();
            this.render();
          }
          break;
        }
        case "open-tools": {
          window.location.hash = "#tools";
          break;
        }
        case "open-onboarding": {
          this.onboardingStep = 1;
          this.showOnboarding();
          break;
        }
        case "close-modal": {
          this.closeModal();
          break;
        }
        // Onboarding flow
        case "onboarding-next": {
          const nextStep = Number(target.getAttribute("data-step") || 1);
          this.onboardingStep = nextStep;
          this.showOnboarding();
          break;
        }
        case "onboarding-prev": {
          const prevStep = Number(target.getAttribute("data-step") || 1);
          this.onboardingStep = prevStep;
          this.showOnboarding();
          break;
        }
        case "save-ob-step-2": {
          const wake = document.getElementById("ob-wake")?.value;
          const sleep = document.getElementById("ob-sleep")?.value;
          const sStart = document.getElementById("ob-school-start")?.value;
          const sEnd = document.getElementById("ob-school-end")?.value;
          const tStart = document.getElementById("ob-tuition-start")?.value;
          const tEnd = document.getElementById("ob-tuition-end")?.value;
          if (wake) this.state.profile.wakeTime = wake;
          if (sleep) this.state.profile.sleepTime = sleep;
          if (sStart) this.state.profile.schoolStart = sStart;
          if (sEnd) this.state.profile.schoolEnd = sEnd;
          if (tStart) this.state.profile.tuitionStart = tStart;
          if (tEnd) this.state.profile.tuitionEnd = tEnd;
          await this.persist();
          this.onboardingStep = 3;
          this.showOnboarding();
          break;
        }
        case "save-ob-step-3": {
          const diffSub = document.querySelector('input[name="ob-diff"]:checked')?.value;
          if (diffSub) {
            this.state.profile.difficultSubjects = [diffSub];
          }
          await this.persist();
          this.onboardingStep = 4;
          this.showOnboarding();
          break;
        }
        case "finish-onboarding": {
          this.state.profile.onboardingComplete = true;
          await this.persist();
          this.closeModal();
          this.render();
          break;
        }
        case "export-state": {
          const blob = new Blob([JSON.stringify(this.state, null, 2)], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `bloom-study-vault-${getIsoDate()}.json`;
          a.click();
          break;
        }
        case "reset-state": {
          if (confirm("Are you sure you want to reset all study progress and records?")) {
            this.state = initialAppState();
            await this.persist();
            this.render();
          }
          break;
        }
      }
    });
    document.addEventListener("change", async (e) => {
      const target = e.target;
      if (target.classList.contains("status-select")) {
        const select = target;
        const chapId = select.getAttribute("data-chapter-id");
        if (chapId) {
          const current = this.state.chapterProgress[chapId] || { status: "Not started" };
          current.status = select.value;
          this.state.chapterProgress[chapId] = current;
          await this.persist();
          this.render();
        }
      }
      if (target.id === "planner-date-input") {
        const input = target;
        if (input.value) {
          this.selectedPlannerDate = input.value;
          this.render();
        }
      }
    });
  }
  // Timer methods
  initTimerForTask(task) {
    this.stopTimer();
    this.timerSeconds = task.minutes * 60;
    this.timerTotalAllocated = task.minutes * 60;
    this.timerSessionElapsed = 0;
    this.timerRunning = false;
  }
  toggleTimer() {
    if (this.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }
  startTimer() {
    this.timerRunning = true;
    this.updateTimerControls();
    this.timerInterval = window.setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        this.timerSessionElapsed++;
        this.updateTimerDisplay();
      } else {
        this.stopTimer();
        alert("Focus session complete! Take a gentle rest.");
      }
    }, 1e3);
  }
  stopTimer() {
    this.timerRunning = false;
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.updateTimerControls();
  }
  resetTimer() {
    this.stopTimer();
    this.timerSeconds = this.timerTotalAllocated;
    this.timerSessionElapsed = 0;
    this.updateTimerDisplay();
  }
  updateTimerDisplay() {
    const el = document.getElementById("workspace-timer-display");
    if (el) {
      const mins = Math.floor(this.timerSeconds / 60);
      const secs = this.timerSeconds % 60;
      el.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
  }
  updateTimerControls() {
    const label = document.getElementById("timer-btn-label");
    if (label) {
      label.textContent = this.timerRunning ? "Pause Focus" : "Start Focus";
    }
  }
  closeModal() {
    const modalContainer = document.getElementById("modal-container");
    if (modalContainer) modalContainer.innerHTML = "";
  }
  showOnboarding() {
    const modalContainer = document.getElementById("modal-container");
    if (modalContainer) {
      modalContainer.innerHTML = renderOnboardingModal(this.state, this.onboardingStep);
    }
  }
  showPlanProposalModal(proposal) {
    const modalContainer = document.getElementById("modal-container");
    if (!modalContainer) return;
    modalContainer.innerHTML = `
      <div style="position:fixed; inset:0; z-index:50; background:rgba(41,27,39,0.65); backdrop-filter:blur(8px); display:grid; place-items:center; padding:20px; overflow-y:auto;">
        <div style="width:min(640px,100%); background:var(--white); border:1px solid var(--line); border-radius:20px; box-shadow:0 24px 70px rgba(0,0,0,0.25); padding:28px;">
          <div class="section-head intro" style="margin-bottom:16px;">
            <div>
              <p class="eyebrow">${proposal.day} \xB7 ${proposal.plannedMinutes} MIN</p>
              <h2 style="font-size:24px;">Proposed Study Schedule</h2>
            </div>
            <button type="button" class="tool" data-action="close-modal" aria-label="Close">
              ${icon("x")}
            </button>
          </div>

          <p style="color:var(--soft); font-size:13px; line-height:1.5; margin-bottom:18px;">
            BLOOM generated these activities based on your confirmed CBSE priorities, verified marks scope, and available study windows. Review before applying:
          </p>

          <div class="rows" style="max-height:360px; overflow-y:auto; margin-bottom:20px;">
            ${proposal.blocks.map((b) => `
              <article class="task-row">
                <div class="row-main">
                  <span class="subject subject-${b.subjectId}">${getSubject(b.subjectId)?.title}</span>
                  <strong>${b.title}</strong>
                  <small>${b.recommendationReason} \xB7 ${b.minutes} min</small>
                </div>
              </article>
            `).join("")}
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="button quiet" data-action="close-modal">Cancel</button>
            <button type="button" class="button primary" data-action="approve-plan-proposal" data-proposal-blocks='${JSON.stringify(proposal.blocks).replace(/'/g, "&#39;")}'>
              ${icon("check")} Approve & Save Plan
            </button>
          </div>
        </div>
      </div>
    `;
  }
  showMistakeModal(prefillChapterId = "") {
    const modalContainer = document.getElementById("modal-container");
    if (!modalContainer) return;
    modalContainer.innerHTML = `
      <div style="position:fixed; inset:0; z-index:50; background:rgba(41,27,39,0.65); backdrop-filter:blur(8px); display:grid; place-items:center; padding:20px; overflow-y:auto;">
        <div style="width:min(540px,100%); background:var(--white); border:1px solid var(--line); border-radius:20px; box-shadow:0 24px 70px rgba(0,0,0,0.25); padding:28px;">
          <div class="section-head intro" style="margin-bottom:16px;">
            <div>
              <p class="eyebrow">MISTAKE JOURNAL</p>
              <h2 style="font-size:22px;">Log Doubt or Mistake</h2>
            </div>
            <button type="button" class="tool" data-action="close-modal" aria-label="Close">
              ${icon("x")}
            </button>
          </div>

          <div style="display:grid; gap:14px; margin-bottom:20px;">
            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Subject & Chapter
              <select id="m-chap" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
                ${CBSE_CHAPTERS.map((c) => `
                  <option value="${c.id}" ${prefillChapterId === c.id ? "selected" : ""}>
                    ${getSubject(c.subjectId)?.title}: ${c.title}
                  </option>
                `).join("")}
              </select>
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Root Cause
              <select id="m-cause" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
                <option value="conceptual">Conceptual Misunderstanding</option>
                <option value="calculation">Calculation / Sign Error</option>
                <option value="formula_recall">Formula Recall Failure</option>
                <option value="misread_question">Misread Question Stem</option>
                <option value="presentation">Presentation / Units / Steps Omission</option>
              </select>
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Question Description
              <input type="text" id="m-desc" placeholder="e.g. Q4 on Lens Maker's formula with differing radii" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              What Went Wrong
              <textarea id="m-notes" rows="3" placeholder="Forgot to apply Cartesian sign convention for R2" style="border-radius:8px; border:1px solid var(--line); padding:8px 10px; font-size:13px; font-family:inherit;"></textarea>
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Key Takeaway / Correct Rule
              <textarea id="m-correction" rows="2" placeholder="Always sketch the principal axis and mark signs before calculating" style="border-radius:8px; border:1px solid var(--line); padding:8px 10px; font-size:13px; font-family:inherit;"></textarea>
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="button quiet" data-action="close-modal">Cancel</button>
            <button type="button" class="button primary" data-action="save-mistake-entry">
              ${icon("check")} Save Mistake Note
            </button>
          </div>
        </div>
      </div>
    `;
  }
  showAddTestModal() {
    const modalContainer = document.getElementById("modal-container");
    if (!modalContainer) return;
    modalContainer.innerHTML = `
      <div style="position:fixed; inset:0; z-index:50; background:rgba(41,27,39,0.65); backdrop-filter:blur(8px); display:grid; place-items:center; padding:20px; overflow-y:auto;">
        <div style="width:min(480px,100%); background:var(--white); border:1px solid var(--line); border-radius:20px; box-shadow:0 24px 70px rgba(0,0,0,0.25); padding:28px;">
          <div class="section-head intro" style="margin-bottom:16px;">
            <div>
              <p class="eyebrow">SCHOOL TESTS</p>
              <h2 style="font-size:22px;">Add Upcoming Test</h2>
            </div>
            <button type="button" class="tool" data-action="close-modal" aria-label="Close">
              ${icon("x")}
            </button>
          </div>

          <div style="display:grid; gap:14px; margin-bottom:20px;">
            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Subject
              <select id="test-sub" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
                ${CBSE_SUBJECTS.map((s) => `<option value="${s.id}">${s.title}</option>`).join("")}
              </select>
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Test Title
              <input type="text" id="test-title" placeholder="e.g. Pre-Board 1 Physics" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Date
              <input type="date" id="test-date" value="${getIsoDate()}" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Maximum Marks
              <input type="number" id="test-max" value="70" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="button quiet" data-action="close-modal">Cancel</button>
            <button type="button" class="button primary" data-action="save-school-test">
              ${icon("check")} Save Test
            </button>
          </div>
        </div>
      </div>
    `;
  }
  showAddCustomTaskModal(day) {
    const modalContainer = document.getElementById("modal-container");
    if (!modalContainer) return;
    modalContainer.innerHTML = `
      <div style="position:fixed; inset:0; z-index:50; background:rgba(41,27,39,0.65); backdrop-filter:blur(8px); display:grid; place-items:center; padding:20px; overflow-y:auto;">
        <div style="width:min(480px,100%); background:var(--white); border:1px solid var(--line); border-radius:20px; box-shadow:0 24px 70px rgba(0,0,0,0.25); padding:28px;">
          <div class="section-head intro" style="margin-bottom:16px;">
            <div>
              <p class="eyebrow">${day}</p>
              <h2 style="font-size:22px;">Add Custom Study Activity</h2>
            </div>
            <button type="button" class="tool" data-action="close-modal" aria-label="Close">
              ${icon("x")}
            </button>
          </div>

          <div style="display:grid; gap:14px; margin-bottom:20px;">
            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Activity Title
              <input type="text" id="task-title-input" placeholder="e.g. Derive Lens Maker's Formula" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Chapter
              <select id="task-chap-select" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
                ${CBSE_CHAPTERS.map((c) => `
                  <option value="${c.id}">${getSubject(c.subjectId)?.title}: ${c.title}</option>
                `).join("")}
              </select>
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Allocated Minutes
              <input type="number" id="task-mins-input" value="30" step="5" min="10" max="180" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="button quiet" data-action="close-modal">Cancel</button>
            <button type="button" class="button primary" data-action="save-custom-task">
              ${icon("check")} Add to Plan
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const app = new BloomApp();
  app.init().catch(console.error);
});
//# sourceMappingURL=app.bundle.js.map
