import ProjectOrderForm from "./components/ProjectOrderForm";
import ProjectOrderImage from "./components/ProjectOrderImage";

export default function ProjectOrderPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Image: left on desktop */}
          <div className="w-full lg:w-1/2 order-1 lg:order-1 lg:sticky lg:top-0 self-start">
            <ProjectOrderImage />
          </div>

          {/* Form: right on desktop */}
          <div className="w-full lg:w-1/2 order-2 lg:order-2">
            <ProjectOrderForm />
          </div>
        </div>
      </div>
    </div>
  );
}
