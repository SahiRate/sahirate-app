import HeroBackground from "./HeroBackground";
import HeroDashboard from "./HeroDashboard";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#081B33] text-white">
      <HeroBackground />

      <div className="relative mx-auto flex min-h-[calc(100vh-96px)] max-w-[1400px] items-center px-8 py-16 lg:px-10">
        <div className="grid w-full items-center gap-20 lg:grid-cols-[1fr_1fr]">

          <HeroContent />

          {/* RIGHT SIDE */}

          <HeroDashboard />

        </div>
      </div>
    </section>
  );
}