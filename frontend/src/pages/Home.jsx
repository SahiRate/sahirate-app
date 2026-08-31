import Hero from "@/components/home/Hero";
import IndustryTrust from "@/components/home/IndustryTrust";
import WhySahiRate from "@/components/home/WhySahiRate";
import DashboardShowcase from "@/components/home/DashboardShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import TrustSection from "@/components/home/TrustSection";
import LiveSearchDemo from "@/components/home/LiveSearchDemo";
import VisionSection from "@/components/home/VisionSection";
import SEO from "@/components/SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="SahiRate | Building Material Prices & Dealers in Deoghar"
        description="SahiRate helps you compare building material prices, find trusted dealers and make smarter construction decisions in Deoghar and across India."
        keywords="SahiRate, building material prices Deoghar, cement price Deoghar, TMT price Deoghar, building material dealers Deoghar, construction material prices Jharkhand, construction cost calculator"
        path="/"
      />

      <Hero />

      <IndustryTrust />

      <WhySahiRate />

      <DashboardShowcase />

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <TrustSection />

      <LiveSearchDemo />

      <VisionSection />
    </>
  );
}
