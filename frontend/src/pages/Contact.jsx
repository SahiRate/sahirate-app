export default function Contact() {
  return (
    <main className="min-h-screen">

      <section className="relative overflow-hidden bg-[#0A192F]">
        <div className="absolute -top-48 -right-48 w-[650px] h-[650px] rounded-full bg-[#FF6B00]/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <h1
            className="text-white font-extrabold leading-tight"
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: "clamp(3rem,6vw,5rem)",
            }}
          >
            Let's Build
            <span className="text-[#FF6B00]"> Together.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-300">
            Have a question, dealer enquiry, partnership proposal, or feedback?
            We're here to help you with building material prices, dealer
            information, and smarter construction decisions.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#0A192F]">Email</h3>
            <p className="mt-4 text-slate-600">
              Reach out to us for support, partnerships, or general enquiries.
            </p>

            <a
              href="mailto:sahirateindia@gmail.com"
              className="mt-6 inline-block font-semibold text-[#FF6B00] hover:underline"
            >
              sahirateindia@gmail.com
            </a>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#0A192F]">Location</h3>

            <p className="mt-4 text-slate-600">
              Deoghar, Jharkhand, India
            </p>

            <p className="mt-6 text-[#FF6B00] font-semibold">
              Serving construction professionals across India.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#0A192F]">
              Business Hours
            </h3>

            <p className="mt-4 text-slate-600">
              Monday – Saturday
            </p>

            <p className="mt-2 text-[#0A192F] font-semibold">
              9:00 AM – 6:00 PM (IST)
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-[#0A192F]">
              Get in Touch
            </h2>

            <p className="mt-4 text-slate-600">
              Have a question, suggestion, partnership proposal, or dealer
              enquiry? Complete the form below and we'll get back to you as soon
              as possible.
            </p>
          </div>

          <form className="bg-white rounded-3xl shadow-lg p-8 lg:p-10 space-y-6">

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-semibold text-[#0A192F]">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#0A192F]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

            </div>

            <div>
              <label className="block mb-2 font-semibold text-[#0A192F]">
                Subject
              </label>

              <input
                type="text"
                placeholder="How can we help?"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-[#0A192F]">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#FF6B00] py-4 font-bold text-white transition hover:bg-[#e65f00]"
            >
              Send Enquiry
            </button>

          </form>
        </div>
      </section>

    </main>
  );
}