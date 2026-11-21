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
function icon(name, size = 18, className = "icon") {
  const common = `class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  switch (name) {
    case "sun":
      return `<svg ${common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
    case "calendar":
      return `<svg ${common}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`;
    case "book-open":
      return `<svg ${common}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
    case "clipboard-check":
      return `<svg ${common}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`;
    case "flower":
      return `<svg ${common}><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m4.5 3a4.5 4.5 0 1 1-4.5 4.5M16.5 12H15m-3 4.5a4.5 4.5 0 1 1-4.5-4.5M12 16.5V15m-4.5-3A4.5 4.5 0 1 1 12 7.5M7.5 12H9"/><circle cx="12" cy="12" r="2"/></svg>`;
    case "sparkles":
      return `<svg ${common}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>`;
    case "timer":
      return `<svg ${common}><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>`;
    case "arrow-right":
      return `<svg ${common}><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    case "arrow-left":
      return `<svg ${common}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`;
    case "check":
      return `<svg ${common}><polyline points="20 6 9 17 4 12"/></svg>`;
    case "x":
      return `<svg ${common}><path d="M18 6 6 18M6 6l12 12"/></svg>`;
    case "play":
      return `<svg ${common}><polygon points="6 3 20 12 6 21 6 3"/></svg>`;
    case "pause":
      return `<svg ${common}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
    case "rotate-ccw":
      return `<svg ${common}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`;
    case "bookmark":
      return `<svg ${common}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`;
    case "alert-circle":
      return `<svg ${common}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;
    case "lock":
      return `<svg ${common}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
    case "unlock":
      return `<svg ${common}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`;
    case "external-link":
      return `<svg ${common}><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`;
    case "plus":
      return `<svg ${common}><path d="M5 12h14M12 5v14"/></svg>`;
    case "trash":
      return `<svg ${common}><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;
    case "edit":
      return `<svg ${common}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`;
    case "shield-check":
      return `<svg ${common}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`;
    default:
      return `<svg ${common}><circle cx="12" cy="12" r="10"/></svg>`;
  }
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
  const completedTasksCount = todayTasks.filter((t) => t.done).length;
  return `
    <div class="page-container today-page">
      <header class="greeting-header">
        <p class="eyebrow-text">YOUR BOARD PREPARATION, A LITTLE CLEARER</p>
        <h1 class="greeting-title">Hello, ${learnerName}.</h1>
        <p class="greeting-subtitle">One thoughtful step at a time.</p>
      </header>

      ${heroTask ? `
        <section class="hero-study-card liquid-glass-panel">
          <div class="hero-card-content">
            <span class="hero-eyebrow">YOUR NEXT STUDY STEP</span>
            <div class="hero-meta">
              <span class="subject-tag subject-${heroTask.subjectId}">${getSubject(heroTask.subjectId)?.title || heroTask.subjectId}</span>
              <span class="activity-type-badge">${heroTask.activityType.replace("_", " ")}</span>
            </div>
            <h2 class="hero-task-title">${heroTask.title}</h2>
            <p class="hero-task-reason">${heroTask.recommendationReason || "Highest priority for upcoming board readiness."}</p>
            <div class="hero-details">
              <span>${icon("timer", 15)} ${heroTask.minutes} minutes</span>
              ${heroTask.time ? `<span>${icon("calendar", 15)} Scheduled at ${heroTask.time}</span>` : ""}
            </div>
            <button type="button" class="btn primary hero-action-btn" data-action="open-study-workspace" data-task-id="${heroTask.id}">
              ${icon("play", 18)} Start studying
            </button>
          </div>
          <div class="hero-card-art" aria-hidden="true">
            <div class="botanical-flourish"></div>
          </div>
        </section>
      ` : `
        <section class="hero-study-card liquid-glass-panel empty-hero">
          <div class="hero-card-content">
            <span class="hero-eyebrow">TODAY\u2019S SCHEDULE IS CLEAR</span>
            <h2 class="hero-task-title">No pending tasks for today</h2>
            <p class="hero-task-reason">Generate a balanced plan based on your current CBSE preparation and available hours.</p>
            <button type="button" class="btn primary" data-action="propose-plan" data-day="${todayStr}">
              ${icon("sparkles", 18)} Propose Today\u2019s Plan
            </button>
          </div>
        </section>
      `}

      <!-- Metrics Row -->
      <section class="metrics-grid">
        <div class="metric-card liquid-glass-card">
          <span class="metric-label">TODAY\u2019S RECORDED FOCUS</span>
          <div class="metric-value-row">
            <strong class="metric-number">${actualMinutes}</strong>
            <span class="metric-unit">min studied</span>
          </div>
          <span class="metric-sub">${todaySessions.length} recorded focus sessions</span>
        </div>

        <div class="metric-card liquid-glass-card">
          <span class="metric-label">ACTIVITIES COMPLETED</span>
          <div class="metric-value-row">
            <strong class="metric-number">${completedTasksCount}</strong>
            <span class="metric-unit">/ ${todayTasks.length} planned</span>
          </div>
          <span class="metric-sub">${todayTasks.length - completedTasksCount} remaining today</span>
        </div>

        <div class="metric-card liquid-glass-card">
          <span class="metric-label">FREE USABLE TIME</span>
          <div class="metric-value-row">
            <strong class="metric-number">${Math.floor(availability.availableMinutes / 60)}h ${availability.availableMinutes % 60}m</strong>
          </div>
          <span class="metric-sub">after school and tuition</span>
        </div>
      </section>

      <!-- Today's Routine & Schedule Grid -->
      <div class="today-two-col">
        <section class="routine-panel liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h3 class="panel-title">Today's Routine & Overrides</h3>
              <p class="panel-subtitle">Independent school and tuition commitments</p>
            </div>
          </div>

          <div class="commitment-toggles">
            <label class="toggle-control">
              <span class="toggle-label">${icon("book-open", 16)} School Today</span>
              <input type="checkbox" class="toggle-switch" data-action="toggle-school" data-day="${todayStr}" ${availability.school ? "checked" : ""}>
            </label>

            <label class="toggle-control">
              <span class="toggle-label">${icon("clipboard-check", 16)} Tuition Today</span>
              <input type="checkbox" class="toggle-switch" data-action="toggle-tuition" data-day="${todayStr}" ${availability.tuition ? "checked" : ""}>
            </label>
          </div>

          <p class="panel-hint">
            ${availability.school && availability.tuition ? "Both school and tuition are active today." : availability.school ? "School only is active today; tuition time is open for study." : availability.tuition ? "No school today; morning & afternoon are open for study." : "Neither school nor tuition today; full day is available for flexible study."}
          </p>
        </section>

        <section class="syllabus-summary-panel liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h3 class="panel-title">The Bigger Picture</h3>
              <p class="panel-subtitle">CBSE Class XII 2027 Coverage</p>
            </div>
            <a href="#academics" class="link-action" data-nav="academics">View all ${icon("arrow-right", 14)}</a>
          </div>

          <div class="progress-bar-container">
            <div class="progress-fill" style="width: ${progress.overallPercent}%;"></div>
          </div>

          <div class="progress-stats-row">
            <span><strong>${progress.learnedCount}</strong> / ${progress.totalChapters} chapters learned</span>
            <span><strong>${progress.overallPercent}%</strong> self-reported coverage</span>
          </div>

          <p class="provenance-disclaimer">
            ${progress.unknownCount} chapters have no personal status yet. Unmarked means unknown; BLOOM never invents progress.
          </p>
        </section>
      </div>

      <!-- Today's Task List -->
      <section class="today-plan-section liquid-glass-panel">
        <div class="panel-head">
          <div>
            <h3 class="panel-title">Today's Study Schedule (${todayTasks.length} activities)</h3>
            <p class="panel-subtitle">Click any task to enter your interactive Study Workspace</p>
          </div>
          <div class="panel-actions">
            <button type="button" class="btn secondary" data-action="propose-plan" data-day="${todayStr}">
              ${icon("sparkles", 15)} Propose additions
            </button>
            <a href="#planner" class="btn quiet" data-nav="planner">Open Planner</a>
          </div>
        </div>

        ${todayTasks.length ? `
          <div class="task-items-list">
            ${todayTasks.map((task) => {
    const sub = getSubject(task.subjectId);
    return `
                <div class="task-card liquid-glass-subcard ${task.done ? "task-done" : ""}" data-task-id="${task.id}">
                  <div class="task-card-left">
                    <button type="button" class="task-check-btn" data-action="quick-toggle-task" data-task-id="${task.id}" aria-label="Mark task done">
                      ${task.done ? icon("check", 16) : ""}
                    </button>
                    <div class="task-info" data-action="open-study-workspace" data-task-id="${task.id}">
                      <h4 class="task-item-title">${task.title}</h4>
                      <div class="task-item-meta">
                        <span class="subject-tag subject-${task.subjectId}">${sub?.title || task.subjectId}</span>
                        <span>${icon("timer", 13)} ${task.minutes} min</span>
                        ${task.time ? `<span>${task.time}</span>` : ""}
                        ${task.activityType ? `<span class="activity-pill">${task.activityType.replace("_", " ")}</span>` : ""}
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn quiet btn-sm" data-action="open-study-workspace" data-task-id="${task.id}">
                    Study ${icon("arrow-right", 14)}
                  </button>
                </div>
              `;
  }).join("")}
          </div>
        ` : `
          <div class="empty-state-card">
            <p class="empty-text">No activities scheduled for today yet.</p>
            <button type="button" class="btn primary" data-action="propose-plan" data-day="${todayStr}">
              ${icon("plus", 16)} Generate Proposed Plan for Today
            </button>
          </div>
        `}
      </section>
    </div>
  `;
}

// src/ui/planner-view.ts
function renderPlannerView(state, selectedDate) {
  const activeDate = selectedDate || getIsoDate();
  const availability = calculateAvailability(state, activeDate);
  const tasks = state.tasks.filter((t) => t.day === activeDate);
  const ideas = getRankedStudyIdeas(state, activeDate).slice(0, 8);
  const prevDate = addDays(activeDate, -1);
  const nextDate = addDays(activeDate, 1);
  return `
    <div class="page-container planner-page">
      <!-- Date Bar & Controls -->
      <header class="planner-header liquid-glass-panel">
        <div class="date-navigator">
          <button type="button" class="btn quiet date-nav-btn" data-action="change-date" data-day="${prevDate}">
            ${icon("arrow-left", 18)}
          </button>
          <div class="current-date-info">
            <h1 class="active-date-heading">${new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(/* @__PURE__ */ new Date(activeDate + "T12:00:00Z"))}</h1>
            <span class="active-date-sub">${tasks.length} activities scheduled \xB7 ${Math.floor(availability.availableMinutes / 60)}h ${availability.availableMinutes % 60}m available</span>
          </div>
          <button type="button" class="btn quiet date-nav-btn" data-action="change-date" data-day="${nextDate}">
            ${icon("arrow-right", 18)}
          </button>
        </div>

        <div class="planner-top-actions">
          <div class="date-commitments">
            <label class="toggle-pill ${availability.school ? "active" : ""}">
              <input type="checkbox" data-action="toggle-school" data-day="${activeDate}" ${availability.school ? "checked" : ""}>
              <span>School</span>
            </label>
            <label class="toggle-pill ${availability.tuition ? "active" : ""}">
              <input type="checkbox" data-action="toggle-tuition" data-day="${activeDate}" ${availability.tuition ? "checked" : ""}>
              <span>Tuition</span>
            </label>
          </div>

          <button type="button" class="btn secondary" data-action="rescue-backlog" data-day="${activeDate}">
            ${icon("rotate-ccw", 15)} Rescue Backlog
          </button>
          <button type="button" class="btn primary" data-action="propose-plan" data-day="${activeDate}">
            ${icon("sparkles", 15)} Propose Plan
          </button>
        </div>
      </header>

      <!-- Two column planner layout -->
      <div class="planner-layout">
        <!-- Main Scheduled Tasks List -->
        <main class="planner-main-column">
          <div class="column-card liquid-glass-panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">Scheduled Activities</h2>
                <p class="panel-subtitle">Click any activity to open the interactive Study Workspace</p>
              </div>
              <button type="button" class="btn quiet btn-sm" data-action="open-add-custom-task" data-day="${activeDate}">
                ${icon("plus", 14)} Add custom activity
              </button>
            </div>

            ${tasks.length ? `
              <div class="planner-task-list">
                ${tasks.map((task) => {
    const sub = getSubject(task.subjectId);
    return `
                    <div class="planner-task-card liquid-glass-subcard ${task.done ? "task-done" : ""}" data-task-id="${task.id}">
                      <div class="task-drag-handle" aria-hidden="true">\u22EE\u22EE</div>
                      <button type="button" class="task-check-btn" data-action="quick-toggle-task" data-task-id="${task.id}" aria-label="Toggle completed">
                        ${task.done ? icon("check", 16) : ""}
                      </button>
                      <div class="task-content" data-action="open-study-workspace" data-task-id="${task.id}">
                        <div class="task-title-row">
                          <h3 class="task-title">${task.title}</h3>
                          <span class="subject-tag subject-${task.subjectId}">${sub?.title || task.subjectId}</span>
                        </div>
                        <p class="task-reason">${task.recommendationReason || ""}</p>
                        <div class="task-footer">
                          <span>${icon("timer", 14)} ${task.minutes} min</span>
                          ${task.time ? `<span>${task.time}</span>` : ""}
                          <span class="activity-pill">${task.activityType.replace("_", " ")}</span>
                        </div>
                      </div>
                      <div class="task-actions">
                        <button type="button" class="btn-icon" data-action="delete-task" data-task-id="${task.id}" aria-label="Delete task">
                          ${icon("trash", 16)}
                        </button>
                      </div>
                    </div>
                  `;
  }).join("")}
              </div>
            ` : `
              <div class="empty-state-card">
                <p class="empty-text">No study activities scheduled for this date.</p>
                <div class="empty-actions">
                  <button type="button" class="btn primary" data-action="propose-plan" data-day="${activeDate}">
                    ${icon("sparkles", 16)} Propose Balanced Schedule
                  </button>
                </div>
              </div>
            `}
          </div>
        </main>

        <!-- Right Side: Actionable Suggestions Rail -->
        <aside class="planner-side-rail">
          <div class="column-card liquid-glass-panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">Recommended Study</h2>
                <p class="panel-subtitle">Actionable next activities based on your CBSE priorities</p>
              </div>
            </div>

            <div class="suggested-ideas-list">
              ${ideas.map((idea) => {
    const sub = getSubject(idea.subjectId);
    return `
                  <div class="idea-card liquid-glass-subcard">
                    <div class="idea-top">
                      <span class="subject-tag subject-${idea.subjectId}">${sub?.title || idea.subjectId}</span>
                      <span class="duration-badge">${idea.minutes}m</span>
                    </div>
                    <h4 class="idea-title">${idea.title}</h4>
                    <p class="idea-reason">${idea.reason}</p>
                    <div class="idea-actions">
                      <button type="button" class="btn secondary btn-sm" data-action="add-idea-to-plan" data-idea='${JSON.stringify({
      title: idea.title,
      subjectId: idea.subjectId,
      chapterId: idea.chapterId,
      topicId: idea.topicId,
      activityType: idea.activityType,
      objective: idea.objective,
      steps: idea.steps,
      resourceRefs: idea.resourceRefs,
      completionEvidence: idea.completionEvidence,
      minutes: idea.minutes,
      reason: idea.reason
    }).replace(/'/g, "&#39;")}'>
                        ${icon("plus", 14)} Add to today
                      </button>
                    </div>
                  </div>
                `;
  }).join("")}
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

// src/ui/academics-view.ts
function renderAcademicsView(state, activeSubjectId = "physics") {
  const todayStr = getIsoDate();
  const currentSubject = getSubject(activeSubjectId) || CBSE_SUBJECTS[0];
  const chapters = CBSE_CHAPTERS.filter((c) => c.subjectId === currentSubject.id);
  const progress = computeAcademicProgress(state);
  const subStats = progress.subjectStats[currentSubject.id];
  const examDaysAway = daysDifference(todayStr, currentSubject.examDate);
  return `
    <div class="page-container academics-page">
      <header class="academics-header liquid-glass-panel">
        <div>
          <span class="eyebrow-text">OFFICIAL CBSE CLASS XII 2026-27</span>
          <h1 class="page-title">Academics & Syllabus</h1>
          <p class="page-subtitle">Track your learning status topic by topic. Unmarked means unknown until you set it.</p>
        </div>

        <!-- 5 Subject Tab Pills -->
        <nav class="subject-tabs-nav" aria-label="Subjects">
          ${CBSE_SUBJECTS.map((s) => `
            <button type="button" class="subject-nav-pill ${s.id === currentSubject.id ? "active" : ""}" data-action="switch-subject" data-subject-id="${s.id}">
              <span class="sub-pill-code">${s.code}</span>
              <span class="sub-pill-title">${s.title}</span>
            </button>
          `).join("")}
        </nav>
      </header>

      <!-- Subject Overview Card -->
      <section class="subject-meta-card liquid-glass-panel">
        <div class="sub-meta-top">
          <div>
            <span class="subject-tag subject-${currentSubject.id}">CBSE ${currentSubject.code} \xB7 ${currentSubject.title}</span>
            <h2 class="sub-headline">${currentSubject.title} Board Examination</h2>
            <p class="sub-exam-details">
              ${new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(/* @__PURE__ */ new Date(currentSubject.examDate + "T12:00:00Z"))} \xB7 ${currentSubject.examTime}
            </p>
          </div>
          <div class="sub-countdown-box glass-subcard">
            <strong class="countdown-days">${examDaysAway > 0 ? examDaysAway : 0}</strong>
            <span>days until board paper</span>
          </div>
        </div>

        <div class="sub-meta-details-row">
          <span><strong>Assessment Structure:</strong> ${currentSubject.theoryMarks} Theory + ${currentSubject.internalMarks} Practical / Internal</span>
          <span><strong>Learned:</strong> ${subStats.learned} of ${subStats.total} chapters (${subStats.percent}%)</span>
        </div>

        <div class="sub-official-note glass-subcard">
          <span class="note-icon">${icon("shield-check", 16)}</span>
          <p>${currentSubject.officialNote} <a href="${currentSubject.syllabusUrl}" target="_blank" rel="noopener" class="official-link">Official CBSE Syllabus PDF ${icon("external-link", 12)}</a></p>
        </div>
      </section>

      <!-- Chapters & Topics List -->
      <section class="chapters-accordion-section">
        <h3 class="section-title">Course Units & Chapters</h3>

        <div class="chapters-stack">
          ${chapters.map((chap) => {
    const p = state.chapterProgress[chap.id];
    const status = p?.status || "Not started";
    const rating = p?.rating;
    return `
              <article class="chapter-card liquid-glass-panel" data-chapter-id="${chap.id}">
                <div class="chapter-header-row">
                  <div class="chapter-info">
                    <span class="unit-group-pill">${chap.unitGroup}</span>
                    <h4 class="chapter-title">${chap.title}</h4>
                    <span class="ncert-text">${chap.ncertRef}</span>
                  </div>

                  <div class="chapter-status-controls">
                    <div class="select-wrapper">
                      <label class="sr-only" for="status-${chap.id}">Status for ${chap.title}</label>
                      <select id="status-${chap.id}" class="glass-select status-select" data-action="update-chapter-status" data-chapter-id="${chap.id}">
                        <option value="Not started" ${status === "Not started" ? "selected" : ""}>Not started</option>
                        <option value="Learning" ${status === "Learning" ? "selected" : ""}>Learning</option>
                        <option value="Learned" ${status === "Learned" ? "selected" : ""}>Learned</option>
                        <option value="Practising" ${status === "Practising" ? "selected" : ""}>Practising</option>
                        <option value="Needs revision" ${status === "Needs revision" ? "selected" : ""}>Needs revision</option>
                        <option value="Exam ready" ${status === "Exam ready" ? "selected" : ""}>Exam ready</option>
                      </select>
                    </div>

                    <div class="select-wrapper">
                      <label class="sr-only" for="rating-${chap.id}">Clarity for ${chap.title}</label>
                      <select id="rating-${chap.id}" class="glass-select rating-select" data-action="update-chapter-rating" data-chapter-id="${chap.id}">
                        <option value="" ${!rating ? "selected" : ""}>No Rating</option>
                        <option value="Difficult" ${rating === "Difficult" ? "selected" : ""}>Difficult</option>
                        <option value="Okay" ${rating === "Okay" ? "selected" : ""}>Okay</option>
                        <option value="Easy" ${rating === "Easy" ? "selected" : ""}>Easy</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Topics list under this chapter -->
                <div class="topics-container">
                  <span class="topics-heading">Prescribed Topics & Learning Activities:</span>
                  <div class="topics-grid">
                    ${chap.topics.map((top) => `
                      <div class="topic-subcard glass-subcard">
                        <div class="topic-header">
                          <h5 class="topic-title">${top.title}</h5>
                          <span class="topic-ref">${top.ncertRef}</span>
                        </div>

                        <ul class="core-concepts-pills">
                          ${top.coreConcepts.map((c) => `<li>${c}</li>`).join("")}
                        </ul>

                        <div class="topic-actions-row">
                          <button type="button" class="btn quiet btn-sm" data-action="launch-topic-activity" data-chapter-id="${chap.id}" data-topic-id="${top.id}" data-mode="learning">
                            ${icon("book-open", 14)} Learn
                          </button>
                          <button type="button" class="btn quiet btn-sm" data-action="launch-topic-activity" data-chapter-id="${chap.id}" data-topic-id="${top.id}" data-mode="practice">
                            ${icon("clipboard-check", 14)} Practice Questions
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                </div>
              </article>
            `;
  }).join("")}
        </div>
      </section>
    </div>
  `;
}

// src/ui/tests-view.ts
function renderTestsView(state) {
  const todayStr = getIsoDate();
  const schoolTests = state.tests;
  return `
    <div class="page-container tests-page">
      <header class="tests-header liquid-glass-panel">
        <div>
          <span class="eyebrow-text">DATES & TEST READINESS</span>
          <h1 class="page-title">Tests & Examinations</h1>
          <p class="page-subtitle">Confirmed official board dates and your personal school test schedule.</p>
        </div>
        <button type="button" class="btn primary" data-action="open-add-test-modal">
          ${icon("plus", 16)} Add School Test
        </button>
      </header>

      <!-- Official Board Examination Date Sheet -->
      <section class="board-dates-section liquid-glass-panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${icon("shield-check", 18)} Verified 2027 Main Board Date Sheet</h2>
            <p class="panel-subtitle">Official CBSE Date Sheet Circular (06 November 2026) \xB7 10:30 AM \u2013 1:30 PM IST</p>
          </div>
        </div>

        <div class="board-dates-table-wrapper">
          <table class="glass-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Code</th>
                <th>Official Date</th>
                <th>Countdown</th>
                <th>Structure</th>
              </tr>
            </thead>
            <tbody>
              ${CBSE_SUBJECTS.map((s) => {
    const diff = daysDifference(todayStr, s.examDate);
    return `
                  <tr>
                    <td><strong>${s.title}</strong></td>
                    <td><code>${s.code}</code></td>
                    <td>${new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(/* @__PURE__ */ new Date(s.examDate + "T12:00:00Z"))}</td>
                    <td><span class="badge ${diff <= 30 ? "badge-urgent" : "badge-normal"}">${diff > 0 ? `${diff} days` : diff === 0 ? "Today" : "Completed"}</span></td>
                    <td>${s.theoryMarks} Th + ${s.internalMarks} Pr/IA</td>
                  </tr>
                `;
  }).join("")}
            </tbody>
          </table>
        </div>
      </section>

      <!-- School Tests Section -->
      <section class="school-tests-section liquid-glass-panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">Your Confirmed School Tests (${schoolTests.length})</h2>
            <p class="panel-subtitle">Entered manually or confirmed from school planner. BLOOM never invents test coverage.</p>
          </div>
        </div>

        ${schoolTests.length ? `
          <div class="school-tests-grid">
            ${schoolTests.map((test) => {
    const sub = getSubject(test.subjectId);
    const daysLeft = daysDifference(todayStr, test.day);
    const coverageChapters = test.coverageChapterIds.map((id) => getChapter(id)?.title).filter(Boolean);
    return `
                <div class="test-card liquid-glass-subcard">
                  <div class="test-card-top">
                    <span class="subject-tag subject-${test.subjectId}">${sub?.title || test.subjectId}</span>
                    <span class="test-date-badge">${test.day} (${daysLeft >= 0 ? `${daysLeft}d away` : "Past"})</span>
                  </div>

                  <h3 class="test-name">${test.title}</h3>

                  <div class="test-coverage-info">
                    <strong>Included Syllabus (${coverageChapters.length} chapters):</strong>
                    <p class="coverage-list">${coverageChapters.join(", ") || "General syllabus"}</p>
                  </div>

                  ${test.scoredMarks !== void 0 ? `
                    <div class="score-display-box glass-subcard">
                      <span>Recorded Score:</span>
                      <strong>${test.scoredMarks} / ${test.maxMarks}</strong>
                      <small>(${Math.round(test.scoredMarks / test.maxMarks * 100)}%)</small>
                    </div>
                  ` : `
                    <button type="button" class="btn secondary btn-sm" data-action="open-enter-score-modal" data-test-id="${test.id}">
                      ${icon("edit", 14)} Enter Test Score
                    </button>
                  `}
                </div>
              `;
  }).join("")}
          </div>
        ` : `
          <div class="empty-state-card">
            <p class="empty-text">No upcoming school tests added yet.</p>
            <button type="button" class="btn secondary" data-action="open-add-test-modal">
              ${icon("plus", 16)} Add your next school test
            </button>
          </div>
        `}
      </section>
    </div>
  `;
}

// src/ui/tools-view.ts
function renderToolsView(state) {
  const mistakes = state.mistakes;
  const garden = state.garden;
  return `
    <div class="page-container tools-page">
      <header class="tools-header liquid-glass-panel">
        <div>
          <span class="eyebrow-text">PERSONAL STUDY VAULT & TOOLS</span>
          <h1 class="page-title">Your Space</h1>
          <p class="page-subtitle">Mistake Journal, tranquil garden growth, practicals, and private settings.</p>
        </div>
      </header>

      <!-- Grid of Tools -->
      <div class="tools-grid">
        <!-- Mistake Journal Card -->
        <section class="tool-section-card liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${icon("alert-circle", 18)} Mistake Journal (${mistakes.length})</h2>
              <p class="panel-subtitle">Turn errors into mastery. Scheduled retry activities target root causes.</p>
            </div>
            <button type="button" class="btn secondary btn-sm" data-action="open-new-mistake-modal">
              ${icon("plus", 14)} Add Entry
            </button>
          </div>

          ${mistakes.length ? `
            <div class="mistakes-stack">
              ${mistakes.map((m) => {
    const sub = getSubject(m.subjectId);
    const chap = getChapter(m.chapterId);
    return `
                  <div class="mistake-item glass-subcard ${m.resolved ? "mistake-resolved" : ""}">
                    <div class="mistake-item-top">
                      <span class="subject-tag subject-${m.subjectId}">${sub?.title || m.subjectId}</span>
                      <span class="root-cause-badge cause-${m.rootCause}">${m.rootCause.replace("_", " ")}</span>
                      <span class="mistake-date">${m.date}</span>
                    </div>

                    <h4 class="mistake-question">${m.questionDesc}</h4>
                    <p class="mistake-chap-label">${chap?.title || ""}</p>

                    <div class="mistake-notes-block">
                      <p><strong>What went wrong:</strong> ${m.studentNotes}</p>
                      ${m.correctApproach ? `<p><strong>Key lesson / correction:</strong> ${m.correctApproach}</p>` : ""}
                    </div>

                    <div class="mistake-actions">
                      ${!m.resolved ? `
                        <button type="button" class="btn primary btn-sm" data-action="schedule-mistake-retry" data-mistake-id="${m.id}">
                          ${icon("rotate-ccw", 14)} Schedule Retry Session
                        </button>
                        <button type="button" class="btn quiet btn-sm" data-action="toggle-mistake-resolved" data-mistake-id="${m.id}">
                          Mark Resolved
                        </button>
                      ` : `
                        <span class="resolved-badge">${icon("check", 14)} Mastered</span>
                      `}
                    </div>
                  </div>
                `;
  }).join("")}
            </div>
          ` : `
            <div class="empty-state-card">
              <p class="empty-text">No mistakes logged yet. When you hit a stumbling block in numericals or questions, log it here to automatically schedule a retry.</p>
              <button type="button" class="btn secondary btn-sm" data-action="open-new-mistake-modal">
                ${icon("plus", 14)} Log your first mistake note
              </button>
            </div>
          `}
        </section>

        <!-- Bloom Garden Card -->
        <section class="tool-section-card liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${icon("flower", 18)} Bloom Garden</h2>
              <p class="panel-subtitle">Calm reflection on your real focus. Never withers or penalizes missed days.</p>
            </div>
          </div>

          <div class="garden-stage-display glass-subcard">
            <div class="garden-plant-visual">
              <div class="botanical-bloom-icon" aria-hidden="true">\u{1F338}</div>
            </div>
            <div class="garden-status-text">
              <h3 class="plant-name">${garden.plantType} \xB7 Level ${garden.level}</h3>
              <p class="plant-quote">"True understanding grows with steady, calm steps."</p>
              <div class="growth-metric">
                <span>Growth Points: <strong>${garden.growthPoints}</strong> (earned through saved focus sessions)</span>
                <span>Blooms Achieved: <strong>${garden.bloomsEarned}</strong></span>
              </div>
            </div>
          </div>

          <p class="provenance-disclaimer">
            Garden progress is built on genuine focus sessions recorded by you. If you take a rest day, your garden calmly waits for your return.
          </p>
        </section>

        <!-- Practicals & Project Tracker -->
        <section class="tool-section-card liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${icon("clipboard-check", 18)} CBSE Practicals & Internal Assessment</h2>
              <p class="panel-subtitle">Official 30-mark (Science/PE) and 20-mark (Math/English) guidelines.</p>
            </div>
          </div>

          <div class="practicals-list">
            <div class="practical-row glass-subcard">
              <div>
                <strong>Physics (042) \u2014 30 Marks Practical</strong>
                <p>Two experiments (one from each section: 7+7), practical record file (5), one activity from each section (3+3), viva voce (5).</p>
              </div>
            </div>

            <div class="practical-row glass-subcard">
              <div>
                <strong>Chemistry (043) \u2014 30 Marks Practical</strong>
                <p>Volumetric analysis (8), Salt analysis (8), Content based experiment (6), Project work (4), Class record and viva (4).</p>
              </div>
            </div>

            <div class="practical-row glass-subcard">
              <div>
                <strong>Physical Education (048) \u2014 30 Marks Practical</strong>
                <p>Physical fitness test (6), Proficiency in games/sports (7), Yogic practices (7), Record file (5), Viva voce (5).</p>
              </div>
            </div>

            <div class="practical-row glass-subcard">
              <div>
                <strong>English Core (301) \u2014 20 Marks Assessment</strong>
                <p>Listening test (5), Speaking skills presentation (5), Project file & viva (10).</p>
              </div>
            </div>

            <div class="practical-row glass-subcard">
              <div>
                <strong>Mathematics (041) \u2014 20 Marks Internal Assessment</strong>
                <p>Periodic tests best 2 out of 3 (10), Mathematics activities record file & viva (10).</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Security, Privacy & App Settings -->
        <section class="tool-section-card liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${icon("lock", 18)} Privacy & Vault Protection</h2>
              <p class="panel-subtitle">Aastha alone holds data access. Zero cloud surveillance.</p>
            </div>
          </div>

          <div class="settings-stack">
            <div class="setting-row">
              <div>
                <strong>Local Vault Encryption (AES-GCM 256-bit)</strong>
                <p>Optionally seal your private records with a passphrase so no one on this device can read them without it.</p>
              </div>
              <button type="button" class="btn secondary btn-sm" data-action="open-vault-modal">
                ${state.vaultPassphraseSet ? icon("unlock", 14) + " Change Passphrase" : icon("lock", 14) + " Enable Passphrase"}
              </button>
            </div>

            <div class="setting-row">
              <div>
                <strong>Encrypted JSON Data Backup</strong>
                <p>Download a complete, offline encrypted copy of your preparation profile and records.</p>
              </div>
              <button type="button" class="btn secondary btn-sm" data-action="export-vault-backup">
                Download Backup
              </button>
            </div>

            <div class="setting-row">
              <div>
                <strong>Reduced Motion</strong>
                <p>Minimize UI spring animations and transitions for calmer navigation.</p>
              </div>
              <input type="checkbox" class="toggle-switch" data-action="toggle-reduced-motion" ${state.reduceMotion ? "checked" : ""}>
            </div>
          </div>
        </section>
      </div>
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
    <div class="workspace-backdrop" data-workspace-id="${task.id}">
      <div class="workspace-panel liquid-glass-panel">
        <header class="workspace-header">
          <div class="workspace-meta">
            <span class="subject-tag subject-${task.subjectId}">${subject?.title || task.subjectId}</span>
            <span class="activity-type-badge">${task.activityType.replace("_", " ")}</span>
            <span class="duration-badge">${icon("timer", 14)} ${task.minutes} min</span>
          </div>
          <button type="button" class="btn-icon close-workspace" data-action="close-workspace" aria-label="Close Study Workspace">
            ${icon("x", 20)}
          </button>
        </header>

        <div class="workspace-body">
          <div class="workspace-main">
            <h1 class="workspace-title">${task.title}</h1>
            <p class="workspace-chapter">${chapter?.title || "Chapter Study"} \xB7 ${chapter?.unitGroup || ""}</p>

            ${task.recommendationReason ? `
              <div class="why-card glass-subcard">
                <span class="why-label">${icon("sparkles", 15)} Why this is next</span>
                <p class="why-text">${task.recommendationReason}</p>
              </div>
            ` : ""}

            <section class="workspace-section">
              <h2 class="section-heading">${icon("bookmark", 16)} Learning Objective</h2>
              <div class="objective-card glass-subcard">
                <p>${task.learningObjective || "Master core concepts and verify independent understanding through practice."}</p>
              </div>
            </section>

            <section class="workspace-section">
              <h2 class="section-heading">${icon("clipboard-check", 16)} Actionable Steps (${completedIndices.size}/${steps.length})</h2>
              <div class="steps-list">
                ${steps.map((step, idx) => {
    const isDone = completedIndices.has(idx);
    return `
                    <label class="step-item ${isDone ? "step-completed" : ""}">
                      <input type="checkbox" class="step-checkbox" data-task-id="${task.id}" data-step-index="${idx}" ${isDone ? "checked" : ""}>
                      <span class="step-number">${idx + 1}</span>
                      <span class="step-text">${step}</span>
                    </label>
                  `;
  }).join("")}
              </div>
            </section>

            <section class="workspace-section">
              <h2 class="section-heading">${icon("book-open", 16)} Verified Sourced Resources</h2>
              <div class="resources-list">
                ${(task.resourceRefs && task.resourceRefs.length ? task.resourceRefs : [chapter?.ncertRef || "NCERT Class XII Text"]).map((ref) => `
                  <div class="resource-card glass-subcard">
                    <span class="resource-icon">${icon("shield-check", 16)}</span>
                    <div class="resource-info">
                      <strong>${ref}</strong>
                      <span class="provenance-note">Official CBSE Syllabus Prescribed Reference</span>
                    </div>
                  </div>
                `).join("")}
              </div>
            </section>

            <section class="workspace-section">
              <h2 class="section-heading">${icon("alert-circle", 16)} Got Stuck or Found a Mistake?</h2>
              <button type="button" class="btn secondary log-mistake-btn" data-action="open-mistake-drawer" data-task-id="${task.id}" data-chapter-id="${task.chapterId}">
                ${icon("plus", 16)} Log Doubt / Mistake to Journal
              </button>
            </section>
          </div>

          <aside class="workspace-sidebar">
            <div class="focus-timer-card liquid-glass-card">
              <h3 class="timer-card-title">${icon("timer", 18)} Focus Session</h3>
              <div class="timer-display" id="workspace-timer-display">25:00</div>
              <div class="timer-controls">
                <button type="button" class="btn primary timer-btn" id="timer-start-pause" data-action="timer-toggle">
                  ${icon("play", 16)} <span id="timer-btn-label">Start Focus</span>
                </button>
                <button type="button" class="btn quiet timer-btn-reset" data-action="timer-reset">
                  ${icon("rotate-ccw", 16)}
                </button>
              </div>
              <p class="timer-hint">Counts actual studied seconds. Saved upon task completion.</p>
            </div>

            <div class="completion-card liquid-glass-card">
              <h3 class="completion-card-title">${icon("check", 18)} Mark Complete</h3>
              <p class="completion-hint">How did this activity feel? Select your shared clarity rating to calibrate your next spaced review:</p>

              <div class="rating-selector">
                <button type="button" class="rating-btn rating-easy" data-action="complete-task" data-task-id="${task.id}" data-rating="Easy">
                  <strong>Easy</strong>
                  <span>Review in 7 days</span>
                </button>
                <button type="button" class="rating-btn rating-okay" data-action="complete-task" data-task-id="${task.id}" data-rating="Okay">
                  <strong>Okay</strong>
                  <span>Review in 3 days</span>
                </button>
                <button type="button" class="rating-btn rating-difficult" data-action="complete-task" data-task-id="${task.id}" data-rating="Difficult">
                  <strong>Difficult</strong>
                  <span>Review tomorrow</span>
                </button>
              </div>

              <div class="evidence-box">
                <small><strong>Completion evidence:</strong> ${task.completionEvidence || "Self-checked and rating logged."}</small>
              </div>
            </div>
          </aside>
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
  selectedPlannerDate = getIsoDate();
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
      const [route, param] = hash.split("/");
      this.currentRoute = route || "today";
      if (route === "academics" && param) {
        this.activeSubjectId = param;
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
        contentHtml = renderPlannerView(this.state, this.selectedPlannerDate);
        break;
      case "academics":
        contentHtml = renderAcademicsView(this.state, this.activeSubjectId);
        break;
      case "tests":
        contentHtml = renderTestsView(this.state);
        break;
      case "tools":
      case "more":
        contentHtml = renderToolsView(this.state);
        break;
      default:
        contentHtml = renderTodayView(this.state);
    }
    const navHtml = `
      <nav class="floating-glass-nav" aria-label="Main Navigation">
        <div class="nav-capsule liquid-glass-panel">
          <a href="#today" class="nav-item ${this.currentRoute === "today" ? "active" : ""}" data-nav="today">
            ${icon("sun", 18)}
            <span>Today</span>
          </a>
          <a href="#planner" class="nav-item ${this.currentRoute === "planner" ? "active" : ""}" data-nav="planner">
            ${icon("calendar", 18)}
            <span>Planner</span>
          </a>
          <a href="#academics" class="nav-item ${this.currentRoute === "academics" ? "active" : ""}" data-nav="academics">
            ${icon("book-open", 18)}
            <span>Academics</span>
          </a>
          <a href="#tests" class="nav-item ${this.currentRoute === "tests" ? "active" : ""}" data-nav="tests">
            ${icon("clipboard-check", 18)}
            <span>Tests</span>
          </a>
          <a href="#tools" class="nav-item ${this.currentRoute === "tools" || this.currentRoute === "more" ? "active" : ""}" data-nav="tools">
            ${icon("flower", 18)}
            <span>Your Space</span>
          </a>
        </div>
      </nav>
    `;
    appEl.innerHTML = `
      <div class="app-layout">
        ${navHtml}
        <main class="main-content" id="main-content">
          ${contentHtml}
        </main>
        <div id="modal-container"></div>
      </div>
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
            window.location.hash = `#academics/${subId}`;
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
        // Close Study Workspace
        case "close-workspace": {
          this.stopTimer();
          this.activeWorkspaceTask = null;
          const modalContainer = document.getElementById("modal-container");
          if (modalContainer) modalContainer.innerHTML = "";
          this.render();
          break;
        }
        // Complete task with reflection rating (Easy/Okay/Difficult)
        case "complete-task": {
          const taskId = target.getAttribute("data-task-id");
          const rating = target.getAttribute("data-rating");
          if (taskId && this.activeWorkspaceTask && this.activeWorkspaceTask.id === taskId) {
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
            this.state.garden.growthPoints += 10;
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
        // Toggle Quick Task Done Checkbox
        case "quick-toggle-task": {
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
        // Propose Plan & Show Preview Modal
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
        // Add idea to plan directly
        case "add-idea-to-plan": {
          const ideaData = target.getAttribute("data-idea");
          if (ideaData) {
            const parsed = JSON.parse(ideaData);
            const newTask = {
              id: `task-${this.selectedPlannerDate}-${parsed.chapterId}-${Date.now().toString(36)}`,
              title: parsed.title,
              day: this.selectedPlannerDate,
              minutes: parsed.minutes || 25,
              subjectId: parsed.subjectId,
              chapterId: parsed.chapterId,
              topicId: parsed.topicId,
              activityType: parsed.activityType || "concept",
              learningObjective: parsed.objective || "",
              steps: parsed.steps || [],
              completedStepIndices: [],
              resourceRefs: parsed.resourceRefs || [],
              completionEvidence: parsed.completionEvidence || "",
              recommendationReason: parsed.reason || "",
              priority: "Normal",
              done: false,
              origin: "student"
            };
            this.state.tasks.push(newTask);
            await this.persist();
            this.render();
          }
          break;
        }
        // Launch specific topic activity from Academics
        case "launch-topic-activity": {
          const chapId = target.getAttribute("data-chapter-id");
          const topId = target.getAttribute("data-topic-id");
          const mode = target.getAttribute("data-mode") || "learning";
          const chap = getChapter(chapId || "");
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
              recommendationReason: `Direct launch from Academics \xB7 ${mode} mode`,
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
        // Timer controls in Workspace
        case "timer-toggle": {
          this.toggleTimer();
          break;
        }
        case "timer-reset": {
          this.resetTimer();
          break;
        }
        // Log Mistake drawer/modal
        case "open-mistake-drawer":
        case "open-new-mistake-modal": {
          const chapId = target.getAttribute("data-chapter-id") || "";
          this.showMistakeModal(chapId);
          break;
        }
        // Save Mistake Entry
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
        // Schedule Mistake Retry
        case "schedule-mistake-retry": {
          const mistakeId = target.getAttribute("data-mistake-id");
          const m = this.state.mistakes.find((item) => item.id === mistakeId);
          if (m) {
            const chap = getChapter(m.chapterId);
            const top = chap?.topics[0];
            const retryTask = {
              id: `retry-${m.id}`,
              title: `Re-solve: ${m.questionDesc}`,
              day: getIsoDate(),
              minutes: 15,
              subjectId: m.subjectId,
              chapterId: m.chapterId,
              topicId: m.topicId,
              activityType: "mistake_retry",
              learningObjective: `Overcome ${m.rootCause.replace("_", " ")}: ${m.studentNotes}`,
              steps: [
                "Review the previous mistake notes and where logic failed.",
                "Re-solve the full problem on blank paper without looking at hints.",
                "Verify steps and mark mistake as resolved."
              ],
              completedStepIndices: [],
              resourceRefs: top ? [top.ncertRef] : [],
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
        // Add School Test modal
        case "open-add-test-modal": {
          this.showAddTestModal();
          break;
        }
        // Save School Test
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
        // Onboarding navigation
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
          const travel = Number(document.getElementById("ob-travel")?.value) || 20;
          this.state.profile.wakeTime = wake || "07:00";
          this.state.profile.sleepTime = sleep || "23:00";
          this.state.profile.schoolStart = sStart || "08:00";
          this.state.profile.schoolEnd = sEnd || "14:00";
          this.state.profile.tuitionStart = tStart || "17:00";
          this.state.profile.tuitionEnd = tEnd || "21:00";
          this.state.profile.travelMinutes = travel;
          this.onboardingStep = 3;
          this.showOnboarding();
          break;
        }
        case "choose-session-len": {
          const mins = Number(target.getAttribute("data-mins"));
          this.state.profile.sessionMinutes = mins;
          this.showOnboarding();
          break;
        }
        case "choose-break-len": {
          const mins = Number(target.getAttribute("data-mins"));
          this.state.profile.breakMinutes = mins;
          this.showOnboarding();
          break;
        }
        case "toggle-diff-subject": {
          const subId = target.getAttribute("data-subject-id");
          if (subId) {
            const list = this.state.profile.difficultSubjects;
            if (list.includes(subId)) {
              this.state.profile.difficultSubjects = list.filter((id) => id !== subId);
            } else {
              this.state.profile.difficultSubjects.push(subId);
            }
            this.showOnboarding();
          }
          break;
        }
        case "complete-onboarding": {
          this.state.profile.onboardingComplete = true;
          const initialPlan = generatePlanProposal(this.state, getIsoDate());
          if (initialPlan.blocks.length > 0) {
            this.state.tasks.push(...initialPlan.blocks);
          }
          await this.persist();
          this.closeModal();
          this.render();
          break;
        }
        // Close generic modal
        case "close-modal": {
          this.closeModal();
          break;
        }
      }
    });
    document.addEventListener("change", async (e) => {
      const target = e.target;
      if (target.classList.contains("step-checkbox")) {
        const input = target;
        const stepIdx = Number(input.getAttribute("data-step-index"));
        if (this.activeWorkspaceTask) {
          const current = new Set(this.activeWorkspaceTask.completedStepIndices || []);
          if (input.checked) current.add(stepIdx);
          else current.delete(stepIdx);
          this.activeWorkspaceTask.completedStepIndices = Array.from(current);
          await this.persist();
          this.renderActiveWorkspace();
        }
      }
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
      if (target.classList.contains("rating-select")) {
        const select = target;
        const chapId = select.getAttribute("data-chapter-id");
        if (chapId) {
          const current = this.state.chapterProgress[chapId] || { status: "Not started" };
          current.rating = select.value || void 0;
          this.state.chapterProgress[chapId] = current;
          await this.persist();
          this.render();
        }
      }
    });
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
      <div class="modal-backdrop">
        <div class="modal-card liquid-glass-panel">
          <header class="modal-header">
            <div>
              <h2 class="modal-title">${icon("sparkles", 18)} Proposed Study Schedule</h2>
              <p class="modal-subtitle">${proposal.day} \xB7 ${proposal.blocks.length} activities proposed (${proposal.plannedMinutes} min)</p>
            </div>
            <button type="button" class="btn-icon" data-action="close-modal" aria-label="Close">
              ${icon("x", 18)}
            </button>
          </header>

          <div class="modal-body">
            <p class="proposal-intro">
              BLOOM generated these activities based on your confirmed CBSE priorities, verified marks scope, and available study windows. Review before applying:
            </p>

            <div class="proposed-blocks-list">
              ${proposal.blocks.map((b) => `
                <div class="proposal-block-item glass-subcard">
                  <div class="block-time">${b.time || "Flex"}</div>
                  <div class="block-details">
                    <div class="block-title-row">
                      <strong>${b.title}</strong>
                      <span class="subject-tag subject-${b.subjectId}">${getSubject(b.subjectId)?.title}</span>
                    </div>
                    <span class="block-reason">${b.recommendationReason}</span>
                    <span class="block-duration">${icon("timer", 13)} ${b.minutes} min \xB7 ${b.activityType.replace("_", " ")}</span>
                  </div>
                </div>
              `).join("")}
            </div>

            <div class="modal-actions">
              <button type="button" class="btn quiet" data-action="close-modal">Cancel</button>
              <button type="button" class="btn primary" data-action="approve-plan-proposal" data-proposal-blocks='${JSON.stringify(proposal.blocks).replace(/'/g, "&#39;")}'>
                ${icon("check", 16)} Approve & Save Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  showMistakeModal(prefillChapterId = "") {
    const modalContainer = document.getElementById("modal-container");
    if (!modalContainer) return;
    modalContainer.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-card liquid-glass-panel">
          <header class="modal-header">
            <div>
              <h2 class="modal-title">${icon("alert-circle", 18)} Log Doubt or Mistake</h2>
              <p class="modal-subtitle">Capturing mistakes immediately transforms them into spaced retries.</p>
            </div>
            <button type="button" class="btn-icon" data-action="close-modal" aria-label="Close">
              ${icon("x", 18)}
            </button>
          </header>

          <div class="modal-body">
            <div class="form-stack">
              <label class="form-field">
                <span>Subject & Chapter</span>
                <select id="m-chap" class="glass-select">
                  <option value="phy-1" ${prefillChapterId === "phy-1" ? "selected" : ""}>Physics: Electric Charges & Fields</option>
                  <option value="phy-2" ${prefillChapterId === "phy-2" ? "selected" : ""}>Physics: Electrostatic Potential & Capacitance</option>
                  <option value="phy-3" ${prefillChapterId === "phy-3" ? "selected" : ""}>Physics: Current Electricity</option>
                  <option value="phy-9" ${prefillChapterId === "phy-9" ? "selected" : ""}>Physics: Ray Optics</option>
                  <option value="chem-1" ${prefillChapterId === "chem-1" ? "selected" : ""}>Chemistry: Solutions</option>
                  <option value="chem-2" ${prefillChapterId === "chem-2" ? "selected" : ""}>Chemistry: Electrochemistry</option>
                  <option value="math-1" ${prefillChapterId === "math-1" ? "selected" : ""}>Math: Continuity & Differentiability</option>
                  <option value="math-3" ${prefillChapterId === "math-3" ? "selected" : ""}>Math: Integrals</option>
                </select>
              </label>

              <label class="form-field">
                <span>Question or Concept Problem</span>
                <input type="text" id="m-desc" class="glass-input" placeholder="e.g. Lens Maker focal length shift in water" required>
              </label>

              <label class="form-field">
                <span>Root Cause of Error</span>
                <select id="m-cause" class="glass-select">
                  <option value="conceptual">Concept Gap / Misunderstanding</option>
                  <option value="calculation">Calculation or Sign Convention Slip</option>
                  <option value="formula_recall">Formula Forgotten / Incomplete</option>
                  <option value="presentation">Presentation / Step Justification</option>
                  <option value="misread_question">Misread Question Details</option>
                </select>
              </label>

              <label class="form-field">
                <span>What went wrong?</span>
                <textarea id="m-notes" class="glass-textarea" placeholder="Explain where your thinking faltered..."></textarea>
              </label>

              <label class="form-field">
                <span>Correct Method or Key Takeaway</span>
                <textarea id="m-correction" class="glass-textarea" placeholder="Note the right equation or principle..."></textarea>
              </label>

              <div class="modal-actions">
                <button type="button" class="btn quiet" data-action="close-modal">Cancel</button>
                <button type="button" class="btn primary" data-action="save-mistake-entry">
                  ${icon("check", 16)} Save to Mistake Journal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  showAddTestModal() {
    const modalContainer = document.getElementById("modal-container");
    if (!modalContainer) return;
    modalContainer.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-card liquid-glass-panel">
          <header class="modal-header">
            <div>
              <h2 class="modal-title">${icon("plus", 18)} Add School Test</h2>
              <p class="modal-subtitle">Save a confirmed test to automatically prioritize its syllabus.</p>
            </div>
            <button type="button" class="btn-icon" data-action="close-modal" aria-label="Close">
              ${icon("x", 18)}
            </button>
          </header>

          <div class="modal-body">
            <div class="form-stack">
              <label class="form-field">
                <span>Test Name</span>
                <input type="text" id="test-title" class="glass-input" placeholder="e.g. Pre-Board 1 Physics" required>
              </label>

              <label class="form-field">
                <span>Subject</span>
                <select id="test-sub" class="glass-select">
                  <option value="physics">Physics (042)</option>
                  <option value="chemistry">Chemistry (043)</option>
                  <option value="math">Mathematics (041)</option>
                  <option value="english">English Core (301)</option>
                  <option value="pe">Physical Education (048)</option>
                </select>
              </label>

              <label class="form-field">
                <span>Test Date</span>
                <input type="date" id="test-date" class="glass-input" value="${addDays(getIsoDate(), 7)}" required>
              </label>

              <label class="form-field">
                <span>Maximum Marks</span>
                <input type="number" id="test-max" class="glass-input" value="70" min="10" max="100">
              </label>

              <div class="modal-actions">
                <button type="button" class="btn quiet" data-action="close-modal">Cancel</button>
                <button type="button" class="btn primary" data-action="save-school-test">
                  ${icon("check", 16)} Save Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  // Timer Management
  initTimerForTask(task) {
    this.stopTimer();
    this.timerTotalAllocated = (task.minutes || 25) * 60;
    this.timerSeconds = this.timerTotalAllocated;
    this.timerSessionElapsed = 0;
    this.timerRunning = false;
  }
  toggleTimer() {
    if (this.timerRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }
  startTimer() {
    if (this.timerRunning) return;
    this.timerRunning = true;
    this.updateTimerControlsUI();
    this.timerInterval = window.setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        this.timerSessionElapsed++;
        this.updateTimerDisplay();
      } else {
        this.stopTimer();
        alert("Focus session complete! Time to reflect and log your understanding rating.");
      }
    }, 1e3);
  }
  pauseTimer() {
    this.timerRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.updateTimerControlsUI();
  }
  stopTimer() {
    this.pauseTimer();
  }
  resetTimer() {
    this.pauseTimer();
    this.timerSeconds = this.timerTotalAllocated;
    this.updateTimerDisplay();
  }
  updateTimerDisplay() {
    const displayEl = document.getElementById("workspace-timer-display");
    if (!displayEl) return;
    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;
    displayEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  updateTimerControlsUI() {
    const btnEl = document.getElementById("timer-start-pause");
    const labelEl = document.getElementById("timer-btn-label");
    if (!btnEl || !labelEl) return;
    if (this.timerRunning) {
      labelEl.textContent = "Pause";
      btnEl.classList.add("timer-running");
    } else {
      labelEl.textContent = "Resume";
      btnEl.classList.remove("timer-running");
    }
  }
};
window.addEventListener("DOMContentLoaded", () => {
  const app = new BloomApp();
  app.init().catch((err) => console.error("Error starting BLOOM:", err));
});
//# sourceMappingURL=app.bundle.js.map
