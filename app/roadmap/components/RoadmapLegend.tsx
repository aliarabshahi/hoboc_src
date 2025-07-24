import { RoadmapLevel } from "@/app/types/roadmapType";

export const RoadmapLegend = () => {
  const levels: RoadmapLevel[] = ['مبتدی', 'متوسط', 'پیشرفته'];
  
  const getLevelColor = (level: RoadmapLevel): string => {
    switch (level) {
      case 'مبتدی':
        return 'bg-hoboc text-white';
      case 'متوسط':
        return 'bg-hoboc-dark text-white';
      case 'پیشرفته':
        return 'bg-purple-600 text-white';
    }
  };

  return (
    <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">راهنمای سطوح یادگیری</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level) => (
          <div 
            key={level} 
            className={`flex items-center justify-center space-x-2 space-x-reverse px-4 py-3 rounded-lg ${getLevelColor(level)}`}
          >
            <div className="w-3 h-3 rounded-full bg-white/30"></div>
            <span className="font-medium">{level}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
};