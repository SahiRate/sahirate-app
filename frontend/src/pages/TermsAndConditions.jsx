import SEO from "@/components/SEO";

export default function TermsAndConditions() {
  return (
    <>
      <SEO
        title="Terms & Conditions | SahiRate"
        description="Read the Terms & Conditions governing the use of the SahiRate building material price intelligence platform."
        path="/terms-and-conditions"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="mb-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B00]">
              SAHIRATE
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Terms & Conditions
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Please read these Terms & Conditions carefully before using
              SahiRate and its services.
            </p>
          </div>

          <div className="space-y-10 text-[16px] leading-8 text-slate-600">
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                1. About SahiRate
              </h2>

              <p>
                SahiRate is a building material price intelligence platform
                designed to help builders, contractors, dealers, architects,
                developers and homeowners access market information and make
                better-informed construction decisions.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                2. Use of Information
              </h2>

              <p>
                Information displayed on SahiRate may include building
                material prices, dealer information, market insights, price
                trends and other related information. This information is
                provided for general informational and decision-support
                purposes.
              </p>

              <p className="mt-4">
                Users should independently verify the final price,
                availability, specifications, taxes, transportation charges,
                delivery terms and other commercial conditions with the
                relevant dealer before placing an order or making a purchase.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                3. Prices and Market Information
              </h2>

              <p>
                Building material prices can change based on market
                conditions, location, quantity, brand, quality, taxes,
                transportation and availability. SahiRate does not guarantee
                that any displayed price will remain available or unchanged.
              </p>

              <p className="mt-4">
                A price shown on SahiRate should not be treated as a final
                quotation, purchase order or binding commercial offer unless
                expressly stated otherwise.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                4. Dealer Information
              </h2>

              <p>
                Dealer information presented on SahiRate may be provided by
                dealers or collected through available market sources.
                Verification indicators are intended to provide additional
                context but do not constitute a guarantee of a dealer's
                products, services, financial standing or business conduct.
              </p>

              <p className="mt-4">
                Users are responsible for conducting appropriate verification
                before entering into any transaction with a dealer.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                5. SahiAI
              </h2>

              <p>
                SahiAI provides AI-powered assistance based on information
                available to the platform. AI-generated responses are intended
                to assist users in understanding market information and should
                not be considered professional, financial, legal or commercial
                advice.
              </p>

              <p className="mt-4">
                Users should verify important information before making
                purchasing or business decisions.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                6. Acceptable Use
              </h2>

              <p>
                Users agree not to misuse the SahiRate platform, attempt to
                gain unauthorized access, interfere with its operation, submit
                fraudulent information, scrape or abuse platform data, or use
                the service for unlawful purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                7. Intellectual Property
              </h2>

              <p>
                The SahiRate name, logo, design, content, software, platform
                features and related intellectual property belong to SahiRate
                or their respective owners. They may not be copied,
                reproduced, modified or commercially exploited without
                appropriate permission.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                8. Third-Party Services and Links
              </h2>

              <p>
                SahiRate may use or reference third-party services, websites
                or resources. SahiRate is not responsible for the availability,
                accuracy, security or policies of external services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                9. Limitation of Liability
              </h2>

              <p>
                To the extent permitted by applicable law, SahiRate shall not
                be responsible for losses arising from reliance on market
                information, price changes, dealer transactions, product
                availability, delivery issues or other commercial decisions
                made using information available through the platform.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                10. Changes to These Terms
              </h2>

              <p>
                SahiRate may update these Terms & Conditions from time to time
                as the platform, services and applicable requirements evolve.
                Updated terms will be published on this page.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                11. Contact Us
              </h2>

              <p>
                If you have questions regarding these Terms & Conditions,
                please contact us at{" "}
                <a
                  href="mailto:sahirateindia@gmail.com"
                  className="font-semibold text-[#FF6B00] hover:underline"
                >
                  sahirateindia@gmail.com
                </a>
                .
              </p>

              <p className="mt-4">
                SahiRate
                <br />
                Deoghar, Jharkhand, India
              </p>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
