export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}


export interface CoursesTopic {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  is_published: boolean;
}

export interface CoursesTag {
  id: number;
  name: string;
  slug: string;
}

export interface CoursesInstructor {
  id: number;
  user: string;
  bio: string;
  profile_picture: string;
}

export interface CoursesLesson {
  id: number;
  topic: string | CoursesTopic; // slug or full object
  instructor: CoursesInstructor | null;
  tags: CoursesTag[];
  title: string;
  slug: string;
  description: string;
  pdf_file: string | null;
  video_file: string | null;
  video_url: string | null;
  thumbnail: string | null;
  is_published: boolean;
  is_free: boolean;
  duration: number; // in minutes
  created_at: string;
  updated_at: string;
}
