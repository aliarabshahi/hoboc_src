// ---------- INLINE TYPES FOR jalaali-js ----------
type JalaaliDate = {
  jy: number; // Jalali year
  jm: number; // Jalali month
  jd: number; // Jalali day
};

interface JalaaliJs {
  toJalaali: (date: Date | number, month?: number, day?: number) => JalaaliDate;
  toGregorian: (jy: number, jm: number, jd: number) => { gy: number; gm: number; gd: number };
  isLeapJalaaliYear: (jy: number) => boolean;
  jalaaliMonthLength: (jy: number, jm: number) => number;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jalaali: JalaaliJs = require("jalaali-js");

// ---------- IMPORTS ----------
import { Fragment } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { AboutSection } from "../components/AboutSection";
import { AudioProvider } from "../components/AudioProvider";
import { AudioPlayer } from "../components/player/AudioPlayer";
import { Waveform } from "../components/Waveform";
import posterImage from "../images/poster.png";
import { Container } from "../components/Container";
import { EpisodePlayButton } from "../components/EpisodePlayButton";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { PodcastEpisode } from "../lib/episodes";

import {
  HiOutlineUser as PersonIcon,
  HiMiniPause as PauseIcon,
  HiMiniPlay as PlayIcon,
  HiArrowUturnRight as BackIcon,
} from "react-icons/hi2";

// ==== helper: convert English digits to Persian ====
function toPersianDigits(strOrNum: string | number) {
  return String(strOrNum).replace(/\d/g, (d) =>
    "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]
  );
}

// ==== helper: format Jalali date with Persian digits ====
function formatJalaliDate(isoDate: string) {
  const gDate = new Date(isoDate);
  const jDate = jalaali.toJalaali(gDate);
  const monthNames = [
    "فروردین", "اردیبهشت", "خرداد",
    "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر",
    "دی", "بهمن", "اسفند"
  ];
  const day = toPersianDigits(jDate.jd);
  const year = toPersianDigits(jDate.jy);
  const month = monthNames[jDate.jm - 1];
  return `${day} ${month} ${year}`;
}

// ---------- DATA FETCH ----------
async function fetchEpisodeAndNumber(id: string): Promise<{
  episode: PodcastEpisode;
  number: number;
}> {
  const { data: listData, error: listError } = await getApiData(`/podcast-episodes/`);

  if (listError || !listData) {
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

// ---------- RIGHT COLUMN ----------
function RightColumn({ hosts }: { hosts: string[] }) {
  return (
    <aside className="w-full lg:w-2/5 bg-slate-50 border-b lg:border-b-0 lg:border-e border-slate-200 overflow-y-auto lg:pr-40 md:pr-12">
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

        <div className="mt-8 text-center">
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

// ---------- EPISODE DETAIL ----------
function EpisodeDetail({
  episode,
  number,
}: {
  episode: PodcastEpisode;
  number: number;
}) {
  const jalaliDate = formatJalaliDate(episode.published_at);

  return (
    <main className="w-full lg:w-3/5 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="hidden lg:block sticky top-0 z-20 bg-white">
          <Waveform className="h-20 w-full" />
        </div>

        <div className="py-8 lg:py-16">
          <Container>
            <div className="mb-6">
              <Link
                href="/podcast"
                className="flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-800 transition-colors"
              >
                <BackIcon className="h-4 w-4" />
                <span>بازگشت به همه قسمتها</span>
              </Link>
            </div>

            <header className="flex flex-col">
              <div className="flex items-start gap-6">
                <EpisodePlayButton
                  episode={episode}
                  className="group relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:ring-3 focus:ring-slate-700 focus:ring-offset-4 focus:outline-hidden"
                  playing={
                    <PauseIcon className="h-10 w-10 fill-white group-active:fill-white/80" />
                  }
                  paused={
                    <PlayIcon className="h-10 w-10 fill-white group-active:fill-white/80" />
                  }
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 font-mono">
                      {toPersianDigits(number.toString().padStart(2, "0"))}
                    </span>
                    <h1 className="mt-0 text-4xl font-bold text-slate-900">
                      {episode.title}
                    </h1>
                  </div>
                  {/* --- Jalali Date --- */}
                  <div className="order-first font-mono text-sm/7 text-slate-500">
                    {jalaliDate}
                  </div>
                  <p className="mt-3 text-lg/8 font-medium text-slate-700">
                    {episode.description}
                  </p>
                </div>
              </div>
            </header>

            <hr className="my-12 border-gray-200" />
            <div
              className="prose mt-14 prose-slate [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm/7 [&>h2]:font-medium [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>ul]:mt-6 [&>ul]:list-['\\\\2013\\\\20'] [&>ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: episode.content }}
            />
          </Container>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-slate-200 z-10" dir="ltr">
        <AudioPlayer />
      </div>
    </main>
  );
}

// ---------- METADATA ----------
export async function generateMetadata({
  params,
}: {
  params: { episode: string };
}) {
  const { episode } = await fetchEpisodeAndNumber(params.episode);
  return { title: episode.title };
}

// ---------- PAGE ----------
export default async function EpisodePage({
  params,
}: {
  params: { episode: string };
}) {
  const hosts = ["مهندس داده حمید", "تحلیلگر داده رضا"];
  const { episode, number } = await fetchEpisodeAndNumber(params.episode);

  return (
    <AudioProvider>
      <div className="flex flex-col lg:flex-row h-auto">
        <RightColumn hosts={hosts} />
        <EpisodeDetail episode={episode} number={number} />
      </div>
    </AudioProvider>
  );
}
