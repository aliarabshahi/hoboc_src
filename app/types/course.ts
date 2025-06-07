export interface Topic {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  is_published: boolean;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Instructor {
  id: number;
  user: string;
  bio: string;
  profile_picture: string;
}

export interface Course {
  id: number;
  topic: string | Topic; // slug or full object
  instructor: Instructor | null;
  tags: Tag[];
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
