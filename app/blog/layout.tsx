import Link from "next/link";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-space-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-space-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-slate-400">←</span>
            <img src="/logo.svg" alt="Teach AI Early" className="h-8" />
          </Link>
          <Link
            href="/blog"
            className="font-black text-white text-lg tracking-tight"
          >
            The Blog
          </Link>
          <Link
            href="/home"
            className="text-xs font-black px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30 transition-colors"
          >
            Start Learning →
          </Link>
        </div>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <img src="/logo.svg" alt="Teach AI Early" className="h-8 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">
            Gamified AI literacy for kids aged 9–12.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
            <Link href="/home" className="hover:text-slate-300 transition-colors">App</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
