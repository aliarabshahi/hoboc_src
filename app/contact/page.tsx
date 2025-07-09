

import ContactForm from "./components/ContactForm";
import ProjectOrderForm from "./components/ProjectOrderForm";
import ResumeForm from "./components/ResumeForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-20">
        <ContactForm />
        <ProjectOrderForm />
        <ResumeForm />
      </div>
    </div>
  );
}
