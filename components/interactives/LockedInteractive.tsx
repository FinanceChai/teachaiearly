"use client";

import { useEffect } from "react";

export function LockedInteractive({
  title,
  onComplete,
}: {
  title: string;
  onComplete: () => void;
}) {
  // Auto-complete so the lesson flow doesn't get stuck
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return (
    <div className="bg-space-800 rounded-2xl p-8 border border-slate-700 text-center space-y-4">
      <div className="text-5xl">🔒</div>
      <div>
        <div className="font-black text-white text-xl">{title}</div>
        <div className="text-slate-400 text-sm mt-2">
          This interactive activity is part of Explorer Pro.
        </div>
      </div>
      <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4">
        <p className="text-amber-300 text-sm font-bold">
          Unlock all 30 lessons and 6 interactive challenges with Explorer Pro — just $6/month.
        </p>
      </div>
    </div>
  );
}
