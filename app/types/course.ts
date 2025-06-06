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
  topic: string | Topic; // Can be string or full Topic object
  instructor: Instructor;
  tags: Tag[];
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  updated_at: string;
  price?: number;
  duration?: string;
}