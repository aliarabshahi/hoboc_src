import React from "react";
import { FaBook, FaClock } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";

type CourseEnroll = {
  totalLessons: number;
  totalHours: number;
};

const CoursesDetailEnroll = () => {
  const courseData: CourseEnroll = {
    totalLessons: 12,
    totalHours: 8.5
  };

  return (
    <div className="bg-base-100 rounded-box shadow-md p-6 flex-grow">
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <FaBook className="w-5 h-5 mr-2 text-primary" />
            <div>
              <p className="text-sm opacity-70">Lessons</p>
              <p className="text-xl font-bold">{courseData.totalLessons}</p>
            </div>
          </div>
          <div className="flex items-center">
            <IoMdTime className="w-5 h-5 mr-2 text-primary" />
            <div>
              <p className="text-sm opacity-70">Duration</p>
              <p className="text-xl font-bold">{courseData.totalHours} hours</p>
            </div>
          </div>
        </div>
        
        <button className="btn btn-primary w-full mt-auto">
          Enroll Now - $99.99
        </button>
        
        <div className="mt-6">
          <h3 className="font-semibold mb-3">This course includes:</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <BsCheckCircleFill className="w-5 h-5 text-green-500 mr-2" />
              <span>12 hours on-demand video</span>
            </li>
            <li className="flex items-center">
              <BsCheckCircleFill className="w-5 h-5 text-green-500 mr-2" />
              <span>Downloadable resources</span>
            </li>
            <li className="flex items-center">
              <BsCheckCircleFill className="w-5 h-5 text-green-500 mr-2" />
              <span>Certificate of completion</span>
            </li>
            <li className="flex items-center">
              <BsCheckCircleFill className="w-5 h-5 text-green-500 mr-2" />
              <span>Full lifetime access</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetailEnroll;