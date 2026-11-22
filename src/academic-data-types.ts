import type { Rating } from './model.js';

export type AcademicNodeKind = 'subject' | 'unit' | 'chapter' | 'topic' | 'concept';
export type AcademicSourceStatus = 'verified' | 'unverified';
export type AcademicLearningStatus =
  | 'not-started'
  | 'learning'
  | 'learned'
  | 'practice-needed'
  | 'revision-due'
  | 'assessment-ready'
  | 'needs-work';
export type AcademicActivityKind =
  | 'first-learning'
  | 'concept-check'
  | 'practice'
  | 'active-recall'
  | 'assessment';

export interface AcademicSource {
  title: string;
  url: string;
  session: '2026-27';
  pdfPage?: number;
  section: string;
  checkedOn: '2026-11-21';
  status: AcademicSourceStatus;
}

export interface AcademicNode {
  id: string;
  subjectId: string;
  chapterId: string;
  parentId: string;
  kind: AcademicNodeKind;
  title: string;
  officialScope: string;
  source: AcademicSource;
}

export interface ActivityStep {
  id: string;
  instruction: string;
}

export interface ActivityDefinition {
  id: string;
  nodeId: string;
  kind: AcademicActivityKind;
  title: string;
  objective: string;
  steps: ActivityStep[];
  completionEvidence: string[];
  reflectionPrompt: string;
  estimatedMinutes: number;
  sourceRefs: AcademicSource[];
  nextActivityId?: string;
}

export interface TopicProgress {
  status: AcademicLearningStatus;
  updatedAt: string;
  lastStudied?: string;
  nextReview?: string;
  rating?: Rating;
  assessmentScore?: number;
  assessmentMax?: number;
}

export interface LearnerActivityRecord {
  activityId: string;
  status: 'not-started' | 'in-progress' | 'paused' | 'completed';
  completedSteps: string[];
  questionsAttempted?: number;
  questionsCorrect?: number;
  questionsIncorrect?: number;
  doubt?: string;
  notes?: string;
  understanding?: Rating;
  startedAt?: string;
  updatedAt: string;
  completedAt?: string;
}

export interface AcademicState {
  curriculumVersion: 'cbse-xii-2026-27-v1';
  topicProgress: Record<string, TopicProgress>;
  activities: Record<string, LearnerActivityRecord>;
}
