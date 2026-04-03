"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setProfile } from "@/lib/progress";
import { WORLDS } from "@/lib/course-data";
import { useAuth } from "@/hooks/useAuth";
import { updateProfile } from "@/lib/supabase/database";

const AVATARS = ["🚀", "🤖", "🦊", "🐉", "⭐", "🦁", "🐙", "🎮"];

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-space-900" />}>
      <LandingContent />
    </Suspense>
  );
}

function LandingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, signUpWithEmail, signInWithEmail, signInWithGoogle } =
    useAuth();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🚀");
  const [step, setStep] = useState<"landing" | "auth" | "setup">("landing");
  const [showAllWorlds, setShowAllWorlds] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // If already logged in, redirect to home
  useEffect(() => {
    if (!loading && user) {
      router.push("/home");
    }
  }, [user, loading, router]);

  // Handle ?signup=true from PaywallModal redirect
  useEffect(() => {
    if (searchParams.get("signup") === "true") {
      setStep("auth");
    }
  }, [searchParams]);

  async function handleEmailAuth() {
    if (!email.trim() || !password.trim()) return;
    setAuthLoading(true);
    setAuthError("");

    try {
      if (isSignIn) {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setAuthError(error.message);
          setAuthLoading(false);
          return;
        }
        router.push("/home");
      } else {
        // Sign up — validate before going to profile setup
        if (password.length < 6) {
          setAuthError("Password must be at least 6 characters.");
          setAuthLoading(false);
          return;
        }
        setStep("setup");
        setAuthLoading(false);
      }
    } catch {
      setAuthError("Something went wrong. Please try again.");
      setAuthLoading(false);
    }
  }

  async function handleStart() {
    if (!name.trim()) return;

    const profile = {
      name: name.trim(),
      avatar,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    setProfile(profile);

    // If we have email/password from auth step, create Supabase account
    if (email && password && !isSignIn) {
      setAuthLoading(true);
      const { data, error } = await signUpWithEmail(
        email,
        password,
        name.trim(),
        avatar
      );
      if (error) {
        setAuthError(error.message);
        setAuthLoading(false);
        return;
      }
      // If user was created (some providers auto-confirm)
      if (data.user) {
        await updateProfile(data.user.id, {
          name: name.trim(),
          avatar,
        });
      }
      setAuthLoading(false);
    }

    router.push("/home");
  }

  async function handleGoogleAuth() {
    setAuthLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setAuthError(error.message);
      setAuthLoading(false);
    }
    // Redirect happens automatically via OAuth
  }

  // Auth step
  if (step === "auth") {
    return (
      <div className="min-h-screen bg-space-900 stars-bg flex items-center justify-center p-6">
        <div className="bg-space-800 rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-3xl font-black text-slate-900">
              {isSignIn ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-slate-400 mt-2">
              {isSignIn
                ? "Sign in to continue your journey"
                : "Sign up to save your progress across devices"}
            </p>
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleAuth}
            disabled={authLoading}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-4 px-6 rounded-2xl btn-press transition-colors flex items-center justify-center gap-3 mb-4 disabled:opacity-60"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-slate-400 text-sm font-bold">or</span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* Email/Password */}
          <div className="space-y-4 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-space-900 border-2 border-slate-300 rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()}
              placeholder="Password (min 6 characters)"
              className="w-full bg-space-900 border-2 border-slate-300 rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
            />
          </div>

          {authError && (
            <p className="text-red-400 text-sm text-center mb-4">
              {authError}
            </p>
          )}

          <button
            onClick={handleEmailAuth}
            disabled={authLoading || !email.trim() || !password.trim()}
            className="w-full bg-gradient-to-r from-sky-400 to-mint-300 hover:from-sky-300 hover:to-mint-200 text-slate-900 font-black text-lg py-4 rounded-2xl btn-press transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed mb-4"
          >
            {authLoading
              ? "Loading..."
              : isSignIn
              ? "Sign In"
              : "Continue"}
          </button>

          <p className="text-center text-sm text-slate-400">
            {isSignIn ? "No account? " : "Already have one? "}
            <button
              onClick={() => {
                setIsSignIn(!isSignIn);
                setAuthError("");
              }}
              className="text-sky-500 font-bold hover:text-sky-400 transition-colors"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>

          <button
            onClick={() => setStep("landing")}
            className="w-full text-slate-400 hover:text-slate-600 font-bold text-sm py-2 mt-4 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Profile setup step
  if (step === "setup") {
    return (
      <div className="min-h-screen bg-space-900 stars-bg flex items-center justify-center p-6">
        <div className="bg-space-800 rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-float inline-block">
              {avatar}
            </div>
            <h2 className="text-3xl font-black text-slate-900">
              Who&apos;s exploring?
            </h2>
            <p className="text-slate-400 mt-2">Set up your explorer profile</p>
          </div>

          <div className="mb-6">
            <label className="text-sm font-bold text-slate-600 mb-2 block">
              Pick your explorer icon
            </label>
            <div className="grid grid-cols-4 gap-3">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`text-3xl p-3 rounded-2xl transition-all btn-press ${
                    avatar === a
                      ? "bg-mint-400/30 ring-2 ring-sky-400 scale-105"
                      : "bg-space-900 hover:bg-space-700"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="text-sm font-bold text-slate-600 mb-2 block">
              What&apos;s your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              placeholder="Explorer name..."
              maxLength={20}
              className="w-full bg-space-900 border-2 border-slate-300 rounded-2xl px-5 py-4 text-slate-900 text-xl font-bold placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
              autoFocus
            />
          </div>

          {authError && (
            <p className="text-red-400 text-sm text-center mb-4">
              {authError}
            </p>
          )}

          <button
            onClick={handleStart}
            disabled={!name.trim() || authLoading}
            className="w-full bg-gradient-to-r from-sky-400 to-mint-300 text-white font-black text-xl py-4 rounded-2xl btn-press transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:from-sky-300 hover:to-mint-200 shadow-lg"
          >
            {authLoading ? "Creating account..." : "Start Exploring! 🚀"}
          </button>

          <p className="text-center text-xs text-slate-400 mt-4">
            Your progress syncs across devices.
          </p>
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen overflow-hidden bg-[#F7F5EF]">
      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center">
          <img src="/logo.png" alt="Teach AI Early" className="h-40 rounded-xl" />
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/blog"
            className="text-slate-500 hover:text-sky-600 font-bold px-4 py-2.5 rounded-xl transition-colors text-sm"
          >
            Blog
          </a>
          <a
            href="/glossary"
            className="text-slate-500 hover:text-sky-600 font-bold px-4 py-2.5 rounded-xl transition-colors text-sm"
          >
            Glossary
          </a>
          <button
            onClick={() => {
              setIsSignIn(true);
              setStep("auth");
            }}
            className="text-slate-500 hover:text-sky-600 font-bold px-4 py-2.5 rounded-xl transition-colors text-sm"
          >
            Sign In
          </button>
          <button
            onClick={() => setStep("setup")}
            className="bg-mint-400 hover:bg-mint-300 text-white font-bold px-6 py-2.5 rounded-xl btn-press transition-colors text-sm"
          >
            Start Free
          </button>
        </div>
      </nav>

      {/* ========== 1. HERO ========== */}
      <section className="relative z-10 text-center pt-8 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[56px] md:text-[64px] font-black text-slate-900 leading-[1.1] mb-6 max-w-3xl mx-auto">
            Help your child understand AI before it shapes their future
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-3">
            A safe, guided AI learning platform for ages 9&ndash;12 that teaches
            through interactive play.
          </p>
          <p className="text-base text-slate-500 mb-10">
            2 free worlds. No credit card required.
          </p>
          <button
            onClick={() => setStep("setup")}
            className="bg-gradient-to-r from-sky-400 to-mint-300 text-white font-black text-xl px-12 py-5 rounded-2xl btn-press hover:from-sky-300 hover:to-mint-200 shadow-lg shadow-sky-400/30 transition-all"
          >
            Start Free
          </button>
        </div>
      </section>

      {/* ========== TRUST BAR ========== */}
      <section className="bg-white relative z-10 py-12 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { icon: "👨‍👩‍👧", label: "Built by Parents" },
              { icon: "🛡️", label: "COPPA Compliant" },
              { icon: "🚫", label: "No Ads" },
              { icon: "🔒", label: "No Data Sold" },
              { icon: "🎯", label: "Ages 9–12" },
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl border-2 border-slate-200 flex items-center justify-center text-2xl bg-slate-50">
                  {badge.icon}
                </div>
                <span className="text-sm font-semibold text-slate-600">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 2. HOW IT WORKS ========== */}
      <section className="bg-[#F3F8FC] relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 text-center mb-4">
            How it works
          </h2>
          <p className="text-center text-slate-500 text-lg mb-16">
            Three steps. Five minutes to start.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                num: "1",
                icon: "🗺️",
                title: "Pick a World",
                desc: "12 AI adventures from robots to ethics.",
              },
              {
                num: "2",
                icon: "🎮",
                title: "Play & Learn",
                desc: "Hands-on lessons that teach real AI concepts.",
              },
              {
                num: "3",
                icon: "🏆",
                title: "Earn & Track",
                desc: "Badges for kids. Progress reports for parents.",
              },
            ].map((s) => (
              <div key={s.num} className="bg-white rounded-3xl p-8 text-center shadow-md border border-slate-100">
                <div className="text-6xl mb-5">{s.icon}</div>
                <div className="inline-block bg-sky-100 text-sky-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  STEP {s.num}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="bg-white relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 text-center mb-16">
            What parents are saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                child: "Mom of Liam, age 10",
                quote: "My son now explains how AI works at the dinner table. He taught his grandma what a neural network is!",
                avatar: "👩",
              },
              {
                name: "David R.",
                child: "Dad of Ava, age 11",
                quote: "Finally, educational screen time I actually feel good about. Ava asks to play it instead of YouTube.",
                avatar: "👨",
              },
              {
                name: "Priya K.",
                child: "Mom of Arjun, age 9",
                quote: "The badges and certificates keep him motivated. He completed 4 worlds in the first week!",
                avatar: "👩\u200D💼",
              },
            ].map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.child}</div>
                  </div>
                </div>
                <p className="text-slate-600 text-base leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. PRODUCT DEMO ========== */}
      <section className="bg-white relative z-10 py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 text-center mb-4">
            See what kids actually do
          </h2>
          <p className="text-center text-slate-500 text-lg mb-16 max-w-2xl mx-auto">
            Not worksheets. Not videos. Real interactive lessons that teach AI
            concepts through hands-on challenges.
          </p>

          {/* Side-by-side feature highlight */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <div className="absolute -top-3 left-4 z-10 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                Hands-on classifier game
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-200 brightness-110 contrast-105">
                <img src="/screenshot-1.png" alt="Train Your Own Classifier" className="w-full" loading="lazy" />
              </div>
              <p className="text-slate-500 text-sm mt-3 text-center">
                Your child learns by building and testing an AI classifier.
              </p>
            </div>
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-slate-900">Learn by doing, not watching</h3>
              <ul className="space-y-4">
                {[
                  { title: "Real AI concepts", desc: "Kids train a classifier with real categories — animals vs. objects, weather, food." },
                  { title: "Instant feedback", desc: "They see how their training data affects the AI\u2019s accuracy in real time." },
                  { title: "Critical thinking", desc: "They learn why AI gets things wrong and how to improve it." },
                  { title: "No passive content", desc: "Every lesson starts with interaction within 60 seconds." },
                ].map((point) => (
                  <li key={point.title} className="flex items-start gap-3">
                    <span className="text-mint-400 text-lg mt-0.5">&#10003;</span>
                    <div>
                      <span className="font-semibold text-slate-900">{point.title}:</span>{" "}
                      <span className="text-slate-500">{point.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Two screenshots with chips and captions */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative">
              <div className="absolute -top-3 left-4 z-10 bg-violet-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                Kids earn badges
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-violet-200 brightness-110 contrast-105">
                <img src="/screenshot-2.png" alt="Progress dashboard" className="w-full" loading="lazy" />
              </div>
              <p className="text-slate-500 text-sm mt-3 text-center">
                Badges and milestones keep children motivated.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-3 left-4 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                Parent dashboard
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-amber-200 brightness-110 contrast-105">
                <img src="/screenshot-3.png" alt="Explorer profile" className="w-full" loading="lazy" />
              </div>
              <p className="text-slate-500 text-sm mt-3 text-center">
                Parents can track exactly what concepts were learned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY AI LITERACY ========== */}
      <section className="bg-[#F7F5EF] relative z-10 py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 text-center mb-8">
            AI already influences what your child sees and believes
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center max-w-3xl mx-auto mb-12">
            From the videos recommended on their feed to the answers a chatbot
            gives them — AI is shaping your child&apos;s worldview right now.
            The question isn&apos;t whether they&apos;ll encounter AI.
            It&apos;s whether they&apos;ll understand it.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📱",
                title: "AI is already there",
                desc: "Your child interacts with AI dozens of times a day — in apps, games, search, and social media.",
              },
              {
                icon: "🧠",
                title: "Understanding beats fear",
                desc: "Kids who understand how AI works make better decisions about the technology in their lives.",
              },
              {
                icon: "📚",
                title: "Educational screen time",
                desc: "This isn\u2019t passive scrolling. It\u2019s active learning — reading, building, and thinking critically.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WORLDS SHOWCASE ========== */}
      <section className="bg-[#F7F8FA] relative z-10 py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 text-center mb-4">
            12 Worlds to Explore
          </h2>
          <p className="text-center text-slate-500 text-lg mb-16 max-w-2xl mx-auto">
            Each world is a self-contained adventure with a written course,
            interactive lessons, and a badge to earn.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllWorlds ? WORLDS : WORLDS.slice(0, 6)).map((world) => (
              <div
                key={world.id}
                onClick={() => {
                  setIsSignIn(false);
                  setStep("setup");
                }}
                className="relative bg-white rounded-2xl p-6 border-2 border-transparent cursor-pointer group text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  // @ts-expect-error custom hover border
                  "--hover-glow": world.hex + "50",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = world.hex + "60";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${world.hex}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {world.id === 1 && (
                  <div className="absolute -top-2.5 right-4 bg-mint-400 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md">
                    START HERE
                  </div>
                )}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                    style={{
                      background: world.hex + "15",
                      border: `2px solid ${world.hex}30`,
                    }}
                  >
                    {world.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[11px] font-bold text-slate-400">WORLD {world.id}</span>
                      {world.tier === "free" ? (
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                          FREE
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          PRO
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{world.title}</h3>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {world.theme}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-medium">
                    {world.lessons.length} lessons &middot; ~{world.lessons.length * 5} min
                  </div>
                  <span
                    className="text-xs font-bold transition-colors"
                    style={{ color: world.hex }}
                  >
                    <span className="group-hover:hidden">Learn More &rarr;</span>
                    <span className="hidden group-hover:inline">Start World &rarr;</span>
                  </span>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-1 w-full rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: world.hex }}
                />
              </div>
            ))}
          </div>
          {!showAllWorlds && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAllWorlds(true)}
                className="bg-white border border-slate-200 hover:border-sky-300 text-sky-500 hover:text-sky-600 font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow"
              >
                See all 12 worlds &rarr;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="bg-white relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 text-center mb-14">
            Why parents love it
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🍽️",
                title: "Dinner table moments",
                desc: "Every lesson ends with a takeaway that sparks real conversations at home.",
              },
              {
                icon: "🔒",
                title: "Safe & private",
                desc: "COPPA compliant. No ads. No loot boxes. No data sold. Ever.",
              },
              {
                icon: "📊",
                title: "Parent dashboard",
                desc: "See what your child learned, time spent, and conversation starters.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
              >
                <div className="text-5xl mb-5">{f.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section
        id="pricing"
        className="bg-[#F7F8FA] relative z-10 py-28 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 text-center mb-4">
            Simple pricing
          </h2>
          <p className="text-center text-slate-500 text-lg mb-14">
            Start free. Upgrade when they&apos;re hooked.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
              <div className="text-2xl font-extrabold text-slate-900 mb-1">Free</div>
              <div className="text-4xl font-extrabold text-sky-500 mb-1">$0</div>
              <div className="text-sm text-slate-400 mb-8">Forever</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "World 1: What is AI? (4 lessons)",
                  "World 2: How Machines Learn (5 lessons)",
                  "2 challenge badges",
                  "Basic progress tracking",
                ].map((item) => (
                  <li key={item} className="text-slate-600 text-[15px] flex items-start gap-2">
                    <span className="text-mint-400 mt-0.5">&#10003;</span> {item}
                  </li>
                ))}
                {[
                  "All 12 worlds",
                  "Parent dashboard",
                  "AI Playground",
                ].map((item) => (
                  <li key={item} className="text-slate-300 text-[15px] flex items-start gap-2">
                    <span className="mt-0.5">&#10007;</span> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setStep("setup")}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-2xl btn-press transition-colors"
              >
                Get Started Free
              </button>
            </div>
            {/* Paid */}
            <div className="bg-gradient-to-br from-sky-50 to-mint-50 rounded-3xl p-8 border-[3px] border-sky-400 relative shadow-md flex flex-col">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-400 to-mint-300 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-md">
                Best for Curious Kids
              </div>
              <div className="text-2xl font-extrabold text-slate-900 mb-1">
                Explorer Pro
              </div>
              <div className="mb-1">
                <span className="text-4xl font-extrabold text-sky-500">$9.99</span>
                <span className="text-slate-400 ml-1">/month</span>
              </div>
              <p className="text-xs text-slate-400 italic mb-1">
                Less than one tutoring session per month
              </p>
              <div className="text-sm text-slate-400 mb-2">
                or $79.99/year (save 33%)
              </div>
              <div className="inline-block bg-amber-50 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200 mb-8">
                Most parents choose annual and save 33%
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Everything in Free",
                  "All 12 worlds — 55+ interactive lessons",
                  "All 12 challenge badges & certificates",
                  "Full AI Playground",
                  "Parent dashboard + weekly reports",
                  "Monthly new content drops",
                  "Priority support",
                ].map((item) => (
                  <li key={item} className="text-slate-600 text-[15px] flex items-start gap-2">
                    <span className="text-mint-400 mt-0.5">&#10003;</span> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setStep("setup")}
                className="w-full bg-gradient-to-r from-sky-400 to-mint-300 hover:from-sky-300 hover:to-mint-200 text-white font-bold py-4 rounded-2xl btn-press transition-all shadow-lg"
              >
                Start 7-Day Free Trial
              </button>
              <p className="text-center text-xs text-slate-400 mt-3">
                Cancel anytime. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 8. FINAL CTA ========== */}
      <section className="bg-[#F3F8FC] relative z-10 text-center py-28 px-6">
        <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 mb-4">
          Ready to start your child&apos;s{" "}
          <span className="bg-gradient-to-r from-sky-400 to-mint-300 text-transparent bg-clip-text">
            AI adventure
          </span>
          ?
        </h2>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          Two full worlds free. No credit card. No commitment. Just real
          learning, disguised as fun.
        </p>
        <button
          onClick={() => setStep("setup")}
          className="bg-gradient-to-r from-sky-400 to-mint-300 text-white font-black text-xl px-12 py-5 rounded-2xl btn-press hover:from-sky-300 hover:to-mint-200 shadow-lg shadow-sky-400/30 transition-all"
        >
          Start Free
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white relative z-10 border-t border-slate-200 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-6 text-sm text-slate-400">
            <a href="/blog" className="hover:text-slate-600 transition-colors font-bold">Blog</a>
            <span>·</span>
            <a href="/glossary" className="hover:text-slate-600 transition-colors font-bold">Glossary</a>
            <span>·</span>
            <a href="#pricing" className="hover:text-slate-600 transition-colors font-bold">Pricing</a>
            <span>·</span>
            <a href="mailto:hello@teachaiearly.com" className="hover:text-slate-600 transition-colors font-bold">Contact</a>
            <span>·</span>
            <a href="/terms" className="hover:text-slate-600 transition-colors font-bold">Terms</a>
            <span>·</span>
            <a href="/privacy" className="hover:text-slate-600 transition-colors font-bold">Privacy</a>
          </div>
          <div className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <img src="/logo.png" alt="Teach AI Early" className="h-10 inline-block rounded" />
            <span>— COPPA compliant · No ads · No data sold</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
