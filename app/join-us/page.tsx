import ResumeForm from "./components/ResumeForm";
import ResumeImage from "./components/ResumeImage";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:sticky lg:top-0 self-start">
            <ResumeImage />
          </div>

          {/* Form */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <ResumeForm />
          </div>
        </div>
      </div>
    </div>
  );
}
