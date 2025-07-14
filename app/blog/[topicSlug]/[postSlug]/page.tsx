import { getApiData } from "@/app/services/api/apiServerFetch";
import { BlogPost, BlogTopic } from "@/app/types/blogType";
import { notFound } from "next/navigation";
import PdfViewer from "@/app/blog/[topicSlug]/[postSlug]/components/PdfViewer";
import BlogSidebar from "@/app/blog/[topicSlug]/[postSlug]/components/BlogSidebar";
import BlogNavigationBar from "@/app/blog/[topicSlug]/[postSlug]/components/BlogNavigationBar";

interface Params {
  params: {
    topicSlug: string;
    postSlug: string;
  };
}

export default async function BlogPostPage({ params }: Params) {
  // Fetch blog post data
  const postResponse = await getApiData(`/blog-posts/?slug=${params.postSlug}`);
  let postData: BlogPost | undefined;

  if (Array.isArray(postResponse.data)) {
    postData = postResponse.data.find((p: BlogPost) => p.slug === params.postSlug);
  } else if (postResponse.data?.results) {
    postData = postResponse.data.results.find((p: BlogPost) => p.slug === params.postSlug);
  } else {
    postData = postResponse.data;
  }

  if (!postData) notFound();

  // Fetch topic data
  const topicResponse = await getApiData(`/blog-topics/?slug=${params.topicSlug}`);
  let topicData: BlogTopic | undefined;

  if (Array.isArray(topicResponse.data)) {
    topicData = topicResponse.data.find((t: BlogTopic) => t.slug === params.topicSlug);
  } else if (topicResponse.data?.results) {
    topicData = topicResponse.data.results.find((t: BlogTopic) => t.slug === params.topicSlug);
  } else {
    topicData = topicResponse.data;
  }

  if (!topicData) notFound();

  return (
    <div dir="rtl" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation Bar */}
      <BlogNavigationBar topic={topicData} postTitle={postData.title} />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 order-2 lg:order-1">
          {/* Cover Image */}
          {postData.cover_image && (
            <div className="mb-6 rounded-lg overflow-hidden shadow-md">
              <img 
                src={postData.cover_image} 
                alt={postData.title}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {/* Post Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{postData.title}</h1>
          
          {/* Author and Date */}
          <div className="flex items-center gap-4 mb-6 text-gray-600">
            {postData.writer && (
              <div className="flex items-center gap-2">
                {postData.writer.profile_picture && (
                  <img 
                    src={postData.writer.profile_picture} 
                    alt={postData.writer.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span>{postData.writer.name}</span>
              </div>
            )}
            <span>•</span>
            <time dateTime={postData.created_at}>
              {new Date(postData.created_at).toLocaleDateString('fa-IR')}
            </time>
          </div>

          {/* PDF Content */}
          {postData.pdf_file && (
            <div className="border rounded-lg shadow-lg overflow-hidden h-[80vh] w-full mb-6">
              <PdfViewer pdfUrl={postData.pdf_file} />
            </div>
          )}

          {/* Description */}
          {postData.description && (
            <div className="prose max-w-none text-gray-700 mb-8">
              <p>{postData.description}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 xl:w-96 order-1 lg:order-2 flex-shrink-0">
          <div className="sticky top-16 space-y-6">
            <BlogSidebar
              postData={postData}
              topicSlug={params.topicSlug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}