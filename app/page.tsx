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
    <div className="min-h-screen overflow-hidden">
      {/* Nav */}
      <nav className="bg-[#F7F5EF] relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
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
      <section className="bg-[#F7F5EF] relative z-10 text-center pt-8 pb-32 px-6">
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

      {/* ========== 3. PRODUCT DEMO ========== */}
      <section className="bg-white relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 text-center mb-4">
            See what kids actually do
          </h2>
          <p className="text-center text-slate-500 text-lg mb-16 max-w-2xl mx-auto">
            Not worksheets. Not videos. Real interactive lessons that teach AI
            concepts through hands-on challenges.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                src: "/screenshot-1.png",
                alt: "Train Your Own Classifier — interactive AI lesson",
                caption: "Interactive Lessons",
                accent: "#22c55e",
              },
              {
                src: "/screenshot-2.png",
                alt: "Your Journey — world progress dashboard",
                caption: "Progress Tracking",
                accent: "#a855f7",
              },
              {
                src: "/screenshot-3.png",
                alt: "Explorer profile setup screen",
                caption: "Easy Onboarding",
                accent: "#f59e0b",
              },
            ].map((shot) => (
              <div key={shot.src} className="group">
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border-2 brightness-110 contrast-105"
                  style={{ borderColor: shot.accent + "40" }}
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: shot.accent }}
                  />
                  <p className="text-slate-700 text-sm font-semibold">
                    {shot.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 4. WORLDS SHOWCASE ========== */}
      <section className="bg-[#F7F8FA] relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 text-center mb-4">
            12 Worlds to Explore
          </h2>
          <p className="text-center text-slate-500 text-lg mb-16 max-w-2xl mx-auto">
            Each world is a self-contained adventure with a written course,
            interactive lessons, and a badge to earn.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(showAllWorlds ? WORLDS : WORLDS.slice(0, 6)).map((world) => (
              <div
                key={world.id}
                onClick={() => {
                  setIsSignIn(false);
                  setStep("setup");
                }}
                className="relative bg-white rounded-2xl p-5 border border-slate-200 card-hover cursor-pointer group text-center shadow-sm"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3"
                  style={{
                    background: world.hex + "20",
                    border: `2px solid ${world.hex}40`,
                  }}
                >
                  {world.emoji}
                </div>
                <div className="text-sm font-black text-slate-900 mb-1 leading-tight">
                  {world.title}
                </div>
                <div className="text-xs text-slate-400 mb-3 leading-snug">
                  {world.lessons.length} lessons
                </div>
                {world.tier === "free" ? (
                  <span className="bg-mint-50 text-mint-500 text-xs font-black px-2.5 py-0.5 rounded-full border border-mint-200">
                    FREE
                  </span>
                ) : (
                  <span className="bg-slate-100 text-slate-400 text-xs font-black px-2.5 py-0.5 rounded-full">
                    PRO
                  </span>
                )}
                {world.id === 1 && (
                  <div className="absolute -top-2 -right-2 bg-mint-400 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                    START HERE
                  </div>
                )}
                <div
                  className="absolute bottom-0 left-0 h-1 w-full opacity-50 rounded-b-2xl"
                  style={{ background: world.hex }}
                />
              </div>
            ))}
          </div>
          {!showAllWorlds && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllWorlds(true)}
                className="text-sky-500 hover:text-sky-400 font-bold text-sm transition-colors"
              >
                See all 12 worlds &rarr;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========== 5. PARENT VALUE ========== */}
      <section className="bg-[#F3F8FC] relative z-10 py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 mb-6">
            Why AI literacy, why now?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
            AI is already part of your child&apos;s world — in the apps they use,
            the content they see, the future they&apos;ll inherit. The question
            isn&apos;t whether they&apos;ll use AI. It&apos;s whether
            they&apos;ll understand it.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <div className="bg-white rounded-xl px-5 py-4 border border-slate-200 shadow-sm">
              <span className="text-2xl font-black text-sky-500 block">OECD</span>
              AI Literacy Framework aligned
            </div>
            <div className="bg-white rounded-xl px-5 py-4 border border-slate-200 shadow-sm">
              <span className="text-2xl font-black text-sky-500 block">12</span>
              worlds covering ethics, creativity &amp; more
            </div>
            <div className="bg-white rounded-xl px-5 py-4 border border-slate-200 shadow-sm">
              <span className="text-2xl font-black text-sky-500 block">0</span>
              videos — 100% reading + doing
            </div>
          </div>
        </div>
      </section>

      {/* ========== 6. FEATURES ========== */}
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

      {/* ========== 7. PRICING ========== */}
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
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <div className="text-2xl font-black text-slate-900 mb-1">Free</div>
              <div className="text-4xl font-black text-sky-500 mb-2">$0</div>
              <div className="text-sm text-slate-400 mb-6">Forever</div>
              <ul className="space-y-3 mb-8">
                {[
                  "World 1: What is AI? (course + 4 lessons)",
                  "World 2: How Machines Learn (course + 5 lessons)",
                  "2 challenge badges",
                  "Basic progress tracking",
                ].map((item) => (
                  <li key={item} className="text-slate-600 text-sm flex items-start gap-2">
                    <span className="text-mint-400 mt-0.5">&#10003;</span> {item}
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
            <div className="bg-gradient-to-br from-sky-50 to-mint-50 rounded-3xl p-8 border-2 border-sky-300 relative shadow-sm">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mint-400 text-white text-xs font-black px-4 py-1 rounded-full">
                BEST VALUE
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">
                Explorer Pro
              </div>
              <div className="mb-2">
                <span className="text-4xl font-black text-sky-500">$9.99</span>
                <span className="text-slate-400 ml-1">/month</span>
              </div>
              <div className="text-sm text-slate-400 mb-6">
                or $79.99/year (save 33%)
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Free",
                  "All 12 worlds — courses + 55+ lessons",
                  "All 12 challenge badges",
                  "Full AI Playground",
                  "Parent dashboard + reports",
                  "Monthly new content drops",
                ].map((item) => (
                  <li key={item} className="text-slate-600 text-sm flex items-start gap-2">
                    <span className="text-mint-400 mt-0.5">&#10003;</span> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setStep("setup")}
                className="w-full bg-gradient-to-r from-sky-400 to-mint-300 hover:from-sky-300 hover:to-mint-200 text-white font-black py-4 rounded-2xl btn-press transition-all shadow-lg"
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
      <section className="bg-[#F7F5EF] relative z-10 text-center py-28 px-6">
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
