// app/podcast/page.tsx
import { notFound } from "next/navigation";
import { AudioProvider } from "./components/AudioProvider";
import PodcastLeftColumn from "./components/main-page/PodcastLeftColumn";
import PodcastRightColumn from "./components/main-page/PodcastRightColumn";
import { getApiData } from "../services/api/apiServerFetch";
import { PodcastEpisode } from "./lib/episodes";

// ---------- HELPER FUNCTION ----------
function getEpisode(episodes: PodcastEpisode[], id: string) {
  const episode = episodes.find((ep) => ep.id.toString() === id);
  if (!episode) {
    notFound();
  }
  return episode;
}

// ---------- MAIN PAGE ----------
export default async function PodcastPage() {
  const hosts = ["مهندس داده حمید", "تحلیلگر داده رضا"];
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

  return (
    <AudioProvider>
      <div className="flex flex-col lg:flex-row h-auto">
        <PodcastRightColumn hosts={hosts} />
        <PodcastLeftColumn episodes={episodes} />
      </div>
    </AudioProvider>
  );
}