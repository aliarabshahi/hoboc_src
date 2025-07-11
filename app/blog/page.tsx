"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt, FaUser, FaTags, FaFolder } from "react-icons/fa";
import { motion } from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  writer: {
    name: string;
    profile_picture: string | null;
  };
  content: string;
  cover_image: string | null;
  category: {
    title: string;
    slug: string;
  };
  tags: {
    name: string;
    slug: string;
  }[];
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost/hoboc/api/posts/");
        setPosts(response.data);
      } catch (err) {
        setError("خطا در دریافت پست‌ها. لطفا دوباره تلاش کنید.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fa-IR", options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hoboc"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
      >
        وبلاگ
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {post.cover_image && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <FaCalendarAlt className="ml-1" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <div className="flex items-center mb-4">
                <FaUser className="text-gray-500 dark:text-gray-400 ml-1" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {post.writer.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FaFolder className="ml-1" />
                  {post.category.title}
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                  >
                    <FaTags className="ml-1" />
                    {tag.name}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-hoboc hover:text-hoboc-dark font-medium inline-flex items-center mt-2"
              >
                ادامه مطلب
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}