import AgencyHero from "@/components/AgencyHero";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import ServicesSection from "@/components/ServicesSection";
import WhyOlemaSection from "@/components/WhyOlemaSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
// Preserved for genuine client projects:
// import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main suppressHydrationWarning>
      <AgencyHero />
      <WhoWeAreSection />
      <ServicesSection />
      {/* <ProjectsSection /> — hidden for now; component preserved */}
      <WhyOlemaSection />
      <div id="process">
        <HowItWorksSection />
      </div>
      <CapabilitiesSection />
      <TeamSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
