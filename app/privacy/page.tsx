import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Teach AI Early",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-space-900 text-slate-300">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-teal-400 hover:text-teal-300 text-sm font-bold mb-8 inline-block"
        >
          &larr; Back to home
        </Link>

        <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: March 25, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-black text-white mb-3">Overview</h2>
            <p>
              Teach AI Early is committed to protecting the privacy of children and families.
              This policy explains what information we collect, how we use it, and how we
              protect it. We comply with the Children&apos;s Online Privacy Protection Act
              (COPPA) and applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">Information We Collect</h2>
            <p className="mb-3">We collect only what is necessary to provide the Service:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>
                <span className="text-slate-300">Account information:</span> email address
                and display name (provided by parent/guardian)
              </li>
              <li>
                <span className="text-slate-300">Profile information:</span> explorer name
                and avatar selection
              </li>
              <li>
                <span className="text-slate-300">Progress data:</span> lesson completions,
                badges earned, XP, and streak information
              </li>
              <li>
                <span className="text-slate-300">Payment information:</span> processed
                securely by Stripe — we never store credit card numbers
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">What We Do NOT Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Location data</li>
              <li>Device identifiers or advertising IDs</li>
              <li>Contacts, photos, or files</li>
              <li>Behavioral data for advertising purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">How We Use Information</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>To provide and improve the educational experience</li>
              <li>To save and sync learning progress across devices</li>
              <li>To display progress on the parent dashboard</li>
              <li>To process subscription payments</li>
              <li>To send important account-related communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">Children&apos;s Privacy (COPPA Compliance)</h2>
            <p className="mb-3">
              We take children&apos;s privacy seriously. Our COPPA compliance includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>We do not collect personal information from children under 13 without parental consent</li>
              <li>Parents/guardians create accounts on behalf of their children</li>
              <li>We do not serve behavioral advertising to any users</li>
              <li>We do not sell, rent, or share children&apos;s data with third parties</li>
              <li>Parents can review, modify, or delete their child&apos;s information at any time by contacting us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">Data Storage and Security</h2>
            <p>
              Data is stored securely using Supabase (hosted on AWS). All data is encrypted
              in transit (TLS) and at rest. We implement access controls and regularly review
              our security practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>
                <span className="text-slate-300">Supabase:</span> authentication and database
              </li>
              <li>
                <span className="text-slate-300">Stripe:</span> payment processing
              </li>
              <li>
                <span className="text-slate-300">Vercel:</span> hosting
              </li>
            </ul>
            <p className="mt-3">
              We do not use analytics trackers, advertising networks, or social media pixels.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">Data Retention and Deletion</h2>
            <p>
              We retain account and progress data for as long as the account is active.
              You may request deletion of all data at any time by emailing us. We will
              process deletion requests within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 mt-3">
              <li>Access the personal information we hold about you or your child</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for data processing</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of
              material changes via email. Continued use of the Service after changes
              constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your
              rights, contact us at{" "}
              <a
                href="mailto:hello@teachaiearly.com"
                className="text-teal-400 hover:text-teal-300"
              >
                hello@teachaiearly.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
