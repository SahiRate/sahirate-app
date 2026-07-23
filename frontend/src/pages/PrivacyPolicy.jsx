import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | SahiRate"
        description="Read SahiRate's Privacy Policy to understand how we collect, use, and protect your information."
      />

      <main className="min-h-screen bg-slate-50">

        <section className="bg-[#0A192F] py-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">

            <span className="inline-flex rounded-full border border-orange-300/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-300">
              Privacy Policy
            </span>

            <h1
              className="mt-8 text-5xl font-extrabold text-white"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Your Privacy Matters
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-300">
              At SahiRate, we value your privacy and are committed to protecting
              the information you share with us.
            </p>

          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 space-y-12">

            <div>
              <h2 className="text-2xl font-bold text-[#0A192F]">
                Information We Collect
              </h2>

              <p className="mt-4 text-slate-600 leading-8">
                We may collect information you voluntarily provide, such as your
                name, email address, phone number, and any details submitted
                through contact or feedback forms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0A192F]">
                How We Use Your Information
              </h2>

              <p className="mt-4 text-slate-600 leading-8">
                Your information is used to respond to enquiries, improve our
                services, enhance user experience, and communicate important
                updates related to SahiRate.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0A192F]">
                Data Security
              </h2>

              <p className="mt-4 text-slate-600 leading-8">
                We implement reasonable security measures to protect your
                personal information against unauthorized access, disclosure,
                or misuse.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0A192F]">
                Third-Party Services
              </h2>

              <p className="mt-4 text-slate-600 leading-8">
                SahiRate may use trusted third-party services for analytics,
                hosting, or communication. These providers have their own
                privacy practices.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0A192F]">
                Contact Us
              </h2>

              <p className="mt-4 text-slate-600 leading-8">
                If you have any questions regarding this Privacy Policy, please
                contact us at <strong>sahirateindia@gmail.com</strong>.
              </p>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}