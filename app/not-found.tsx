import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-space-900 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-black text-slate-900 mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-8">
          This page doesn&apos;t exist — but there&apos;s plenty of AI to explore!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-sky-400 to-mint-300 text-white font-black px-6 py-3 rounded-xl hover:from-sky-300 hover:to-mint-200 transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
