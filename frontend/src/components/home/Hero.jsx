import HeroBackground from "./HeroBackground";
import HeroDashboard from "./HeroDashboard";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#081B33] text-white">
      <HeroBackground />

      <div className="relative mx-auto max-w-[1500px] px-5 pt-16 pb-12 sm:px-8 sm:pt-20 lg:px-10 lg:pt-20">
        <div
          className="
            grid w-full items-start
            gap-10
            xl:grid-cols-[minmax(0,1fr)_500px]
            2xl:grid-cols-[minmax(0,1fr)_520px]
            2xl:gap-12
          "
        >
          <div className="min-w-0">
            <HeroContent />
          </div>

          <div className="w-full min-w-0 xl:max-w-[500px] xl:justify-self-end 2xl:max-w-[520px]">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}



