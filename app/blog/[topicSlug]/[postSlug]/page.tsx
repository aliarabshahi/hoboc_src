import { getApiData } from "@/app/services/api/apiServerFetch";
import { BlogPost, BlogTopic } from "@/app/types/blogType";
import { notFound } from "next/navigation";
import BlogPdfViewer from "@/app/blog/[topicSlug]/[postSlug]/components/BlogPdfViewer";
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

  // Fetch topic data
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
    <div dir="rtl" className="relative isolate overflow-hidden min-h-screen">
      {/* Ultra faint pale-pink background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient: essentially white with faintest pink */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffafd] via-[#fdf6fa] to-white" />
        {/* Faint pink overlay (opacity 5%) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f477b80a] via-transparent to-transparent opacity-5" />

        {/* Nearly invisible pale pink blobs */}
        <div className="absolute top-[10%] left-[12%] w-32 h-32 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02]" />
        <div className="absolute top-[19%] right-[15%] w-20 h-20 bg-[#fbb5d4] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.015]" />
        <div className="absolute bottom-[17%] left-1/3 w-20 h-20 bg-[#fbd3e7] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.018]" />
      </div>

      {/* Responsive container with extra horizontal padding */}
      <section className="container mx-auto px-4 md:px-8 lg:px-20 py-8">
        {/* Navigation Bar */}
        <BlogNavigationBar topic={topicData} postTitle={postData.title} />

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar (on LEFT in RTL) */}
          <div className="lg:w-80 xl:w-96 order-1 flex-shrink-0">
            <div className="sticky top-16 space-y-6">
              <BlogSidebar
                postData={postData}
                topicSlug={params.topicSlug}
                currentPostSlug={params.postSlug}
              />
            </div>
          </div>

          {/* PDF viewer (on RIGHT) */}
          <div className="flex-1 min-w-0 order-2">
            {postData.pdf_file && (
              <div className="border rounded-lg shadow-lg overflow-hidden h-[80vh] w-full">
                <BlogPdfViewer pdfUrl={postData.pdf_file} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
