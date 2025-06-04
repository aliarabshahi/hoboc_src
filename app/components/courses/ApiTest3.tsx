import { getApiData } from "@/app/services/api/getData";
import Link from "next/link";
import Image from "next/image";

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Instructor {
  id: number;
  user: string;
  bio: string;
  profile_picture: string;
}

interface Course {
  id: number;
  topic: string;
  instructor: Instructor;
  tags: Tag[];
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  updated_at: string;
}

const ApiTest3 = async () => {
  const { data, error } = await getApiData('/course-lessons/');

  if (error) {
    return <div className="alert alert-error" dir="rtl">{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="alert alert-info" dir="rtl">دوره‌ای برای نمایش وجود ندارد</div>;
  }

  return (
    <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {(data as Course[]).map((course) => (
        <Link 
          href={`/courses/${course.slug}`} 
          key={course.id}
          className="group"
        >
          <div className="card bg-base-100 w-full h-full shadow-md hover:shadow-lg transition-all duration-150 ease-in-out">
            <figure className="overflow-hidden">
              <Image
                src={course.thumbnail || "/placeholder-course.jpg"}
                alt={`تصویر دوره ${course.title}`}
                width={400}
                height={200}
                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-150"
                loading="lazy"
                unoptimized // You can remove this if image domains are configured
              />
            </figure>
            <div className="card-body p-4 text-right">
              <div className="flex items-center gap-2 mb-2">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <Image 
                      src={course.instructor.profile_picture || "/placeholder-profile.jpg"} 
                      alt={`مدرس: ${course.instructor.user}`} 
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                </div>
                <span className="text-sm">{course.instructor.user}</span>
              </div>
              
              <h2 className="card-title text-lg group-hover:text-primary transition-colors duration-150">
                {course.title}
              </h2>
              
              <p className="line-clamp-2 text-sm text-gray-600">
                {course.description}
              </p>
              
              <div className="mt-3 flex flex-wrap gap-1 justify-start">
                <div className="badge badge-primary">{course.topic}</div>
                {course.tags.map((tag) => (
                  <div key={tag.id} className="badge badge-outline">
                    {tag.name}
                  </div>
                ))}
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                {new Date(course.updated_at).toLocaleDateString('fa-IR')}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ApiTest3;
