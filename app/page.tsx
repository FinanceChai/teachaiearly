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
        <div className="bg-space-800 rounded-3xl p-8 max-w-md w-full border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-3xl font-black text-white">
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
            <span className="text-slate-500 text-sm font-bold">or</span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* Email/Password */}
          <div className="space-y-4 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-space-900 border-2 border-slate-600 rounded-2xl px-5 py-4 text-white font-bold placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()}
              placeholder="Password (min 6 characters)"
              className="w-full bg-space-900 border-2 border-slate-600 rounded-2xl px-5 py-4 text-white font-bold placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-colors"
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
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-white font-black text-lg py-4 rounded-2xl btn-press transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed mb-4"
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
              className="text-teal-400 font-bold hover:text-teal-300 transition-colors"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>

          <button
            onClick={() => setStep("landing")}
            className="w-full text-slate-500 hover:text-slate-300 font-bold text-sm py-2 mt-4 transition-colors"
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
        <div className="bg-space-800 rounded-3xl p-8 max-w-md w-full border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-float inline-block">
              {avatar}
            </div>
            <h2 className="text-3xl font-black text-white">
              Who&apos;s exploring?
            </h2>
            <p className="text-slate-400 mt-2">Set up your explorer profile</p>
          </div>

          <div className="mb-6">
            <label className="text-sm font-bold text-slate-300 mb-2 block">
              Pick your explorer icon
            </label>
            <div className="grid grid-cols-4 gap-3">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`text-3xl p-3 rounded-2xl transition-all btn-press ${
                    avatar === a
                      ? "bg-teal-500/30 ring-2 ring-teal-400 scale-105"
                      : "bg-space-900 hover:bg-space-700"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="text-sm font-bold text-slate-300 mb-2 block">
              What&apos;s your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              placeholder="Explorer name..."
              maxLength={20}
              className="w-full bg-space-900 border-2 border-slate-600 rounded-2xl px-5 py-4 text-white text-xl font-bold placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-colors"
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
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-black text-xl py-4 rounded-2xl btn-press transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:from-teal-400 hover:to-cyan-300 shadow-lg"
          >
            {authLoading ? "Creating account..." : "Start Exploring! 🚀"}
          </button>

          <p className="text-center text-xs text-slate-500 mt-4">
            Your progress syncs across devices.
          </p>
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-space-900 overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0 stars-bg pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Teach AI Early" className="h-10" />
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/blog"
            className="text-slate-400 hover:text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm"
          >
            Blog
          </a>
          <button
            onClick={() => {
              setIsSignIn(true);
              setStep("auth");
            }}
            className="text-slate-400 hover:text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm"
          >
            Sign In
          </button>
          <button
            onClick={() => setStep("setup")}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-2.5 rounded-xl btn-press transition-colors text-sm"
          >
            Start Free
          </button>
        </div>
      </nav>

      {/* ========== 1. HERO — One Clear Promise ========== */}
      <section className="relative z-10 text-center pt-16 pb-24 px-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          AI literacy for kids,{" "}
          <span className="bg-gradient-to-r from-teal-400 to-cyan-300 text-transparent bg-clip-text">
            disguised as a game
          </span>
        </h1>
        <p className="text-xl text-slate-300 max-w-xl mx-auto leading-relaxed mb-10">
          Your child&apos;s first AI adventure — learn by playing, not by
          lecturing. For ages 9-12.
        </p>
        <button
          onClick={() => setStep("setup")}
          className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-black text-xl px-12 py-5 rounded-2xl btn-press hover:from-teal-400 hover:to-cyan-300 shadow-lg shadow-teal-500/30 transition-all"
        >
          Start Free
        </button>
        <p className="text-slate-500 text-sm mt-5">
          Worlds 1 &amp; 2 free forever. No credit card needed.
        </p>
      </section>

      {/* ========== 2. TRUST STRIP — Social Proof ========== */}
      <section className="relative z-10 border-y border-slate-700/50 py-5 mb-20">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-slate-400 max-w-4xl mx-auto px-6">
          <span>Built by a parent</span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span>Ages 9-12</span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span>COPPA compliant</span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span>No ads, no data sold</span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span>55+ interactive lessons</span>
        </div>
      </section>

      {/* ========== 3. HOW IT WORKS — 3 Steps ========== */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-black text-white text-center mb-4">
          How it works
        </h2>
        <p className="text-center text-slate-400 mb-12">
          Three steps. Five minutes to start.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              num: "1",
              icon: "🗺️",
              title: "Pick a World",
              desc: "Choose from 12 AI-themed adventures — from robots to ethics to creativity.",
            },
            {
              num: "2",
              icon: "🎮",
              title: "Play & Learn",
              desc: "Interactive lessons teach real AI concepts through stories, challenges, and hands-on activities.",
            },
            {
              num: "3",
              icon: "🏆",
              title: "Earn & Track",
              desc: "Kids earn badges for each world. Parents see exactly what they learned.",
            },
          ].map((s) => (
            <div key={s.num} className="text-center">
              <div className="text-5xl mb-4">{s.icon}</div>
              <div className="inline-block bg-teal-500/20 text-teal-300 text-xs font-black px-3 py-1 rounded-full mb-3">
                STEP {s.num}
              </div>
              <h3 className="text-xl font-black text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== PRODUCT DEMO — See It In Action ========== */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-black text-white text-center mb-4">
          See what kids actually do
        </h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Not worksheets. Not videos. Real interactive lessons that teach AI
          concepts through hands-on challenges.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              src: "/screenshot-1.png",
              alt: "Train Your Own Classifier — interactive AI lesson",
              caption: "Train an AI classifier by picking categories and testing it",
            },
            {
              src: "/screenshot-2.png",
              alt: "Your Journey — world progress dashboard",
              caption: "Track progress across worlds with badges and milestones",
            },
            {
              src: "/screenshot-3.png",
              alt: "Explorer profile setup screen",
              caption: "Kids pick an avatar and jump straight into learning",
            },
          ].map((shot) => (
            <div key={shot.src} className="group">
              <div className="bg-space-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="w-full"
                  loading="lazy"
                />
              </div>
              <p className="text-slate-400 text-xs text-center mt-3 font-bold">
                {shot.caption}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 4. WORLDS SHOWCASE — Visual Cards ========== */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-black text-white text-center mb-4">
          12 Worlds to Explore
        </h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
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
              className="relative bg-space-800 rounded-2xl p-5 border border-slate-700 card-hover cursor-pointer group text-center"
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
              <div className="text-sm font-black text-white mb-1 leading-tight">
                {world.title}
              </div>
              <div className="text-xs text-slate-500 mb-3 leading-snug">
                {world.lessons.length} lessons
              </div>
              {world.tier === "free" ? (
                <span className="bg-teal-500/20 text-teal-300 text-xs font-black px-2.5 py-0.5 rounded-full border border-teal-500/30">
                  FREE
                </span>
              ) : (
                <span className="bg-slate-700/50 text-slate-400 text-xs font-black px-2.5 py-0.5 rounded-full">
                  PRO
                </span>
              )}
              {world.id === 1 && (
                <div
                  className="absolute -top-2 -right-2 bg-teal-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg"
                >
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
              className="text-teal-400 hover:text-teal-300 font-bold text-sm transition-colors"
            >
              See all 12 worlds &rarr;
            </button>
          </div>
        )}
      </section>

      {/* ========== 5. PARENT VALUE — Why AI Literacy Now ========== */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl font-black text-white mb-6">
          Why AI literacy, why now?
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          AI is already part of your child&apos;s world — in the apps they use,
          the content they see, the future they&apos;ll inherit. The question
          isn&apos;t whether they&apos;ll use AI. It&apos;s whether
          they&apos;ll understand it.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <div className="bg-space-800 rounded-xl px-5 py-3 border border-slate-700">
            <span className="text-2xl font-black text-teal-400 block">OECD</span>
            AI Literacy Framework aligned
          </div>
          <div className="bg-space-800 rounded-xl px-5 py-3 border border-slate-700">
            <span className="text-2xl font-black text-teal-400 block">12</span>
            worlds covering ethics, creativity, robotics &amp; more
          </div>
          <div className="bg-space-800 rounded-xl px-5 py-3 border border-slate-700">
            <span className="text-2xl font-black text-teal-400 block">0</span>
            videos — 100% reading + doing
          </div>
        </div>
      </section>

      {/* ========== 6. FEATURES — Why Parents Love It ========== */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-black text-white text-center mb-12">
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
              className="bg-space-800 rounded-2xl p-6 border border-slate-700"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-black text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 7. PRICING — Free vs Pro ========== */}
      <section
        id="pricing"
        className="relative z-10 max-w-4xl mx-auto px-6 pb-24"
      >
        <h2 className="text-3xl font-black text-white text-center mb-4">
          Simple pricing
        </h2>
        <p className="text-center text-slate-400 mb-12">
          Start free. Upgrade when they&apos;re hooked.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-space-800 rounded-3xl p-8 border border-slate-700">
            <div className="text-2xl font-black text-white mb-1">Free</div>
            <div className="text-4xl font-black text-teal-400 mb-2">$0</div>
            <div className="text-sm text-slate-500 mb-6">Forever</div>
            <ul className="space-y-3 mb-8">
              {[
                "World 1: What is AI? (course + 4 lessons)",
                "World 2: How Machines Learn (course + 5 lessons)",
                "2 challenge badges",
                "Basic progress tracking",
              ].map((item) => (
                <li key={item} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">&#10003;</span> {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setStep("setup")}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl btn-press transition-colors"
            >
              Get Started Free
            </button>
          </div>
          {/* Paid */}
          <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/10 rounded-3xl p-8 border-2 border-teal-500/50 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-black px-4 py-1 rounded-full">
              BEST VALUE
            </div>
            <div className="text-2xl font-black text-white mb-1">
              Explorer Pro
            </div>
            <div className="mb-2">
              <span className="text-4xl font-black text-teal-400">$9.99</span>
              <span className="text-slate-400 ml-1">/month</span>
            </div>
            <div className="text-sm text-slate-500 mb-6">
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
                <li key={item} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">&#10003;</span> {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setStep("setup")}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-white font-black py-4 rounded-2xl btn-press transition-all shadow-lg"
            >
              Start 7-Day Free Trial
            </button>
            <p className="text-center text-xs text-slate-500 mt-3">
              Cancel anytime. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* ========== 8. FINAL CTA — Repeat the Action ========== */}
      <section className="relative z-10 text-center py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Ready to start your child&apos;s{" "}
          <span className="bg-gradient-to-r from-teal-400 to-cyan-300 text-transparent bg-clip-text">
            AI adventure
          </span>
          ?
        </h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          Two full worlds free. No credit card. No commitment. Just real
          learning, disguised as fun.
        </p>
        <button
          onClick={() => setStep("setup")}
          className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-black text-xl px-12 py-5 rounded-2xl btn-press hover:from-teal-400 hover:to-cyan-300 shadow-lg shadow-teal-500/30 transition-all"
        >
          Start Free
        </button>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-6 text-sm text-slate-500">
            <a
              href="/blog"
              className="hover:text-slate-300 transition-colors font-bold"
            >
              Blog
            </a>
            <span>·</span>
            <a
              href="#pricing"
              className="hover:text-slate-300 transition-colors font-bold"
            >
              Pricing
            </a>
            <span>·</span>
            <a
              href="mailto:hello@teachaiearly.com"
              className="hover:text-slate-300 transition-colors font-bold"
            >
              Contact
            </a>
            <span>·</span>
            <a
              href="/terms"
              className="hover:text-slate-300 transition-colors font-bold"
            >
              Terms
            </a>
            <span>·</span>
            <a
              href="/privacy"
              className="hover:text-slate-300 transition-colors font-bold"
            >
              Privacy
            </a>
          </div>
          <div className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <img src="/logo.svg" alt="Teach AI Early" className="h-6 inline-block" />
            <span>— COPPA compliant · No ads · No data sold</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
