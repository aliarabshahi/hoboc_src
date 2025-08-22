// app/podcast/[episode]/page.tsx
import { notFound } from "next/navigation";
import { AudioProvider } from "../components/AudioProvider";
import EpisodeRightColumn from "./components/EpisodeRightColumn";
import EpisodeLeftColumn from "./components/EpisodeLeftColumn";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { PodcastEpisode } from "../lib/episodes";

// ---------- FETCH FUNCTION ----------
async function fetchEpisodeAndNumber(id: string): Promise<{
  episode: PodcastEpisode;
  number: number;
}> {
  const { data: listData, error } = await getApiData("/podcast-episodes/");

  if (error || !listData) {
    notFound();
  }

  const episodes: PodcastEpisode[] = (listData as PodcastEpisode[]).map((ep) => ({
    ...ep,
    audio: { ...ep.audio, src: ep.audio_file },
  }));

  const total = episodes.length;
  const indexInArray = episodes.findIndex((ep) => ep.id.toString() === id);

  if (indexInArray === -1) {
    notFound();
  }

  const episode = episodes[indexInArray];
  const number = total - indexInArray; // reverse numbering

  return { episode, number };
}

// ---------- METADATA ----------
export async function generateMetadata({ params }: { params: { episode: string } }) {
  const { episode } = await fetchEpisodeAndNumber(params.episode);
  return { title: episode.title };
}

// ---------- PAGE ----------
export default async function EpisodePage({ params }: { params: { episode: string } }) {
  const hosts = ["مهندس داده حمید", "تحلیلگر داده رضا"];
  const { episode, number } = await fetchEpisodeAndNumber(params.episode);

  return (
    <AudioProvider>
      <div className="flex flex-col lg:flex-row h-auto">
        <EpisodeRightColumn hosts={hosts} />
        <EpisodeLeftColumn episode={episode} number={number} />
      </div>
    </AudioProvider>
  );
}
