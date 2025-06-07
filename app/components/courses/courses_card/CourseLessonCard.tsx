import Image from "next/image";
import Link from "next/link";
import { Course } from "@/app/types/course";

interface CourseLessonCardProps {
  course: Course;
}

const CourseLessonCard = ({ course }: CourseLessonCardProps) => {
  const isLocalhostImage = course.thumbnail?.includes("localhost");
  const isLocalhostProfile =
    course.instructor?.profile_picture?.includes("localhost");

  return (
    <Link href={`/courses/${course.slug}`} key={course.id} className="group">
      <div className="card bg-base-100 w-full h-full shadow-md hover:shadow-lg transition-all duration-150 ease-in-out">
        <figure className="overflow-hidden">
          <Image
            src={course.thumbnail || "/placeholder-course.jpg"}
            alt={`تصویر دوره ${course.title}`}
            width={200}
            height={200}
            className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-150"
            loading="lazy"
            unoptimized={isLocalhostImage}
          />
        </figure>
        <div className="card-body p-4 text-right">
          {/* <div className="flex items-center gap-2 mb-2">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <Image
                  src={
                    course.instructor.profile_picture ||
                    "/placeholder-profile.jpg"
                  }
                  alt={`مدرس: ${course.instructor.user}`}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                  loading="lazy"
                  unoptimized={isLocalhostProfile}
                />
              </div>
            </div>
            <span className="text-sm">{course.instructor.user}</span>
          </div> */}

          <h2 className="card-title text-lg group-hover:text-primary transition-colors duration-150">
            {course.title}
          </h2>

          <p className="line-clamp-2 text-sm text-gray-600">
            {course.description}
          </p>

          {/* <div className="mt-3 flex flex-wrap gap-1 justify-start">
            {course.topic && (
              <div className="badge badge-primary">
                {typeof course.topic === "string"
                  ? course.topic
                  : course.topic.title}
              </div>
            )}
            {course.tags?.map((tag) => (
              <div key={tag.id} className="badge badge-outline">
                {tag.name}
              </div>
            ))}
          </div> */}

          <div className="mt-4 flex justify-between items-center">
            {/* {course.price && (
              <span className="text-primary font-bold">
                {course.price.toLocaleString("fa-IR")} تومان
              </span>
            )} */}
            {/* <span className="text-xs text-gray-500">
              {new Date(course.updated_at).toLocaleDateString("fa-IR")}
            </span> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseLessonCard;
