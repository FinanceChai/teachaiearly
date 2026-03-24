"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProgress,
  getProfile,
  getIsSubscribed,
  ProgressState,
  ChildProfile,
  completeLesson,
  completeChallenge,
  setProfile as saveProfileLocal,
  setSubscribed,
  getXPLevel,
  mergeProgress,
  saveProgress,
} from "@/lib/progress";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchProfile,
  fetchProgress,
  fetchSubscriptionStatus,
  saveProgressToDb,
  updateProfile as updateProfileDb,
} from "@/lib/supabase/database";

export function useProgress() {
  const { user, loading: authLoading } = useAuth();

  const [progress, setProgress] = useState<ProgressState>({
    completedLessons: [],
    completedChallenges: [],
    earnedBadges: [],
    xp: 0,
    streak: 0,
    lastActiveDate: "",
    totalMinutes: 0,
  });
  const [profile, setProfileState] = useState<ChildProfile | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    async function loadData() {
      if (user) {
        // Fetch from Supabase
        const [remoteProfile, remoteProgress, subStatus] = await Promise.all([
          fetchProfile(user.id),
          fetchProgress(user.id),
          fetchSubscriptionStatus(user.id),
        ]);

        // Merge localStorage into remote (handles migration)
        const localProgress = getProgress();
        const merged = remoteProgress
          ? mergeProgress(localProgress, remoteProgress)
          : localProgress;

        // If local data had extra progress, push to Supabase
        if (
          remoteProgress &&
          merged.completedLessons.length >
            remoteProgress.completedLessons.length
        ) {
          saveProgressToDb(user.id, merged);
        }

        // Cache merged data locally
        saveProgress(merged);

        setProgress(merged);
        setProfileState(remoteProfile ?? getProfile());
        setIsSubscribed(subStatus.isSubscribed);
        setSubscribed(subStatus.isSubscribed);
      } else {
        // No Supabase user — pure localStorage mode (backward compatible)
        setProgress(getProgress());
        setProfileState(getProfile());
        setIsSubscribed(getIsSubscribed());
      }
      setMounted(true);
    }

    loadData();
  }, [user, authLoading]);

  const markLessonComplete = useCallback(
    (lessonId: string, xpReward: number) => {
      const updated = completeLesson(lessonId, xpReward);
      setProgress({ ...updated });

      if (user) {
        saveProgressToDb(user.id, updated);
      }
    },
    [user]
  );

  const markChallengeComplete = useCallback(
    (worldId: number, badgeName: string, xpReward: number) => {
      const updated = completeChallenge(worldId, badgeName, xpReward);
      setProgress({ ...updated });

      if (user) {
        saveProgressToDb(user.id, updated);
      }
    },
    [user]
  );

  const updateProfile = useCallback(
    (p: ChildProfile) => {
      saveProfileLocal(p);
      setProfileState(p);

      if (user) {
        updateProfileDb(user.id, { name: p.name, avatar: p.avatar });
      }
    },
    [user]
  );

  // Initiate Stripe Checkout
  const startCheckout = useCallback(
    async (priceId: string) => {
      if (!user) {
        throw new Error("Must be logged in to subscribe");
      }

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    },
    [user]
  );

  // Kept for backward compat — simulates subscription locally
  const subscribe = useCallback(() => {
    setSubscribed(true);
    setIsSubscribed(true);
  }, []);

  const xpInfo = getXPLevel(progress.xp);

  return {
    progress,
    profile,
    isSubscribed,
    mounted,
    markLessonComplete,
    markChallengeComplete,
    updateProfile,
    subscribe,
    startCheckout,
    xpInfo,
  };
}
