import { createClient } from "@/lib/supabase/client";
import type { ProgressState, ChildProfile } from "@/lib/progress";

export async function fetchProfile(
  userId: string
): Promise<ChildProfile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("name, avatar, created_at")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return {
    name: data.name,
    avatar: data.avatar,
    createdAt: data.created_at,
  };
}

export async function updateProfile(
  userId: string,
  profile: { name: string; avatar: string }
): Promise<void> {
  const supabase = createClient();
  await supabase
    .from("profiles")
    .update({ name: profile.name, avatar: profile.avatar })
    .eq("id", userId);
}

export async function fetchProgress(
  userId: string
): Promise<ProgressState | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return {
    completedLessons: data.completed_lessons || [],
    completedChallenges: data.completed_challenges || [],
    earnedBadges: data.earned_badges || [],
    xp: data.xp,
    streak: data.streak,
    lastActiveDate: data.last_active_date,
    totalMinutes: data.total_minutes,
  };
}

export async function saveProgressToDb(
  userId: string,
  progress: ProgressState
): Promise<void> {
  const supabase = createClient();
  await supabase
    .from("progress")
    .update({
      completed_lessons: progress.completedLessons,
      completed_challenges: progress.completedChallenges,
      earned_badges: progress.earnedBadges,
      xp: progress.xp,
      streak: progress.streak,
      last_active_date: progress.lastActiveDate,
      total_minutes: progress.totalMinutes,
    })
    .eq("id", userId);
}

export async function fetchSubscriptionStatus(
  userId: string
): Promise<{
  isSubscribed: boolean;
  status: string;
  planType: string | null;
}> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("status, plan_type, current_period_end")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return { isSubscribed: false, status: "inactive", planType: null };
  }

  const isActive =
    data.status === "active" ||
    data.status === "trialing" ||
    (data.status === "past_due" &&
      data.current_period_end &&
      new Date(data.current_period_end) > new Date());

  return {
    isSubscribed: isActive,
    status: data.status,
    planType: data.plan_type,
  };
}
