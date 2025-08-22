// app/podcast/page.tsx
"use client";

import { useEffect, useState } from "react";
import PodcastLeftColumn from "./components/main-page/PodcastLeftColumn";
import { getApiData } from "../services/api/apiServerFetch";
import { PodcastEpisode } from "./lib/episodes";
import PodcastPagination from "./components/main-page/PodcastPagination";

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 24;

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const { data, error } = await getApiData("/podcast-episodes/");

        if (error) {
          setError(error);
          return;
        }

        if (!data || data.length === 0) {
          setError("قسمتی برای نمایش وجود ندارد");
          return;
        }

        const formattedEpisodes = (data as PodcastEpisode[]).map((ep) => ({
          ...ep,
          audio: {
            ...ep.audio,
            src: ep.audio_file,
          },
        }));

        setEpisodes(formattedEpisodes);
      } catch (err) {
        setError("خطا در دریافت اطلاعات پادکست");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  if (loading) {
    return (
      <div className="w-full lg:w-3/5 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="py-8 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="py-6 border-b border-gray-200">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-3/5 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="py-8 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="alert alert-error text-center">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(episodes.length / pageSize);
  const currentEpisodes = episodes.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <>
      <PodcastLeftColumn
        episodes={currentEpisodes}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
