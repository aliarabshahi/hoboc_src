// app/podcast/page.tsx
import { notFound } from "next/navigation";
import PodcastLeftColumn from "./components/main-page/PodcastLeftColumn";
import { getApiData } from "../services/api/apiServerFetch";
import { PodcastEpisode } from "./lib/episodes";

export default async function PodcastPage() {
  const { data, error } = await getApiData("/podcast-episodes/");

  if (error) {
    return (
      <div className="alert alert-error text-center mt-8">{error}</div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="alert alert-info text-center mt-8">
        قسمتی برای نمایش وجود ندارد
      </div>
    );
  }

  const episodes = (data as PodcastEpisode[]).map((ep) => ({
    ...ep,
    audio: {
      ...ep.audio,
      src: ep.audio_file,
    },
  }));

  return <PodcastLeftColumn episodes={episodes} />;
}