import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Teach AI Early — AI Literacy Course for Kids",
    template: "%s | Teach AI Early",
  },
  description:
    "A gamified AI literacy course for kids aged 9-12. 12 worlds, 55+ interactive lessons. Learn what AI actually is — and how to think critically about it.",
  keywords: [
    "AI for kids",
    "AI literacy",
    "kids education",
    "learn AI",
    "STEM for kids",
    "AI course for children",
    "teach kids about AI",
    "artificial intelligence education",
  ],
  metadataBase: new URL("https://teachaiearly.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "Teach AI Early",
    title: "Teach AI Early — AI Literacy Course for Kids",
    description:
      "12 interactive worlds. 55+ hands-on lessons. Teach your child what AI actually is — no fluff, real AI literacy for ages 9-12.",
    url: "https://teachaiearly.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teach AI Early — AI Literacy Course for Kids",
    description:
      "12 interactive worlds. 55+ hands-on lessons. Real AI literacy for kids aged 9-12.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
