// components/Roadmap.tsx
import { RoadmapItem } from "./RoadmapItem";
import { RoadmapLegend } from "./RoadmapLegend";
import { RoadmapItem as RoadmapItemType } from "@/app/types/roadmapType";

interface RoadmapProps {
  title: string;
  description: string;
  roadmapData: RoadmapItemType[];
}

export const Roadmap = ({ title, description, roadmapData }: RoadmapProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 py-12 px-4 sm:px-6 lg:px-8 font-vazir">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hoboc-dark mb-4">{title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-5">
          {roadmapData.map((item) => (
            <RoadmapItem key={item.id} {...item} />
          ))}
        </div>

        <RoadmapLegend />
      </div>
    </div>
  );
};