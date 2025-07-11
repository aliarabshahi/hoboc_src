"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { postApiData } from "@/app/services/api/apiServerPost";
import { BlogWriter, BlogCategory, BlogTag, BlogPostRequest } from "@/app/types/blogType";
import { motion } from "framer-motion";
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaImage, FaSave } from "react-icons/fa";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function BlogWriterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [writers, setWriters] = useState<BlogWriter[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [postData, setPostData] = useState<BlogPostRequest>({
    title: "",
    slug: "",
    content: "",
    category: 0,
    writer: 0, // Will be selected by user
    tags: [],
    is_published: true,
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all writers
        const writersRes = await getApiData("/writers");
        if (writersRes.data) setWriters(writersRes.data);
        
        // Fetch categories
        const categoriesRes = await getApiData("/categories");
        if (categoriesRes.data) setCategories(categoriesRes.data);
        
        // Fetch tags
        const tagsRes = await getApiData("/tags");
        if (tagsRes.data) setTags(tagsRes.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("خطا در دریافت اطلاعات. لطفاً صفحه را رفرش کنید.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: name === "category" || name === "writer" ? parseInt(value) : value,
    });
  };

  const handleContentChange = (value: string) => {
    setPostData({
      ...postData,
      content: value,
    });
  };

  const handleTagToggle = (tagId: number) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    // Validate required fields
    if (!postData.title || !postData.slug || !postData.content || !postData.category || !postData.writer) {
      setMessage("لطفاً تمام فیلدهای ضروری را پر کنید");
      setSubmitting(false);
      return;
    }

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("slug", postData.slug);
      formData.append("content", postData.content);
      formData.append("category", postData.category.toString());
      formData.append("writer", postData.writer.toString());
      formData.append("is_published", postData.is_published.toString());
      
      // Add tags
      selectedTags.forEach(tagId => {
        formData.append("tags", tagId.toString());
      });
      
      // Add cover image if exists
      if (coverImage) {
        formData.append("cover_image", coverImage);
      }

      // Log the form data before posting
      console.log("Submitting blog post with data:", {
        title: postData.title,
        slug: postData.slug,
        content: postData.content.substring(0, 100) + (postData.content.length > 100 ? "..." : ""), // Show first 100 chars of content
        category: postData.category,
        writer: postData.writer,
        tags: selectedTags,
        is_published: postData.is_published,
        hasCoverImage: !!coverImage
      });

      // Post data
      const { error } = await postApiData("/posts/", formData);
      
      if (error) {
        setMessage(`خطا: ${error}`);
      } else {
        setMessage("مقاله با موفقیت ذخیره شد!");
        // Redirect or clear form after successful submission
        setTimeout(() => {
          router.push("/blog");
        }, 1500);
      }
    } catch (err) {
      setMessage("مشکلی در ارسال داده‌ها رخ داده است");
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-hoboc" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full max-w-4xl mx-auto my-8"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-hoboc mb-2">
          نوشتن مقاله جدید
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Writer Selection */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            نویسنده <span className="text-red-500">*</span>
          </label>
          <select
            name="writer"
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 transition"
            value={postData.writer}
            onChange={handleInputChange}
            required
          >
            <option value="">-- انتخاب نویسنده --</option>
            {writers.map(writer => (
              <option key={writer.id} value={writer.id}>
                {writer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            عنوان مقاله <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="عنوان مقاله"
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 transition"
            value={postData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            اسلاگ (نامک) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="slug"
            placeholder="مثال: my-awesome-post"
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 transition"
            value={postData.slug}
            onChange={handleInputChange}
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            اسلاگ باید منحصر به فرد و فقط شامل حروف، اعداد و خط تیره باشد
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            دسته‌بندی <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 transition"
            value={postData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">-- انتخاب دسته‌بندی --</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            تگ‌ها
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag.id}
                type="button"
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  selectedTags.includes(tag.id)
                    ? "bg-hoboc text-white border-hoboc"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                }`}
                onClick={() => handleTagToggle(tag.id)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            تصویر کاور
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 flex items-center gap-2 transition">
              <FaImage className="text-hoboc" />
              <span>انتخاب تصویر</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {previewImage && (
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            محتوای مقاله <span className="text-red-500">*</span>
          </label>
          <div className="bg-white dark:bg-gray-800 rounded-lg">
            {ReactQuill && (
              <ReactQuill
                theme="snow"
                value={postData.content}
                onChange={handleContentChange}
                className="h-64 mb-12"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            )}
          </div>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={postData.is_published}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  is_published: e.target.checked,
                })
              }
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-hoboc/30 dark:peer-focus:ring-hoboc/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-hoboc"></div>
            <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              {postData.is_published ? "منتشر شود" : "پیش‌نویس"}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-hoboc hover:bg-hoboc-dark text-white font-medium py-3 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaSave className="text-sm" />
          )}
          {submitting ? "در حال ذخیره..." : "ذخیره مقاله"}
        </button>

        {/* Feedback Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
              message.includes("خطا")
                ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
            }`}
          >
            {message.includes("خطا") ? (
              <FaTimesCircle className="flex-shrink-0" />
            ) : (
              <FaCheckCircle className="flex-shrink-0" />
            )}
            {message}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}