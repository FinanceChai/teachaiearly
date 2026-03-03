import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Explorer — Learn AI the Fun Way",
  description:
    "A gamified AI literacy course for kids aged 9-12. 6 worlds, 30 lessons, no fluff. Learn what AI actually is — and how to think critically about it.",
  keywords: ["AI for kids", "AI literacy", "kids education", "learn AI", "STEM for kids"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-space-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
