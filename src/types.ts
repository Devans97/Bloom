/**
 * BLOOM — Core Type Definitions
 * Dedicated exclusively to CBSE Class XII Board Examinations (2027) for Aastha.
 * Excludes all JEE definitions and metrics.
 */

export type SubjectId = 'physics' | 'pe' | 'chemistry' | 'english' | 'math';

export type ActivityType =
  | 'concept'          // First-time or core theory learning
  | 'derivation'       // Official CBSE physics/math derivations
  | 'numerical'        // Quantitative problem solving
  | 'ncert_exercise'   // Direct NCERT in-text & back exercises
  | 'recall'           // Active recall & formula summary review
  | 'mistake_retry'    // Re-attempting a logged error from Mistake Journal
  | 'board_practice'   // Official board-pattern SQP/PYQ questions
  | 'writing_format';  // English notice/letter/article format practice

export type Rating = 'Easy' | 'Okay' | 'Difficult';

export type ChapterStatus =
  | 'Not started'
  | 'Learning'
  | 'Learned'
  | 'Practising'
  | 'Needs revision'
  | 'Exam ready';

export interface TopicItem {
  id: string;
  chapterId: string;
  title: string;
  ncertRef: string;
  coreConcepts: string[];
  keyDerivations?: string[];
  keyFormulas?: string[];
  boardQuestionTypes: string[];
}

export interface ChapterDef {
  id: string;
  subjectId: SubjectId;
  unitGroup: string;
  unitMarks: number | null; // Group allocation strictly as published by CBSE
  title: string;
  ncertRef: string;
  topics: TopicItem[];
}

export interface SubjectDef {
  id: SubjectId;
  code: string;
  title: string;
  theoryMarks: number;
  internalMarks: number;
  examDate: string; // YYYY-MM-DD from signed official date sheet
  examTime: string; // 10:30 AM – 1:30 PM IST
  syllabusUrl: string;
  officialNote: string;
}

export interface TimeSlot {
  start: string; // "HH:MM"
  end: string;   // "HH:MM"
  label: string;
}

export interface MinuteWindow {
  start: number; // minutes from midnight
  end: number;
}

export interface LearnerProfile {
  name: string; // Aastha
  medium: 'English';
  wakeTime: string;      // default "07:00"
  sleepTime: string;     // default "23:00"
  schoolStart: string;   // "08:00"
  schoolEnd: string;     // "14:00"
  tuitionStart: string;  // "17:00"
  tuitionEnd: string;    // "21:00"
  travelMinutes: number; // travel buffer before/after school/tuition
  sessionMinutes: number; // 25, 45, 60
  breakMinutes: number;   // 5, 10
  preferredPeriods: ('morning' | 'afternoon' | 'evening')[];
  difficultSubjects: SubjectId[]; // e.g. ['physics']
  confidentSubjects: SubjectId[];
  onboardingComplete: boolean;
}

export interface DayOverride {
  school: boolean;
  tuition: boolean;
  limitMinutes?: number;
  notes?: string;
}

export interface ActionableTask {
  id: string;
  title: string;          // Specific verb-led title
  day: string;            // YYYY-MM-DD
  time?: string;          // HH:MM
  minutes: number;
  subjectId: SubjectId;
  chapterId: string;
  topicId?: string;
  activityType: ActivityType;
  learningObjective: string;
  steps: string[];
  completedStepIndices: number[];
  resourceRefs: string[]; // Verified NCERT or syllabus links
  completionEvidence: string;
  recommendationReason: string;
  priority: 'High' | 'Normal';
  done: boolean;
  completedAt?: string;
  understandingRating?: Rating;
  notes?: string;
  origin: 'generated' | 'student';
}

export interface MistakeEntry {
  id: string;
  date: string;
  subjectId: SubjectId;
  chapterId: string;
  topicId?: string;
  questionDesc: string;
  rootCause: 'conceptual' | 'calculation' | 'formula_recall' | 'presentation' | 'misread_question' | 'time_pressure' | 'other';
  studentNotes: string;
  correctApproach: string;
  resolved: boolean;
  scheduledRetryDate?: string;
}

export interface TestRecord {
  id: string;
  title: string;
  day: string;
  subjectId: SubjectId;
  coverageChapterIds: string[];
  maxMarks: number;
  scoredMarks?: number;
  isTotalOnly: boolean;
  questionScores?: { qNum: number; scored: number; max: number; topicId?: string }[];
  confirmedByLearner: boolean;
}

export interface FocusSession {
  id: string;
  taskId?: string;
  subjectId: SubjectId;
  chapterId: string;
  topicId?: string;
  day: string;
  seconds: number;
  completedAt: string;
  notes?: string;
}

export interface PracticalItem {
  id: string;
  subjectId: SubjectId;
  title: string;
  category: 'experiment' | 'record_file' | 'project' | 'viva' | 'fitness_test';
  status: 'not_started' | 'in_progress' | 'completed';
  notes?: string;
}

export interface BloomGardenState {
  level: number;
  bloomsEarned: number;
  growthPoints: number; // earned through genuine focus sessions only
  plantType: 'Rose' | 'Lotus' | 'Jasmine' | 'Peony';
}

export interface AppState {
  profile: LearnerProfile;
  chapterProgress: Record<string, { status: ChapterStatus; rating?: Rating; lastStudied?: string; nextReview?: string }>;
  dayOverrides: Record<string, DayOverride>; // YYYY-MM-DD -> { school, tuition }
  tasks: ActionableTask[];
  mistakes: MistakeEntry[];
  tests: TestRecord[];
  focusSessions: FocusSession[];
  practicals: PracticalItem[];
  garden: BloomGardenState;
  reviews: { chapterId: string; date: string; rating: Rating }[];
  reduceMotion: boolean;
  darkMode: boolean;
  vaultPassphraseSet: boolean;
}
