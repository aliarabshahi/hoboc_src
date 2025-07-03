import { ReactNode } from "react";

export default function LessonLayout({
  sidebar,
  content,
}: {
  sidebar: ReactNode;
  content: ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Area */}
        <div className="lg:flex-1 order-2 lg:order-1">
          {content}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 xl:w-96 order-1 lg:order-2">
          <div className="sticky top-4 space-y-6">
            {sidebar}
          </div>
        </div>
      </div>
    </div>
  );
}