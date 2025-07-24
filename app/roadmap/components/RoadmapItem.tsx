"use client";
import { FiChevronDown, FiChevronUp, FiCheck, FiClock, FiAward } from 'react-icons/fi';
import { useState } from 'react';
import { RoadmapItem as RoadmapItemType, RoadmapLevel, RoadmapStatus }  from "@/app/types/roadmapType";
interface RoadmapItemProps extends RoadmapItemType {}

export const RoadmapItem = ({ 
  id,
  title,
  description,
  level,
  status,
  resources = []
}: RoadmapItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = () => {
    switch (status) {
      case 'تکمیل شده':
        return <FiCheck className="text-white" />;
      case 'در حال یادگیری':
        return <FiClock className="text-white" />;
      default:
        return <FiAward className="text-white" />;
    }
  };

  const getLevelColor = (): string => {
    switch (level) {
      case 'مبتدی':
        return 'bg-hoboc';
      case 'متوسط':
        return 'bg-hoboc-dark';
      case 'پیشرفته':
        return 'bg-purple-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (): string => {
    switch (status) {
      case 'تکمیل شده':
        return 'bg-green-100 text-green-800';
      case 'در حال یادگیری':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div 
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getLevelColor()}`}>
            {getStatusIcon()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <div className="text-gray-400">
          {isExpanded ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor()} text-white`}>
              {level}
            </span>
          </div>

          {resources.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">منابع یادگیری:</h4>
              <ul className="space-y-2">
                {resources.map((resource, idx) => (
                  <li key={idx}>
                    <a 
                      href={resource.url} 
                      className="text-hoboc-dark hover:underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button className={`px-4 py-2 rounded-lg font-medium ${getStatusColor()}`}>
              {status}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
