"use client";

interface BlogHeaderProps {
  title: string;
  description: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, description }) => (
  <section className="bg-white pt-16 pb-10 shadow rounded-b-xl">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800" dir="rtl">
        {title}
      </h1>
      <p className="text-gray-600 md:text-lg" dir="rtl">
        {description}
      </p>
    </div>
  </section>
);

export default BlogHeader;
