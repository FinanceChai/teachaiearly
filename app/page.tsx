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
        // Sign up — go to profile setup
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
            onClick={() => {
              setIsSignIn(false);
              setStep("auth");
            }}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-2.5 rounded-xl btn-press transition-colors text-sm"
          >
            Try Free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center pt-12 pb-20 px-6 max-w-4xl mx-auto">
        <div className="inline-block bg-teal-500/20 text-teal-300 text-sm font-bold px-4 py-2 rounded-full mb-8 border border-teal-500/30">
          ✨ For kids aged 9-12 — No fluff, real AI literacy
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-white leading-tight mb-6">
          Learn what AI{" "}
          <span className="bg-gradient-to-r from-teal-400 to-cyan-300 text-transparent bg-clip-text">
            actually is
          </span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          6 interactive worlds. 30 lessons. Zero boring videos. Kids learn how
          AI works, think critically about it — and have fun doing it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setIsSignIn(false);
              setStep("auth");
            }}
            className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-black text-xl px-10 py-5 rounded-2xl btn-press hover:from-teal-400 hover:to-cyan-300 shadow-lg shadow-teal-500/30 transition-all"
          >
            Start for Free 🚀
          </button>
          <a
            href="#pricing"
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xl px-10 py-5 rounded-2xl btn-press transition-colors"
          >
            See Pricing
          </a>
        </div>
        <p className="text-slate-500 text-sm mt-5">
          Worlds 1 & 2 free forever. No credit card required.
        </p>
      </section>

      {/* World Cards */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-black text-white text-center mb-12">
          6 Worlds to Explore
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WORLDS.map((world) => (
            <div
              key={world.id}
              onClick={() => {
                setIsSignIn(false);
                setStep("auth");
              }}
              className="relative bg-space-800 rounded-2xl p-6 border border-slate-700 card-hover overflow-hidden cursor-pointer"
            >
              {world.tier === "paid" && (
                <div className="absolute top-3 right-3 bg-amber-500 text-amber-900 text-xs font-black px-2 py-1 rounded-full">
                  PRO
                </div>
              )}
              {world.tier === "free" && (
                <div className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-black px-2 py-1 rounded-full">
                  FREE
                </div>
              )}
              <div className="text-4xl mb-3">{world.emoji}</div>
              <div className="text-xs font-bold text-slate-500 mb-1">
                WORLD {world.id}
              </div>
              <div className="text-lg font-black text-white mb-2">
                {world.title}
              </div>
              <div className="text-sm text-slate-400">
                {world.lessons.length} lessons + challenge
              </div>
              <div
                className="absolute bottom-0 left-0 h-1 w-full opacity-60 rounded-b-2xl"
                style={{ background: world.hex }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-black text-white text-center mb-12">
          Why parents love it
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🎮",
              title: "Actually fun",
              desc: "Interactive activities within 60 seconds of starting each lesson. No passive video watching.",
            },
            {
              icon: "🍽️",
              title: "Dinner table moments",
              desc: "Every lesson ends with a 'tell someone tonight' takeaway that sparks real conversations.",
            },
            {
              icon: "🔒",
              title: "Safe & compliant",
              desc: "COPPA compliant. No ads. No loot boxes. No data sold. Parents control everything.",
            },
            {
              icon: "🏆",
              title: "Real achievements",
              desc: "6 skill-based badges earned through understanding, not just clicking through slides.",
            },
            {
              icon: "📊",
              title: "Parent dashboard",
              desc: "See exactly what your child learned, time spent, and conversation starters for the week.",
            },
            {
              icon: "🌍",
              title: "Actually relevant",
              desc: "Covers AI ethics, bias, privacy, and creativity — things kids need to know NOW.",
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

      {/* Pricing */}
      <section
        id="pricing"
        className="relative z-10 max-w-4xl mx-auto px-6 pb-20"
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
            <div className="text-4xl font-black text-teal-400 mb-6">$0</div>
            <ul className="space-y-3 mb-8">
              {[
                "✅ World 1: What is AI? (4 lessons)",
                "✅ World 2: How Machines Learn (5 lessons)",
                "✅ 2 challenge badges",
                "✅ AI Playground (limited)",
                "✅ Basic progress tracking",
              ].map((item) => (
                <li key={item} className="text-slate-300 text-sm">
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setIsSignIn(false);
                setStep("auth");
              }}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl btn-press transition-colors"
            >
              Get Started Free
            </button>
          </div>
          {/* Paid */}
          <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/10 rounded-3xl p-8 border-2 border-teal-500/50 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-black px-4 py-1 rounded-full">
              MOST POPULAR
            </div>
            <div className="text-2xl font-black text-white mb-1">
              Explorer Pro
            </div>
            <div className="mb-6">
              <span className="text-4xl font-black text-teal-400">$6</span>
              <span className="text-slate-400 ml-1">/month</span>
              <div className="text-xs text-slate-500 mt-1">
                or $48/year (save 33%)
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "✅ Everything in Free",
                "✅ All 6 Worlds (30 lessons)",
                "✅ All 6 challenge badges",
                "✅ Full AI Playground",
                "✅ Parent dashboard + reports",
                "✅ Monthly new content drops",
                "✅ Priority support",
              ].map((item) => (
                <li key={item} className="text-slate-300 text-sm">
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setIsSignIn(false);
                setStep("auth");
              }}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-white font-black py-4 rounded-2xl btn-press transition-all shadow-lg"
            >
              Start Free Trial 🚀
            </button>
            <p className="text-center text-xs text-slate-500 mt-3">
              7-day free trial. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-6 mb-4 text-sm text-slate-500">
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
        </div>
        <div className="text-slate-500 text-sm flex items-center justify-center gap-2">
          <img src="/logo.svg" alt="Teach AI Early" className="h-6 inline-block" />
          <span>— COPPA compliant · No ads · No data sold</span>
        </div>
      </footer>
    </div>
  );
}
