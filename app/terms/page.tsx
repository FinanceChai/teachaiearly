import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Teach AI Early",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-space-900 text-slate-300">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-teal-400 hover:text-teal-300 text-sm font-bold mb-8 inline-block"
        >
          &larr; Back to home
        </Link>

        <h1 className="text-4xl font-black text-white mb-2">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: March 25, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-black text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Teach AI Early (&quot;the Service&quot;), you agree to be bound
              by these Terms of Service. If you are a parent or guardian agreeing on behalf of
              a child under 13, you represent that you have the authority to do so.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">2. Description of Service</h2>
            <p>
              Teach AI Early is an educational platform that teaches AI literacy to children
              aged 9-12 through interactive lessons, written courses, and challenges. The
              Service includes both free and paid tiers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">3. Accounts</h2>
            <p>
              You may create an account using an email address or Google sign-in. You are
              responsible for maintaining the confidentiality of your account credentials.
              Parents or guardians must create accounts on behalf of children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">4. Free and Paid Content</h2>
            <p>
              Worlds 1 and 2 are available free of charge, forever. Access to Worlds 3-12
              requires an Explorer Pro subscription. Pricing is listed on our website and
              may change with 30 days notice to existing subscribers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">5. Subscriptions and Billing</h2>
            <p>
              Explorer Pro subscriptions are billed monthly ($9.99/month) or annually
              ($79.99/year). All subscriptions include a 7-day free trial. You may cancel
              at any time. Cancellation takes effect at the end of the current billing period.
              Payments are processed securely through Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">6. Children&apos;s Privacy (COPPA)</h2>
            <p>
              We comply with the Children&apos;s Online Privacy Protection Act (COPPA). We do
              not knowingly collect personal information from children under 13 without
              verifiable parental consent. See our{" "}
              <Link href="/privacy" className="text-teal-400 hover:text-teal-300">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">7. Acceptable Use</h2>
            <p>
              You agree not to misuse the Service, including but not limited to: reverse
              engineering, unauthorized access, distributing content without permission, or
              using the Service for any unlawful purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">8. Intellectual Property</h2>
            <p>
              All content on Teach AI Early — including courses, lessons, interactive
              activities, illustrations, and badges — is owned by Teach AI Early and
              protected by copyright. You may not reproduce or distribute this content
              without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">9. Limitation of Liability</h2>
            <p>
              Teach AI Early is provided &quot;as is&quot; without warranties of any kind. We are not
              liable for any indirect, incidental, or consequential damages arising from
              your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">10. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify users of material
              changes via email or a notice on the Service. Continued use after changes
              constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white mb-3">11. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{" "}
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
