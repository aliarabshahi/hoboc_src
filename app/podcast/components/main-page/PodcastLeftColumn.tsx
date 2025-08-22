// app/podcast/components/main-page/PodcastLeftColumn.tsx
import { PodcastEpisode } from '../../lib/episodes';
import { AudioPlayer } from '../player/AudioPlayer';
import EpisodeList from './EpisodeList';
import PodcastPagination from './PodcastPagination';

interface PodcastLeftColumnProps {
  episodes: PodcastEpisode[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PodcastLeftColumn({ 
  episodes, 
  currentPage, 
  totalPages, 
  onPageChange 
}: PodcastLeftColumnProps) {
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <EpisodeList episodes={episodes} />
        
        {/* Pagination - placed below episodes but above player */}
        <PodcastPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>

      <div
        className="sticky bottom-0 bg-white border-t border-slate-200 z-10"
        dir="ltr"
      >
        <AudioPlayer />
      </div>
    </>
  );
}