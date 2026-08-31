import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | SahiRate"
        description="The page you are looking for could not be found on SahiRate."
        path="/404"
        noindex={true}
      />

      <main className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-5xl font-black text-[#0A192F]">
          404
        </h1>

        <p className="mt-3 text-slate-600">
          Page not found.
        </p>
      </main>
    </>
  );
}

