"use client";

export interface ChildProfile {
  name: string;
  avatar: string; // emoji
  createdAt: string;
}

export interface ProgressState {
  completedLessons: string[]; // ["1-1", "1-2", ...]
  completedChallenges: number[]; // [1, 2, ...]
  earnedBadges: string[]; // ["AI Spotter", ...]
  xp: number;
  streak: number;
  lastActiveDate: string; // ISO date string
  totalMinutes: number;
}

const PROFILE_KEY = "ai_explorer_profile";
const PROGRESS_KEY = "ai_explorer_progress";
const SUBSCRIPTION_KEY = "ai_explorer_subscribed";

export function getProfile(): ChildProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setProfile(profile: ChildProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getProgress(): ProgressState {
  if (typeof window === "undefined") return defaultProgress();
  const raw = localStorage.getItem(PROGRESS_KEY);
  return raw ? JSON.parse(raw) : defaultProgress();
}

function defaultProgress(): ProgressState {
  return {
    completedLessons: [],
    completedChallenges: [],
    earnedBadges: [],
    xp: 0,
    streak: 0,
    lastActiveDate: "",
    totalMinutes: 0,
  };
}

export function saveProgress(progress: ProgressState): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function completeLesson(lessonId: string, xpReward: number): ProgressState {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.xp += xpReward;
    progress.totalMinutes += 7; // avg lesson time
    updateStreak(progress);
  }
  saveProgress(progress);
  return progress;
}

export function completeChallenge(
  worldId: number,
  badgeName: string,
  xpReward: number
): ProgressState {
  const progress = getProgress();
  if (!progress.completedChallenges.includes(worldId)) {
    progress.completedChallenges.push(worldId);
    progress.xp += xpReward;
    progress.totalMinutes += 15;
    updateStreak(progress);
  }
  if (!progress.earnedBadges.includes(badgeName)) {
    progress.earnedBadges.push(badgeName);
  }
  saveProgress(progress);
  return progress;
}

function updateStreak(progress: ProgressState): void {
  const today = new Date().toDateString();
  const lastActive = progress.lastActiveDate;
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastActive === today) return;
  if (lastActive === yesterday) {
    progress.streak += 1;
  } else if (lastActive !== today) {
    progress.streak = 1;
  }
  progress.lastActiveDate = today;
}

export function isLessonCompleted(lessonId: string): boolean {
  return getProgress().completedLessons.includes(lessonId);
}

export function isChallengeCompleted(worldId: number): boolean {
  return getProgress().completedChallenges.includes(worldId);
}

export function isLessonUnlocked(
  worldId: number,
  lessonNumber: number,
  isSubscribed: boolean,
  tier: "free" | "paid"
): boolean {
  // TODO: restore paywall — if (tier === "paid" && !isSubscribed) return false;
  if (lessonNumber === 1) return true;
  const prevLessonId = `${worldId}-${lessonNumber - 1}`;
  return isLessonCompleted(prevLessonId);
}

export function isWorldUnlocked(
  worldId: number,
  isSubscribed: boolean,
  tier: "free" | "paid"
): boolean {
  // TODO: restore paywall — if (tier === "paid" && !isSubscribed) return false;
  if (worldId === 1) return true;
  return isChallengeCompleted(worldId - 1);
}

export function getXPLevel(xp: number): { level: number; title: string; nextLevelXp: number } {
  const levels = [
    { min: 0, title: "Rookie Explorer" },
    { min: 200, title: "AI Apprentice" },
    { min: 500, title: "Data Detective" },
    { min: 900, title: "Pattern Pro" },
    { min: 1400, title: "AI Wizard" },
    { min: 2000, title: "Master Explorer" },
  ];
  let level = 1;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].min) {
      level = i + 1;
      break;
    }
  }
  const nextMin = levels[level] ? levels[level].min : levels[levels.length - 1].min;
  return {
    level,
    title: levels[level - 1].title,
    nextLevelXp: nextMin,
  };
}

export function getIsSubscribed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SUBSCRIPTION_KEY) === "true";
}

export function setSubscribed(value: boolean): void {
  localStorage.setItem(SUBSCRIPTION_KEY, String(value));
}

export function resetProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(SUBSCRIPTION_KEY);
}

// DEV helper — unlock everything for demo
export function devUnlockAll(): void {
  const progress = getProgress();
  progress.completedLessons = [
    "1-1","1-2","1-3","1-4",
    "2-1","2-2","2-3","2-4","2-5",
  ];
  progress.completedChallenges = [1, 2];
  progress.earnedBadges = ["AI Spotter", "Data Trainer"];
  progress.xp = 650;
  progress.streak = 5;
  saveProgress(progress);
  setSubscribed(false);
}

// Merge localStorage progress with Supabase progress.
// Takes the union of completed items and the max of numeric values.
export function mergeProgress(
  local: ProgressState,
  remote: ProgressState
): ProgressState {
  return {
    completedLessons: Array.from(
      new Set([...remote.completedLessons, ...local.completedLessons])
    ),
    completedChallenges: Array.from(
      new Set([...remote.completedChallenges, ...local.completedChallenges])
    ),
    earnedBadges: Array.from(
      new Set([...remote.earnedBadges, ...local.earnedBadges])
    ),
    xp: Math.max(remote.xp, local.xp),
    streak: Math.max(remote.streak, local.streak),
    lastActiveDate:
      remote.lastActiveDate > local.lastActiveDate
        ? remote.lastActiveDate
        : local.lastActiveDate,
    totalMinutes: Math.max(remote.totalMinutes, local.totalMinutes),
  };
}
