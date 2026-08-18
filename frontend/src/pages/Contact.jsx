import { useState } from "react";
import SEO from "@/components/SEO";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const { name, phone, email, subject, message } = formData;

  if (!name || !email || !message) {
    setStatus("Please fill in your name, email and message.");
    return;
  }

  const emailSubject =
    subject || `SahiRate Enquiry from ${name}`;

  const emailBody = `
Name: ${name}
Phone: ${phone || "Not provided"}
Email: ${email}

Enquiry:
${message}
  `.trim();

  const mailtoLink =
    `mailto:sahirateindia@gmail.com` +
    `?subject=${encodeURIComponent(emailSubject)}` +
    `&body=${encodeURIComponent(emailBody)}`;

  window.location.href = mailtoLink;
  };

  return (
    <>
      <SEO
        title="Contact SahiRate"
        description="Get in touch with SahiRate for enquiries, dealer partnerships, feedback and building material information."
      />

      <main className="min-h-screen bg-white">

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden bg-[#071426]">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "54px 54px",
            }}
          />

          <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-orange-500/10 blur-[130px]" />

          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
            <h1
              className="max-w-5xl text-5xl font-extrabold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Let's Build
              <span className="text-[#FF6B00]"> Together.</span>
            </h1>

            <div className="mt-8 h-1.5 w-24 rounded-full bg-[#FF6B00]" />

            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Have a question, dealer enquiry, partnership idea, or feedback?
              We'd be happy to hear from you.
            </p>

            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Whether you need building material information or want to
              connect with SahiRate, just drop us a message.
            </p>
          </div>
        </section>

        {/* =====================================================
            CONTACT INFORMATION
        ====================================================== */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              {/* Email */}
              <a
                href="mailto:sahirateindia@gmail.com"
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B00]">
                  ✉
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#071426]">
                  Email
                </h3>

                <p className="mt-3 break-all text-slate-600">
                  sahirateindia@gmail.com
                </p>

                <span className="mt-5 inline-block font-semibold text-[#FF6B00]">
                  Send Email →
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+917870560445"
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B00]">
                  ☎
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#071426]">
                  Phone
                </h3>

                <p className="mt-3 text-slate-600">
                  +91 78 70 560 445
                </p>

                <span className="mt-5 inline-block font-semibold text-[#FF6B00]">
                  Call Us →
                </span>
              </a>

              {/* Location */}
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B00]">
                  ⌖
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#071426]">
                  Location
                </h3>

                <p className="mt-3 text-slate-600">
                  Deoghar, Jharkhand, India
                </p>
              </div>

              {/* Business Hours */}
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B00]">
                  ◷
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#071426]">
                  Business Hours
                </h3>

                <p className="mt-3 text-slate-600">
                  Monday – Saturday
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Support available during business hours
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            CONTACT FORM
        ====================================================== */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">

            <div className="mb-12 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B00]">
                Send an Enquiry
              </span>

              <h2
                className="mt-4 text-4xl font-extrabold tracking-tight text-[#071426] md:text-5xl"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                How Can We Help?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Tell us what you need and we'll get back to you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-10"
            >

              {/* Name + Phone */}
              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#071426]"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[#071426]"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 78 70 560 445"
                    className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

              </div>

              {/* Email + Subject */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#071426]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-[#071426]"
                  >
                    Enquiry Type
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-800 outline-none transition focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="">Select an option</option>
                    <option value="General Enquiry">
                      General Enquiry
                    </option>
                    <option value="Dealer Enquiry">
                      Dealer Enquiry
                    </option>
                    <option value="Partnership Enquiry">
                      Partnership Enquiry
                    </option>
                    <option value="Feedback">
                      Feedback
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

              </div>

              {/* Message */}
              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[#071426]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Status */}
              {status && (
                <div className="mt-5 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4 text-sm font-medium text-orange-700">
                  {status}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="mt-7 w-full rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white transition hover:bg-[#e65f00] active:scale-[0.99]"
              >
                Send Enquiry →
              </button>

              <p className="mt-4 text-center text-sm text-slate-500">
                Your enquiry will open in your default email application.
              </p>

            </form>
          </div>
        </section>

      </main>
    </>
  );
}