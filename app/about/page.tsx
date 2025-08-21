import AboutIntro from "./components/AboutIntro";
import ProjectSection from "./components/ProjectSection";
import Features from "./components/Features";
import CTA from "./components/CTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fef6fb] dark:from-gray-900 dark:to-gray-800 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-20">
        <AboutIntro />
        <ProjectSection />
        <Features />
        <CTA />
      </div>
    </div>
  );
}