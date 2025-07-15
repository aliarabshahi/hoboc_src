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
  // Fetch blog post data (unchanged)
  const postResponse = await getApiData(`/blog-posts/?post-slug=${params.postSlug}`);
  let postData: BlogPost | undefined;
  if (Array.isArray(postResponse.data)) {
    postData = postResponse.data.find((p: BlogPost) => p.slug === params.postSlug);
  } else if (postResponse.data?.results) {
    postData = postResponse.data.results.find((p: BlogPost) => p.slug === params.postSlug);
  } else {
    postData = postResponse.data;
  }
  if (!postData) notFound();

  // Fetch topic data (unchanged)
  const topicResponse = await getApiData(`/blog-topics/?topic-slug=${params.topicSlug}`);
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
      {/* Navigation Bar (unchanged) */}
      <BlogNavigationBar topic={topicData} postTitle={postData.title} />

      {/* Main Content - FLIPPED LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar (now on LEFT) */}
        <div className="lg:w-80 xl:w-96 order-1 flex-shrink-0">
          <div className="sticky top-16 space-y-6">
            <BlogSidebar
              postData={postData}
              topicSlug={params.topicSlug}
              currentPostSlug={params.postSlug}
            />
          </div>
        </div>

        {/* PDF (now on RIGHT) */}
        <div className="flex-1 min-w-0 order-2">
          {postData.pdf_file && (
            <div className="border rounded-lg shadow-lg overflow-hidden h-[80vh] w-full">
              <PdfViewer pdfUrl={postData.pdf_file} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}