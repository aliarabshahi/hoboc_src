import AboutIntro from "./components/AboutIntro";
import AboutProjectSection from "./components/AboutProjectSection";
import AboutFeatures from "./components/AboutFeatures";
import AboutCTA from "./components/AboutCTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fef6fb] dark:from-gray-900 dark:to-gray-800 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-20">
        <AboutIntro />
        <AboutProjectSection />
        <AboutFeatures />
        <AboutCTA />
      </div>
    </div>
  );
}