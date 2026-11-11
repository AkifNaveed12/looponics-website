import AgencyHero from "@/components/AgencyHero";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhyOlemaSection from "@/components/WhyOlemaSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <AgencyHero />
      <WhoWeAreSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyOlemaSection />
      <div id="process">
        <HowItWorksSection />
      </div>
      <CapabilitiesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
