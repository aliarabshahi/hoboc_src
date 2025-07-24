import { RoadmapItem as RoadmapItemType, RoadmapLevel, RoadmapStatus }  from "@/app/types/roadmapType";

export const RoadmapLegend = () => {
  const levels: RoadmapLevel[] = ['مبتدی', 'متوسط', 'پیشرفته'];
  
  const getLevelColor = (level: RoadmapLevel): string => {
    switch (level) {
      case 'مبتدی':
        return 'bg-hoboc';
      case 'متوسط':
        return 'bg-hoboc-dark';
      case 'پیشرفته':
        return 'bg-purple-600';
    }
  };

  return (
    <div className="mt-12 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">راهنما</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level) => (
          <div key={level} className="flex items-center space-x-2 space-x-reverse">
            <div className={`w-4 h-4 rounded-full ${getLevelColor(level)}`}></div>
            <span>{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
