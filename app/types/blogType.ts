export interface BlogWriter {
  id: number;
  name: string;
  bio: string;
  profile_picture: string | null;
}

export interface BlogCategory {
  id: number;
  title: string;
  slug: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPostRequest {
  title: string;
  slug: string;
  content: string;
  cover_image?: string;
  category: number;
  writer: number;
  tags: number[];
  is_published: boolean;
}

export interface BlogPostResponse {
  id: number;
  title: string;
  slug: string;
  writer: BlogWriter;
  content: string;
  cover_image: string | null;
  category: BlogCategory;
  tags: BlogTag[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}