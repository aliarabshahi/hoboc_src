
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  FaBook, 
  FaClock, 
  FaStar, 
  FaUserGraduate, 
  FaCheck, 
  FaChevronRight,
  FaChalkboardTeacher
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BsBook, BsCheckCircleFill } from "react-icons/bs";

type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  isFree: boolean;
  order: number;
};

type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  totalLessons: number;
  totalHours: number;
  rating: number;
  students: number;
  lessons: Lesson[];
};

const MainCoursesDetail = () => {
  // Sample course data
  const courseData: Course = {
    id: "react-advanced-2024",
    title: "Advanced React Patterns",
    description: "Master advanced React concepts and design patterns used by senior developers at top tech companies.",
    image: "/images/react-course-cover.jpg",
    instructor: "Sarah Johnson",
    category: "Frontend Development",
    level: "Intermediate",
    totalLessons: 12,
    totalHours: 8.5,
    rating: 4.9,
    students: 2450,
    lessons: [
      {
        id: "compound-components",
        title: "Compound Components",
        description: "Learn how to build flexible component APIs that share implicit state",
        duration: "45 min",
        isFree: true,
        order: 1
      },
      {
        id: "render-props",
        title: "Render Props Pattern",
        description: "Master the render props technique for component composition",
        duration: "38 min",
        isFree: false,
        order: 2
      },
      {
        id: "context-optimization",
        title: "Context Optimization",
        description: "Advanced techniques to optimize React context performance",
        duration: "52 min",
        isFree: false,
        order: 3
      },
      {
        id: "state-machines",
        title: "State Machines with XState",
        description: "Implement finite state machines for complex UI flows",
        duration: "1h 15min",
        isFree: true,
        order: 4
      },
      {
        id: "performance-patterns",
        title: "Performance Patterns",
        description: "Advanced memoization and rendering optimization techniques",
        duration: "49 min",
        isFree: false,
        order: 5
      },
      {
        id: "suspense-patterns",
        title: "Suspense Patterns",
        description: "Data fetching and async rendering with React Suspense",
        duration: "56 min",
        isFree: false,
        order: 6
      },
      {
        id: "advanced-hooks",
        title: "Advanced Hooks Patterns",
        description: "Creating custom hooks for complex logic reuse",
        duration: "42 min",
        isFree: false,
        order: 7
      },
      {
        id: "type-safe-react",
        title: "Type-Safe React",
        description: "Advanced TypeScript patterns for React",
        duration: "51 min",
        isFree: false,
        order: 8
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Course Header */}
      <div className="mb-8">
        <span className="badge badge-primary">{courseData.category}</span>
        <h1 className="text-4xl font-bold mt-2">{courseData.title}</h1>
        <p className="text-lg opacity-80 mt-2">{courseData.description}</p>
        
        <div className="flex items-center mt-4 gap-4">
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <Image 
                  src="/images/instructor-avatar.jpg" 
                  alt={courseData.instructor}
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <span className="ml-2">{courseData.instructor}</span>
          </div>
          
          <div className="flex items-center">
            <FaStar className="w-5 h-5 text-yellow-400" />
            <span className="ml-1">{courseData.rating}</span>
            <span className="mx-1">•</span>
            <span>{courseData.students.toLocaleString()} students</span>
          </div>
        </div>
      </div>

      {/* Main Content - Single Row Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Lessons Section - Left Side */}
        <div className="lg:w-2/3 bg-base-100 rounded-box shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BsBook className="w-6 h-6 mr-2" />
            Course Content
          </h2>
          
          {/* Scrollable Lessons Container */}
          <div className="overflow-y-auto max-h-[500px] pr-4">
            <div className="space-y-3">
              {courseData.lessons.map((lesson) => (
                <Link href={`/course/${courseData.id}/lesson/${lesson.id}`} key={lesson.id}>
                  <div className="flex items-center justify-between p-4 hover:bg-base-200 rounded-lg transition-colors duration-200 cursor-pointer">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${lesson.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {lesson.order}
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-500">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-3">{lesson.duration}</span>
                      {lesson.isFree && (
                        <span className="badge badge-success badge-sm">Free</span>
                      )}
                      <FaChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Image + Enroll Section in Flex Column */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          {/* Course Image */}
          <div className="relative aspect-video rounded-box overflow-hidden shadow-xl flex-shrink-0">
            <Image
              src={courseData.image}
              alt={courseData.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <span className="badge badge-accent mb-2">{courseData.level}</span>
              <h2 className="text-2xl font-bold text-white">{courseData.title}</h2>
            </div>
          </div>
          
          {/* Enroll Section */}
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
        </div>
      </div>
    </div>
  );
};

export default MainCoursesDetail;
