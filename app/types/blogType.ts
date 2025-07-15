export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface BlogTopic {
  id: number;
  title: string;
  catchy_title?: string;
  slug: string;
  description?: string;
  image?: string;
  logo_file?: string;
  is_published: boolean;
  priority: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogWriter {
  id: number;
  user: string; // String representation (like username)
  name: string; // Computed field from backend
  bio?: string;
  profile_picture?: string;
}

export interface BlogPost {
  topic_title: ReactNode;
  id: number;
  topic: string; // This is a string because serializer returns `StringRelatedField`
  writer?: BlogWriter | null;
  title: string;
  slug: string;
  description?: string;
  pdf_file?: string;
  video_file?: string;
  video_url?: string;
  thumbnail?: string;
  cover_image?: string;
  tags: BlogTag[];
  created_at: string;
  updated_at: string;
  is_published: boolean;
}
