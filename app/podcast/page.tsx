import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AboutSection } from "./components/AboutSection";
import { AudioProvider } from "./components/AudioProvider";
import { AudioPlayer } from "./components/player/AudioPlayer";
import { Waveform } from "./components/Waveform";
import posterImage from "./images/poster.png";
import { Container } from "./components/Container";
import { EpisodePlayButton } from "./components/EpisodePlayButton";
import { FormattedDate } from "./components/FormattedDate";
import { type Episode } from "./lib/episodes";
import { podcastEpisodes } from "./data/podcastEpisodes";

// ---------- ICONS (react-icons) ----------
import { HiOutlineUser as PersonIcon } from "react-icons/hi2";
import { HiMiniPause as PauseIcon, HiMiniPlay as PlayIcon } from "react-icons/hi2";

// ---------- HELPER FUNCTION ----------
export function getEpisode(id: string) {
  const episode = podcastEpisodes.find((ep) => ep.id.toString() === id);
  if (!episode) {
    notFound();
  }
  return episode;
}

// ---------- EPISODE ENTRY ----------
function EpisodeEntry({ episode }: { episode: Episode }) {
  let date = new Date(episode.published);
  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-6 sm:py-8"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/podcast/${episode.id}`}>{episode.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm/7 text-slate-500"
          />
          <p className="mt-1 text-base/7 text-slate-700">
            {episode.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <EpisodePlayButton
              episode={episode}
              className="flex items-center gap-x-3 text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
              playing={
                <>
                  <PauseIcon className="h-2.5 w-2.5" />
                  <span aria-hidden="true">پخش</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-2.5 w-2.5" />
                  <span aria-hidden="true">پخش</span>
                </>
              }
            />
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`/podcast/${episode.id}`}
              className="flex items-center text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`یادداشت‌های قسمت ${episode.title}`}
            >
              یادداشت‌ها
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}

// ---------- RIGHT COLUMN COMPONENT ----------
function RightColumn({ hosts }: { hosts: string[] }) {
  return (
    <aside className="w-full lg:w-2/5 bg-slate-50 border-b lg:border-b-0 lg:border-e border-slate-200 overflow-y-auto lg:pr-40 md:pr-12">
      {/* Waveform for mobile */}
      <div className="block lg:hidden">
        <Waveform className="h-20 w-full" />
      </div>

      <div className="px-6 py-10 lg:py-16 flex flex-col items-center lg:items-start">
        <Link
          href="/"
          className="relative block w-56 sm:w-72 rounded-xl overflow-hidden bg-slate-200 shadow-xl mx-auto"
        >
          <Image
            src={posterImage}
            alt="پوستر پادکست داده"
            className="w-full"
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 18rem, 14rem"
            priority
          />
          <div className="absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset" />
        </Link>

        <div className="mt-8 text-center ">
          <p className="text-xl font-bold text-slate-900">
            <Link href="/">دنیای داده</Link>
          </p>
          <p className="mt-3 text-lg font-medium text-slate-700">
            گفتگو با مهندسان داده، تحلیلگران و متخصصان بیگ‌دیتا درباره
            تکنولوژی‌ها، ابزارها و چالش‌های دنیای داده.
          </p>
        </div>

        <AboutSection className="mt-8" />

        <h2 className="mt-8 flex items-center font-mono text-sm font-medium text-slate-900">
          <PersonIcon className="h-3 w-auto text-slate-300" />
          <span className="mr-2.5">با اجرای</span>
        </h2>
        <div className="mt-2 flex gap-6 text-sm font-bold text-slate-900">
          {hosts.map((host, i) => (
            <Fragment key={host}>
              {i !== 0 && (
                <span aria-hidden="true" className="text-slate-400">
                  /
                </span>
              )}
              {host}
            </Fragment>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ---------- LEFT COLUMN COMPONENT ----------
function LeftColumn({ episodes }: { episodes: Episode[] }) {
  return (
    <main className="w-full lg:w-3/5 flex flex-col">
      {/* Scrollable episode list */}
      <div className="flex-1 overflow-y-auto">
        {/* Waveform for large screens */}
        <div className="hidden lg:block sticky top-0 z-20 bg-white">
          <Waveform className="h-20 w-full" />
        </div>

        <div className="pt-8 pb-6">
          <Container>
            <h1 className="text-2xl font-bold text-slate-900">قسمت‌ها</h1>
          </Container>
          <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
            {episodes.map((episode) => (
              <EpisodeEntry key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky audio player */}
      <div
        className="sticky bottom-0 bg-white border-t border-slate-200 z-10"
        dir="ltr"
      >
        <AudioPlayer />
      </div>
    </main>
  );
}

// ---------- MAIN PAGE ----------
export default function PodcastPage() {
  const hosts = ["مهندس داده حمید", "تحلیلگر داده رضا"];
  const episodes = podcastEpisodes;

  return (
    <AudioProvider>
      <div className="flex flex-col lg:flex-row h-auto">
        {/* Right column: Poster, creator info, About */}
        <RightColumn hosts={hosts} />

        {/* Left column: Episodes list + Player */}
        <LeftColumn episodes={episodes} />
      </div>
    </AudioProvider>
  );
}
