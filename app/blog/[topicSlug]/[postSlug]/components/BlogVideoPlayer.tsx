import { BlogPost } from "@/app/types/blogType";

export default function BlogVideoPlayer({ postData }: { postData: BlogPost }) {
  if (!postData.video_url && !postData.video_file) return null;

  // Handle uploaded video file
  if (postData.video_file) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border">
        <h3 className="text-lg font-bold mb-3">پخش ویدیو</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <video 
            controls 
            className="w-full h-full"
            poster={postData.thumbnail || postData.cover_image || undefined}
          >
            <source src={postData.video_file} type="video/mp4" />
            مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
          </video>
        </div>
      </div>
    );
  }

  // Handle Aparat URL
  if (postData.video_url) {
    const getAparatVideoHash = (url: string) => {
      const match = url.match(/aparat\.com\/v\/([^\/]+)/);
      return match ? match[1] : null;
    };

    const videoHash = getAparatVideoHash(postData.video_url);

    if (!videoHash) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border">
          <a 
            href={postData.video_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800"
          >
            مشاهده ویدیو در آپارات
          </a>
        </div>
      );
    }

    return (
      <div className="bg-white p-4 rounded-lg shadow-md border">
        <h3 className="text-lg font-bold mb-3">پخش ویدیو</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.aparat.com/video/video/embed/videohash/${videoHash}/vt/frame`}
            allowFullScreen
            className="w-full h-full"
            title="Aparat Video Player"
          ></iframe>
        </div>
        <div className="mt-2 text-sm text-gray-500 text-center">
          <a 
            href={postData.video_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            مشاهده ویدیو در آپارات
          </a>
        </div>
      </div>
    );
  }

  return null;
}